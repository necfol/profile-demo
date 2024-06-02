/*
 * @LastEditors: Necfol
 * @Date: 2024-06-02 18:20:36
 * @LastEditTime: 2024-06-02 23:18:53
 * @FilePath: /blocklet-project/src/libs/profile.ts
 */
import request from './api';

export interface IProfile {
  username: string;
  email: string;
  phone: string | number;
  id?: string;
}

// 获取所有用户
export const getAllProfileService = () => request.get('/profile/all');

// 获取用户
export const getProfileDetailService = (id: string) => request.get(`/profile/${id}`);

// 编辑用户信息
export const updateProfileService = (profile: IProfile) => request.put(`/profile/${profile.id}`, profile);

// 新增用户
export const createProfileService = (profile: IProfile) => request.post('/profile', profile);
