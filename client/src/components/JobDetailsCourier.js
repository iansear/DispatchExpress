import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

function JobDetailsCourier(props) {
    const token = localStorage.getItem('token')
    const [job, setJob] = useState({})
    const [buttonValue, setButtonValue] = useState('')
    const [message, setMessage] = useState('')

    const getJob = () => {
        const filteredJob = props.jobs.filter(j => j.id == props.match.params.jobID)
        setJob(filteredJob[0])
        if(filteredJob[0].status == 'PENDING') {
            setButtonValue('Accept')
        } else if(filteredJob[0].status == 'ACCEPTED') {
            setButtonValue('Picked Up')
        } else if(filteredJob[0].status == 'PICKEDUP') {
            setButtonValue('Delivered')
        }
    }

    const changeJobStatus = () => {
        if(job.status == 'PENDING') {
            setButtonValue('Picked Up')
            setJob({
                ...job,
                status: 'ACCEPTED'
            })
            toDatabase('ACCEPTED')
        } else if(job.status == 'ACCEPTED') {
            setButtonValue('Delivered')
            setJob({
                ...job,
                status: 'PICKEDUP'
            })
            toDatabase('PICKEDUP')
        } else if(job.status == 'PICKEDUP') {
            toDatabase('DELIVERED')
            props.history.push('/manifest')
        }
    }

    const getPOD = (e) => {
        setJob({
            ...job,
            [e.target.name]: e.target.value
        })
    }

    const toDatabase = (status) => {
        const jobDB = {
            id: job.id,
            pickup: job.pickup,
            dropoff: job.dropoff,
            notes: job.notes,
            status: status,
            courier: job.courier,
            team: job.team,
            pod: job.pod,
            createdAt: job.createdAt,
            updatedAt: job.updatedAt
        }
        const url = 'http://localhost:3001/job/updatejob/' + job.id
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(jobDB)
        }).then((resp) => resp.json()).then((json) => {
            if(json[0] == 1) {
                setMessage('Acknowledged')
            } else {
                setMessage('Something Happened')
            }
        })
    }

    useEffect(() => {
        getJob()
    }, [])

    return (<div>
        <table>
            <tbody>
                <tr>
                    <th>ID</th>
                    <td>{job.id}</td>
                </tr>
                <tr>
                    <th>PICKUP</th>
                    <td>{job.pickup}</td>
                </tr>
                <tr>
                    <th>DROPOFF</th>
                    <td>{job.dropoff}</td>
                </tr>
                <tr>
                    <th>NOTES</th>
                    <td>{job.notes}</td>
                </tr>
                <tr>
                    <th>STATUS</th>
                    <td>{job.status}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th>POD</th>
                    <td><input name='pod' onChange={getPOD} type='text'/></td>
                    <td><button onClick={changeJobStatus}>{buttonValue}</button></td>
                </tr>
            </tfoot>
        </table>
        <NavLink to = '/manifest'><button>Back</button></NavLink>
        <p>{message}</p>
    </div>)
}

const mapStateToProps = (state) => {
    return {
        jobs: state.jobs,
    }
}

export default connect(mapStateToProps)(JobDetailsCourier)