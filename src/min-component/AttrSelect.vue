<template>
    <div>
        <el-select class='select-box' v-model="values.value" placeholder="请选择">
            <el-option
                v-for="o in options"
                :key="o.value"
                :label="o.label"
                :value="o.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    export default {
        props:['values', 'options']
    }
</script>

<style lang="scss" scoped>
.select-box{ width: 100%;}
</style>