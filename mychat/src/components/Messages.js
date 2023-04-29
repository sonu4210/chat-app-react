import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext';
import { onSnapshot ,doc } from 'firebase/firestore';
import {db} from '../firebase'
const Messages = () => {

const [messages ,setMessages]= useState([]);
const {data}=useContext(ChatContext);

useEffect (()=>{
  const unsub= onSnapshot(doc (db ,"chats",data.chatId), (doc)=>{
    doc.exists() && setMessages(doc.data().messages);
  })
  return ()=>{
    unsub()
  }

},[data.chatId])

  return (

    <div className='messages'>
      {messages.map((m)=>(
        <Message message={m} key={m.id}/>
      ))}
    </div>
    // <div className='messages'>
    //   <div className='message owner'>
    //   <div className='messaageInfo'>
    //     <img src={require('../assets/adduser.png')} alt=''/>
    //     <span>hello</span>
    //     <div className='messageContent'>
    //       <p>hey how are we</p>
    //       <img src={require('../assets/kakashi.jpg')} alt='' />
    //     </div>
    //   </div>
    // </div>
    // <div className='message owner'>
    //   <div className='messaageInfo'>
    //     <img src={require('../assets/adduser.png')} alt=''/>
    //     <span>hello</span>
    //     <div className='messageContent'>
    //       <p>hey how are we</p>
    //       <img src={require('../assets/kakashi.jpg')} alt='' />
    //     </div>
    //   </div>
    // </div>
    // </div>
  )
}

export default Messages