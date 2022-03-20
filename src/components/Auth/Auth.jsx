import './Auth.css'
import React, { useEffect } from 'react';
import { useState } from 'react';

const Login = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {

    }, [props.isRegister])

    const triggerLogin = (event) => {
        event.preventDefault();
        const userLogin = {
            email: email,
            password: password
        }
        props.triggerLogin(userLogin)
    }

    const triggerRegister = (event) => {
        event.preventDefault();
        const dataRegister = {
            name: name,
            email: email,
            password: password
        }
        props.triggerRegister(dataRegister)
    }

    const toggleAuth = (event) => {
        event.preventDefault();
        props.toggleAuth();
    }

    return (
        <>  
            {
                !props.isRegister ?
                    (
                        <form className='login-form'>
                            <div className="form-control">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>

                            <button type="submit" className="btn btn-block" onClick={triggerLogin}>Login</button>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '10px'
                            }}>
                                Don't have an account?&nbsp;<button className="btn-href" onClick={toggleAuth}>Register</button>
                            </div>
                        </form>
                    ) :
                    (
                        <form className='login-form'>
                            <div className="form-control">
                                <label htmlFor="name">Name</label>
                                <input type="name" name="name" id="name" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>

                            <button type="submit" className="btn btn-block register" onClick={triggerRegister}>Register</button>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '10px'
                            }}>
                                Have an account?&nbsp;<button className="btn-href" onClick={toggleAuth}>Login</button>
                            </div>
                        </form>
                    )
            }

        </>
    );
};

export default Login;