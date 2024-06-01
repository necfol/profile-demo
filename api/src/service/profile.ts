/*
 * @LastEditors: Necfol
 * @Date: 2024-06-01 22:33:20
 * @LastEditTime: 2024-06-02 00:15:36
 * @FilePath: /blocklet-project/api/src/service/profile.ts
 */
import { Op } from 'sequelize';
import { isValidEmail, isValidPhone } from './helper';
import log from '../libs/logger';
import { Tables } from '../models';
import baseService from './base-service';

const UserBaseService = baseService('user');

interface IUser {
  username: string;
  phone: string;
  email: string;
  id?: number;
}

/**
 * add new user
 * @param {{
 *  username: string,
 *  phone: number | string,
 *  email: string,
 * }} param
 */
export async function addUser(param: IUser) {
  const { username, phone, email } = param;
  if (!username) {
    throw new Error('Username is not correct');
  }
  if (!isValidPhone(phone)) {
    throw new Error(`Phone ${phone} is not correct`);
  }
  if (!isValidEmail(email)) {
    throw new Error(`E-mail ${email} is not correct`);
  }

  const existedEmail = await UserBaseService.getObjectByCdt({
    email,
  });
  const existedPhone = await UserBaseService.getObjectByCdt({
    phone,
  });
  if (existedEmail || existedPhone) {
    log.error('User is existed');
    throw new Error('User is existed');
  }
  const { user } = Tables;
  const newUser = await user.create({
    username,
    email,
    phone,
  });
  return newUser;
}

/**
 * query user
 * @param {{
 *  id: number,
 * }} id
 */
export async function getUser(id: number) {
  if (!id) {
    throw new Error('ID is null');
  }

  const currentUser = await UserBaseService.getById(id);

  if (!currentUser) {
    log.error('User is not existed');
    throw new Error('User is not existed');
  }

  return currentUser;
}

/**
 * update user
 * @param {{
 *  id: number,
 *  username: string,
 *  phone: number | string,
 *  email: string,
 * }} userInfo
 */
export async function updateUser(userInfo: IUser) {
  const { id, username, phone, email } = userInfo;
  if (!id) {
    throw new Error('ID is null');
  }

  if (!username) {
    throw new Error('Username is not correct');
  }

  if (!isValidPhone(phone)) {
    throw new Error(`Phone ${phone} is not correct`);
  }
  if (!isValidEmail(email)) {
    throw new Error(`E-mail ${email} is not correct`);
  }

  const currentUser = await UserBaseService.getById(id);

  if (!currentUser) {
    log.error('User is not existed');
    throw new Error('User is not existed');
  }

  const { user } = Tables;

  const existedEmail = await user.findOne({ where: { email, id: { [Op.ne]: id } } });
  const existedPhone = await user.findOne({ where: { phone, id: { [Op.ne]: id } } });
  if (existedEmail || existedPhone) {
    log.error('User is existed');
    throw new Error('User is existed');
  }

  await UserBaseService.updateById(id, {
    username,
    phone,
    email,
  });

  const newUser = await UserBaseService.getById(id);

  return newUser;
}
