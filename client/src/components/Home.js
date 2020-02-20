import React from 'react'
import Login from './Login'
import {NavLink} from 'react-router-dom'
import './dispatch.css'

function Home() {
    return (<div>
                <div class='homeheader'>
                    <div>
                        <h1>Dispatch Express</h1>
                        <h3>Register your team. Sign up team mates. Start Dispatching!</h3>
                    </div>
                    <NavLink to='/register'><button>Register Now</button></NavLink>
                </div>
                <div id='homebody'>
                    <Login />
                </div>
            </div>)
}

export default Home