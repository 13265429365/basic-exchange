import { api } from 'src/boot/axios';

// 用户登录
export const userLogin = (params: any) => {
  return api.post('api/v1/login', params);
};

// 用户注册
export const userRegister = (params: any) => {
  return api.post('api/v1/register', params);
};

// 获取用户信息
export const getUserInfo = () => {
  return api.post('api/v1/user/info');
};


// 用户团队详情数据
export const getTeamDetails = (params: any) => {
  return api.post('api/v1/user/team/details', params);
};

// 用户团队成员
export const getTeam = (params: any) => {
  return api.post('api/v1/user/team/index', params);
};

// 用户更改信息
export const updateInfo = (params: any) => {
  return api.post('api/v1/user/update', params);
};

// 用户更改密码
export const updatePassword = (params: any) => {
  return api.post('api/v1/user/update/password', params);
};

// 会员等级信息
export const getLevel = () => {
  return api.post('api/v1/user/level/index');
};

// 用户购买等级
export const orderLevel = (params: any) => {
  return api.post('api/v1/user/level/order', params);
};


