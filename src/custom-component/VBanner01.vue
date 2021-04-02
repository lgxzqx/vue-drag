<template>
    <div class="banner-box" :style="getStyle">
        <div :style="getStylePad + 'backgroundColor:'+ propStyles.titleBgColor.value" :class="'banner-text' + ' ' + propStyles.styles.value + '-box'" v-if="propValues.title.value && propStyles.styles.value == 'topBlock'">
            <div class="banner-title" v-html="propValues.title.value"></div>
        </div>
        <img :src="propValues.src.value">
        <div :style="getStylePad + 'backgroundColor:'+ propStyles.titleBgColor.value" :class="'banner-text' + ' ' + propStyles.styles.value + '-box'" v-if="propValues.title.value && propStyles.styles.value !== 'topBlock'">
            <div class="banner-title" v-html="propValues.title.value"></div>
        </div>
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
            },
            getStylePad(){
                const style = this.propStyles
                return `marginTop:${style.tbPadding.value}px;marginBottom:${style.tbPadding.value}px;marginLeft:${style.lrPadding.value}px;marginRight:${style.lrPadding.value}px;`
            }
        },
        methods: {},
    }
</script>

<style lang="scss" scoped>
// .banner-box{
//     width: 100%; 
//     position: relative;

//     img { 
//         max-width:100%;
//         display: block;
//     }
//     .top-box{
//         position: absolute;
//         left: 0;
//         right: 0;
//         top: 0;
//         z-index: 99;
//     }
//     .middle-box{
//         position: absolute;
//         left: 0;
//         right: 0;
//         top: 50%;
//         transform: translateY(-50%);
//         z-index: 99;
//     }
//     .bottom-box{
//         position: absolute;
//         left: 0;
//         right: 0;
//         bottom: 0;
//         z-index: 99;
//     }
//     .bottomBlock-box{
//         margin: 0 !important;
//         .banner-title {
//             color: #fff;
//         }
//     }
//     .topBlock-box{
//         margin: 0 !important;
//         .banner-title {
//             color: #fff;
//         }
//     }
//     .banner-text{
//         // position: absolute;
//         // top: 50%;
//         // left: 50%;
//         // transform: translate3d(-50%, -50%, 0);
//         color: #fff;
//         font-size: 16px;
//         .banner-title{
//             line-height: 1.4;
//             padding: 12px;
//         }
//     }
    
// }
</style>