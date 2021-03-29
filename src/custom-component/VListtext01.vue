<template>
    <div class="list01-box" :style="getStyle">
            <div class="list01-name-box" >
                <div class="list-title-text" v-html="propValues.name.value"></div>
            </div>

        <el-row  class="list01-item-box">
            <el-col :span="24/propStyle.column.value" class="list01-tiem" v-for="(item, index) in propValues.list.value" :key="index" :style="getStyleType">
                <div v-html="item.title"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    
    import { transformProp, transformStyle } from "@/utils/utils";
    export default {
        props: [ 'propStyles' , 'propValue'],
        computed: {
            getStyleType(){
                const style = this.propStyle.styletype ? `listStyleType:${this.propStyle.styletype.value}` : ''
                return style
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
    // .list-item-box{ padding: 12px 0;}
    // .list-tiem{ line-height: 2; list-style-type: circle; color: #333; display: list-item;}
</style>