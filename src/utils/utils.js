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
    if (Object.prototype.toString.call(target) === '[object Object]') {
        let values = ''
        for (const key in target) {
            if (Object.prototype.hasOwnProperty.call(target, key)) {
                const item = target[key].value;
                if (key == 'tbPadding') {
                    values +=  `paddingTop:${item}px;paddingBottom:${item}px;`
                } else if (key == 'lrPadding') {
                    values +=  `paddingLeft:${item}px;paddingRight:${item}px;`
                } else if (key == 'tbMargin') {
                    values +=  `marginTop:${item}px;`
                } else if (key == 'lrMargin') {
                    values +=  `marginLeft:${item}px;marginRight:${item}px;`
                } else if (key == 'bgClor') {
                    values +=  `backgroundColor: ${item};`
                } else if(key == 'bgImage' && target.isBgImage.value == '2') {
                    values +=  `backgroundImage: url(${item});`
                }
            }
        }
        return values
    }
    console.log('格式出错！')
}
