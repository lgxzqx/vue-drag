<template>
    <div class="banner02-box" :style="getStyle">
        <div v-for="(item, index) in propValues.list.value" :key="index" :class="'banner02-item-box'+' '+ 'banner02-item'+ index" :style="'width:'+ (index == '0' ? 98*propStyles.scale.value/(1+propStyles.scale.value*1): 98/(propStyles.scale.value*1 + 1)) + '%'">
            <div :class="'item'+index" v-if="index == 0" >
                <img :src="item.src">
                <div class="banner02-text" v-if="item.title" :style="'backgroundColor:'+ propStyles.titleBgColor.value">
                    <p class="banner02-title" v-html="item.title"></p>
                </div>
            </div>
            <div :class="'item'+index" v-else-if="index == 1">
                <img :src="item.src">
                <div class="banner02-text" v-if="item.title" :style="'backgroundColor:'+ propStyles.titleBgColor.value">
                    <p class="banner02-title" v-html="item.title"></p>
                </div>
            </div>
            <div :class="'item'+index" v-else >
                <img :src="item.src">
                <div class="banner02-text" v-if="item.title" :style="'backgroundColor:'+ propStyles.titleBgColor.value">
                    <p class="banner02-title" v-html="item.title"></p>
                </div>
            </div>
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
                console.log('object', this.propStyles)
                return transformStyle(this.propStyles)
            }
        },
        methods: {},
    }
</script>

<style lang="scss" scoped>
// .banner-box{
//     width: 100%; 
//     img { 
//         max-width:100%;
//         display: block;
//     }
//     .banner-item0{
//         margin-right: 2%;
//     }
//     .banner-item-box{
//         position: relative;
//         float: left;
//         margin-bottom: 2%;

//         .banner-text{
//             position: absolute;
//             bottom: 0;
//             color: #fff;
//             width: 100%;
//             background-color: rgba(0, 0, 0, 0.75);
//             padding: 6px;
//             font-size: 14px;
//             .banner-title{
//                 line-height: 1.4;
//             }
//         }
//     }
// }
</style>