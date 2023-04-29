import React, { useContext } from 'react'
// import Message from './Messages'
import Input from './Input'
import Messages from './Messages'
import { ChatContext } from '../context/ChatContext'


const  Chat = () => {

  const {data}= useContext(ChatContext)
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{data.user?.displayName}</span>
        <div className='chatIcons'>
          <img src={require('../assets/video.png')} alt=''/>
          <img src={require('../assets/adduser.png')} alt=''/>
          <img src= {require('../assets/more.png')} alt=''/>

        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat