
// 组件初始模拟数据
// 公共样式
const commonStyles = [
    {
        name: '上下padding',
        key: 'tbPadding',
        type: 'number',
        value: 20
    },
    {
        name: '左右padding',
        key: 'lrPadding',
        type: 'number',
        value: 0
    },{
        name: '上margin',
        key: 'tbMargin',
        type: 'number',
        value: 0
    },
    {
        name: '背景颜色',
        key: 'bgclor',
        type: 'backgroundColor',
        value: 'rgba(255,255,255,1)'
    },
    // {
    //     name: '背景图片',
    //     key: 'lrPadding',
    //     type: 'image',
    //     value: require('@/assets/logo.png')
    // }
]

const commonProValue = [
    {
        name: '栏目名称',
        key: 'name',
        type: 'text',
        value: '<p>栏目名称</p>'
    },{
        name: '栏目描述语',
        key: 'describe',
        type: 'textarea',
        value: '<p>多行栏目文字描述语</p>'
    }
]

// 编辑器左侧组件列表
const list = [
    // {
    //     component: 'v-text',
    //     label: '文字',
    //     propValue: [],
    //     icon: 'el-icon-edit',
    //     style: []
    // },
    // {
    //     component: 'v-button', 
    //     label: '按钮', 
    //     propValue: [],
    //     icon: 'el-icon-thumb',
    //     style:[]
    // },
    // {
    //     component: 'Picture', 
    //     label: '图片', 
    //     icon: 'el-icon-picture',
    //     propValue: [],
    //     style: []
    // },
    {
        name: '单图组件',
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
                        name: '主题描述语',
                        key: 'desc',
                        type: 'textarea',
                        value: '我是一段描述语'
                    },{
                        name: '主题图片',
                        key: 'src',
                        type: 'image',  
                        value: require('@/assets/title.jpg') 
                    },
                ],
                exclude: ['name', 'describe'],
                style: []
            },
            {
                component: 'v-banner02', 
                label: '单图_02', 
                icon: 'el-icon-picture',
                propValue: [
                    {
                        name: '主题名称',
                        key: 'title',
                        type: 'text',
                        value: '主题名称'
                    },{
                        name: '主题描述语',
                        key: 'desc',
                        type: 'textarea',
                        value: '我是一段描述语'
                    },{
                        name: '主题图片',
                        key: 'src',
                        type: 'image',  
                        value: require('@/assets/title.jpg') 
                    },
                ],
                exclude: ['name', 'describe'],
                style: []
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
                style: [{
                    name: '竖排列数(最大值为4)',
                    key: 'column',
                    type: 'number',
                    value: 3
                },{
                    name: '序号图片类型',
                    key: 'styletype',
                    type: 'style-type',
                    value: 'circle'
                }]
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
                            desc: '这是一个图片描述',
                            src: require('@/assets/title.jpg')
                        },{
                            title: '案例图片2',
                            desc: '这是一个图片描述',
                            src: require('@/assets/title.jpg')
                        },{
                            title: '案例图片3',
                            desc: '这是一个图片描述',
                            src: require('@/assets/title.jpg')
                        },{
                            title: '案例图片4',
                            desc: '这是一个图片描述',
                            src: require('@/assets/title.jpg')
                        },{
                            title: '案例图片5',
                            desc: '这是一个图片描述',
                            src: require('@/assets/title.jpg')
                        },{
                            title: '案例图片6',
                            desc: '这是一个图片描述',
                            src: require('@/assets/title.jpg')
                        }]
                    }
                ],
                style: [{
                    name: '竖排列数(最大值为4)',
                    key: 'column',
                    type: 'number',
                    value: 3
                },{
                    name: '列表文字对齐方式',
                    key: 'textalign',
                    type: 'text-align',
                    value: 'left'
                }]
            }
        ]
    }
    
    
    
]

list.forEach(items => {
    items.children.forEach(item => {
        item.style = [ ...commonStyles, ...item.style ]
        if(!item.exclude){
            item.propValue = [...commonProValue, ...item.propValue ]
        }
    })
})

export default list