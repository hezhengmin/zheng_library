/*
 * @Author: hezhengmin zhengmin099@gmail.com
 * @Date: 2023-12-24 00:12:53
 * @LastEditors: hezhengmin zhengmin099@gmail.com
 * @LastEditTime: 2023-12-24 11:53:25
 * @FilePath: \zheng_library\src\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    //儲存狀態
    state: {
        //登入成功的token
        jwtToken: "",
        //自動重新驗證使用者並產生新的 JWT token
        refreshToken: "",
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
        setRefreshToken(state, refreshToken) {
            state.refreshToken = refreshToken;
        },
        setAccountInfo(state, account) {
            state.accountInfo = account;
        },
        setIsLogin(state, islogin) {
            state.isLogin = islogin;
        },
    },
    // Commit去呼叫Mutations
    actions: {
        //登入後，設定store
        fetchAccessAccountInfo({ commit, state }, accountInfo) {
            commit("setJwtToken", accountInfo.jwtToken);
            commit("setRefreshToken", accountInfo.refreshToken);
            commit("setAccountInfo", accountInfo.account);
            commit("setIsLogin", accountInfo.success);
            //localStorage 存 jwtToken
            localStorage.setItem("jwtToken", accountInfo.jwtToken);
            //localStorage 存 refreshToken
            localStorage.setItem("refreshToken", accountInfo.refreshToken);
            //存User基本資訊
            localStorage.setItem("account", JSON.stringify(accountInfo.account));
            //存是否登入
            localStorage.setItem("isLogin", accountInfo.success);
        },
        //重新整理後，從localStorage設定回vuex store
        resetAllState({ commit, state }) {
            commit("setJwtToken", localStorage.getItem("jwtToken"));
            commit("setAccountInfo", JSON.parse(localStorage.getItem("account")));
            commit("setIsLogin", localStorage.getItem("isLogin"));
        },
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
        },
    },
});
