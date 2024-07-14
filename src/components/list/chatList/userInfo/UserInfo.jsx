import React from 'react'
import './userInfo.css'
import { useUserStore } from '../../../../lib/userStore';

const UserInfo = () => {
  const {currentUser} = useUserStore();
  return (
    <div className='userInfo'>
        <div className='user'>
            <img src={ currentUser.avatar ||"/avatar.png"}/>
            <h1>{currentUser.username}</h1>
        </div>
    </div>
  )
}

export default UserInfo