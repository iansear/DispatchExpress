import React, {useEffect} from 'react'
import Menu from './Menu'
import Couriers from './Couriers'
import Jobs from './Jobs'
import './dispatch.css'

function Dashboard(props) {

    const isAuthorized = () => {
        const token = localStorage.getItem('token')
        if(!(token)) {
            props.history.push('/')
        }
    }

    useEffect(() => {
        isAuthorized()
    })

    return (<div >
            <Menu />
                <div id='dash-component'>
                <Jobs />
                <Couriers />
                </div>
            </div>)
}

export default Dashboard