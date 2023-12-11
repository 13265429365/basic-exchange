import { api } from 'src/boot/axios';

// 创建验证码
export const CaptchaAPI = () => {
  return api.get('/captcha/create');
};
