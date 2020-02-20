import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

function CourierDetails(props) {
    const [courier, setCourier] = useState([])
    const [jobs, setJobs] = useState([])
    const [jobsURL, setJobsURL] = useState([])

    const getInfo = () => {
        const filteredCourier = props.roster.filter(c => c.id == props.match.params.id)
        const filteredJobs = props.jobs.filter(j => j.courier == props.match.params.id)
        setInfo(filteredCourier[0], filteredJobs)
    }

    const getFilterInfo = (e) => {
        if(e.target.value == 'ALL') {
            setDisplay(jobs)
        } else if(e.target.value == 'ACTIVE') {
            const filteredJobs = jobs.filter(j => j.status != 'DELIVERED')
            setDisplay(filteredJobs)
        } else {
            const filteredJobs = jobs.filter(j => j.status == e.target.value)
            setDisplay(filteredJobs)
        }
    }

    const setInfo = (courierInfo, jobsInfo) => {
        setCourier(courierInfo)
        setJobs(jobsInfo)
        setDisplay(jobsInfo)
    }

    const setDisplay = (jobList) => {
        let display = jobList.map((job) => {
            return (<tr key={job.id}>
                        <td>{job.id}</td>
                        <td>{job.pickup}</td>
                        <td>{job.dropoff}</td>
                        <td>{job.status}</td>
                    </tr>)
        })
        setJobsURL(display)
    }

    useEffect(() => {
        getInfo()
    }, [])

    return (<div>
                <h2>Courier Details</h2>
                <NavLink to = '/dashboard'><button>Back</button></NavLink>
                <select name='role' onChange={getFilterInfo}>
                    <option value='ALL'>All</option>
                    <option value='ACTIVE'>Active</option>
                    <option value='UNASSIGNED'>Unassigned</option>
                    <option value='PENDING'>Pending</option>
                    <option value='ACCEPTED'>Accepted</option>
                    <option value='PICKEDUP'>Picked Up</option>
                    <option value='DELIVERED'>Delivered</option>
                </select>
                <table>
                    <thead>
                        <tr>
                            <th>Courier ID</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{courier.id}</td>
                            <td>{courier.username}</td>
                            <td>{courier.phone}</td>
                            <td>{courier.email}</td> 
                        </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th>Job ID</th>
                            <th>Pickup</th>
                            <th>Dropoff</th>
                            <th>status</th>
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
        jobs: state.jobs,
        roster: state.roster
    }
}

export default connect(mapStateToProps)(CourierDetails)