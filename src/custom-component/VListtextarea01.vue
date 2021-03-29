<template>
    <div class="list-box" :style="getStyle">
        <div class="list-name-box" v-if="propValues.name.value">
            <div class="list-title-text" v-html="propValues.name.value"></div>
        </div>
        <el-row :gutter="20" class="listTarea01-item-box">
            <el-col :span="24/propStyles.column.value" class="list-tiem" v-for="(item, index) in propValues.list.value" :key="index">
                <div :style="'backgroundColor:'+ propStyles.titleBgColor.value" :class="'list-item-text'+ ' ' + propStyles.styles.value + '-box'"  v-if="item.title && propStyles.styles.value == 'left' || propStyles.styles.value == 'mixed' && index%2 == 1">
                    <div class="list-item-title" v-html="item.title"></div>
                </div>
                <div class="list-item-image" :style="'width:'+ propStyles.picwidth.value + 'px'">
                    <img :src="item.src">
                </div>
                <div :style="'backgroundColor:'+ propStyles.titleBgColor.value" :class="'list-item-text'+ ' ' + propStyles.styles.value + '-box'+' '+ 'mixed'+ index%2"  v-if="item.title && propStyles.styles.value == 'right' || propStyles.styles.value == 'mixed' && index%2 == 0">
                    <div class="list-item-title" v-html="item.title"></div>
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
            propValues() {
                return transformProp(this.propValue)
            },
            getStyle() {
                console.log('bg',this.propStyles);
                return transformStyle(this.propStyles)
            }
        },
        methods: {},
    }
</script>

<style lang="scss" scoped>

// .listTarea01-item-box{
//     margin-top: 20px;
//     .list-tiem{
//         margin-bottom: 12px;
//         position: relative;
//         display: flex;
//     }
//     .list-item-image{ 
//         width: 280px;
//         img{
//             width: 100%;
//             display: block;
//         }
//     }
    
//     .list-item-text{
//         flex: 1;
//         padding: 6px 12px;
//         // background-color: #f4f4f4;
//         .list-item-title{ 
//             font-size: 14px;
//             line-height: 1.6;
//         }
//     }
    
// }
    
    





</style>