<template>
    <router-view></router-view>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";

export default {
    name: "App",
    methods: {
        ...mapActions(["resetAllState"]),
    },
    created() {
        //重新整理後，從localStorage設定回vuex store
        this.resetAllState();
        //axios在header附加token
        if (this.$store.getters.getJwtToken !== null) {
            //this.$axios.defaults.headers.common["Authorization"] = `Bearer ${this.$store.getters.getJwtToken}`;
            axios.defaults.headers.common["Authorization"] = `Bearer ${this.$store.getters.getJwtToken}`;
        }
    },
};
</script>

<style></style>
