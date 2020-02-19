import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

function Couriers(props) {

    const [couriersURL, setCouriersURL] = useState([])

    const getCouriers = () => {
        const team = localStorage.getItem('team')
        const url = 'http://localhost:3001/user/getcouriers/' + team
        fetch(url).then((resp) => resp.json()).then((json) => {
            props.setCouriers(json)
            setDisplay(json)
        }).catch(() => console.log('Could not get Couriers'))
    }

    const setDisplay = (courierList) => {
        let display = courierList.map((courier) => {
            return (<div key={courier.id}>
                        <label>{courier.username}</label>
                    </div>)
        })
        setCouriersURL(display)
    }

    useEffect(() => {
        getCouriers()
    }, [])

    return (<div>
            <h2>Couriers</h2>
            <NavLink to='/registeremployee'><button>New Employee</button></NavLink>
            {couriersURL}
            </div>)
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCouriers: (roster) => dispatch({type: 'SET_COURIER_ROSTER', roster: roster})
      } 
  }

export default connect(null, mapDispatchToProps)(Couriers)