import React, {useRef, useState} from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch (e){
            setError('Failed to sign in')
            console.error(e.message)
        }

        setLoading(false)

        
    }

  return (
    <>
        <div>
            <h2>Sign in to your account.</h2>
            <h3>Enter your email to sign in to this page. </h3>
            {error && <h2>{error}</h2>}
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" ref={emailRef} required/>
                <label>Password</label>
                <input type="password" ref={passwordRef} required/>
                <button type='submit' disabled={loading}>Log in</button>
            </form>
            <div>
                <Link to='/forgot-password'>Forgot Password?</Link>
            </div>
        </div>
        <div>Need an account? <Link to="/signup">Sign Up</Link></div>
    </>
  )
}
