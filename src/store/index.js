import Vuex from "vuex";
import Vue from "vue";
import { accountModules } from "./modules/account.js";
Vue.use(Vuex);
export const store = new Vuex.Store({
    modules: {
        accountModules,
    },
    state: {},
    mutations: {},
    actions: {},
    getters: {},
});
