<template>
    <div class="home">
        <Toolbar />
        <main>
            <section class="left">
                <ComponentList />
            </section>
            <section class="center"  @click="deselectCurComponent">
                <Editor />
            </section>
            <section class="right">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="模块数据" name="data">
                        <DataList v-if="curComponent"/>
                        <p v-else class="placeholder">请选择组件</p>
                    </el-tab-pane>
                    <el-tab-pane label="模块属性" name="attr">
                        <AttrList v-if="curComponent" />
                        <p v-else class="placeholder">请选择组件</p>
                    </el-tab-pane>
                    <el-tab-pane label="全局" name="style">
                        <AttrPublic />
                    </el-tab-pane>
                </el-tabs>
            </section>
        </main>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Toolbar from '@/components/Toolbar'
import ComponentList from '@/components/ComponentList'
import Editor from '@/components/Editor/index'
import AttrList from '@/components/AttrList'
import DataList from '@/components/DataList'
import AttrPublic from '@/components/AttrPublic'
import { generateID } from '@/utils/generateID'
import  { template } from '@/store/template'
import api from '@/api'

export default {
    components: { Toolbar, ComponentList, Editor, AttrList, AttrPublic, DataList },
    data() {
        return {
            activeName: 'data'
        }
    },
    computed: mapState([
        'componentData',
        'curComponent',
    ]),
    created() {
        this.restore()
    },
    methods: {
        deselectCurComponent(){
            this.$store.commit('setCurComponent', { component: null, index: null })
            this.$store.commit('hideContexeMenu')
        },
        restore() {
            // 用保存的数据恢复画布
            // if (localStorage.getItem('canvasData')) {
            //     const canvasData = localStorage.getItem('canvasData')
            //     this.$store.commit('setComponentData', this.resetID(JSON.parse(canvasData)))
            // }

            // if (localStorage.getItem('canvasStyle')) {
            //     this.$store.commit('setCanvasStyle', JSON.parse(localStorage.getItem('canvasStyle')))
            // }

            // if (!localStorage.getItem('template')) {
            //     localStorage.setItem('template', template)
            // }
            localStorage.clear()
            api.getCannvas().then(res=> {
                const data = res.data.data
                // const template = localStorage.getItem('template')
                // let list = template.concat(list)
                // console.log('template', template)
                this.$store.commit('setTemplate', data)
                 
            })
            

            // 预设模板
            
        },
        resetID(data) {
            data.forEach(item => {
                item.id = generateID()
            })

            return data
        },
    },
    
}
</script>

<style lang="scss">
.home {
    height: 100vh;
    background: #fff;

    main {
        height: calc(100% - 10px);
        position: relative;

        .left {
            position: absolute;
            height: 100%;
            width: 260px;
            left: 0;
            top: 0;
            padding-top: 10px;
        }

        .right {
            position: absolute;
            height: 100%;
            width: 306px;
            right: 0;
            top: 0;
            height: calc(100% - 64px);
        }

        .center {
            margin-left: 260px;
            margin-right: 306px;
            background: #f5f5f5;
            height: 100%;
            overflow: auto;
            padding: 20px 0 80px;

            .content {
                height: 100%;
                overflow: auto;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }

    .placeholder {
        text-align: center;
        color: #333;
    }
}
</style>