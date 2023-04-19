import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import NewJobModal from '../components/newJobModal'
import JobCard from '../components/jobCard'
import NewOrderModal from '../components/newOrderModal'

function home() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [profile, setProfile] = useState({})
    const [jobs, setJobs] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [job, setJob] = useState(false)

    useEffect(() => {
        // Fetch Profile
        const fetchProfile = async () => {
            try {
                const res = await axios({
                    url: import.meta.env.VITE_API + '/api/Users/Profile',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setProfile(res.data)
                // console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        // Fetch Jobs
        const fetchJob = async () => {
            try {
                const res = await axios({
                    url: import.meta.env.VITE_API + '/api/Job/List',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                setJobs(res.data.reverse())
            } catch (error) {
                console.log(error)
            }
        }

        fetchProfile()
        fetchJob()
    }, [])

    useEffect(() => {
        // console.log(profile, jobs)
        let tempJob = []
        jobs.forEach(async (e) => {
            if (e.owner === profile.id) {
                console.log('Your r rider na!')
                return navigate('/statusJob/' + e.id) ////////////////////////////////////////////////////////////
            }
        })

        console.log(tempJob)
    }, [profile, jobs])

    function showJobDetailHandle(job) {
        setJob(job)
    }

    return (
        <div className="px-64 py-12">
            <ToastContainer />
            <NewOrderModal job={job} setJob={setJob} />
            <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-600 rounded-full absolute right-0 bottom-0 text-white w-24 h-24 m-8"
            >
                <i className="mdi mdi-plus text-8xl"></i>
            </button>
            <NewJobModal showModal={showModal} setShowModal={setShowModal} />

            {/* Job Container */}
            <div className=" grid grid-cols-3 gap-x-24 gap-y-16 ">
                {jobs.map((e, idx) => (
                    <JobCard
                        key={idx}
                        {...e}
                        onClick={() => showJobDetailHandle(e)}
                    />
                ))}
            </div>
            <div>{JSON.stringify(profile)}</div>
        </div>
    )
}

export default home
