import React, { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { AuthContext } from '../../context/authContext'
import "./login.scss"

const Login = () => {
  const [isError, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user)
        dispatch({
          type: "LOGIN",
          payload: true
        })
        navigate("/")
      }).catch(err => {
      setError(true)
    })
  }

  return (
    <div className="login">
      <form onSubmit={ handleLogin }>
        <input type="email" placeholder="Email" onChange={ e => setEmail(e.target.value) } />
        <input type="password" placeholder="Password" onChange={ e => setPassword(e.target.value) } />
        <button type="submit">Login</button>
        { isError && <span>Wrong Email or Password</span> }
      </form>
    </div>
  )
}

export default Login