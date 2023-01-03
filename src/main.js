import './scss/main.scss';//bootstrap
import Vue from "vue";
import App from "./App.vue";
import router from "./router";//路由
import store from "./store";//存token用


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
