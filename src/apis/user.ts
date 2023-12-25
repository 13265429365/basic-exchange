import { api } from 'src/boot/axios';

// 用户登录
export const userLogin = (params: any) => {
  return api.post('/login', params);
};

// 用户注册
export const userRegister = (params: any) => {
  return api.post('/register', params);
};

// 获取用户信息
export const getUserInfo = () => {
  return api.post('/user/info');
};


// 用户团队详情数据
export const getTeamDetails = (params: any) => {
  return api.post('/user/team/details', params);
};

// 用户团队成员
export const getTeam = (params: any) => {
  return api.post('/user/team/index', params);
};

// 用户更改信息
export const updateInfo = (params: any) => {
  return api.post('/user/update', params);
};

// 用户更改密码
export const updatePassword = (params: any) => {
  return api.post('/user/update/password', params);
};

// 会员等级信息
export const getLevel = () => {
  return api.post('/user/level/index');
};

// 用户购买等级
export const orderLevel = (params: any) => {
  return api.post('/user/level/order', params);
};

// 用户实名认证
export const userAuth = (params: any) => {
  return api.post('/user/auth/create', params);
};

// 用户获取实名
export const getUserAuth = () => {
  return api.post('/user/auth/info');
};

// 获取用户邀请码
export const getInvite = () => {
  return api.post('/user/invite/info');
};



