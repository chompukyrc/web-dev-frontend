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
                return navigate('/statusJob/' + e.id)
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
                <div
                    className="cursor-pointer p-4 rounded-lg bg-gray-200 hover:bg-gray-100 h-40 flex items-center justify-center"
                    onClick={() => setShowModal(true)}
                >
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-green-600 rounded-full text-white w-16"
                    >
                        <i className="mdi mdi-plus text-6xl"></i>
                    </button>
                </div>
            </div>
            <div>{JSON.stringify(profile)}</div>
        </div>
    )
}

export default home
