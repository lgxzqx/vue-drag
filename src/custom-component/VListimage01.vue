<template>
    <div class="list-box" :style="getStyle">
        <div class="list-name-box">
            <div class="list-title-text" v-html="propValues.name.value"></div>
            <div class="list-desc-text" v-html="propValues.describe.value"></div>
        </div>
        <el-row :gutter="20" class="list-item-box">
            <el-col :span="24/propStyle.column.value" class="list-tiem" v-for="(item, index) in propValues.list.value" :key="index">
                <div class="list-item-image">
                    <img :src="item.src" alt="item.title">
                </div>
                <div class="list-item-text" :style="getTextAlign">
                    <p class="list-item-title">{{item.title}}</p>
                    <p class="list-item-desc">{{item.desc}}</p>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    
    import { transformProp, transformStyle } from "@/utils/utils";
    export default {
        props: [ 'propStyles' , 'propValue'],
        computed: {
            getTextAlign(){
                const data = this.propStyle.textalign
                return data ? `text-align:${data.value}` : '' 
            },
            propValues() {
                return transformProp(this.propValue)
            },
            propStyle(){
                return transformProp(this.propStyles)
            },
            getStyle() {
                return transformStyle(this.propStyles)
            }
        },
        methods: {},
    }
</script>

<style lang="scss" scoped>
.list-item-box{
    margin-top: 20px;
    .list-tiem{
        margin-bottom: 20px;
    }
    .list-item-image{ 
        width: 100%;

        img{
            width: 100%;
            display: block;
        }
    }
    .list-item-text{
        padding: 6px;
        background-color: #f4f4f4;

        .list-item-title{ 
            font-size: 16px;
            color: #222222;
        }
        .list-item-desc{
            font-size: 14px;
            color: #666666;
        }
    }
}
    
    





</style>