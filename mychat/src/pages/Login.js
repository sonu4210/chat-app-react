import React, { useState } from 'react'
import '../style.scss'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate ,Link} from 'react-router-dom';
import {auth} from '../firebase'

const Login = () => {

  const [err,setErr]=useState(false);
  const navigate=useNavigate();
  
  const handleSubmit= async(e)=>{
    e.preventDefault();
    const email= e.target[0].value;
    const password = e.target[1].value;

    try{
      await signInWithEmailAndPassword(auth ,email,password)
      navigate('/')
    }
    catch(err){
  setErr(true);
    }

  }

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
      <span className='logo'>Login</span>
      <span className='title'>lama chat</span>
      <form onSubmit={handleSubmit}>
        <input type='email' placeholder='email' />
        <input type='password' placeholder='pasword' />
      
        <button>sign in</button>
        {err &&<span>something went wrong</span>}
      </form>
        <p>you dont have an account?<Link to ='/register'>Register</Link></p>
      </div>
    </div>
  )
}

export default Login
