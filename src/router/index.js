import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Layout from "../views/Layout.vue";
import SignUp from "../views/SignUp.vue";

Vue.use(VueRouter);

const routes = [
  {
    //登入頁面
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    //註冊帳號
    path: "/SignUp",
    component: SignUp,
  },
  {
    //忘記密碼頁面
    path: "/ForgetPassword",
    component: () => import("../views/ForgetPassword.vue"),
  },
  {
    //無效網址，都導向首頁
    path: "*",
    redirect: "/",
  },
  {
    //首頁
    path: "/Home",
    component: Layout,
    redirect: "/Home/Index",
    children: [
      {
        //首頁，無/接續父層路徑，/Home/Index
        path: "Index",
        name: "Index",
        component: () => import("../views/Index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
