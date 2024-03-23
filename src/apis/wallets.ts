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
export const walletsAccountIndexAPI = (params: any) => {
  return api.post('/wallets/account/index', params);
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
export const walletsUserAssetsIndexAPI = () => {
  return api.post('/wallets/user/assets/index');
};

// 获取钱包资产列表
export const walletsAssetsIndexAPI = () => {
  return api.post('/wallets/assets/index');
};

// 获取划转信息
export const walletstransferInfoAPI = (params: any) => {
  return api.post('/wallets/transfer/info', params);
};

// 闪兑、划转
export const walletsTransfeCreateAPI = (params: any) => {
  return api.post('/wallets/transfer/create', params);
};

// 闪兑记录、划转记录
export const walletsTransfeIndexAPI = (params: any) => {
  return api.post('/wallets/transfer/index', params);
};

// 获取用户资产信息
export const walletsUserAssetsInfoAPI = (params: any) => {
  return api.post('/wallets/user/assets/info', params)
}

// 钱包账单类型列表
export const walletsBillOptionsAPI = (params: any) => {
  return api.post('/wallets/bill/options', params)
}

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

// 用户划转
export const walletsTransferAPI = (params: any) => {
  return api.post('/wallets/exchange/transfer', params);
};

// 用户划转历史、闪兑历史
export const walletsTransferListAPI = (params: any) => {
  return api.post('/wallets/exchange/transfer/index', params);
};

// 闪兑信息
export const walletsexChangeInfoAPI = (params: any) => {
  return api.post('/wallets/exchange/info', params);
};

// 闪兑
export const walletsexChangeCraeteAPI = (params: any) => {
  return api.post('/wallets/exchange/create', params);
};

// 闪兑结果
export const walletsexChangeResAPI = (params: any) => {
  return api.post('/wallets/exchange/res', params);
};
