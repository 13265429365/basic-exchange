import { Notify } from 'quasar';
import { Dialog } from 'quasar'
export const ConfirmPrompt = (title: any, message: any, actions: any) => {
  Dialog.create({
    title: title,
    message: message,
    ok: {
      push: true
    },
    cancel: {
      push: true,
      color: 'negative'
    },
  }).onOk(() => {
    actions()
  })
}

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

