<template>
    <div>
        <div class="component-name-box" v-for="(o, inde) in componentList" :key="inde">
            <div class="component-name">{{o.name}}</div>
            <div class="component-list">
                <div class="list" v-for="(item, index) in o.children" :key="index" :data-index="index" @click="handleAddComponent(inde,index)">
                    <!-- <i :class="item.icon"></i> -->
                    <el-button>{{ item.label }}</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import componentList from '@/custom-component/component-list'
export default {
    data() {
        return {
            componentList
        }
    },
    methods: {
        handleAddComponent(inde, index) {
            const component = componentList[inde].children[index]
            this.$store.commit('addComponent', { component })
        }
    },
}
</script>

<style lang="scss" scoped>
.component-name-box{ 
    padding: 0 20px;
    .component-name{
        font-size: 14px;
        color: #666;
    }
}
.component-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 12px 0;

    .list {
        width: 45%;
        margin-bottom: 10px;
        text-align: center;
        color: #333;
       
        button{
            font-size: 14px;
            width: 100%;
        }
    }
}
</style>