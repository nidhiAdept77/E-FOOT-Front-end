import { toast } from 'react-toastify'
import {SHOW_TOAST_NOFITICATION, REMOVE_TOAST_NOFITICATION} from '../types'

export const showToastMessage = (message, type) => dispatch => {
    dispatch({
        type: SHOW_TOAST_NOFITICATION,
        payload: true
    })
    switch (type) {
        case 'success':
            toast.success(message)
            break
        case 'info':
            toast.info(message)
            break
        case 'warn':
            toast.warn(message)
            break
    
        case 'error':
            toast.error(message)
            break    
        case 'dark':
            toast.dark(message)
            break 
        default:
            toast(message)
            break
    }
    setTimeout(() => {
        dispatch({
            type: REMOVE_TOAST_NOFITICATION,
            payload: false
        })
    }, 2000)
}