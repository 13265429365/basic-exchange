import { api } from 'src/boot/axios';

// 用户获取支付列表
export const userPayment = (params: any) => {
  return api.post('api/v1/wallets/payment/index', params);
};

// 用户创建卡片
export const userAddCard = (params: any) => {
  return api.post('api/v1/wallets/account/create', params);
};


// 用户编辑卡片
export const userEditCard = (params: any) => {
  return api.post('api/v1/wallets/account/update', params);
};

// 用户获取卡片
export const userGetCard = () => {
  return api.post('api/v1/wallets/account/index');
};

// 用户获取卡片详情
export const userGetCardInfo = (params: any) => {
  return api.post('api/v1/wallets/account/info', params);
};

// 用户删除卡片
export const userDelCard = (params: any) => {
  return api.post('api/v1/wallets/account/delete', params);
};





// 用户获取资产列表
export const userGetAssets = (params: any) => {
  return api.post('api/v1/wallets/user/assets/index', params);
};

// 用户获取账单列表
export const userGetBill = (params: any) => {
  return api.post('api/v1/wallets/bill/index', params);
};


// 用户获取钱包订单列表
export const userGetOrder = (params: any) => {
  return api.post('api/v1/wallets/order/index', params);
};

// 用户充值
export const userDeposit = (params: any) => {
  return api.post('api/v1/wallets/deposit/create', params);
};

// 用户提现
export const userWithdraw = (params: any) => {
  return api.post('api/v1/wallets/withdraw/create', params);
};
