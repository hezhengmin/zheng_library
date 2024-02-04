<template>
    <div class="wrapper">
        <div class="sidebar">
            <!-- Sidebar -->
            <Sidebar />
            <!-- End Sidebar -->
        </div>
        <div class="main-panel">
            <!-- 導覽頁 start -->
            <Navigation />
            <!-- 導覽頁 end -->
            <div class="content">
                <loading
                    background-color="#fff"
                    loader="spinner"
                    :active.sync="isLoading"
                    :can-cancel="true"
                    :is-full-page="true" />
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import Navigation from "../../src/components/Navigation.vue";
import Sidebar from "../../src/components/Sidebar.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
    name: "Layout",
    components: {
        Navigation,
        Sidebar,
        Loading,
    },
    computed: {
        isLoading() {
            return this.$store.getters.getIsLoading;
        },
    },
};
</script>

<style lang="scss" scoped></style>
