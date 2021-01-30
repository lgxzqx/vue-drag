<template>
    <div class="banner-box" :style="getStyle">
        <img :src="propValues.src.value">
        <div class="banner-text ">
            <p class="banner-title" v-html="propValues.title.value"></p>
            <p class="banner-desc" v-html="propValues.desc.value"></p>
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
            }
        },
        methods: {},
    }
</script>

<style lang="scss" scoped>
.banner-box{
    width: 100%; 
    position: relative;

    img { 
        max-width:100%;
        display: block;
    }

    .banner-text{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        color: #fff;
        width: 80%;

        .banner-title{
            font-size: 32px;
            line-height: 1.4;
        }
        .banner-desc{
            line-height: 1.6;
            opacity: 0.9;
        }
    }
    
}
</style>