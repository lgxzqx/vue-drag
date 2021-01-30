<template>
    <div class="bg" v-if="show">
        <el-button @click="close" class="close">关闭</el-button>
        <el-button @click="saveImage('html2canvas', 'pic')"  class="close close1">下载图片</el-button>
        <div class="canvas-container" >
            <div class="canvas" id="html2canvas" ref="html2canvas" :style="{ width: canvasStyleData.width + 'px', minHeight: canvasStyleData.height + 'px', backgroundColor: canvasStyleData.bgClor, paddingTop: canvasStyleData.tbPadding + 'px', paddingBottom: canvasStyleData.tbPadding + 'px', paddingLeft: canvasStyleData.lrPadding + 'px', paddingRight: canvasStyleData.lrPadding + 'px'  }">
                <component v-for="(item, index) in componentData"
                    class="component"
                    :is="item.component"
                    :key ="index"
                    :propValue="item.propValue"
                    :propStyles="item.style"
                ></component>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import html2canvas from 'html2canvas'

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
                output: ''
            }
        },
        computed: mapState([
            'componentData',  
            'canvasStyleData',
        ]),
        methods: {
            close() {
                 this.$emit('change', false)
            },
            saveImage(divText, imgText) {
                console.log('object:', this.$refs)
                let canvasID = this.$refs[divText];
                let that = this;
                let a = document.createElement('a');
                html2canvas(canvasID, {
                    proxy: 'http://web.xm12t.cn/lgx/vuedist/',
                    scale: 1,
                    height: document.getElementById('html2canvas').scrollHeight,
                    windowHeight: document.getElementById('html2canvas').scrollHeight
                }).then(canvas => {
                    let dom = document.body.appendChild(canvas);
                    dom.style.display = 'none';
                    a.style.display = 'none';
                    document.body.removeChild(dom);
                    let blob = that.dataURLToBlob(dom.toDataURL('image/png'));
                    a.setAttribute('href', URL.createObjectURL(blob));
                    //这块是保存图片操作  可以设置保存的图片的信息
                    a.setAttribute('download', imgText + '.png');
                    document.body.appendChild(a);
                    a.click();
                    URL.revokeObjectURL(blob);
                    document.body.removeChild(a);
                });
            },
            dataURLToBlob(dataurl) {
                let arr = dataurl.split(',');
                let mime = arr[0].match(/:(.*?);/)[1];
                let bstr = atob(arr[1]);
                let n = bstr.length;
                let u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], { type: mime });
            }
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
}
</style>