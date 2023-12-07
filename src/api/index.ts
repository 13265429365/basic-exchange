import { api } from 'src/request/axios';

// 创建验证码
export const CaptchaAPI = () => {
  return api.get('/captcha/create');
};
