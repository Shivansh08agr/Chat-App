import React from 'react'
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from 'react-toastify'

const Notification = () => {
  return (
    <div>
        <ToastContainer position='bottom-right'/>
    </div>
  )
}

export default Notification