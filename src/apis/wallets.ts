import { api } from 'src/boot/axios';

// 用户获取支付列表
export const walletsPaymentIndexAPI = (params: any) => {
  return api.post('/wallets/payment/index', params);
};

// 用户创建卡片
export const walletsAccountCreateAPI = (params: any) => {
  return api.post('/wallets/account/create', params);
};


// 用户编辑卡片
export const walletsAccountUpdateAPI = (params: any) => {
  return api.post('/wallets/account/update', params);
};

// 用户获取卡片
export const walletsAccountIndexAPI = () => {
  return api.post('/wallets/account/index');
};

// 用户获取卡片详情
export const walletsAccountInfoAPI = (params: any) => {
  return api.post('/wallets/account/info', params);
};

// 用户删除卡片
export const walletsAccountDeleteAPI = (params: any) => {
  return api.post('/wallets/account/delete', params);
};

// 用户获取资产列表
export const walletsUserAssetsIndexAPI = (params: any) => {
  return api.post('/wallets/user/assets/index', params);
};

// 用户获取账单列表
export const walletsBillIndexAPI = (params: any) => {
  return api.post('/wallets/bill/index', params);
};


// 用户获取钱包订单列表
export const walletsOrderIndexAPI = (params: any) => {
  return api.post('/wallets/order/index', params);
};

// 用户充值
export const walletsDepositCreateAPI = (params: any) => {
  return api.post('/wallets/deposit/create', params);
};

// 用户提现
export const walletsWithdrawCreateAPI = (params: any) => {
  return api.post('/wallets/withdraw/create', params);
};
