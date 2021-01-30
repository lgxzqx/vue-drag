<template>
    <div class="editor" id="editor"
        :class="{ edit: isEdit }" :style="{ width: canvasStyleData.width + 'px', minHeight: canvasStyleData.height + 'px', backgroundColor: canvasStyleData.bgClor, paddingTop: canvasStyleData.tbPadding + 'px', paddingBottom: canvasStyleData.tbPadding + 'px', paddingLeft: canvasStyleData.lrPadding + 'px', paddingRight: canvasStyleData.lrPadding + 'px'  }"
        @contextmenu="handleContextMenu"
    >
        <Shape v-for="(item, index) in componentData"
            :key="item.id"
            :active="item === curComponent && curComponentIndex == index"
            :element="item"
            :index="index"
        >
            <component
                v-if="item.component"
                class="component"
                :is="item.component"
                :propStyles="item.style"
                :propValue="item.propValue"
            />
        </Shape>
        <ContextMenu />
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Shape from './Shape'
    import ContextMenu from './ContextMenu'
    
    export default {
        props: {
            isEdit: {
                type: Boolean,
                default: true
            },
        },
        components: { Shape, ContextMenu },
        computed: mapState([
            'componentData',
            'curComponent',
            'curComponentIndex',
            'canvasStyleData',
        ]),
        methods: {
            handleContextMenu(e) {
                e.stopPropagation()
                e.preventDefault()

                // 计算菜单相对于编辑器的位移
                let target = e.target
                let top = e.offsetY
                let left = e.offsetX
                while (!target.className.includes('editor')) {
                    left += target.offsetLeft
                    top += target.offsetTop
                    target = target.parentNode
                }

                this.$store.commit('showContexeMenu', { top, left })
            },
        },
    }
</script>

<style lang="scss" scoped>
.editor {
    position: relative;
    background: #fff;
    flex-shrink: 0;
    margin: 0 auto;
}
.edit {
    .component {
        outline: none;
        width: 100%;
        height: 100%;
    }
}
</style>