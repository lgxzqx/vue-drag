<template>
    <div class="attr-list">
        <el-form>
            <el-form-item v-for="(item, index) in styleKeys" :key="index" :label="item.name">
                <!-- <el-input v-if="item.type == 'text'" v-model="item.value"></el-input> -->
            
                <div class="editor" v-if="item.type == 'textarea' || item.type == 'text'">
                   <vue-editor :editorToolbar="customToolbar" v-model="item.value"></vue-editor>
                </div>
                <el-upload
                    v-if="item.type == 'image'"
                    class="avatar-uploader"
                    action="#"
                    :on-change="(file)=>onUploadChang(file, index)"
                    :auto-upload="false"
                    :show-file-list="false">
                        <img v-if="item.value" :src="item.value" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div class="list-text-box" v-if="item.type == 'list-text'">
                    <div class="list-item-box" v-for="(val,inde) in item.value" :key="inde">
                        <el-input v-model="val.title"></el-input>
                        <i class="list-text-icon el-icon-remove-outline" @click="delFn(index, inde)"></i>
                        <i class="list-text-icon el-icon-circle-plus-outline" @click="addFn(index, inde)"></i>
                    </div>
                    
                </div>
                
                <div class="list-image-box" v-if="item.type == 'list-image'">
                    <div class="list-item-box" v-for="(val,inde) in item.value" :key="inde">
                        <el-row class="list-image-row">
                            <el-upload
                                class="avatar-uploader"
                                action="#"
                                :on-change="(file)=>onUploadChang(file, index)"
                                :auto-upload="false"
                                :show-file-list="false">
                                    <img v-if="val.src" :src="val.src" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-row>
                        <el-row class="list-image-row">
                            <el-input v-model="val.title"></el-input>
                        </el-row>
                        <el-row class="list-image-row">
                            <el-input type="textarea"  v-model="val.desc"></el-input>
                            <i class="list-text-icon el-icon-remove-outline" @click="delFn(index, inde, item.type)"></i>
                            <i class="list-text-icon el-icon-circle-plus-outline" @click="addFn(index, inde, item.type)"></i>
                        </el-row>
                    </div>
                    
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { toast } from '@/utils/toast'
import { VueEditor } from "vue2-editor"

export default {
    data() {
        return {
            customToolbar: [
                [{ 'header': ['',1,2,3,4] },{ 'font': [] }],
                ['bold', 'italic', 'underline', 'strike', ],
                [{ 'align': [] },{ 'color': [] }, { 'background': [] }], 
            ],
        }
    },
    components: { VueEditor },
    computed: {
        styleKeys() {
            return this.$store.state.curComponent? this.$store.state.curComponent.propValue : []
        },
        curComponent() {
            return this.$store.state.curComponent
        },
        ...mapState([
            'curComponent'
        ]),
    },
    methods: {
        delFn(index, inde){
            const propValue = this.curComponent.propValue[index].value
            if (propValue.length > 1) {
                propValue.splice(inde, 1)
            } else {
                toast('最后一条数据不能删除！')
            }
        },
        addFn(index, inde, type='list-text') {
            let item = {
                title:'请输入内容！'
            }
            if (type == 'list-image') {
                item = {
                    title: '案例图片1',
                    desc: '这是一个图片描述',
                    src: 'http://web.xm12t.cn/lgx/vuedist/title.jpg'
                }
            }
            const proValue = this.curComponent.propValue[index].value
            proValue.splice(inde, 0, item)
        },
        onUploadChang(file, index) {
            const url = URL.createObjectURL(file.raw)
            console.log('object555', this.curComponent.propValue[index].value, url)
            // this.curComponent.propValue[index].value = url
        },
    }
}
</script>

<style lang="scss" scoped>

.list-image-box{
    .list-image-row{ 
        margin-bottom: 6px;
        .avatar-uploader{
            line-height: 0;
        }
        .avatar{ 
            display: block;
        }
    }
    .list-item-box{ display: inline-block;}

}
.editor{
    display: inline-block;
}


.list-text-box{
    display: inline-block;
    width: 100%;
    .list-item-box{
        display: flex;
        flex-wrap: nowrap;
        padding: 4px 0;

        .list-text-icon{
            padding-left: 4px;
            font-size: 20px;
            color: #666;
            line-height: 32px;
            cursor: pointer;
        }

        .list-text-icon:hover{
            color: red;
        }
    }
}
.attr-list {
    overflow: auto;
    padding: 20px;
    padding-top: 0;
    height: 100%;

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        display: block !important;
        text-align: left !important;
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
        border: 2px dashed #999;
    }
    .avatar {
        width: 80px;
        height: 80px;
        display: block;
    }
}


.list-text-icon{
            padding-left: 4px;
            font-size: 20px;
            color: #666;
            line-height: 32px;
            cursor: pointer;
        }

        .list-text-icon:hover{
            color: red;
        }

</style>