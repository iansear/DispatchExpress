import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

function Jobs(props) {

    const [jobsURL, setJobsURL] = useState([])

    const getJobs = () => {
        const team = localStorage.getItem('team')
        const token = localStorage.getItem('token')
        const url = 'http://localhost:3001/job/' + team
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((resp) => resp.json()).then((json) => {
            props.setJobs(json)
            setDisplay(json)
        }).catch(() => console.log('Could not get Jobs'))
    }

    const setDisplay = (jobList) => {
        let display = jobList.map((job) => {
            const details = '/jobdetails/' + job.id
            return (<tr key={job.id}>
                        <td><NavLink to={details}>{job.id}</NavLink></td>
                        <td>{job.pickup}</td>
                        <td>{job.dropoff}</td>
                        <td>{job.status}</td>
                    </tr>)
        })
        setJobsURL(display)
    }

    useEffect(() => {
        getJobs()
    }, [])

    return (<div>
            <h2>Job Board</h2>
            <NavLink to='/createjob'><button>Create Job</button></NavLink>
            <button onClick={getJobs}>Refresh Data</button>
            <table>
                <thead>
                    <tr>
                        <th>Job ID</th>
                        <th>PickUP</th>
                        <th>DropOff</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {jobsURL}
                </tbody>
            </table>
            </div>)
}

const mapDispatchToProps = (dispatch) => {
    return {
        setJobs: (jobs) => dispatch({type: 'SET_JOBS', jobs: jobs})
    }
}

export default connect(null, mapDispatchToProps)(Jobs)