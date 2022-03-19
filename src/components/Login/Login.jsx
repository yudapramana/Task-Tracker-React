import './Login.css'
import React from 'react';
import { useState } from 'react';

const Login = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const triggerLogin = (event) => {
        event.preventDefault();
        const userLogin = {
            email: email,
            password: password
        }
        props.triggerLogin(userLogin)
    }

    return (
        <>
            <form className='login-form'>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
    
                <button type="submit" className="btn btn-block" onClick={triggerLogin}>Submit</button>
            </form>
        </>
    );
};

export default Login;