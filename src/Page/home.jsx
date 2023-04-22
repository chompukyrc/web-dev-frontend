import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import NewJobModal from '../components/newJobModal'
import JobCard from '../components/jobCard'
import NewOrderModal from '../components/newOrderModal'
import MyJobCard from '../components/myJobCard'

function home() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [profile, setProfile] = useState({})
    const [jobs, setJobs] = useState([])
    const [jobsDisplay, setJobsDisplay] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [job, setJob] = useState(false)
    const [page, setPage] = useState(1)

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

                // reverse array -> show latest job first
                let temp = res.data

                // Remove pass job (job.time < now)
                temp = temp.filter((e) => new Date().getTime() < e.time)

                // generate Left ถ้า < 0 จะ display แค่ 0
                temp = temp.map((e) => ({
                    ...e,
                    left: Math.max(e.limit - e.count, 0),
                }))

                // sort by newest
                temp.sort((a, b) => a.time - b.time)

                // move zero left (or less) to end of array
                temp.sort((a, b) => (a.left === 0) - (b.left === 0))

                setJobs(res.data)
                setJobsDisplay(temp)
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
        <div className="">
            <ToastContainer />
            <NewOrderModal job={job} setJob={setJob} />

            <NewJobModal showModal={showModal} setShowModal={setShowModal} />

            <nav className="shadow-xl text-center">
                <div className="bg-white m-0 h-20  text-xl">
                    <p className="p-6 text-2xl ">HOME</p>
                </div>
                <div className="flex justify-around h-16">
                    <button
                        className={`font-bold text-lg w-1/2 ; ${
                            page === 0
                                ? 'border-b-4 border-green-600 '
                                : 'bg-gray-300'
                        }`}
                        onClick={() => setPage(0)}
                    >
                        ALL Jobs
                    </button>
                    <button
                        className={`font-bold text-lg w-1/2 ; ${
                            page === 1
                                ? 'border-b-4 border-green-600 '
                                : 'bg-gray-300'
                        }`}
                        onClick={() => setPage(1)}
                    >
                        My Jobs
                    </button>
                </div>
            </nav>

            {page === 0 && (
                <div className=" px-64 py-12 grid grid-cols-3 gap-x-24 gap-y-16 ">
                    {' '}
                    {/* Job Container */}
                    {jobsDisplay.map((e, idx) => (
                        <JobCard
                            key={idx}
                            {...e}
                            onClick={() => showJobDetailHandle(e)}
                        />
                    ))}
                    {/* add Job container */}
                    <div
                        className="cursor-pointer p-4 rounded-lg bg-gray-200 hover:bg-gray-100 h-56 flex items-center justify-center"
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
            )}
            {page === 1 && (
                <div className="flex justify-center items-center flex-col pt-8 ">
                    <MyJobCard />
                    {/* line */}
                    <div className="w-full flex justify-center items-center p-8 flex-col">
                        <div className="w-9/12 border-b-2 mb-2 border-black"></div>
                        reject & done
                    </div>
                </div>
            )}

            {/* <div>{JSON.stringify(profile)}</div> */}
        </div>
    )
}

export default home
