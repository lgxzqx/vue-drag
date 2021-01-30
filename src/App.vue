<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.ql-editor{
    min-height: 60px !important;
}

.ql-align-center {
	text-align: center
}
.ql-align-right {
	text-align: right
}

.ql-align-justify {
	text-align: justify
}
.ql-font-serif {
	font-family: Georgia,Times New Roman,serif
}
.ql-font-monospace {
	font-family: Monaco,Courier New,monospace
}
.ql-snow .ql-picker.ql-expanded .ql-picker-options{
  right: 0;
}
.el-form-item--small.el-form-item{
  margin-bottom: 10px !important;
}

.list-name-box{
    color: #222222;
    
    .list-title-text{
      font-size: 22px;
      line-height: 1.6;
    }

    .list-desc-text{
      font-size: 16px;
      line-height: 1.4;
      opacity: 0.9;
    }
}
</style>
