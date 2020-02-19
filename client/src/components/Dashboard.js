import React, {useEffect} from 'react'
import Menu from './Menu'
import Couriers from './Couriers'
import Jobs from './Jobs'

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

    return (<div>
            <Menu />
            <Jobs />
            <Couriers />
            </div>)
}

export default Dashboard