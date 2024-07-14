import React from 'react'
import './list.css'
import UserInfo from '../list/chatList/userInfo/UserInfo'
import ChatList from './chatList/ChatList'

const List = ({setChating}) => {
  return (
    <div className='list'>
      <UserInfo/>
      <ChatList setChating = {setChating}/>
    </div>
  )
}

export default List