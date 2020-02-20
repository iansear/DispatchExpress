import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import Menu from './Menu'

function Manifest(props) {
    const [jobsURL, setJobsURL] = useState([])

    const getJobs = () => {
        const id = localStorage.getItem('id')
        const token = localStorage.getItem('token')
        const url = 'http://localhost:3001/job/myjobs/' + id
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
            const details = '/jobdetailscourier/' + job.id
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
            <Menu />
            <div class='details'>
            <h1>Manifest</h1>
            <div>
                <button onClick={getJobs}>Refresh Data</button>
                <NavLink to='/history'><button>History</button></NavLink>
            </div>
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
            </div>
            </div>)
}

const mapDispatchToProps = (dispatch) => {
    return {
        setJobs: (jobs) => dispatch({type: 'SET_JOBS', jobs: jobs})
    }
}

export default connect(null, mapDispatchToProps)(Manifest)