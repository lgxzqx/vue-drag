<template>
    <div class="attr-list">
        <el-form>
            <el-row  v-for="(item, index) in styleKeys" :key="index">
                <el-form-item v-if="item.type == 'isBgImage'" :label="item.name">
                    <AttrBgImage class="bgimage" :canvasStyleDatas="styleKeys"></AttrBgImage>
                </el-form-item>
                <el-form-item class="input-tiem-box" v-if="item.type == 'bgclor'" :label="item.name">
                   <el-color-picker class="input-tiem-box" v-model="item.value" show-alpha @active-change="(rgba)=>activeChange(rgba, index)"></el-color-picker>
                </el-form-item>
                <el-form-item v-else-if="item.type == 'image'" :label="item.name">
                    <el-row >
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            action=""
                            :file-list="fileList"
                            :limit="1"
                            :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
                        </el-upload>
                    </el-row>
                </el-form-item>
                    <!-- list type -->
                <el-form-item  class="input-tiem-box" v-else-if="item.type == 'select'" :label="item.name">
                    <el-col >
                        <AttrSelect  :values="curComponent.style[index]" :options="curComponent.style[index].options"></AttrSelect>
                    </el-col>
                </el-form-item>
                <el-form-item class="input-tiem-box" v-else-if="item.key == 'column'" :label="item.name">
                    <el-input type="number"  :change="(e)=>columnFn(e, index)" :min="1" :max="4" v-model="curComponent.style[index].value" />
                </el-form-item>
                <el-form-item class="input-tiem-box" v-else-if="item.type == 'number'" :label="item.name">
                    <el-input type="number"  v-model="curComponent.style[index].value"/>
                </el-form-item>
                <el-form-item class="input-tiem-box" v-else-if="item.type == 'float'" :label="item.name">
                    <el-input type="number"  v-model="curComponent.style[index].value"  step="0.01"/>
                </el-form-item>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import AttrSelect from '@/min-component/AttrSelect'
import AttrBgImage from '@/min-component/AttrBgImage'
export default {
    components: { AttrSelect, AttrBgImage },
    data() {
        return {
            fileList:[],
            style: ''
        }
    },
    computed: {
        styleKeys() {
            return this.$store.state.curComponent? this.$store.state.curComponent.style : []
        },
        curComponent() {
            return this.$store.state.curComponent
        },
    },
    methods: {
        columnFn(e, index) {
            console.log(e, index)
        },
        activeChange(rgba, index){
            this.curComponent.style[index].value = rgba
        }
    }
}
</script>

<style lang="scss" scoped>
.attr-list {
    padding: 20px;
    padding-top: 0;
    height: 100%;
}
.bgimage{
    display: inline-block;
}
.input-tiem-box{
    display: inline-block;
    width: 100%;
}
</style>