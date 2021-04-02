
// 组件初始模拟数据
// 公共样式
const commonStyle = {
    tbPadding: {
        name: '上下padding',
        key: 'tbPadding',
        type: 'number',
        value: 10
    },
    lrPadding: {
        name: '左右padding',
        key: 'lrPadding',
        type: 'number',
        value: 10
    },
    tbMargin: {
        name: '上margin',
        key: 'tbMargin',
        type: 'number',
        value: 0
    },
    bgClor: {
        name: '背景颜色',
        key: 'bgclor',
        type: 'hide',
        value: 'rgba(255,255,255,1)'
    },
    isBgImage: {
        name: '模块背景样式',
        key: 'isBgImage',
        type: 'isBgImage',
        value: '1'
    },
    bgImage: {
        name: '背景图片',
        key: 'bgImage',
        type: 'hide',
        value: ''
    }
}
const commonProValue = [
    {
        name: '栏目名称',
        key: 'name',
        type: 'text',
        value: '<p>栏目名称</p>'
    }
]

// 编辑器左侧组件列表
const list = [
    {
        name: '基础组件',
        children:[
            {
                component: 'v-title01', 
                label: '自由组件', 
                icon: 'el-icon-picture',
                propValue: [
                    {
                        name: '自由编辑',
                        key: 'title',
                        type: 'text',
                        value: '可以是标题，也可以是一段文字'
                    }
                ],
                exclude: ['name'],
            }
        ]
    },
    {
        name: '图集组件',
        children: [
            {
                component: 'v-banner01', 
                label: '单图_01', 
                icon: 'el-icon-picture',
                propValue: [
                    {
                        name: '主题名称',
                        key: 'title',
                        type: 'text',
                        value: '主题名称'
                    },{
                        name: '主题图片',
                        key: 'src',
                        type: 'image',  
                        value: 'https://dn160.xcx01.5067.org/AC55A42F3B0991CA1EC0F7159525D543.JPG' 
                    },
                ],
                exclude: ['name'],
                style: {
                    limlit: {
                        name: '显示个数',
                        key: 'limlit',
                        type: 'hidden',
                        value: 1 
                    },
                    titleBgColor: {
                        name: '标题背景色',
                        key: 'titleBgColor',
                        type: 'bgclor',
                        value: 'rgba(0,0,0,0.5)'
                    },
                    styles: {
                        name: '标题样式',
                        key: 'styles',
                        type: 'select',
                        value: 'bottom',
                        options: [{
                            value: 'top',
                            label: 'top'
                        },{
                            value: 'middle',
                            label: 'middle'
                        },{
                            value: 'bottom',
                            label: 'bottom'
                        },{
                            value: 'topBlock',
                            label: 'top-block'
                        },{
                            value: 'bottomBlock',
                            label: 'bottom-block'
                        }]
                    }

                }
            },
            {
                component: 'v-banner02', 
                label: '多图_02', 
                icon: 'el-icon-picture',
                propValue: [
                    {
                        name: '多图数据',
                        key: 'list',
                        type: 'list-image',
                        value: [{
                            title: '案例图片1',
                            src: 'https://dn160.xcx01.5067.org/AC55A42F3B0991CA1EC0F7159525D543.JPG'
                        },{
                            title: '案例图片2',
                            src: 'https://dn160.xcx01.5067.org/AC55A42F3B0991CA1EC0F7159525D543.JPG'
                        },{
                            title: '案例图片3',
                            src: 'https://dn160.xcx01.5067.org/AC55A42F3B0991CA1EC0F7159525D543.JPG'
                        },{
                            title: '案例图片3',
                            src: 'https://dn160.xcx01.5067.org/AC55A42F3B0991CA1EC0F7159525D543.JPG'
                        }]
                    },
                ],
                exclude: ['name'],
                style: {
                    limlit: {
                        name: '显示个数',
                        key: 'limlit',
                        type: 'hidden',
                        value: 3 
                    },
                    scale: {
                        name: '图片比例',
                        key: 'scale',
                        type: 'float',
                        value: 3.32
                    },
                    titleBgColor: {
                        name: '标题背景色',
                        key: 'titleBgColor',
                        type: 'bgclor',
                        value: 'rgba(0,0,0,0.5)'
                    }
                }
            }
        ]
    },
    {
        name:'文字列表组件',
        children: [
            {
                component: 'v-listtext01', 
                label: '文字列表_01', 
                icon: 'el-icon-picture',
                propValue: [
                    {
                        name: '列表数据',
                        key: 'list',
                        type: 'list-text',
                        value: [{
                            title: '第一条文字列表'
                        },{
                            title: '第二条文字列表'
                        },{
                            title: '第三条文字列表'
                        },{
                            title: '第四条文字列表'
                        },{
                            title: '第五条文字列表'
                        },{
                            title: '第六条文字列表'
                        }]
                    }
                ],
                style: {
                    column: {
                        name: '竖排列数(最大值为4)',
                        key: 'column',
                        type: 'number',
                        value: 3
                    },
                    styletype: {
                        name: '序号图片类型',
                        key: 'styletype',
                        type: 'select',
                        value: 'circle',
                        options:[{
                            value: 'none',
                            label: 'none'
                        },{
                            value: 'circle',
                            label: 'circle'
                        },{
                            value: 'square',
                            label: 'square'
                        },{
                            value: 'disc',
                            label: 'disc'
                        },{
                            value: 'decimal',
                            label: 'decimal'
                        },{
                            value: 'decimal-leading-zero',
                            label: 'decimal-leading-zero'
                        },{
                            value: 'lower-latin',
                            label: 'lower-latin'
                        },{
                            value: 'upper-latin',
                            label: 'upper-latin'
                        }]
                    }
                }
            },
        ]
    },{
        name:'图片列表组件',
        children:[
            {
                component: 'v-listimage01', 
                label: '图片列表_01', 
                icon: 'el-icon-picture',
                propValue: [
                    {
                        name: '列表数据',
                        key: 'list',
                        type: 'list-image',
                        value: [{
                            title: '案例图片1',
                            src: 'https://dn160.xcx01.5067.org/AC55A42F3B0991CA1EC0F7159525D543.JPG'
                        },{
                            title: '案例图片2',
                            src: 'https://dn160.xcx01.5067.org/AC55A42F3B0991CA1EC0F7159525D543.JPG'
                        },{
                            title: '案例图片3',
                            src: 'https://dn160.xcx01.5067.org/AC55A42F3B0991CA1EC0F7159525D543.JPG'
                        },{
                            title: '案例图片4',
                            src: 'https://dn160.xcx01.5067.org/AC55A42F3B0991CA1EC0F7159525D543.JPG'
                        },{
                            title: '案例图片5',
                            src: 'https://dn160.xcx01.5067.org/AC55A42F3B0991CA1EC0F7159525D543.JPG'
                        },{
                            title: '案例图片6',
                            src: 'https://dn160.xcx01.5067.org/AC55A42F3B0991CA1EC0F7159525D543.JPG'
                        }]
                    }
                ],
                style: {
                    column: {
                        name: '竖排列数(最大值为4)',
                        key: 'column',
                        type: 'number',
                        value: 3
                    },
                    titleBgColor: {
                        name: '标题背景色',
                        key: 'titleBgColor',
                        type: 'bgclor',
                        value: 'rgba(0,0,0,0.5)'
                    },
                    styles: {
                        name: '标题样式',
                        key: 'styles',
                        type: 'select',
                        value: 'bottom',
                        options: [{
                            value: 'top',
                            label: 'top'
                        },{
                            value: 'middle',
                            label: 'middle'
                        },{
                            value: 'bottom',
                            label: 'bottom'
                        },{
                            value: 'topBlock',
                            label: 'top-block'
                        },{
                            value: 'bottomBlock',
                            label: 'bottom-block'
                        }]
                    }
                }
            }
        ]
    },{
        name:'图文列表组件',
        children:[
            {
                component: 'v-listtextarea01', 
                label: '图文列表_01', 
                icon: 'el-icon-picture',
                propValue: [
                    {
                        name: '列表数据',
                        key: 'list',
                        type: 'list-image',
                        value: [{
                            title: '案例图片1',
                            src: 'https://dn160.xcx01.5067.org/AC55A42F3B0991CA1EC0F7159525D543.JPG'
                        },{
                            title: '案例图片2',
                            src: 'https://dn160.xcx01.5067.org/AC55A42F3B0991CA1EC0F7159525D543.JPG'
                        },{
                            title: '案例图片3',
                            src: 'https://dn160.xcx01.5067.org/AC55A42F3B0991CA1EC0F7159525D543.JPG'
                        },{
                            title: '案例图片4',
                            src: 'https://dn160.xcx01.5067.org/AC55A42F3B0991CA1EC0F7159525D543.JPG'
                        }]
                    }
                ],
                style: {
                    column: {
                        name: '竖排列数(最大值为2)',
                        key: 'column',
                        type: 'number',
                        value: 1
                    },
                    picwidth: {
                        name: '图片宽度',
                        key: 'picwidth',
                        type: 'number',
                        value: 180
                    },
                    styles: {
                        name: '排列方式',
                        key: 'styles',
                        type: 'select',
                        value: 'left',
                        options: [{
                            value: 'left',
                            label: 'left'
                        },{
                            value: 'right',
                            label: 'right'
                        },{
                            value: 'mixed',
                            label: 'mixed'
                        }]
                    },
                    titleBgColor: {
                        name: '标题背景色',
                        key: 'titleBgColor',
                        type: 'bgclor',
                        value: 'rgba(241,241,241,1)'
                    }
                }
            }
        ]
    }
    
    
    
]

list.forEach(items => {
    items.children.forEach(item => {
        item.style = { ...commonStyle, ...item.style }
        if(!item.exclude){
            item.propValue = [...commonProValue, ...item.propValue ]
        }
    })
})

export default list