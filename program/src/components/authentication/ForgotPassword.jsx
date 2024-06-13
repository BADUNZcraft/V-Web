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
        <div>
            <h2>Password Reset</h2>
            {error && <h2>{error}</h2>}
            {message && <h2>{message}</h2>}
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" ref={emailRef} required/>
                <button type='submit' disabled={loading}>Reset Password</button>
            </form>
            <div>
                <Link to='/login'>Log in</Link>
            </div>
        </div>
        <div>Need an account? <Link to="/signup">Sign Up</Link></div>
    </>
  )
}
