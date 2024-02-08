<template>
    <div class="login container">
        <form @submit.prevent="login" class="mt-5 p-3 rounded border border-secondary">
            <h2 class="mx-auto">會員登入</h2>
            <div class="mb-2">
                <div class="d-flex">
                    <label class="form-label fs-5">帳號</label>
                    <input type="text" v-model="userId" class="form-control" required />
                </div>
            </div>
            <div class="mb-2">
                <div class="d-flex">
                    <label class="form-label fs-5">密碼</label>
                    <input type="password" v-model="password" class="form-control" required />
                </div>
            </div>
            <div class="mb-2">
                <div class="d-flex">
                    <label class="form-label fs-5">驗證碼</label>
                    <input type="text" v-model="validateCode" class="form-control" required />
                    <img :src="imageValidateCode" class="border border-2" alt="驗證碼圖片" />
                    <a href="" v-on:click.prevent="refreshValidateCode()">重刷</a>
                </div>
            </div>

            <div class="mb-2">
                <div class="d-flex">
                    <button type="submit" class="btn btn-primary me-2 btn-fill">登入</button>
                    <router-link to="/SignUp" tag="button" class="btn btn-primary btn-fill">註冊帳號</router-link>
                    <router-link to="/ForgetPassword" class="link-danger ms-auto align-self-center">
                        忘記密碼
                    </router-link>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import AccountService from "../api/service/account-service";
import ValidateCodeService from "../api/service/validateCode-service";

let accountService = null;
let validateCodeService = null;
export default {
    name: "Login",
    data() {
        return {
            userId: "",
            password: "",
            validateCode: "", //輸入的驗證碼
            validateCodeHash: "", //驗證碼雜湊
            imageValidateCode: "",
        };
    },
    methods: {
        //刷新驗證碼
        refreshValidateCode() {
            this.initValidateCode();
        },
        login() {
            accountService
                .login({
                    userId: this.userId,
                    password: this.password,
                    validateCode: this.validateCode,
                    validateCodeHash: this.validateCodeHash,
                })
                .then(({ data }) => {
                    if (data.success) {
                        alert(data.message);
                        //登入後，設定store
                        this.$store.dispatch("fetchAccessAccountInfo", data);
                        //登入後回主頁
                        this.$router.push({ name: "Login" });
                    } else {
                        alert(data.errors.join("、"));
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        //初始化驗證碼
        initValidateCode() {
            return new Promise((resolve, reject) => {
                validateCodeService
                    .getValidateCode()
                    .then((response) => {
                        this.imageValidateCode = response.data.base64;
                        this.validateCodeHash = response.data.hash;
                        resolve(response);
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            });
        },

        initAccount() {
            return new Promise((resolve, reject) => {
                this.userId = "admin";
                this.password = "admin";
                this.validateCode = "000000"; //輸入的驗證碼
                this.validateCodeHash = "670B14728AD9902AECBA32E22FA4F6BD"; //驗證碼雜湊
                resolve();
            });
        },
    },
    async mounted() {
        accountService = new AccountService();
        validateCodeService = new ValidateCodeService();

        await this.initValidateCode();
        await this.initAccount();
    },
};
</script>

<style lang="scss" scoped>
.login {
    display: flex;
    /* 水平置中 */
    justify-content: center;
    /* 垂直置中 */
    align-content: center;
    flex-wrap: wrap;

    .form-label {
        min-width: 100px;
    }

    form {
        width: 400px;
    }

    h2 {
        width: 140px;
    }
}
</style>
