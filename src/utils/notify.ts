import { Notify } from 'quasar';

// 错误提示
export const NotifyNegative = (msg: string) => {
  Notify.create({
    type: 'negative',
    position: 'top',
    timeout: 3000,
    message: msg,
  });
};

// 成功提示
export const NotifyPositive = (msg: string) => {
  Notify.create({
    type: 'positive',
    position: 'top',
    timeout: 3000,
    message: msg,
  });
};
