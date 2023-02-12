<template>
  <div class="downloadZip">
    <button type="button" class="btn btn-primary btn-fill" @click="downloadZip">下載壓縮檔</button>
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
      console.log("downloadZip",this.guids);
      const method = "POST";
      const url = `/File/DownloadZip`;

      //下載為壓縮檔
      apiPostDownloadZip({
        url,
        method,
        responseType: "blob", //important
        data:{
          guids: this.guids
        }
      }).then(({ data }) => {
        console.log(data);
        const downloadUrl = window.URL.createObjectURL(new Blob([data], { type: 'application/zip' }));
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", this.fileName); //any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    },
  },
  created() {
    //console.log(this.guids);
  },
};
</script>

<style></style>
