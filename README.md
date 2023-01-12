# vue 圖書館後台管理系統

## 專案說明

該專案使用 `vue-cli v2` 版本，是讓使用者上傳書籍及借閱的後台。

## 後台

* 會員登入
* 註冊帳號
* 會員忘記密碼
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
