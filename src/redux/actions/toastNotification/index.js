import { toast } from 'react-toastify'
import {SHOW_TOAST_NOFITICATION, REMOVE_TOAST_NOFITICATION} from '../types'
import Avatar from '@components/avatar'
import { Bell, Check, X, AlertTriangle, Info } from 'react-feather'
import { Fragment } from 'react'

export const ProgressToast = (icon, toastTitle, toastMessage, type) => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color={type} icon={icon} />
          <h6 className='toast-title'>{toastTitle}</h6>
        </div>
        {/* <small className='text-muted'>11 Min Ago</small> */}
      </div>
      <div className='toastify-body'>
        <span role='img' aria-label='toast-text'>
          {toastMessage}
        </span>
      </div>
    </Fragment>
)
export const callShowTostMessage = (message, type) => {
    let icon = <Bell size={12} />
    switch (type) {
        case 'success':
            icon = <Check size={12} />
            toast.success(ProgressToast(icon, "Success!", message, type))
            break
        case 'info':
            icon = <Info size={12} />
            toast.info(ProgressToast(icon, "Info!", message, type))
            break
        case 'warn':
            icon = <AlertTriangle size={12} />
            toast.warn(ProgressToast(icon, "Warning!", message, 'warning'))
            break
        case 'error':
            icon = <X size={12} />
            toast.error(ProgressToast(icon, "Error!", message, 'danger'))
            break    
        case 'dark':
            toast.dark(ProgressToast(icon, "Success!", message, 'secondary'))
            break 
        default:
            toast(ProgressToast(icon, "Default!", message, 'primary'))
            break
    }
}
export const showToastMessage = (message, type) => dispatch => {
    dispatch({
        type: SHOW_TOAST_NOFITICATION,
        payload: true
    })
    callShowTostMessage(message, type)
    setTimeout(() => {
        dispatch({
            type: REMOVE_TOAST_NOFITICATION,
            payload: false
        })
    }, 2000)
}