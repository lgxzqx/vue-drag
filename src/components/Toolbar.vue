<template>
    <div>
        <div class="toolbar">
            <el-row>
                <el-col :span="9">
                    <div class="toolbar-left">
                        海报页设计系统
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="canvas-config">
                        <span>画布大小</span>
                        <input class="canvas-num" v-model="canvasStyleData.width">
                        <span>*</span>
                        <input class="canvas-num" v-model="canvasStyleData.height">
                    </div>
                </el-col>
                <el-col :span="9">
                    <div class="toolbar-right">
                        <el-button @click="drawer = true">选择模板</el-button>
                        <el-button @click="saveTempFn">存成模板</el-button>
                        <el-button @click="preview" >预览</el-button>
                        <el-button @click="save">保存</el-button>
                        <el-button @click="clearCanvas">清空画布</el-button> 
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 模板选择 -->
        <el-drawer
            title="请选择模板"
            :visible.sync="drawer"
            >
            <el-row :gutter="20" style="padding:0 20px;">
                <el-col :span="12" v-for="(item, index) in template" :key="index">
                    <el-card :body-style="{ padding: '0px' }" class="card-box">
                        <img :src="item.src" class="image">
                        <div style="padding: 6px;">
                            <div class="bottom clearfix">
                                <span>{{item.name}}</span>
                                <el-popconfirm
                                    title="确认要替换模板吗？"
                                    @confirm="selectTempFn(item, index)"
                                    >
                                    <el-button slot="reference">选择</el-button>
                                </el-popconfirm>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-drawer>
        
        <!-- 预览 -->
        <preview v-model="isShowPreview" @change="handlePreviewChange"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import preview from '@/components/Editor/Preview'
import { generateID } from '@/utils/generateID'
export default {
    data() {
        return {
            isShowPreview: false,
            drawer: false
        }
    },
    components: { preview },
    computed: mapState([
        'componentData',
        'canvasStyleData',
        'template'
    ]),
    methods: {
        preview() {
            this.isShowPreview = true
            this.$store.commit('setEditMode', 'read')
        },
        handlePreviewChange(){
            this.$store.commit('setEditMode', 'edit')
        },
        save() {
            localStorage.setItem('canvasData', JSON.stringify(this.componentData))
            localStorage.setItem('canvasStyle', JSON.stringify(this.canvasStyleData))
            this.$message.success('保存成功')
        },
        clearCanvas(){
            this.$store.commit('setComponentData', [])
        },
        saveTempFn() {
            this.$store.commit('addTemplate')
        },
        selectTempFn(temp, index){
            console.log(temp, index)
            localStorage.setItem('canvasData', JSON.stringify(temp.canvasData))
            localStorage.setItem('canvasStyle', JSON.stringify(temp.canvasStyle))
            if (localStorage.getItem('canvasData')) {
                this.$store.commit('setComponentData', this.resetID(JSON.parse(localStorage.getItem('canvasData'))))
            }

            if (localStorage.getItem('canvasStyle')) {
                this.$store.commit('setCanvasStyle', JSON.parse(localStorage.getItem('canvasStyle')))
            }
        },
        resetID(data) {
            data.forEach(item => {
                item.id = generateID()
            })

            return data
        }
    },
}
</script>

<style lang="scss" scoped>
.card-box{
    margin-bottom: 20px;

    .image{ width: 100%;}
    .bottom{
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        height: 30px;
        line-height: 30px;
    }
    .button{
        span{
            font-size: 14px;
        }
    }
}
.toolbar {
    height: 64px;
    line-height: 64px;
    background: #fff;
    border-bottom: 1px solid #ddd;
    overflow: hidden;

    .toolbar-left{
        padding-left: 20px;
        font-size: 22px;
        color: #323232;
    }

    .toolbar-right{
        padding-right: 20px;
        text-align: right;
    }

    .canvas-num{
        height: 30px;
        line-height: 30px;
    }

    .canvas-config {
        margin-left: 10px;
        font-size: 14px;
        color: #606266;
        text-align: center;
        input {
            width: 50px;
            margin-left: 10px;
            outline: none;
            padding: 0 5px;
            border: 1px solid #ddd;
            color: #606266;
        }

        span {
            margin-left: 10px;
        }
    }

    .insert {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #FFF;
        border: 1px solid #DCDFE6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        padding: 9px 15px;
        font-size: 12px;
        border-radius: 3px;
        margin-left: 10px;

        &:active {
            color: #3a8ee6;
            border-color: #3a8ee6;
            outline: 0;
        }

        &:hover {
            background-color: #ecf5ff;
            color: #3a8ee6;
        }
    }
}
</style>