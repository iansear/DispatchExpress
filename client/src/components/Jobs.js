import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

function Jobs(props) {
    const [jobsURL, setJobsURL] = useState([])


    const getFilterInfo = (e) => {
        if(e.target.value == 'ALL') {
            setDisplay(props.jobs)
        } else if(e.target.value == 'ACTIVE') {
            const filteredJobs = props.jobs.filter(j => j.status != 'DELIVERED')
            setDisplay(filteredJobs)
        } else {
            const filteredJobs = props.jobs.filter(j => j.status == e.target.value)
            setDisplay(filteredJobs)
        }
    }

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
            <select name='role' onChange={getFilterInfo}>
                <option value='ALL'>All</option>
                <option value='ACTIVE'>Active</option>
                <option value='UNASSIGNED'>Unassigned</option>
                <option value='PENDING'>Pending</option>
                <option value='ACCEPTED'>Accepted</option>
                <option value='PICKEDUP'>Picked Up</option>
                <option value='DELIVERED'>Delivered</option>
            </select>
            <table cellSpacing='15'>
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

const mapStateToProps = (state) => {
    return {
        jobs: state.jobs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setJobs: (jobs) => dispatch({type: 'SET_JOBS', jobs: jobs})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs)