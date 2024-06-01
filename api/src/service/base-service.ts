/*
 * @LastEditors: Necfol
 * @Date: 2024-06-01 22:30:36
 * @LastEditTime: 2024-06-02 00:16:06
 * @FilePath: /blocklet-project/api/src/service/base-service.ts
 */
/* eslint-disable @typescript-eslint/return-await */
import { Tables } from '../models';

// common service method
export default (modelName: string) => {
  /**
   * 根据 id 获取实例
   * @param {number|string} id
   */
  async function getById(id: number | string) {
    return await Tables[modelName].findOne({
      where: { id },
    });
  }

  /**
   * 根据条件查询
   * @param {object} cdt
   */
  async function getByCdt(cdt: object) {
    return await Tables[modelName].findAll({ where: cdt });
  }

  /**
   * 返回第一个符合条件的对象
   * @param {object} cdt
   */
  async function getObjectByCdt(cdt: object) {
    return await Tables[modelName].findOne({ where: cdt });
  }

  /**
   * 更新 model
   * @param {number|string} id
   * @param {object} obj
   */
  async function updateById(id: number | string, obj: object) {
    return await Tables[modelName].update(obj, {
      where: { id },
    });
  }

  return {
    getById,
    getByCdt,
    getObjectByCdt,
    updateById,
  };
};
