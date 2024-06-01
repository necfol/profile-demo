/*
 * @LastEditors: Necfol
 * @Date: 2024-06-01 11:57:11
 * @LastEditTime: 2024-06-01 21:44:54
 * @FilePath: /blocklet-project/api/src/models/operate-log.ts
 */
// import { Sequelize, DataTypes } from 'sequelize';
// export default (seq: InstanceType<typeof Sequelize>) => {
//   return seq.define('OperateLog', {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       comment: '自增 ID',
//     },
//     action: {
//       type: DataTypes.STRING(256),
//       comment: '写操作动作',
//     },
//     content: {
//       type: DataTypes.TEXT('medium'),
//       comment: '具体操作内容',
//     },
//     operator: {
//       type: DataTypes.STRING(256),
//       comment: '操作人信息',
//     },
//   }, {
//     tableName: 'operate_log',
//   });
// };
import { Sequelize, Model, DataTypes } from 'sequelize';

class OperateLog extends Model {
  declare id: number;

  declare action: string;

  declare content: string;

  declare operator: string;
}
export function initOperateLogModel(sequelize: Sequelize) {
  OperateLog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '自增 ID',
      },
      action: {
        type: DataTypes.STRING(256),
        comment: '写操作动作',
      },
      content: {
        type: DataTypes.TEXT('medium'),
        comment: '具体操作内容',
      },
      operator: {
        type: DataTypes.STRING(256),
        comment: '操作人信息',
      },
    },
    {
      sequelize,
      paranoid: true,
      tableName: 'operate_log',
    },
  );
}
export default OperateLog;
