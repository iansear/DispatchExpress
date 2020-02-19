import React from 'react'
import {useState} from 'react'

function RegisterTeam() {
    const [registrationInfo, setRegistrationInfo] = useState({role: 'ADMIN'})
    const [warningMsg, setWarningMsg] = useState('')

    const getRegistrationInfo = (e) => {
        setRegistrationInfo({
            ...registrationInfo,
            [e.target.name]: e.target.value
        })
    }

    const registerTeam = () => {
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
            <h1>Register Team</h1>
            <input name='username' onChange={getRegistrationInfo} type='text' placeholder='Enter Username'/>
            <input name='password' onChange={getRegistrationInfo} type='password' placeholder='Enter Password'/>
            <input name='email' onChange={getRegistrationInfo} type='email' placeholder='Email'/>
            <input name='phone' onChange={getRegistrationInfo} type='text' placeholder='Phone'/>
            <input name='team' onChange={getRegistrationInfo} type='text' placeholder='Your Team Name'/>
            <button onClick={registerTeam}>Register Team</button>
            <p>{warningMsg}</p>
            </div>)
}

export default RegisterTeam