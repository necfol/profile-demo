import { Sequelize, Model, DataTypes } from 'sequelize';

class User extends Model {
  declare id: number;

  declare username: string;

  declare email: string;

  declare phone: string;
}
export function initUserModel(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '自增主键',
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '用户名',
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        comment: '邮箱',
      },
      phone: {
        type: DataTypes.STRING(11), // 假设手机号长度为11位
        allowNull: false,
        unique: true,
        comment: '手机号',
      },
    },
    {
      sequelize,
      paranoid: true,
      tableName: 'user',
    },
  );
}
export default User;
