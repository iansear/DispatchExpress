import React from 'react'
import {withRouter} from 'react-router-dom'

function Menu(props) {

    const logout = () => {
        localStorage.clear()
        props.history.push('/')
    }

    return (<div>
            <button onClick={logout}>Logout</button>
            </div>)
}

export default withRouter(Menu)