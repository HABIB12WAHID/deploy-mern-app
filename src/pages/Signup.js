import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils';
import './Login-Sign/login-sign.css';

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async(e) => {
        e.preventDefault();
        const {name, email, password} = signupInfo;
        if(!name || !email || !password) {
            return handleError('name, email and password are required!');
        }
        try {
            const url = "http://localhost:8081/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if(success) {
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login');
                },1000)
            }else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }else if (!success){
                handleError(message);
            }
            console.log(result);
        } catch (error) {
            handleError(error)
        }
    }
    return (
        <div className='card'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        onChange={handleChange}
                        type="text"
                        placeholder='Enter your name here'
                        name='name'
                        value={signupInfo.name}
                        autoFocus
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        onChange={handleChange}
                        placeholder='Enter your email here'
                        name='email'
                        value={signupInfo.email}
                        autoFocus
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        onChange={handleChange}
                        placeholder='*******'
                        name='password'
                        value={signupInfo.password}
                        autoFocus
                    />
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup;
