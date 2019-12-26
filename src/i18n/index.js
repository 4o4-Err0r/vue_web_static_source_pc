import Vue from 'vue';
//引入il8n
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
import messages from './zh';
// let messages={zh:{message: {
//     hello: '好好学习，天天向上！'
//   }
// }
// }

const i18n = new VueI18n({
    locale: 'zh', // 语言标识
    messages
});
export default i18n