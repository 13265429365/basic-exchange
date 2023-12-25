import { api } from 'src/boot/axios';

// 创建验证码
export const CaptchaAPI = () => {
  return api.get('/captcha/create');
};

// 初始化数据
export const userInit = (params: any) => {
  return api.get(`/init?domain=${params.domain}&lang=${params.lang}`);
};

// 获取footer数据
export const getFooter = () => {
  return api.post('/footer');
};

// 获取文章
export const getArticle = (params: any) => {
  return api.post('/article/index', params);
};

// 获取文章详情
export const getArticleInfo = (params: any) => {
  return api.post('/article/info', params);
};

// 获取下载信息
export const getDownload = () => {
  return api.post('/download');
};

// 获取帮助列表
export const getHelpers = () => {
  return api.post('/helpers');
};