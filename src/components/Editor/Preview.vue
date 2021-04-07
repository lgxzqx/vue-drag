<template>
    <div class="bg" v-if="show">
        <el-button @click="close" class="close">关闭</el-button>
        <el-button @click="saveHtml"  class="close getCssHTML">导出HTML</el-button>
        <el-button @click="saveImage('html2canvas', 'pic')"  class="close close1">下载图片</el-button>
        <!-- <el-button @click="export2Excel"  class="close getHTML">下载HTML</el-button> -->
        <el-button @click="share"  class="close getHTML">分享模板</el-button>
        <div class="canvas-container" ref="test">
            <div class="canvas" id="html2canvas" ref="html2canvas" :style="getBgStyle">
                <component v-for="(item, index) in componentData"
                    class="component"
                    :is="item.component"
                    :key ="index"
                    :propValue="item.propValue"
                    :propStyles="item.style"
                ></component>
            </div>
        </div>
        <el-dialog
            title="分享"
            :visible.sync="dialogVisible"
            :modal="isModal"
            width="35%">
            <div>{{message}}</div>
            <div>{{tip}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doCopy();dialogVisible = false">复制</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import html2canvas from 'html2canvas'
    import {htmlCss} from '@/styles/download'
    import api from '@/api'

    export default {
        model: {
            prop: 'show',
            event: 'change',
        },
        props:{
            show: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                output: '',
                dialogVisible: false,
                isModal: false,
                message: '',
                tip:''
            }
        },
        computed: {
            ...mapState([
                'componentData',  
                'canvasStyleData',
            ]),
            getBgStyle() {
                const style = this.canvasStyleData
                let value = ''
                if (style.width) {
                    value += 'width:'+ style.width + 'px;'
                } 
                if (style.height) {
                    value += 'minHeight:'+ style.height + 'px;'
                } 
                if (style.bgClor && style.isBgImage == '1') {
                    value += 'backgroundColor:'+ style.bgClor + ';'
                } 
                if (style.tbPadding) {
                    value += 'paddingTop:'+ style.tbPadding + 'px;'
                    value += 'paddingBottom:'+ style.tbPadding + 'px;'
                } 
                if (style.lrPadding) {
                    value += 'paddingLeft:'+ style.lrPadding + 'px;'
                    value += 'paddingRight:'+ style.lrPadding + 'px;'
                } 
                if (style.bgImage && style.isBgImage == '2') {
                    value += 'backgroundImage:url('+ style.bgImage + ');'
                }
                return value
            }
        },
        methods: {
            share(){
                this.dialogVisible = true
                const id = localStorage.getItem('id');
                this.tip = '复制链接分享给对方，用电脑端浏览器打开链接。'
                this.message = 'https://www.dn160.com/member/canvas.php?id='
                if (!id || id=='undefined') {
                    this.tip = '另存为模板或者重新选择模板，再分享吧！'
                    this.message = ''
                    return false
                }
                this.dataProcessing(id)
            },
            dataProcessing (val) {
                this.message = this.message + val
            },
            doCopy: function (val) {
                const input = document.createElement("input");   // 直接构建input
                input.value = this.message;  // 设置内容
                document.body.appendChild(input);    // 添加临时实例
                input.select();   // 选择实例内容
                document.execCommand("Copy");   // 执行复制
                document.body.removeChild(input);
                this.$message({
                    message: '复制成功，去分享吧！',
                    type: 'success'
                });
            },
            async saveHtml(){
                const html = this.getCssTtml() 
                const oEditor = window.opener.FCKeditorAPI.GetInstance("content")
                      oEditor.SetHTML(html)
                const url = await this.saveImage('html2canvas', 'pic', true)
                console.log('url', url)
                window.opener.document.querySelector('.outside').value = url
                this.$message.success('导出成功！')
            },
            getCssTtml(){
                const template = this.$refs.test.innerHTML
                let html = `
                <div class="resume_preview_page">
                    ${template}
                </div>
                `
                return html

            },
            export2Excel() {
                var a = document.createElement("a");
                var url = window.URL.createObjectURL(
                new Blob([this.gethtml()], {
                    type: ''
                })
                );
                a.href = url;
                a.download = "file.html";
                a.click();
                window.URL.revokeObjectURL(url);
            },
            gethtml(){
                const template = this.$refs.test.innerHTML;
                let html = `<!DOCTYPE html>
                <html>
                <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1.0">
                <title>html页面</title>
                <style>
                ${htmlCss}
                </style>
                </head>
                <body>
                <div class="resume_preview_page" style="margin:0 auto;width:1200px">
                ${template}
                </div>
                </body>
                </html>`;
                return html;
            },
            close() {
                 this.$emit('change', false)
            },
            async saveImage(divText, imgText, isTrue = false) {
                let canvasID = this.$refs[divText];
                let that = this;
                let a = document.createElement('a');
                return await html2canvas(canvasID, {
                    scale: 1,
                    // allowTaint: true,
                    proxy:'https://dn160.cdn.bcebos.com',
                    useCORS: true,
                    height: document.getElementById('html2canvas').scrollHeight,
                    windowHeight: document.getElementById('html2canvas').scrollHeight
                }).then(async(canvas) => {
                    let dom = document.body.appendChild(canvas);
                    
                    dom.style.display = 'none';
                    a.style.display = 'none';
                    document.body.removeChild(dom);

                    // let blob = that.dataURLtoBlob(dom.toDataURL('image/png'));
                    var file = that.dataURLtoFile(dom.toDataURL('image/jpg'), 'imgName.jpg');
                    if(!isTrue){
                        a.setAttribute('href', URL.createObjectURL(file));
                        //这块是保存图片操作  可以设置保存的图片的信息
                        a.setAttribute('download', imgText + '.jpg');
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }

                    const data = {
                        name: file.name,
                        size: file.size,
                        file: file
                    }
                    return await api.uploadPic(data).then(res=> {
                        return `${res.data.hbfile}`
                    })
                    
                });
            },

            dataURLtoFile: function(dataurl, filename) { 
                var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, { type: mime });
            },

            dataURLtoBlob: function(dataurl) { 
                var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], { type: mime });
            },

            blobToFile: function(theBlob, fileName){
                theBlob.lastModifiedDate = new Date();
                theBlob.name = fileName;
                return theBlob;
            },

        }
    }
</script>

<style lang="scss" scoped>
.bg {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
    background: rgb(0, 0, 0, .5);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    padding: 20px;

    .component{
        overflow: hidden;
    }

    .canvas-container {
        width: calc(100% - 40px);
        height: calc(100% - 120px);
        overflow: auto;
        .canvas {
            background: #fff;
            position: relative;
            margin: 0 auto;
        }
    }
    .close {
        position: absolute;
        right: 20px;
        top: 20px;
    }

    .close1{
        right: 100px;
    }

    .getHTML{ right: 210px;}

    .getCssHTML{
        right: 330px;
    }

}
</style>