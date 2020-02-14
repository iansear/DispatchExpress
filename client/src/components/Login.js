import React from 'react'
import {useState} from 'react'

function Login() {
    const [loginInfo, setLoginInfo] = useState({})
    const [warningMsg, setWarningMsg] = useState('')

    const getLoginInfo = (e) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        })
    }

    const loginUser = () => {
        const url = 'http://localhost:3001/user/login'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        }).then((resp) => resp.json()).then((json) => {
            console.log(json.token)
            localStorage.setItem('token', json.token)
        }).catch(() => setWarningMsg('Incorrect username or password.'))
    }

    return (<div>
            <h1>Login</h1>
            <input name='username' onChange={getLoginInfo} type='text' placeholder='Enter Username'/>
            <input name='password' onChange={getLoginInfo} type='password' placeholder='Enter Password'/>
            <button onClick={loginUser}>Login</button>
            <p>{warningMsg}</p>
            </div>)
}

export default Login