export function swap(arr, i, j) {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}


export function deepCopy(target) {
    if (typeof target == 'object') {
        const result = Array.isArray(target)? [] : {}
        for (const key in target) {
            if (typeof target[key] == 'object') {
                result[key] = deepCopy(target[key])
            } else {
                result[key] = target[key]
            }
        }

        return result
    }
    
    return target
}

export function transformProp(target) {
    if (Array.isArray(target)) {
        const result = {}
        target.forEach(item => {
            result[item.key] = item
        });
        return result
    }
    return target
}

export function transformStyle(target) {
    if (Array.isArray(target)) {
        let values = ''
        target.forEach(item => {
            if (item.key == 'tbPadding') {
                values +=  `paddingTop:${item.value}px;paddingBottom:${item.value}px;`
            } else if (item.key == 'lrPadding') {
                values +=  `paddingLeft:${item.value}px;paddingRight:${item.value}px;`
            } else if (item.key == 'tbMargin') {
                values +=  `marginTop:${item.value}px;`
            } else if (item.key == 'lrMargin') {
                values +=  `marginLeft:${item.value}px;marginRight:${item.value}px;`
            } else if (item.key == 'bgclor') {
                values +=  `backgroundColor: ${item.value};`
            } else {
                values +=  `backgroundImage: ${item.value};`
            }
        });
        return values
    }
    console.log('格式出错！')
}
