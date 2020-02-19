import React from 'react'
import {useState} from 'react'
import {NavLink} from 'react-router-dom'

function RegisterEmployee(props) {
    const team = localStorage.getItem('team')
    const [registrationInfo, setRegistrationInfo] = useState({team: team})
    const [Message, setMessage] = useState('')

    const getRegistrationInfo = (e) => {
        setRegistrationInfo({
            ...registrationInfo,
            [e.target.name]: e.target.value
        })
    }

    const isAuthorized = () => {
        const token = localStorage.getItem('token')
        if(!(token)) {
            props.history.push('/')
        }
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
            if(json.id) {
                setMessage('User Created.')
            } else if(json.errors) {
                if(json.errors[0].message === 'username must be unique') {
                    setMessage('Username taken. Please choose another.')
                }
            } else if(json.name === 'SequelizeDatabaseError') {
                setMessage('Please select a role...')
            } else {
                setMessage('Something happened, try again...')
            }
        })
    }

    return (<div>
            {isAuthorized()}
            <h1>New Employee</h1>
            <input name='username' onChange={getRegistrationInfo} type='text' placeholder='Enter Username'/>
            <input name='password' onChange={getRegistrationInfo} type='password' placeholder='Enter Password'/>
            <input name='email' onChange={getRegistrationInfo} type='email' placeholder='Email'/>
            <input name='phone' onChange={getRegistrationInfo} type='text' placeholder='Phone'/>
            <select name='role' onChange={getRegistrationInfo}>
                <option></option>
                <option value='DELIV'>Courier</option>
                <option value='CSR'>Customer Service</option>
                <option value='ADMIN'>Administrator</option>
            </select>
            <button onClick={registerUser}>Register</button>
            <p>{Message}</p>
            <NavLink to = '/dashboard'><button>Back</button></NavLink>
            </div>)
}

export default RegisterEmployee