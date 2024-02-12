export const accountModules = {
    namespaced: true,
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
        //載入中
        isLoading: false,
    },
    //由Mutations去更改State
    mutations: {
        //token
        setJwtToken(state, token) {
            state.jwtToken = token;
            //localStorage 存 jwtToken
            localStorage.setItem("jwtToken", token);
        },
        setRefreshToken(state, refreshToken) {
            state.refreshToken = refreshToken;
            //localStorage 存 refreshToken
            localStorage.setItem("refreshToken", refreshToken);
        },
        setAccountInfo(state, account) {
            state.accountInfo = account;
            //存User基本資訊
            localStorage.setItem("account", JSON.stringify(account));
        },
        setIsLogin(state, islogin) {
            state.isLogin = islogin;
            //存是否登入
            localStorage.setItem("isLogin", islogin);
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
        },
        //重新整理後，從localStorage設定回vuex store
        resetAllState({ commit, state }) {
            commit("setJwtToken", localStorage.getItem("jwtToken"));
            commit("setRefreshToken", localStorage.getItem("refreshToken"));
            commit("setAccountInfo", JSON.parse(localStorage.getItem("account")));
            commit("setIsLogin", localStorage.getItem("isLogin"));
        },
        //重新設定jwtToken
        updateJwtToken({ commit, state }, accessToken) {
            commit("setJwtToken", accessToken);
        },
        //是否載入
        updateIsLoading({ commit, state }, isLoading) {
            state.isLoading = isLoading;
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
        getRefreshToken(state) {
            return state.refreshToken;
        },
        getIsLoading(state) {
            return state.isLoading;
        },
    },
};
