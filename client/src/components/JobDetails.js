import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

function JobDetails(props) {
    const token = localStorage.getItem('token')
    const [job, setJob] = useState({})
    const [courier, setCourier] = useState({})
    const [roster, setRoster] = useState([])
    const [updateInfo, setUpdateInfo] = useState({})
    const [Message, setMessage] = useState('')

    const getJob = () => {
        const filteredJob = props.jobs.filter(j => j.id == props.match.params.jobID)
        const filteredCourier = props.roster.filter(c => c.id == filteredJob[0].courier)
        let username = ''
        if(filteredCourier[0]) {
            username = filteredCourier[0].username
        }
        setCourier(filteredCourier[0])
        setJob({
            ...filteredJob[0],
            courier: username
        })
        setUpdateInfo(filteredJob[0])
    }

    const getRoster = () => {
        const roster = props.roster.map((courier) => {
            return (<option key={courier.id} value={courier.id}>{courier.username}</option>)
        })
        setRoster(roster)
    }

    const selectCourier = (e) => {
        const filteredCourier = props.roster.filter(c => c.id == e.target.value)
        setCourier(filteredCourier[0])
        if(filteredCourier[0]) {
            setUpdateInfo({
                ...updateInfo,
                status: 'PENDING',
                courier: filteredCourier[0].id
            })
        }
    }

    const assignCourier = () => {
        if(courier) {
            setJob({
                ...updateInfo,                
                courier: courier.username
            })
            toDatabase(updateInfo, 'Courier Assigned')
        }
    }

    const unassign = () => {
        setUpdateInfo({
            ...updateInfo,
            status: 'UNASSIGNED',
            courier: null
        })
        // console.log(updateInfo)
        setJob({
            ...updateInfo,
            status: 'UNASSIGNED',
            courier: null
        })
        // console.log(job)
        toDatabase(updateInfo, 'Job Unassigned')
    }

    const getUpdateInfo = (e) => {
        setUpdateInfo({
            ...updateInfo,
            [e.target.name]: e.target.value
        })
    }

    const updateJob = () => {
        setJob({
            ...updateInfo,
            courier: courier.username
        })
        toDatabase(updateInfo, 'Job Updated')
    }

    const toDatabase = (data, message) => {
        const url = 'http://localhost:3001/job/updatejob/' + job.id
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json()).then((json) => {
            if(json[0] == 1) {
                setMessage(message)
            } else {
                setMessage('Something Happened')
            }
        })
    }

    useEffect(() => {
        getRoster()
        getJob()
    }, [])

    return (<div>
        <table>
            <tbody>
                <tr>
                    <th>ID</th>
                    <td>{job.id}</td>
                    <td>UPDATE INFO</td>
                </tr>
                <tr>
                    <th>PICKUP</th>
                    <td>{job.pickup}</td>
                    <td><input name='pickup' onChange={getUpdateInfo} type='text' placeholder='New Pickup' /></td>
                </tr>
                <tr>
                    <th>DROPOFF</th>
                    <td>{job.dropoff}</td>
                    <td><input name='dropoff' onChange={getUpdateInfo} type='text' placeholder='New Dropoff' /></td>
                </tr>
                <tr>
                    <th>NOTES</th>
                    <td>{job.notes}</td>
                    <td><input name='notes' onChange={getUpdateInfo} type='text' placeholder='New Notes' /></td>
                </tr>
                <tr>
                    <th>STATUS</th>
                    <td>{job.status}</td>
                    <td><button onClick={updateJob}>UPDATE</button></td>
                </tr>
                <tr>
                    <th>COURIER ASSIGNED</th>
                    <td>{job.courier}</td>
                    <td><select name='courier' onChange={selectCourier}><option>--</option>{roster}</select></td>
                </tr>
                <tr>
                    <th>CREATED AT</th>
                    <td>{job.createdAt}</td>
                    <td><button onClick={assignCourier}>ASSIGN</button><button onClick={unassign}>UNASSIGN</button></td>
                </tr>
            </tbody>
        </table>
        <NavLink to = '/dashboard'><button>Back</button></NavLink>
        <p>{Message}</p>
    </div>)
}

const mapStateToProps = (state) => {
    return {
        jobs: state.jobs,
        roster: state.roster
    }
}

export default connect(mapStateToProps)(JobDetails)