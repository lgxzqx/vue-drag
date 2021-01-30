import { Message } from 'element-ui'

export function toast(message = '', type = 'error', duration = 1500) {
    Message({
        message,
        type,
        duration,
    })
}