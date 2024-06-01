import { Sequelize, QueryOptions } from 'sequelize';
import _ from 'lodash';
import mysql, { ConnectionOptions } from 'mysql2/promise';
import path from 'path';
import log from '../libs/logger';

const models = ['user', 'operate-log'];

type InitConfig = {
  database: string;
  username: string;
  password: string;
  port?: number;
};

let seq: InstanceType<typeof Sequelize>;

export const Tables: {
  [key: string]: any;
} = {};

function initModels(config: InitConfig) {
  const { database, username, password, ...opts } = config;
  seq = new Sequelize(
    database,
    username,
    password,
    _.defaultsDeep(opts, {
      port: 3306,
      dialect: 'mysql',
      dialectOptions: {
        multipleStatements: true,
      },
      logging: false,
    }),
  );

  models.forEach((modelName) => {
    /* eslint-disable import/no-dynamic-require */
    /* eslint-disable global-require */
    const modelModule = require(path.resolve(__dirname, modelName));
    const modelClass = modelModule.default;
    const initModel = modelModule[`init${_.upperFirst(_.camelCase(modelName))}Model`];
    initModel(seq);
    Tables[_.camelCase(modelName)] = modelClass;
  });
  Object.values(Tables).forEach((model: any) => {
    if (typeof model.associate === 'function') {
      model.associate(Tables);
    }
  });
}

export function query(sql: string, options?: QueryOptions): Promise<[unknown[], unknown]> {
  return new Promise((resolve, reject) => {
    seq
      .query(sql, options)
      .then((results) => {
        resolve(results);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

async function getConn(useDatabase?: boolean) {
  const { username, password, host, port = 3306, database } = seq.config;
  const conf: ConnectionOptions = {
    host,
    user: username,
    password: password ?? '',
    port: port as number,
    multipleStatements: true,
    database: useDatabase ? database : undefined,
  };

  try {
    const conn = await mysql.createConnection(conf);
    return conn;
  } catch (e) {
    log.error('connect mysql server fail!');
    throw e;
  }
}

async function createDataBaseIfNotExists() {
  const connection = await getConn();
  const { database } = seq.config;
  try {
    await connection.execute(
      `CREATE DATABASE IF NOT EXISTS \`${database}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
  } catch (e) {
    log.error(`createDataBaseIfNotExists error: ${e}`);
    throw e;
  } finally {
    connection.end();
  }
}

export async function initDB(config: InitConfig) {
  if (!config) {
    throw new Error('SQL config not exists!');
  }
  initModels(config);
  await createDataBaseIfNotExists();
  try {
    await seq.sync({ force: false });
  } catch (e) {
    log.error(`seq.initDB error: ${e}`);
    throw e;
  }
}
