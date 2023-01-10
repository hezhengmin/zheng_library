import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Layout from "../views/Layout.vue";
import SignUp from "../views/SignUp.vue";
import AccountEdit from "../views/Account/AccountEdit.vue";
import BookIndex from "../views/Book/BookIndex.vue";
import BookImport from "../views/Book/BookImport.vue";
import BookEdit from "../views/Book/BookEdit.vue";
import LoanIndex from "../views/Loan/LoanIndex.vue";
import LoanEdit from "../views/Loan/LoanEdit.vue";

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
    redirect: "/Home/Index",
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
      {
        //帳號編輯(更改信箱、密碼)
        path: "/Account/Account_Edit/:id",
        name: "AccountEdit",
        component: AccountEdit,
      },
      {
        //書籍列表
        path: "/Book/Book_Index",
        name: "BookIndex",
        component: BookIndex,
      },
      {
        //書籍匯入列表
        path: "/Book/Book_Import",
        name: "BookImport",
        component: BookImport,
      },
      {
        //書籍編輯
        path: "/Book/Book_Edit/:id",
        name: "BookEdit",
        component: BookEdit,
      },
      {
        //借閱列表
        path: "/Loan/Loan_Index",
        name: "LoanIndex",
        component: LoanIndex,
      },
      {
        //借閱編輯
        path: "/Loan/Loan_Edit/:id",
        name: "LoanEdit",
        component: LoanEdit,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

//導航守衛
router.beforeEach((to, from, next) => {
  //不用驗證的頁面
  const publicPages = ['/', '/Home/SignUp', '/Home/ForgetPassword'];
  //頁面是否要驗證
  const authRequired = !publicPages.includes(to.path);
  //登入是不是成功
  const loggedIn = localStorage.getItem('isLogin');

  if (authRequired && (loggedIn === null || loggedIn==='false')) {
      next('/');
  }
  else
  {
      next();
  }
})

export default router;
