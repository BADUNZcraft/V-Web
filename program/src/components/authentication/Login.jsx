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
            <div className="container">
                <h2>Sign in to your account</h2>
                <h3>Enter your email to sign in to this page.</h3>
                <form onSubmit={handleSubmit}>
                    <input type="email" id="email" name="email" required ref={emailRef} placeholder="Email"/>
                    <input type="password" id="password" name="password" required ref={passwordRef} placeholder="Password"/>
                    {error && <span style={{ color: 'red' }}>{error}</span>}
                    <button type="submit" disabled={loading}>Log in</button>
                </form>

                <div className="divider-container">
                    <div className="divider-line"></div>
                    <div className="or-continue">or continue with</div>
                    <div className="divider-line"></div>
                </div>

                <div>
                    <Link to="/forgot-password" className="button-style">Forgot Password?</Link>
                </div>

                <div>Need an account? <Link to="/signup">Sign Up</Link></div>

            </div>
    </>
  )
}