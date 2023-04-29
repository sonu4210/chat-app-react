import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import {db} from '../firebase'
import {v4 as uuid} from "uuid"
import { ChatContext } from '../context/ChatContext'
import { Timestamp, arrayUnion, updateDoc,doc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytesResumable } from 'firebase/storage'
import {storage} from '../firebase'
import {   getDownloadURL } from "firebase/storage";

const Input = () => {

  const [text ,setText]=useState("")
  const [img , setImg]=useState(null)

  const {currentUser}=useContext(AuthContext)
  const {data}=useContext(ChatContext)

  const handleSend = async() =>{
    //try{
    if(img){
      const storageRef = ref(storage ,uuid())
      const uploadTask= uploadBytesResumable(storageRef,img)
      uploadTask.on(
        (error) => {
          // setErr(true);
          // console.log("error",error);
        }, 
        () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                  await updateDoc(doc (db,"chats",data.chatId),{
                    messages:arrayUnion({
                      id:uuid(),
                      text,
                      senderId:currentUser.uid,
                      date:Timestamp.now(),
                      img:downloadURL
                    }),
                  })
            });
        }
      );

    }
    else{
      console.log("data", data);
      await updateDoc(doc (db,"chats",data.chatId),{
        messages:arrayUnion({
          id:uuid(),
          text,
          senderId:currentUser.uid,
          date:Timestamp.now()
        }),
      })
    }
    await updateDoc(doc(db,"userChat", currentUser.uid),{
      [data.chatId +".lastMessage"]:{
        text,
      },
        [data.chatId+".date"]:serverTimestamp(),
      
    })
    await updateDoc(doc(db,"userChat", data.user.uid),{
      [data.chatId +".lastMessage"]:{
        text,
      },
        [data.chatId+".date"]:serverTimestamp(),
      
    })
    setText('')
    setImg(null)
  // }catch(err){
  //   console.log("err", err);
  // }
  }
  return (
    <div  className='input'>
      <input type='text' placeholder='type something'  value={text} onChange={e=>setText(e.target.value)}/>
      <div className='send'>
      <img src={require('../assets/attach.png')} alt=''/>
      <input type='file' style={{display:'none'}} id='file' onChange={e=>{setImg(e.target.files[0]) }}/>
      <label htmlFor='file'>
        <img src={require('../assets/files.png')} alt=''/>
      </label>
      <button onClick={handleSend}>send</button>
      </div>
    </div>
  )
}

export default Input