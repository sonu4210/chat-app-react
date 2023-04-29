import React, { useState } from 'react'
import '../style.scss'
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth,storage,db} from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc ,doc,} from 'firebase/firestore';
import { useNavigate ,Link} from 'react-router-dom';

const Register = () => {

  const [err ,setErr]=useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault()

    const displayName = e.target[0].value 
    const email = e.target[1].value 
    const password = e.target[2].value 
    const file = e.target[3].files[0]

    console.log(email, password,displayName );

  try{
    const res= await createUserWithEmailAndPassword(auth, email, password)

   

const storageRef = ref(storage, displayName);

console.log("jjj", res);

const uploadTask = uploadBytesResumable(storageRef, file);


uploadTask.on(
  (error) => {
    setErr(true);
    console.log("error",error);
  }, 
  () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        await updateProfile(res.user,{
          displayName,
          photoURL:downloadURL
        });
        await setDoc(doc(db,"users",res.user.uid),{
          uid:res.user.uid,
          displayName,
          email,
          photoURL:downloadURL,
        });
        await setDoc(doc (db,"userChat",res.user.uid),{});
        navigate('/');
      });
  }
);

    
  }
  catch(err){
    setErr(true);
    console.log(err);

  }
   
      

  }
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
      <span className='logo'>Register</span>
      <span className='title'>lama chat</span>
      <form  onSubmit={handleSubmit}>
        <input type='text' placeholder='display name' />
        <input type='email' placeholder='email' />
        <input type='password' placeholder='pasword' />
        <input type='file' accept='*' />
        <button>sign up</button>
        {err &&<span>something went wrong</span>}
      </form>
        <p>you dont have an account?<Link to='/login'>login</Link></p>
      </div>
    </div>
  )
}

export default Register