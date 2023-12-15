import { api } from 'src/boot/axios';

// 创建验证码
export const CaptchaAPI = () => {
  return api.get('/captcha/create');
};

// 初始化数据
export const userInit = (params: any) => {
  return api.get('/init', params);
};

// 获取footer数据
export const footerList = (params: any) => {
  return api.get('/init/', params);
};