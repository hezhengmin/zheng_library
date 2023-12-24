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

export default new Vuex.Store({
    //儲存狀態
    state: {
        //登入成功的token
        jwtToken: "",
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
        },
    },
    // Commit去呼叫Mutations
    actions: {
        fetchAccessToken({ commit }) {
            commit("setJwtToken", localStorage.getItem("jwtToken"));
        },
        fetchAccessAccount({ commit }) {
            commit("setAccountInfo", localStorage.getItem("account"));
        },
        fetchAccessIsLogin({ commit }) {
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
