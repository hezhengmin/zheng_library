<template>
  <div class="downloadZip">
    <button type="button" class="btn btn-primary btn-fill" @click="downloadZip">
      下載壓縮檔
    </button>
  </div>
</template>

<script>
import { apiPostDownloadZip } from "api";
export default {
  name: "DownloadZip",
  props: {
    guids: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    downloadZip() {
      const method = "POST";
      const url = `/File/DownloadZip`;

      //下載為壓縮檔
      apiPostDownloadZip({
        url,
        method,
        responseType: "blob", //important
        data: {
          guids: this.guids,
        },
      })
        .then((res) => {
          console.log(res);
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          //從header取得 '檔案名稱'
          const fileName = decodeURI(
            res.headers["content-disposition"]
              .split(" ")[2]
              .replace("filename*=UTF-8''", "")
          );
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          link.remove();
        })
        .catch((error) => {
          if (error.response) {
            alert(error.response.data);
          } else {
            alert(error.message);
          }
        });
    },
  },
  created() {
    //console.log(this.guids);
  },
};
</script>

<style></style>
