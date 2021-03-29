<template>
    <div class="list-box" :style="getStyle">
        <el-row  class="list-item-box">
            <el-col class="list-tiem" v-html="propValues.title.value"></el-col>
        </el-row>
    </div>
</template>

<script>
    
    import { transformProp, transformStyle } from "@/utils/utils";
    export default {
        props: [ 'propStyles' , 'propValue'],
        computed: {

            propValues() {
                return transformProp(this.propValue)
            },
            getStyle() {
                return transformStyle(this.propStyles)
            }
        },
        methods: {},
    }
</script>

<style lang="scss" scoped>
   
</style>