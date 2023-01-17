# vue 圖書館後台管理系統

> [影片DEMO](https://www.youtube.com/watch?v=8MDoYdIHYBQ)

## 專案說明

該專案使用 `vue-cli v2` 版本，是讓使用者上傳書籍及借閱的後台。

## 後台

* 會員登入
  * 註冊帳號
  * 忘記密碼
* 書籍列表管理
  * 新增、刪除、修改、匯出、匯入
* 書籍借閱
  * 新增、刪除、修改、匯出
* 帳號編輯
  * 信箱編輯
  * 更改密碼

## 結構說明

### src

主要用到的檔案都在 `src` 這個資料夾中

`src/main.js` 是入口文件 裡面處理各種插件的配置

`src/router/index.js` 專門處理所有路由元件的檔案

`src/mixin/index.js` 專門處理所有混入方法檔案，方便給其他頁面共用或覆寫

`src/store/index.js` 專門提供網站儲存狀態vuex的檔案

`src/api/index.js` 專門管理全部的 api 方法

`src/App.vue` 是整個 vue 實例

`src/scss` 資料夾存放需要用到的樣式

`src/components` 資料夾存放共用的元件

`src/views` 資料夾存放頁面

## 應用代碼詳解

### 1. Vue Router 設定路由

在每一個路由進入之前，都會經過 `router.beforeEach` ，判斷是否有身分驗證過才能進入內容頁，否則回到登入頁面需重新登入帳密。

```js

//導航守衛
router.beforeEach((to, from, next) => {
  //不用驗證的頁面
  const publicPages = ['/', '/SignUp', '/ForgetPassword'];
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

```

### 2. Vuex 儲存狀態機制
因後端 `asp.net core` 的 api，認證方式是使用 jwt token，用來保存 token  中資料狀態，供呼叫 api 時附上在 header 身上驗證。 
```js
export default new Vuex.Store({
    //儲存狀態
    state: {
        //登入成功的token
        jwtToken: '',
        //使用者基本資訊
        accountInfo: {},
        //登入是否成功
        isLogin: false,
    },
    //由Mutations去更改State
    mutations: {
        //token 
        setJwtToken(state, token) {
            state.jwtToken = token;
        },
        setAccountInfo(state, account) {
            state.accountInfo = JSON.parse(account);
        },
        setIsLogin(state, islogin) {
            state.isLogin = islogin;
        }
    },
    // Commit去呼叫Mutations
    actions: {
        fetchAccessToken({ commit }) {
            commit('setJwtToken', localStorage.getItem('jwtToken'));
        },
        fetchAccessAccount({ commit }) {
            commit('setAccountInfo', localStorage.getItem('account'));
        },
        fetchAccessIsLogin({ commit }) {
            commit('setIsLogin', localStorage.getItem('isLogin'));
        }
    },
    getters: {
        getJwtToken(state) {
            return state.jwtToken;
        },
        getIsLogin(state) {
            return state.isLogin;
        },
        //帳號Id
        getUserId(state) {
            return state.accountInfo?.userId;
        }
    }
})
```