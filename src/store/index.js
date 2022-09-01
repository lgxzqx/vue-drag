import Vue from 'vue'
import Vuex from 'vuex'
import { swap } from "@/utils/utils";
import { toast } from "@/utils/toast";


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        editMode: 'edit', // 编辑器模式 edit read
        canvasStyleData: { // 页面全局数据
            width: 880,
            height: 740,
            bgClor: '#ffffff',
            bgImage:'',
            tbPadding: 10,
            lrPadding: 10,
            isBgImage: '1'
        },
        componentData: [], // 画布组件数据
        curComponent: null,
        curComponentIndex: null,
        snapshotData: [], // 编辑器快照数据
        snapshotIndex: -1, // 快照索引
        menuTop: 0, // 右击菜单数据
        menuLeft: 0,
        menuShow: false,
        copyData: null, // 复制粘贴剪切
        template:[],  //模板
        APP_URI:''
    },
    mutations: {
        setUri(state, url) {
            state.APP_URI = url
        },
        setTemplate(state, template) {
            state.template = template
        },
        addTemplate(state, item) {
            state.template = [item].concat(state.template)
        },
        setCanvasStyle(state, style) {
            state.canvasStyleData = style
        },
        setComponentData(state, componentData = []) {
            Vue.set(state, 'componentData', componentData)
        },
        setCurComponent(state, { component, index }) {
            state.curComponent = component
            state.curComponentIndex = index
        },
        setEditMode(state, mode){
            state.editMode = mode 
        },
        addComponent(state, { component, index }) {
            const components = JSON.parse(JSON.stringify(component))
            if (index !== undefined) {
                state.componentData.splice(index, 0, components)
            } else {
                console.log(components, index)
                state.componentData.push(components)
            }
        },
        showContexeMenu(state, { top, left }) {
            state.menuShow = true
            state.menuTop = top
            state.menuLeft = left
        },
        hideContexeMenu(state) {
            state.menuShow = false
        },
        deleteComponent(state, index = state.curComponentIndex) {
            state.componentData.splice(index, 1)
        },
        downComponent({ componentData, curComponentIndex }) {
            // 下移图层 index，表示元素在数组中越往后
            if (curComponentIndex < componentData.length - 1) {
                swap(componentData, curComponentIndex, curComponentIndex + 1)
            } else {
                toast('已经到底了')
            }
        },

        upComponent({ componentData, curComponentIndex }) {
            // 上移图层 index，表示元素在数组中越往前
            if (curComponentIndex > 0) {
                swap(componentData, curComponentIndex, curComponentIndex - 1)
            } else {
                toast('已经到顶了')
            }
        },

        bottomComponent({ componentData, curComponentIndex }) {
            // 置底
            if (curComponentIndex < componentData.length - 1) {
                swap(componentData, curComponentIndex, componentData.length - 1)
            } else {
                toast('已经到底了')
            }
        },

        topComponent({ componentData, curComponentIndex }) {
            console.log('object:',componentData, curComponentIndex);
            // 置顶
            if (curComponentIndex > 0) {
                swap(componentData, curComponentIndex, 0)
            } else {
                toast('已经到定了')
            }
        },

    },
    actions:{
        
    },
})

export default store