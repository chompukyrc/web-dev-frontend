import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import NewJobModal from '../components/newJobModal'
import JobCard from '../components/jobCard'
import NewOrderModal from '../components/newOrderModal'
import MyJobCard from '../components/myJobCard'
import food from '/assets/coverfood.png'

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
                        e.myOrder.status === 'accept',
                )

                const myOrder_unfinish_accept = [...temp]

                // ============ Calculate myOrder_unfinish_reject ===============
                temp = [...jobs]

                temp = temp.filter(
                    (e) =>
                        e.myOrder !== undefined &&
                        e.status === 'unfinish' &&
                        e.myOrder.status === 'reject',
                )

                const myOrder_unfinish_reject = [...temp]

                // ============ Calculate myOrder_close_accept ===============
                temp = [...jobs]

                temp = temp.filter(
                    (e) =>
                        e.myOrder !== undefined &&
                        e.status === 'close' &&
                        e.myOrder.status === 'accept',
                )

                const myOrder_close_accept = [...temp]

                // ============ Calculate myOrder_close_reject ===============
                temp = [...jobs]

                temp = temp.filter(
                    (e) =>
                        e.myOrder !== undefined &&
                        e.status === 'close' &&
                        e.myOrder.status === 'reject',
                )

                const myOrder_close_reject = [...temp]

                // ============ Calculate myOrder_finish_done ===============
                temp = [...jobs]

                temp = temp.filter(
                    (e) =>
                        e.myOrder !== undefined &&
                        e.status === 'finish' &&
                        e.myOrder.status === 'done',
                )

                const myOrder_finish_done = [...temp]

                // ============ Calculate myOrder_finish_reject ===============
                temp = [...jobs]

                temp = temp.filter(
                    (e) =>
                        e.myOrder !== undefined &&
                        e.status === 'finish' &&
                        e.myOrder.status === 'reject',
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

    const interestcards = [
        {
            key: 1,
            name: 'เทคโน',
        },
        {
            key: 2,
            name: 'เทคโน',
        },
        {
            key: 3,
            name: 'เทคโน',
        },
        {
            key: 4,
            name: 'เทคโน',
        },
        {
            key: 5,
            name: 'เทคโน',
        },
        {
            key: 6,
            name: 'เทคโน',
        },
    ]

    function showJobDetailHandle(job) {
        setJob(job)
    }

    return (
        <div className="font-Kanit">
            <ToastContainer />
            <NewOrderModal job={job} setJob={setJob} />

            <NewJobModal showModal={showModal} setShowModal={setShowModal} />

            <div className=" bg-white text-xl">
                <img
                    src={food}
                    className="rounded-b-[100px] w-screen opacity-80"
                />
                <div className="bg-white h-20  ">
                    <p className="p-6 text-2xl text-left ml-40">
                        ร้านที่คุณอาจสนใจ 🔍{' '}
                    </p>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-row flex-wrap h-20 w-3/4">
                        {interestcards.map((interest, idx) => {
                            return (
                                <button
                                    key={idx}
                                    className="mx-5 bg-green-600 h-8 w-auto rounded-full text-center drop-shadow-sm hover:bg-green-800"
                                >
                                    <p className="px-6 text-white">
                                        {interest.name}
                                    </p>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
            <nav className="text-center text-2xl">
                <div className="flex justify-start h-16 bg-white">
                    <button
                        className={`w-1/3 ; ${
                            page === 0
                                ? 'border-b-4 border-green-600 bg-gray-200'
                                : 'bg-gray-300'
                        }`}
                        onClick={() => setPage(0)}
                    >
                        ใครไปซื้อบ้างน้า
                    </button>
                    <button
                        className={`w-1/3 ; ${
                            page === 1
                                ? 'border-b-4 border-green-600 bg-gray-200'
                                : 'bg-gray-300'
                        }`}
                        onClick={() => setPage(1)}
                    >
                        ดูที่สั่งไปแล้ว
                    </button>
                </div>
            </nav>

            {page === 0 && (
                <div className=" px-64 py-12 grid grid-cols-3 gap-x-24 gap-y-16 animate-in duration-500 slide-in-from-right">
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
                <div className="flex justify-center items-center flex-col pt-8 animate-in duration-500 slide-in-from-left">
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
                    <div>
                        {jobsCetagory.myOrder_unfinish_accept.map((e, idx) => (
                            <MyJobCard
                                key={idx}
                                {...e}
                                profile={profile}
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
                    <div>
                        {jobsCetagory.myOrder_unfinish_reject.map((e, idx) => (
                            <MyJobCard
                                key={idx}
                                {...e}
                                profile={profile}
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
                    <div>
                        {jobsCetagory.myOrder_finish_done.map((e, idx) => (
                            <MyJobCard
                                key={idx}
                                {...e}
                                profile={profile}
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
                    <div>
                        {jobsCetagory.myOrder_finish_reject.map((e, idx) => (
                            <MyJobCard
                                key={idx}
                                {...e}
                                profile={profile}
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
                    <div>
                        {jobsCetagory.myOrder_close_accept.map((e, idx) => (
                            <MyJobCard
                                key={idx}
                                {...e}
                                profile={profile}
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
                    <div>
                        {jobsCetagory.myOrder_close_reject.map((e, idx) => (
                            <MyJobCard
                                key={idx}
                                {...e}
                                profile={profile}
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

            <div>{JSON.stringify(profile)}</div>
        </div>
    )
}

export default home
