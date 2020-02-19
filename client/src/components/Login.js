import React from 'react'
import {useState} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

function Login(props) {
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
            localStorage.setItem('token', json.token)
            localStorage.setItem('id', json.user.id)
            localStorage.setItem('team', json.user.team)
            props.setUser(json.user)
            if(json.user.role == 'ADMIN') {
                props.history.push('/dashboard')
            } else if(json.user.role == 'DELIV') {
                props.history.push('/manifest')
            } else {
                props.history.push('/')
            }
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

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch({type: 'SET_USER', user: user})
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Login))