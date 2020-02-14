import React from 'react'
import {useState} from 'react'

function Register() {
    const [registrationInfo, setRegistrationInfo] = useState({})
    const [warningMsg, setWarningMsg] = useState('')

    const getRegistrationInfo = (e) => {
        setRegistrationInfo({
            ...registrationInfo,
            [e.target.name]: e.target.value
        })
    }

    const registerUser = () => {
        const url = 'http://localhost:3001/user/register'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationInfo)
        }).then((resp) => resp.json()).then((json) => {
            if(json.errors) {
                setWarningMsg('Username taken. Please choose another.')
            }
        })
    }

    return (<div>
            <h1>Register</h1>
            <input name='username' onChange={getRegistrationInfo} type='text' placeholder='Enter Username'/>
            <input name='password' onChange={getRegistrationInfo} type='password' placeholder='Enter Password'/>
            <input name='email' onChange={getRegistrationInfo} type='email' placeholder='Email'/>
            <input name='phone' onChange={getRegistrationInfo} type='text' placeholder='Phone'/>
            <button onClick={registerUser}>Register</button>
            <p>{warningMsg}</p>
            </div>)
}

export default Register