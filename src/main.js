import './scss/main.scss';//bootstrap
import Vue from "vue";
import App from "./App.vue";
import router from "./router";//路由
import store from "./store";//存token用
import Paginate from 'vuejs-paginate'//分頁
import VeeValidate from 'vee-validate';//驗證
import zhTW from 'vee-validate/dist/locale/zh_TW';
import VueI18n from 'vue-i18n';
import Select2 from 'v-select2-component';//下拉選單
import DatePicker from 'vue2-datepicker';//日期選擇器
import 'vue2-datepicker/index.css';

Vue.component('paginate', Paginate) //分頁
Vue.use(VueI18n);

Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);

Vue.component('Select2', Select2);//下拉選單
Vue.component('DatePicker', DatePicker);//日期選擇器

const i18n = new VueI18n({
    locale: 'zhTW',
});

Vue.use(VeeValidate, {
    events: 'input|blur',
    i18n,
    dictionary: {
        zhTW,
    },
});

new Vue({
  router,
  store,
  i18n, //中文化
  render: (h) => h(App),
}).$mount("#app");
