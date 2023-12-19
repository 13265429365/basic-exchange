import { api } from 'src/boot/axios';

// 用户登录
export const userLogin = (params: any) => {
  return api.post('api/v1/login', params);
};

// 用户注册
export const userRegister = (params: any) => {
  return api.post('api/v1/register', params);
};


