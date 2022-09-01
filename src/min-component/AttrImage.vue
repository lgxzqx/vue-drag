<template>
    <div class="bg">
        <el-row>
            <el-radio v-model="canvasStyleData.isBgImage" v-on:change="onChange" label="1">背景颜色</el-radio>
            <el-radio v-model="canvasStyleData.isBgImage" v-on:change="onChange" label="2">背景图片</el-radio>
        </el-row>
        <el-row>
            <el-col :span="24" v-show="canvasStyleData.isBgImage == '1'">
                <el-color-picker v-model="canvasStyleData.bgClor" :show-alpha="true" @active-change="activeChange"></el-color-picker>
            </el-col>
            <el-col :span="24" v-show="canvasStyleData.isBgImage == '2'">
                <el-upload
                    class="avatar-uploader"
                    action="#"
                    :on-change="onUploadChang"
                    :auto-upload="false"
                    :show-file-list="false">
                        <img v-if="canvasStyleData.bgImage" :src="canvasStyleData.bgImage" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import api from '@/api'
    export default {
        props: [ 'canvasStyleData' ],
        data() {
            return {
                
            }
        },
        methods: {
            onChange(val){
            console.log('val', val)
            const color = this.canvasStyleData.bgClor
            const image = this.canvasStyleData.bgImage
            if (val == '2') {
                this.canvasStyleData.bgImage = image
            } else {
                this.canvasStyleData.bgClor = color
            }
            console.log(this.$store)
        },
        activeChange(rgba){
            this.canvasStyleData.bgClor = rgba
        },
        onUploadChang(file){
             const data = {
                name: file.name,
                size: file.size,
                file: file.raw
            }
            api.uploadPic(data).then(res=> {
                const src = `http://${res.data.file}`
                this.canvasStyleData.bgImage = src
            })
        }
        },
    }
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    border: 2px dashed #cccccc;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>