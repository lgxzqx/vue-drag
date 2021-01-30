<template>
    <div class="shape" :class="{ active: this.active  }" @click="selectCurComponent" >
        <div
            class="shape-point"
            v-for="(item, index) in (active? pointList : [])"
            :key="index"
            :style="getPointStyle(item)"
        >
        </div>
        <div ref="comSlot">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        props: {
            active: {
                type: Boolean,
                default: false,
            },
            element: {
                require: true,
                type: Object,
            },
            index: {
                require: true,
                type: [Number, String],
            },
        },
        data() {
            return {
                pointList: ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'], // 八个方向
                initialAngle: { // 每个点对应的初始角度
                    lt: 0,
                    t: 45,
                    rt: 90,
                    r: 135,
                    rb: 180,
                    b: 225,
                    lb: 270,
                    l: 315,
                },
                angleToCursor: [ // 每个范围的角度对应的光标
                    { start: 338, end: 23, cursor: 'nw' },
                    { start: 23, end: 68, cursor: 'n' },
                    { start: 68, end: 113, cursor: 'ne' },
                    { start: 113, end: 158, cursor: 'e' },
                    { start: 158, end: 203, cursor: 'se' },
                    { start: 203, end: 248, cursor: 's' },
                    { start: 248, end: 293, cursor: 'sw' },
                    { start: 293, end: 338, cursor: 'w' },
                ],
                cursors: {},
            }
        },
        computed: mapState([
            'curComponent',
        ]),

        methods: {
            selectCurComponent(e) {
                e.stopPropagation()
                e.preventDefault()
                this.$store.commit('hideContexeMenu')
                this.$store.commit('setCurComponent', {component: this.element, index: this.index })
            },
            getPointStyle(point) {
                const refs = this.$refs.comSlot
                const width = refs.offsetWidth
                const height = refs.offsetHeight
                const hasT = /t/.test(point)
                const hasB = /b/.test(point)
                const hasL = /l/.test(point)
                const hasR = /r/.test(point)
                let newLeft = 0
                let newTop = 0
                
                // 四个角的点
                if (point.length === 2) {
                    newLeft = hasL? 0 : width
                    newTop = hasT? 0 : height
                } else {
                    // 上下两点的点，宽度居中
                    if (hasT || hasB) {
                        newLeft = width / 2
                        newTop = hasT? 0 : height
                    }

                    // 左右两边的点，高度居中
                    if (hasL || hasR) {
                        newLeft = hasL? 0 : width
                        newTop = Math.floor(height / 2)
                    }
                }
                
                const style = {
                    marginLeft: hasR? '-4px' : '-4px',
                    marginTop: '-4px',
                    left: `${newLeft}px`,
                    top: `${newTop}px`,
                    cursor: this.cursors[point],
                }
                
                return style
            },

        },

    }
</script>

<style lang="scss" scoped>
.shape {
    position: relative;

    &:hover {
        cursor: move;
    }
}
.active {
    outline: 1px solid #70c0ff;
    user-select: none;
    z-index: 998;
}
.shape-point {
    position: absolute;
    background: #fff;
    border: 1px solid #59c7f9;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    z-index: 999;
}
.el-icon-refresh-right {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    font-weight: 600;
    cursor: grab;
    color: #59c7f9;
    font-size: 22px;
    font-weight: normal;

    &:active {
        cursor: grabbing;
    }
}
</style>