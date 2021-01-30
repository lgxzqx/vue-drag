<template>
    <div class="list-box" :style="getStyle">
        <Shape :active="false  ">
            <div class="list-name-box">
                <div class="list-title-text" v-html="propValues.name.value"></div>
                <div class="list-desc-text" v-html="propValues.describe.value"></div>
            </div>
        </Shape>
        <el-row  class="list-item-box">
            <el-col :span="24/propStyle.column.value" class="list-tiem" v-for="(item, index) in propValues.list.value" :key="index" :style="getStyleType">
                {{item.title}}
            </el-col>
        </el-row>
    </div>
</template>

<script>
    
    import { transformProp, transformStyle } from "@/utils/utils";
    import Shape from '@/components/Editor/Shape'
    export default {
        props: [ 'propStyles' , 'propValue'],
        components: { Shape },
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
    .list-item-box{ padding: 12px 0;}
    .list-tiem{ line-height: 2; list-style-type: circle; color: #333; display: list-item;}
</style>