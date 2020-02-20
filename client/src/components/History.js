import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import Menu from './Menu'

function History() {
    const [jobsURL, setJobsURL] = useState([])

    const getJobs = () => {
        const id = localStorage.getItem('id')
        const token = localStorage.getItem('token')
        const url = 'http://localhost:3001/job/myjobhistory/' + id
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((resp) => resp.json()).then((json) => {
            setDisplay(json)
        }).catch(() => console.log('Could not get Jobs'))
    }

    const setDisplay = (jobList) => {
        let display = jobList.map((job) => {
            return (<tr key={job.id}>
                        <td>{job.id}</td>
                        <td>{job.pickup}</td>
                        <td>{job.dropoff}</td>
                        <td>{job.status}</td>
                        <td>{job.pod}</td>
                    </tr>)
        })
        setJobsURL(display)
    }

    useEffect(() => {
        getJobs()
    }, [])

    return (<div>
        <Menu />
            <h1>History</h1>
            <NavLink to='/manifest'><button>Manifest</button></NavLink>
            <table>
                <thead>
                    <tr>
                        <th>Job ID</th>
                        <th>PickUP</th>
                        <th>DropOff</th>
                        <th>Status</th>
                        <th>POD</th>
                    </tr>
                </thead>
                <tbody>
                    {jobsURL}
                </tbody>
            </table>
            </div>)
}

export default History