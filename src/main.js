import Vue from 'vue'
import App from './App'
import router from './router'
//ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//設置語言
import lang from 'element-ui/lib/locale/lang/zh-TW';
import locale from 'element-ui/lib/locale';

Vue.config.productionTip = false
//element ui
Vue.use(ElementUI);
//lang
locale.use(lang)


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
