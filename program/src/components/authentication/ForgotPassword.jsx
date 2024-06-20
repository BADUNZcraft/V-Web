import React, {useRef, useState} from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        } catch (e){
            setError('Failed to reset password')
            console.error(e.message)
        }

        setLoading(false)

        
    }

  return (
    <>
            <div className="container">
                <h2>Password Reset</h2>
                <h3>Enter your email to reset your password.</h3>
                <form onSubmit={handleSubmit}>
                    <input type="email" id="email" name="email" required ref={emailRef} placeholder="Email"/>
                    {error && <span style={{ color: 'red' }}>{error}</span>}
                    {message && <span style={{ color: 'green' }}>{message}</span>}
                    <button type="submit" disabled={loading}>Reset Password</button>
                </form>

                <div className="divider-container">
                    <div className="divider-line"></div>
                    <div className="or-continue">or continue with</div>
                    <div className="divider-line"></div>
                </div>

                <div>
                    <Link to="/login" className="button-style">Log In</Link>
                </div>
                <div>
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
    </>
  )
}
