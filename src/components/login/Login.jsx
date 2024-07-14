import React, {useState} from 'react'
import './login.css'
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from './../../lib/firebase.js';
import { doc, setDoc } from "firebase/firestore"; 
import upload from '../../lib/upload.js';
import useWindowSize from './../../Hooks/useWindowSize';

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: ""
  });
  const {width} = useWindowSize();
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  function handleAvatar(e){
    if(e.target.files[0]){
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  async function handleLogin(e){
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const {email, password} = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    } finally{
      setLoading(false);
      location.reload();
    }
  }

  async function handleRegister(e){
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const {username, email, password} = Object.fromEntries(formData);
    if (!username || !email || !password)
      return toast.warn("Please enter inputs!");
    if (!avatar.file) return toast.warn("Please upload an avatar!");
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);

      const imageUrl = await upload(avatar.file);

      await setDoc(doc(db, "users", response.user.uid), {
        username,
        email,
        avatar: imageUrl,
        id: response.user.uid,
        blocked: []
      });
      await setDoc(doc(db, "userchats", response.user.uid), {
        chats: []
      });
      toast.success("Account created! You can login now!");
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    } finally{
      setLoading(false);
    }
  }
  return (
    <div className='login'>
      {width >= 768 ?(
        <>
        <div className="item">
          <h1>Welcome Back,</h1>
          <form onSubmit={(e)=>handleLogin(e)}>
            <input type="text" placeholder='Email' name='email'/>
            <input type="password" placeholder='password' name='password'/>
            <button disabled= {loading}>{loading? "Loading...": "Sign In"}</button>
          </form>
        </div>
        <div className="separator"></div>
        <div className="item">
        <h1>Create an Account</h1>
        <form onSubmit={(e)=>handleRegister(e)}>
            <label htmlFor="file">
              <img src={avatar.url || './avatar.png'}/>Upload an image</label>
            <input type="file" id='file' style={{display: "none"}} onChange={(e)=>handleAvatar(e)}/>
            <input type="text" placeholder='Username' name='username'/>
            <input type="text" placeholder='Email' name='email'/>
            <input type="password" placeholder='password (min 6 characters)' name='password'/>
            <button disabled= {loading}>{loading? "Loading...": "Sign Up"}</button>
          </form>
        </div>
        </>
        ):(
          <> 
        <div className="item" style={{display: login? "block": "none"}}>
          <h1>Welcome Back,</h1>
          <form onSubmit={(e)=>handleLogin(e)}>
            <input type="text" placeholder='Email' name='email'/>
            <input type="password" placeholder='password' name='password'/>
            <button disabled= {loading}>{loading? "Loading...": "Sign In"}</button>
          </form>
          <p onClick={()=>setLogin(false)}>Create a new Account</p>
        </div>
        <div className="item" style={{display: login? "none": "block"}}>
        <h1>Create an Account</h1>
        <form onSubmit={(e)=>handleRegister(e)}>
            <label htmlFor="file">
              <img src={avatar.url || './avatar.png'}/>Upload an image</label>
            <input type="file" id='file' style={{display: "none"}} onChange={(e)=>handleAvatar(e)}/>
            <input type="text" placeholder='Username' name='username'/>
            <input type="text" placeholder='Email' name='email'/>
            <input type="password" placeholder='password (min 6 characters)' name='password'/>
            <button disabled= {loading}>{loading? "Loading...": "Sign Up"}</button>
          </form>
          <p onClick={()=>setLogin(true)}>Login to your account</p>
        </div>
        </>
        )}
    </div>
  )
}

export default Login