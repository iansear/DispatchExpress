import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './dispatch.css'

function Menu(props) {

    const logout = () => {
        localStorage.clear()
        props.history.push('/')
    }

    return (<div id='menu'>
                <h1>{props.user.team}</h1>
                <h2>{props.user.username}</h2>
                <button onClick={logout}>Logout</button>
            </div>)
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(Menu))