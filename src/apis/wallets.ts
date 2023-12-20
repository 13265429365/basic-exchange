import { api } from 'src/boot/axios';

// 用户创建卡片
export const userAddCard = (params: any) => {
  return api.post('api/v1/wallets/account/create', params);
};

// 用户删除卡片
export const userDelCard = (params: any) => {
  return api.post('api/v1/wallets/account/delete', params);
};

// 用户获取卡片
export const userGetCard = () => {
  return api.post('api/v1/wallets/account/index');
};

// 用户编辑卡片
export const userEditCard = (params: any) => {
  return api.post('api/v1/wallets/account/update', params);
};



