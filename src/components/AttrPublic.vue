<template>
    <div class="attr-list" v-if="canvasStyleData">
        <el-form>
            <el-form-item label="上下padding">
                <el-input type="number" v-model="canvasStyleData.tbPadding" />
            </el-form-item>
            <el-form-item label="左右padding">
                <el-input type="number" v-model="canvasStyleData.lrPadding" />
            </el-form-item>
            <el-form-item label="画布背景样式">
               <AttrImage :canvasStyleData="canvasStyleData"></AttrImage>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapState } from "vuex";
import AttrImage from '@/min-component/AttrImage'
export default {
    components: { AttrImage },
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState(['canvasStyleData'])
    },

    methods: {
        
    }
    
}
</script>

<style lang="scss" scoped>
.attr-list {
    padding: 20px;
    padding-top: 0;
    height: 100%;

    .bg{
        display: inline-block;
        
    }
}

</style>