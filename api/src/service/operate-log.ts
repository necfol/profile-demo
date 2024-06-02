/*
 * @LastEditors: Necfol
 * @Date: 2024-06-02 22:47:53
 * @LastEditTime: 2024-06-02 23:00:23
 * @FilePath: /blocklet-project/api/src/service/operate-log.ts
 */
import { Tables } from '../models';

/**
 * @param {string} action
 * @param {string} content
 * @param {string} operator
 */
export default async function record(action: string, content: string, operator: string) {
  const { operateLog } = Tables;
  await operateLog.create({
    action,
    content,
    operator,
  });
}
