import React, { useState } from 'react';
import "./index.css";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import { useHistory } from 'react-router-dom';
// hello
function Index() {
  const [register , setRegister] = useState(false)
  const [email, setEmail ] = useState("")
  const [password, setPassword] = useState ("")
  const [username, setUsername] = useState("")
  const [loading, setLoading ] = useState("")
  const [error, setError] = useState("")
  const history = useHistory()

  const handleSignInGoogle = () => {
    signInWithPopup(auth,provider).then((res) => {
      history.push('/');
      console.log(res)
    })
  }

  const handleRegister = (e) => {
    setError("")
    e.preventDefault();
    setLoading(true);
    if(email === "" || password === ''|| username === ''){
      setError('Required field is missing')
      setLoading(false)
    }else{
      createUserWithEmailAndPassword(auth, email, password).then((res) => {
        setLoading(false)
        history.push('/')
        console.log(res)
      }).catch((error) => {
        console.log(error)
        setError(error.message)
        setLoading(false)
      })
    }
  }
  const handleSignIn = (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    if(email === "" || password === '')
    {
      setError("Required field is missing")
      setLoading(false)
    }else{
      signInWithEmailAndPassword(auth, email, password).then((res) => {
        
        setLoading(false)
        history.push('/')
        console.log(res)
      }).catch((err) => {
        console.log(error.code)
        setError(error.message)
        setLoading(false)
      })
    }
  }
  return (
    <div className="auth">
      <div className="auth-container">
        <p>Add another way to log in using any of the following services.</p>
        <div className="sign-options">
          <div onClick= {handleSignInGoogle} className="single-option">
            <img src="#" alt ="google" />
            <p>Login with Google</p>    
          </div>
        </div>
        <div className="auth-login">
          <div className="auth-login-container">
            {register ? (
              <>
              <div className = "input-field">
                <p>Username</p>
                <input value = {username} onChange={(e) =>setUsername(e.target.value)} type="text" />
              </div>
              <div className = "input-field">
                <p>Email</p>
                <input value = {email} onChange={(e) =>setEmail(e.target.value)} type="email" />
              </div>
              <div className = "input-field">
                <p>Password</p>
                <input value = {password} onChange={(e) =>setPassword(e.target.value)} type="password" />
              </div>
              <button 
                onClick={handleRegister}
                disabled= {loading}
                style={{
                  marginTop:"10px"
                }}
              >
                { loading ? 'Registering ...' : 'Register' }
                </button> 
              </>


            ) : (

              
              <>
              <div className = "input-field">
                <p>Email</p>
                <input value = {email} onChange={(e) =>setEmail(e.target.value)}type="email" />
              </div>
              <div className = "input-field">
                <p>Password</p>
                <input value = {password} onChange={(e) =>setPassword(e.target.value)} type="password" />  
              </div>
              <button  onClick={handleSignIn}
                disabled={loading}
                style={{
                  marginTop:"10px"
                }}
              >
                {loading ? 'Signing In ...' : 'Login' } </button>
              </>
            )}
            <p onClick={() => setRegister(!register)}
              style={{
                  marginTop:"10px",
                  textAlign:"center",
                  color : "0095ff",
                  textDecoration: "underline",
                  cursor : "pointer"
                }}>{register ? "Login" : "Register"}?
            </p>
          </div>
        </div>
        {
          error !== "" && (<p style={{
            color: "red",
            fontSize: "14px",
          }}>
            {error}
          </p>)
        }
      </div>
    </div>
  );
}

export default Index