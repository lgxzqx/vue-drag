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
                        <el-button @click="dialogFormVisible = true">另存为模板</el-button>
                        <el-button @click="preview" >预览</el-button>
                        <el-button @click="saveTap">保存模板</el-button>
                        <el-button @click="clearCanvas">清空画布</el-button> 
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 另存为模板 -->
        <el-dialog title="另存为模板" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="模板名称" :label-width="widht">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="预览图" :label-width="widht">
                    <el-upload
                        class="avatar-uploader"
                        action="#"
                        :on-change="(file)=>onUploadChang(file)"
                        :auto-upload="false"
                        :show-file-list="false">
                            <img v-if="form.src" :src="form.src" class="avatar">
                            <i v-else class=" avatar-uploader-icon">
                                <el-button>上传图片</el-button>
                            </i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addTempFn()">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 保存模板 -->
        <el-dialog title="确定覆盖该模板" :visible.sync="saveFormVisible">
            <el-form :model="saveForm">
                <el-form-item label="模板名称" :label-width="widht">
                    <el-input v-model="saveForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="预览图" :label-width="widht">
                    <el-upload
                        class="avatar-uploader"
                        action="#"
                        :on-change="(file)=>onUploadChang1(file)"
                        :auto-upload="false"
                        :show-file-list="false">
                            <img v-if="saveForm.src" :src="saveForm.src" class="avatar">
                            <i v-else class="avatar-uploader-icon">
                                <el-button>上传图片</el-button>
                            </i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="saveFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 模板选择 -->
        <el-drawer
            class="drawer-box"
            title="请选择模板"
            :visible.sync="drawer"
            >
            <el-row :gutter="20" style="padding:0 20px;" class="tplmode-box">
                <el-col :span="12" v-for="(item, index) in template" :key="index">
                    <el-card :body-style="{ padding: '0px' }" class="card-box">
                        <div class="card-img">
                            <img :src="item.src || item.img" class="image">
                        </div>
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
import api from '@/api'

export default {
    data() {
        return {
            isShowPreview: false,
            drawer: false,
            dialogFormVisible: false,
            saveFormVisible: false,
            widht:'80px',
            saveForm: {
                name: '',
                src:''
            },
            form: {
                name: '',
                src:''
            },
        }
    },
    components: { preview },
    computed: mapState([
        'componentData',
        'canvasStyleData',
        'template'
    ]),
    created() {
        const name = localStorage.getItem('name')
        const img = localStorage.getItem('img')
        this.saveForm = {
            name,
            src: img
        }
    },
    methods: {
        saveTap(){
            this.saveFormVisible = true
            const name = localStorage.getItem('name')
            const img = localStorage.getItem('img')
            this.saveForm = {
                name,
                src: img
            }
        },
        onUploadChang:function(file) {
            const data = {
                name: file.name,
                size: file.size,
                file: file.raw
            }
            api.uploadPic(data).then(res=> {
                this.form.src = `https://${res.data.file}`
            })
        },
        onUploadChang1:function(file) {
            const data = {
                name: file.name,
                size: file.size,
                file: file.raw
            }
            api.uploadPic(data).then(res=> {
                this.saveForm.src = `https://${res.data.file}`
            })
        },
        preview() {
            this.isShowPreview = true
            this.$store.commit('setEditMode', 'read')
        },
        handlePreviewChange(){
            this.$store.commit('setEditMode', 'edit')
        },
        save() {
            const id = localStorage.getItem('id')
            const name = this.saveForm.name
            const img = this.saveForm.src
            const canvasStyle = JSON.stringify(this.canvasStyleData)
            const canvasData = JSON.stringify(this.componentData)
            api.saveCannva(id, name, canvasData, canvasStyle, img).then(res=>{
                // id, name, canvasData, canvasStyle
                console.log('object', res)
                localStorage.setItem('name', name)
                localStorage.setItem('img', img)
                this.$message.success('保存成功')
                this.saveFormVisible = false
                this.getList()
            })
            
        },
        getList(){
            api.getCannvas().then(res=> {
                const data = res.data.data
                this.$store.commit('setTemplate', data)
            })
        },
        clearCanvas(){
            this.$store.commit('setComponentData', [])
        },
        addTempFn() {
            const name = this.form.name
            const img = this.form.src
            if(!name) {
                this.$message.warning('模板名称不能为空！')
                return false
            }
            if(!img) {
                this.$message.warning('模板预览图不能为空！')
                return false
            }
            const canvasData = JSON.stringify(this.componentData)
            const canvasStyle = JSON.stringify(this.canvasStyleData)
            api.addCannvas(name,canvasData,canvasStyle, img).then(res=>{
                this.$message.success('保存成功')
                const item = {
                    canvasData,
                    canvasStyle,
                    img,
                    name,
                    id: res.data.data
                }
                localStorage.setItem('id', res.data.data)
                localStorage.setItem('name', name)
                localStorage.setItem('img', img)
                this.$store.commit('addTemplate', item)
            })
            this.dialogFormVisible = false
        },
        selectTempFn(temp, index){
            localStorage.setItem('id', temp.id)
            localStorage.setItem('name', temp.name)
            localStorage.setItem('img', temp.img)
            localStorage.setItem('canvasData', temp.canvasData)
            localStorage.setItem('canvasStyle', temp.canvasStyle)
            if (localStorage.getItem('canvasData')) {
                const canvasData = localStorage.getItem('canvasData')
                this.$store.commit('setComponentData', this.resetID(JSON.parse(canvasData)))
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

.tplmode-box{
    overflow-y: auto;
    height: calc(100% - 100px);
}
.card-box{
    margin-bottom: 20px;
    .card-img{height: 120px; overflow: hidden;}
    .image{ width: 100%; max-height: 10000px;}
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