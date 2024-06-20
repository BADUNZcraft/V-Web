import React, {useRef, useState} from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch{
            setError('Failed to create an account')
        }

        setLoading(false)

        
    }
    

  return (
    <>
    <div className="container">
      <h2>Create an account</h2>
      <h3>Enter your email to sign up for this page.</h3>
      <form onSubmit={handleSubmit}>

        <input type="email" id="email" name="email" required ref={emailRef} placeholder="Email"/>
        
        <input type="password" id="password" name="password" required ref={passwordRef} placeholder="Password" />

        

        <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type="password" id="confirm-password" name="confirm-password" required ref={passwordConfirmRef} placeholder="Confirm Password" />
            {error && <span style={{ marginLeft: '10px', color: 'red' }}>{error}</span>}
        </div>
        
        <button type="submit" disabled={loading}>Sign Up with email</button>
      </form>


      <div className="divider-container">  
        <div 
          className="divider-line">
        </div>
        <div 
          className="or-continue">or continue with
        </div>
        <div 
          className="divider-line">
        </div>
      </div>


      <div>
      <Link to="/login" className="button-style">Sign In</Link>
      </div>
    </div>
    </>
  )
}