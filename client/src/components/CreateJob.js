import React from 'react'
import {useState} from 'react'
import {NavLink} from 'react-router-dom'

function CreateJob(props) {
    const team = localStorage.getItem('team')
    const token = localStorage.getItem('token')
    const [jobInfo, setJobInfo] = useState({team: team, status: 'UNASSIGNED'})
    const [Message, setMessage] = useState('')

    const getJobInfo = (e) => {
        setJobInfo({
            ...jobInfo,
            [e.target.name]: e.target.value
        })
    }

    const isAuthorized = () => {
        if(!(token)) {
            props.history.push('/')
        }
    }

    const createJob = () => {
        const url = 'http://localhost:3001/job/createjob/'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(jobInfo)
        }).then((resp) => resp.json()).then((json) => {
            if(json.id) {
                setMessage('Job Created.')
            } else {
                setMessage('Something happened, try again...')
            }
        })
    }

    return (<div>
            {isAuthorized()}
            <h1>Create Job</h1>
            <input name='pickup' onChange={getJobInfo} type='text' placeholder='Pick Up Address'/>
            <input name='dropoff' onChange={getJobInfo} type='text' placeholder='Dropoff Address'/>
            <input name='notes' onChange={getJobInfo} type='text' placeholder='Additional Instructions'/>
            <button onClick={createJob}>Enter</button>
            <p>{Message}</p>
            <NavLink to = '/dashboard'><button>Back</button></NavLink>
            </div>)
}

export default CreateJob