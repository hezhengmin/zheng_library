/*
 * @Author: hezhengmin zhengmin099@gmail.com
 * @Date: 2023-12-23 15:17:12
 * @LastEditors: hezhengmin zhengmin099@gmail.com
 * @LastEditTime: 2023-12-24 01:28:27
 * @FilePath: \zheng_library\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    configureWebpack: {
        resolve: {
            alias: {
                api: path.resolve("src/api/index.js"),
                mixin: path.resolve("src/mixin/index.js"),
            },
        },
    },
    devServer: {
        proxy: {
            "/api/": {
                target: "https://localhost:44323/api/", //請求跨域的目標url
                secure: false,
                changeOrigin: true,
                pathRewrite: { "^/api/": "" },
                ws: true,
            },
        },
    },
});
