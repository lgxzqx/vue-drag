<template>
    <div class="attr-list">
        <el-form>
            <el-form-item v-for="(item, index) in styleKeys" :key="index" :label="item.name">
                <el-color-picker v-if="item.type == 'backgroundColor'" v-model="curComponent.style[index].value" :show-alpha="true" @active-change="(rgba) => activeChange(rgba, index)"></el-color-picker>
                <el-row v-else-if="item.type == 'image'">
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
                <!-- list type -->
                <el-col v-else-if="item.type == 'style-type'">
                    <AttrSelect :values="curComponent.style[index]" :options="options"></AttrSelect>
                </el-col>
                <!-- text align -->
                <el-col v-else-if="item.type == 'text-align'">
                    <AttrSelect :values="curComponent.style[index]" :options="alignOption"></AttrSelect>
                </el-col>
                 <el-input type="number" v-else-if="item.key == 'column'" :change="(e)=>columnFn(e, index)" :min="1" :max="4" v-model="curComponent.style[index].value" />
                <el-input type="number" v-else v-model="curComponent.style[index].value" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import AttrSelect from '@/min-component/AttrSelect'
export default {
    components: { AttrSelect },
    data() {
        return {
            fileList:[],
            alignOption: [{
                value: 'left',
                label: 'left'
            },{
                value: 'center',
                label: 'center'
            },{
                value: 'right',
                label: 'right'
            },],
            options:[{
                value: 'none',
                label: 'none'
            },{
                value: 'circle',
                label: 'circle'
            },{
                value: 'square',
                label: 'square'
            },{
                value: 'disc',
                label: 'disc'
            },{
                value: 'decimal',
                label: 'decimal'
            },{
                value: 'decimal-leading-zero',
                label: 'decimal-leading-zero'
            },{
                value: 'lower-latin',
                label: 'lower-latin'
            },{
                value: 'upper-latin',
                label: 'upper-latin'
            }]
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
        },
        getSelectValue(value, index){
            console.log(value, index)
            // this.curComponent.style[index].value = value
        }
    },
}
</script>

<style lang="scss" scoped>
.attr-list {
    overflow: auto;
    padding: 20px;
    padding-top: 0;
    height: 100%;
}
</style>