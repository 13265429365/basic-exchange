import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import { InitStore } from 'src/stores/init';

import messages from 'src/i18n';

// 解析配置语言
const parsePrefetchLocales = (locales: any, lang: string): any => {
  const messages = {} as any;
  messages[lang] = {} as any;
  for (let i = 0; i < locales.length; i++) {
    messages[lang][locales[i].label] = locales[i].value;
  }
  return messages;
};

// 设置当前语言
export const setLanguageFunc = (i18n: any, locales: any, lang: string) => {
  const messagesList = parsePrefetchLocales(locales, lang);
  i18n.setLocaleMessage(lang, messagesList[lang]);
  i18n.locale.value = lang;
};

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: InitStore().userLang ? InitStore().userLang : 'ch-CN',
    globalInjection: true,
    messages,
    legacy: false,
  });

  // Set i18n instance on app
  app.use(i18n);
});
