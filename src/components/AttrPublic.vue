<template>
    <div class="attr-list">
        <el-form>
            <el-form-item label="上下padding">
                <el-input type="number" v-model="canvasStyleData.tbPadding" />
            </el-form-item>
            <el-form-item label="左右padding">
                <el-input type="number" v-model="canvasStyleData.lrPadding" />
            </el-form-item>
            <el-form-item label="画布背景颜色">
                <el-color-picker v-model="canvasStyleData.bgClor" :show-alpha="true" @active-change="activeChange"></el-color-picker>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            fileList:[]
        }
    },
    computed: {
        ...mapState(['canvasStyleData'])
    },
    methods: {
        activeChange(rgba){
            this.canvasStyleData.bgClor = rgba
        },
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