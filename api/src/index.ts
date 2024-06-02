/*
 * @LastEditors: Necfol
 * @Date: 2024-05-31 23:59:11
 * @LastEditTime: 2024-06-02 23:52:08
 * @FilePath: /blocklet-project/api/src/index.ts
 */
import 'express-async-errors';

import path from 'path';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv-flow';
import express, { ErrorRequestHandler } from 'express';
import fallback from '@blocklet/sdk/lib/middlewares/fallback';

import logger from './libs/logger';
import routes from './routes';
import profileRoutes from './routes/profile';

import { initDB } from './models';

dotenv.config();

const { name, version } = require('../../package.json');

export const app = express();

app.set('trust proxy', true);
app.use(cookieParser());
app.use(express.json({ limit: '1 mb' }));
app.use(express.urlencoded({ extended: true, limit: '1 mb' }));
app.use(cors());
initDB({
  database: process.env.MYSQL_DATABASE || 'blockclet-project',
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || '123456',
  port: (process.env.MYSQL_PORT || 3306) as number,
});

const router = express.Router();
router.use('/api', routes);
router.use('/profile', profileRoutes);
app.use(router);

const isProduction = process.env.NODE_ENV === 'production' || process.env.ABT_NODE_SERVICE_ENV === 'production';

if (isProduction) {
  const staticDir = path.resolve(process.env.BLOCKLET_APP_DIR!, 'dist');
  app.use(express.static(staticDir, { maxAge: '30d', index: false }));
  app.use(fallback('index.html', { root: staticDir }));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use(<ErrorRequestHandler>((err, _req, res, _next) => {
    logger.error(err.stack);
    res.status(500).send('Something broke!');
  }));
}

const port = parseInt(process.env.BLOCKLET_PORT!, 10);

export const server = app.listen(port, (err?: any) => {
  if (err) throw err;
  logger.info(`> ${name} v${version} ready on ${port}`);
});
