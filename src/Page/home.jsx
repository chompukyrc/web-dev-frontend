import React, { useState, useEffect } from 'react'
import _ from 'lodash'
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
    const [jobsCetagory, setJobsCetagory] = useState({
        notMyOrder: [],
        myOrder_unfinish_accept: [],
        myOrder_unfinish_reject: [],
        myOrder_close_accept: [],
        myOrder_close_reject: [],
        myOrder_finish_done: [],
        myOrder_finish_reject: [],
    })
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

                return res.data
            } catch (error) {
                console.log(error)
            }
        }

        // Fetch MY order
        const fetchMyOrder = async () => {
            try {
                const res = await axios({
                    url: import.meta.env.VITE_API + '/api/Order/GetMyOrder',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                return res.data
            } catch (error) {
                console.log(error)
            }
        }

        const processJobAndMyorder = async () => {
            try {
                let jobs = await fetchJob()
                const myOrder = await fetchMyOrder()

                jobs = jobs.map((e) => {
                    const orderOfThisJob = myOrder.find((_e) => _e.job === e.id)
                    return {
                        ...e,
                        myOrder: orderOfThisJob,
                        // generate Left ถ้า < 0 จะ display แค่ 0
                        left: Math.max(e.limit - e.count, 0),
                    }
                })

                console.log('กูจะเอาแบบนี้', jobs)

                // ============ Calculate notMyOrder ===============
                // reverse array -> show latest job first
                let temp = [...jobs]

                // Remove pass job (job.time < now)
                temp = temp.filter((e) => new Date().getTime() < e.time)

                // sort by newest
                temp.sort((a, b) => a.time - b.time)

                // move zero left (or less) to end of array
                temp.sort((a, b) => (a.left === 0) - (b.left === 0))

                // Check myOrder is undifined -> ยังไม่เคยสั่ง
                temp = temp.filter((e) => e.myOrder === undefined)
                const notMyOrder = [...temp]

                // ============ Calculate myOrder_unfinish_accept ===============
                temp = [...jobs]

                temp = temp.filter(
                    (e) =>
                        e.myOrder !== undefined &&
                        e.status === 'unfinish' &&
                        e.myOrder.orderStatus === 'accept',
                )

                const myOrder_unfinish_accept = [...temp]

                // ============ Calculate myOrder_unfinish_reject ===============
                temp = [...jobs]

                temp = temp.filter(
                    (e) =>
                        e.myOrder !== undefined &&
                        e.status === 'unfinish' &&
                        e.myOrder.orderStatus === 'reject',
                )

                const myOrder_unfinish_reject = [...temp]

                // ============ Calculate myOrder_close_accept ===============
                temp = [...jobs]

                temp = temp.filter(
                    (e) =>
                        e.myOrder !== undefined &&
                        e.status === 'close' &&
                        e.myOrder.orderStatus === 'accept',
                )

                const myOrder_close_accept = [...temp]

                // ============ Calculate myOrder_close_reject ===============
                temp = [...jobs]

                temp = temp.filter(
                    (e) =>
                        e.myOrder !== undefined &&
                        e.status === 'close' &&
                        e.myOrder.orderStatus === 'reject',
                )

                const myOrder_close_reject = [...temp]

                // ============ Calculate myOrder_finish_done ===============
                temp = [...jobs]

                temp = temp.filter(
                    (e) =>
                        e.myOrder !== undefined &&
                        e.status === 'finish' &&
                        e.myOrder.orderStatus === 'done',
                )

                const myOrder_finish_done = [...temp]

                // ============ Calculate myOrder_finish_reject ===============
                temp = [...jobs]

                temp = temp.filter(
                    (e) =>
                        e.myOrder !== undefined &&
                        e.status === 'finish' &&
                        e.myOrder.orderStatus === 'reject',
                )

                const myOrder_finish_reject = [...temp]

                setJobs(jobs)
                setJobsCetagory({
                    notMyOrder: notMyOrder,
                    myOrder_unfinish_accept: myOrder_unfinish_accept,
                    myOrder_unfinish_reject: myOrder_unfinish_reject,
                    myOrder_close_accept: myOrder_close_accept,
                    myOrder_close_reject: myOrder_close_reject,
                    myOrder_finish_done: myOrder_finish_done,
                    myOrder_finish_reject: myOrder_finish_reject,
                })

                console.log({
                    notMyOrder: notMyOrder,
                    myOrder_unfinish_accept: myOrder_unfinish_accept,
                    myOrder_unfinish_reject: myOrder_unfinish_reject,
                    myOrder_close_accept: myOrder_close_accept,
                    myOrder_close_reject: myOrder_close_reject,
                    myOrder_finish_done: myOrder_finish_done,
                    myOrder_finish_reject: myOrder_finish_reject,
                })
            } catch (error) {
                console.log(error)
            }
        }

        processJobAndMyorder()
        fetchProfile()
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

        // console.log(tempJob)
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
                    {jobsCetagory.notMyOrder.map((e, idx) => (
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
                    <p className="font-bold text-4xl text-center">
                        myOrder_unfinish_accept
                    </p>
                    <pre>
                        {JSON.stringify(
                            jobsCetagory.myOrder_unfinish_accept,
                            null,
                            2,
                        )}
                    </pre>
                    <div className=" px-64 py-12 grid grid-cols-3 gap-x-24 gap-y-16 ">
                        {jobsCetagory.myOrder_unfinish_accept.map((e, idx) => (
                            <JobCard
                                key={idx}
                                {...e}
                                onClick={() => showJobDetailHandle(e)}
                            />
                        ))}
                    </div>

                    <p className="font-bold text-4xl text-center">
                        myOrder_unfinish_reject
                    </p>
                    <pre>
                        {JSON.stringify(
                            jobsCetagory.myOrder_unfinish_reject,
                            null,
                            2,
                        )}
                    </pre>
                    <div className=" px-64 py-12 grid grid-cols-3 gap-x-24 gap-y-16 ">
                        {jobsCetagory.myOrder_unfinish_reject.map((e, idx) => (
                            <JobCard
                                key={idx}
                                {...e}
                                onClick={() => showJobDetailHandle(e)}
                            />
                        ))}
                    </div>

                    <p className="font-bold text-4xl text-center">
                        myOrder_finish_done
                    </p>
                    <pre>
                        {JSON.stringify(
                            jobsCetagory.myOrder_finish_done,
                            null,
                            2,
                        )}
                    </pre>
                    <div className=" px-64 py-12 grid grid-cols-3 gap-x-24 gap-y-16 ">
                        {jobsCetagory.myOrder_finish_done.map((e, idx) => (
                            <JobCard
                                key={idx}
                                {...e}
                                onClick={() => showJobDetailHandle(e)}
                            />
                        ))}
                    </div>

                    <p className="font-bold text-4xl text-center">
                        myOrder_finish_reject
                    </p>
                    <pre>
                        {JSON.stringify(
                            jobsCetagory.myOrder_finish_reject,
                            null,
                            2,
                        )}
                    </pre>
                    <div className=" px-64 py-12 grid grid-cols-3 gap-x-24 gap-y-16 ">
                        {jobsCetagory.myOrder_finish_reject.map((e, idx) => (
                            <JobCard
                                key={idx}
                                {...e}
                                onClick={() => showJobDetailHandle(e)}
                            />
                        ))}
                    </div>

                    <p className="font-bold text-4xl text-center">
                        myOrder_close_accept
                    </p>
                    <pre>
                        {JSON.stringify(
                            jobsCetagory.myOrder_close_accept,
                            null,
                            2,
                        )}
                    </pre>
                    <div className=" px-64 py-12 grid grid-cols-3 gap-x-24 gap-y-16 ">
                        {jobsCetagory.myOrder_close_accept.map((e, idx) => (
                            <JobCard
                                key={idx}
                                {...e}
                                onClick={() => showJobDetailHandle(e)}
                            />
                        ))}
                    </div>

                    <p className="font-bold text-4xl text-center">
                        myOrder_close_reject
                    </p>
                    <pre>
                        {JSON.stringify(
                            jobsCetagory.myOrder_close_reject,
                            null,
                            2,
                        )}
                    </pre>
                    <div className=" px-64 py-12 grid grid-cols-3 gap-x-24 gap-y-16 ">
                        {jobsCetagory.myOrder_close_reject.map((e, idx) => (
                            <JobCard
                                key={idx}
                                {...e}
                                onClick={() => showJobDetailHandle(e)}
                            />
                        ))}
                    </div>
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
