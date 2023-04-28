import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NewJobModal from '../components/newJobModal'
import JobCard from '../components/jobCard'
import NewOrderModal from '../components/newOrderModal'
import MyJobCard from '../components/myJobCard'
import food from '/assets/coverfood.png'
import cover from '/assets/cover2.png'
import { isRider } from '../utils/roleChecker'
import InterestCardContainer from '../components/interestCardContainer'

function home() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [profile, setProfile] = useState({})
    const [jobs, setJobs] = useState([])
    const [jobsCetagory, setJobsCetagory] = useState({
        notMyOrder: [],
        myOrder_unfinish_waiting: [],
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
    const [tab, setTab] = useState(0)
    const [selected, setSelected] = useState([])

    function handleSelected(item, state) {
        if (state) {
            const temp = selected.filter((e) => !(e.name === item.name))
            setSelected(temp)
        } else {
            setSelected([...selected, item])
        }
    }

    // Sidebar tabs
    const sidebars = [
        {
            title: 'ทั้งหมด',
        },
        { title: 'รอการยืนยัน' },
        { title: 'ยืนยันแล้ว' },
        { title: 'ดำเนินการอยู่' },
        { title: 'เสร็จสิ้นแล้ว' },
        { title: 'ถูกปฏิเสธ' },
    ]

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
                temp = temp.filter(
                    (e) => e.myOrder === undefined && e.status === 'unfinish',
                )
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

                // ============ Calculate myOrder_unfinish_waiting ===============
                temp = [...jobs]

                temp = temp.filter(
                    (e) =>
                        e.myOrder !== undefined &&
                        e.status === 'unfinish' &&
                        e.myOrder.status === 'waiting',
                )

                const myOrder_unfinish_waiting = [...temp]

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
                        e.myOrder.status === 'Done',
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
                    myOrder_unfinish_waiting: myOrder_unfinish_waiting,
                    myOrder_unfinish_accept: myOrder_unfinish_accept,
                    myOrder_unfinish_reject: myOrder_unfinish_reject,
                    myOrder_close_accept: myOrder_close_accept,
                    myOrder_close_reject: myOrder_close_reject,
                    myOrder_finish_done: myOrder_finish_done,
                    myOrder_finish_reject: myOrder_finish_reject,
                })

                // console.log({
                //     notMyOrder: notMyOrder,
                //     myOrder_unfinish_waiting: myOrder_unfinish_waiting,
                //     myOrder_unfinish_accept: myOrder_unfinish_accept,
                //     myOrder_unfinish_reject: myOrder_unfinish_reject,
                //     myOrder_close_accept: myOrder_close_accept,
                //     myOrder_close_reject: myOrder_close_reject,
                //     myOrder_finish_done: myOrder_finish_done,
                //     myOrder_finish_reject: myOrder_finish_reject,
                // })
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
            if (e.owner === profile.id) console.log(e)
            if (e.owner === profile.id && e.status !== 'finish') {
                console.log('You r rider na!')
                return navigate('/statusJob/' + e.id)
            }
        })

        // console.log(tempJob)
    }, [profile, jobs])

    function showJobDetailHandle(job) {
        setJob(job)
    }

    return (
        <div className="font-Kanit">
            <NewOrderModal job={job} setJob={setJob} />

            <NewJobModal showModal={showModal} setShowModal={setShowModal} />

            <div className=" bg-white text-xl">
                <img
                    src={food}
                    className="rounded-b-[100px] w-screen opacity-80"
                />
                <InterestCardContainer
                    selected={selected}
                    handleSelected={handleSelected}
                />
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
                    <div className="w-1/3 ">
                        <img src={cover} className="h-16 w-screen opacity-75" />
                    </div>
                </div>
            </nav>

            {page === 0 && (
                <div className=" px-64 py-12 grid grid-cols-3 gap-x-24 gap-y-16 animate-in duration-500 slide-in-from-left">
                    {' '}
                    {/* Job Container */}
                    {jobsCetagory.notMyOrder
                        .filter((e) =>
                            selected.length > 0
                                ? selected
                                      .map((s) => s.name)
                                      .includes(e.restaurants)
                                : true,
                        )
                        .map((e, idx) => (
                            <JobCard
                                key={idx}
                                {...e}
                                onClick={() => showJobDetailHandle(e)}
                            />
                        ))}
                    {/* add Job container */}
                    {isRider([
                        ...jobsCetagory.myOrder_close_accept,
                        ...jobsCetagory.myOrder_close_reject,
                        ...jobsCetagory.myOrder_unfinish_accept,
                        ...jobsCetagory.myOrder_unfinish_reject,
                        ...jobsCetagory.myOrder_unfinish_waiting,
                    ]) == false && (
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
                    )}
                </div>
            )}

            {page === 1 && (
                <div className="flex animate-in duration-500 slide-in-from-right">
                    {/* Side Bar */}
                    <div className="bg-green-500 w-1/6 h-screen left-0 flex flex-col">
                        {sidebars.map((e, idx) => (
                            <button
                                className={
                                    'py-8 bg-green-600 hover:bg-green-800 ' +
                                    (tab === idx ? ' bg-red-300 ' : ' ')
                                }
                                key={idx}
                                onClick={() => setTab(idx)}
                            >
                                {e.title}
                            </button>
                        ))}
                    </div>

                    {/* ALL */}
                    {tab === 0 && (
                        <div className="flex flex-col w-full">
                            <p className="mt-12 font-semibold text-2xl m-4 text-center">
                                ออเดอร์ที่รอการยืนยัน
                            </p>
                            {jobsCetagory.myOrder_unfinish_waiting.length >
                            0 ? (
                                <div>
                                    {jobsCetagory.myOrder_unfinish_waiting.map(
                                        (e, idx) => (
                                            <MyJobCard
                                                key={idx}
                                                {...e}
                                                profile={profile}
                                                onClick={() =>
                                                    showJobDetailHandle(e)
                                                }
                                            />
                                        ),
                                    )}
                                </div>
                            ) : (
                                <div className="flex justify-center items-center text-gray-400">
                                    ไม่มีออเดอร์ที่รอการยืนยัน
                                </div>
                            )}
                            <p className="mt-12 font-semibold text-2xl m-4 text-center">
                                ออเดอร์ที่ได้รับการยืนยันแล้ว
                            </p>
                            {jobsCetagory.myOrder_unfinish_accept.length > 0 ? (
                                <div>
                                    {jobsCetagory.myOrder_unfinish_accept.map(
                                        (e, idx) => (
                                            <MyJobCard
                                                key={idx}
                                                {...e}
                                                profile={profile}
                                                onClick={() =>
                                                    showJobDetailHandle(e)
                                                }
                                            />
                                        ),
                                    )}
                                </div>
                            ) : (
                                <div className="flex justify-center items-center text-gray-400">
                                    ไม่มีออเดอร์ที่ได้รับการยืนยันแล้ว
                                </div>
                            )}
                            <p className="mt-12 font-semibold text-2xl m-4 text-center">
                                ออเดอร์ที่กำลังดำเนินการ
                            </p>
                            {jobsCetagory.myOrder_close_accept.length > 0 ? (
                                <div>
                                    {jobsCetagory.myOrder_close_accept.map(
                                        (e, idx) => (
                                            <MyJobCard
                                                key={idx}
                                                {...e}
                                                profile={profile}
                                                onClick={() =>
                                                    showJobDetailHandle(e)
                                                }
                                            />
                                        ),
                                    )}
                                </div>
                            ) : (
                                <div className="flex justify-center items-center text-gray-400">
                                    ไม่มีออเดอร์ที่กำลังดำเนินการ
                                </div>
                            )}

                            {/* line */}
                            <div className="w-full flex justify-center items-center p-8 flex-col">
                                <div className="w-9/12 border-b-2 mb-2 border-black">
                                    reject & done
                                </div>
                                <p className="mt-12 font-semibold text-2xl m-4 text-center">
                                    ออเดอร์ที่เสร็จสิ้นแล้ว
                                </p>
                                {jobsCetagory.myOrder_finish_done.length > 0 ? (
                                    <div>
                                        {jobsCetagory.myOrder_finish_done.map(
                                            (e, idx) => (
                                                <MyJobCard
                                                    key={idx}
                                                    {...e}
                                                    profile={profile}
                                                    onClick={() =>
                                                        showJobDetailHandle(e)
                                                    }
                                                />
                                            ),
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center text-gray-400">
                                        ไม่มีออเดอร์ที่เสร็จสิ้นแล้ว
                                    </div>
                                )}
                                <p className="mt-12 font-semibold text-2xl m-4 text-center">
                                    ออเดอร์ที่ถูกปฏิเสธ
                                </p>
                                {jobsCetagory.myOrder_unfinish_reject.length +
                                    jobsCetagory.myOrder_close_reject.length +
                                    jobsCetagory.myOrder_finish_reject.length >
                                0 ? (
                                    <div>
                                        <div>
                                            {jobsCetagory.myOrder_unfinish_reject.map(
                                                (e, idx) => (
                                                    <MyJobCard
                                                        key={idx}
                                                        {...e}
                                                        profile={profile}
                                                        onClick={() =>
                                                            showJobDetailHandle(
                                                                e,
                                                            )
                                                        }
                                                    />
                                                ),
                                            )}
                                        </div>
                                        <div>
                                            {jobsCetagory.myOrder_close_reject.map(
                                                (e, idx) => (
                                                    <MyJobCard
                                                        key={idx}
                                                        {...e}
                                                        profile={profile}
                                                        onClick={() =>
                                                            showJobDetailHandle(
                                                                e,
                                                            )
                                                        }
                                                    />
                                                ),
                                            )}
                                        </div>
                                        <div>
                                            {jobsCetagory.myOrder_finish_reject.map(
                                                (e, idx) => (
                                                    <MyJobCard
                                                        key={idx}
                                                        {...e}
                                                        profile={profile}
                                                        onClick={() =>
                                                            showJobDetailHandle(
                                                                e,
                                                            )
                                                        }
                                                    />
                                                ),
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center text-gray-400">
                                        ไม่มีออเดอร์ที่ถูกปฏิเสธ
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* WAITING */}
                    {tab === 1 && (
                        <div className="flex flex-col w-full">
                            <p className="mt-12 font-semibold text-2xl m-4 text-center">
                                ออเดอร์ที่รอการยืนยัน
                            </p>
                            {jobsCetagory.myOrder_unfinish_waiting.length >
                            0 ? (
                                <div>
                                    {jobsCetagory.myOrder_unfinish_waiting.map(
                                        (e, idx) => (
                                            <MyJobCard
                                                key={idx}
                                                {...e}
                                                profile={profile}
                                                onClick={() =>
                                                    showJobDetailHandle(e)
                                                }
                                            />
                                        ),
                                    )}
                                </div>
                            ) : (
                                <div className="flex justify-center items-center text-gray-400">
                                    ไม่มีออเดอร์ที่รอการยืนยัน
                                </div>
                            )}
                        </div>
                    )}

                    {tab === 2 && (
                        <div className="flex flex-col w-full">
                            <p className="mt-12 font-semibold text-2xl m-4 text-center">
                                ออเดอร์ที่ได้รับการยืนยันแล้ว
                            </p>
                            {/* myOrder_unfinish_accept */}
                            {jobsCetagory.myOrder_unfinish_accept.length > 0 ? (
                                <div>
                                    {jobsCetagory.myOrder_unfinish_accept.map(
                                        (e, idx) => (
                                            <MyJobCard
                                                key={idx}
                                                {...e}
                                                profile={profile}
                                                onClick={() =>
                                                    showJobDetailHandle(e)
                                                }
                                            />
                                        ),
                                    )}
                                </div>
                            ) : (
                                <div className="flex justify-center items-center text-gray-400">
                                    ไม่มีออเดอร์ที่ได้รับการยืนยันแล้ว
                                </div>
                            )}
                        </div>
                    )}

                    {tab === 3 && (
                        <div className="flex flex-col w-full">
                            <p className="mt-12 font-semibold text-2xl m-4 text-center">
                                ออเดอร์ที่กำลังดำเนินการอยู่
                            </p>
                            {/* myOrder_close_accept */}
                            {jobsCetagory.myOrder_close_accept.length > 0 ? (
                                <div>
                                    {jobsCetagory.myOrder_close_accept.map(
                                        (e, idx) => (
                                            <MyJobCard
                                                key={idx}
                                                {...e}
                                                profile={profile}
                                                onClick={() =>
                                                    showJobDetailHandle(e)
                                                }
                                            />
                                        ),
                                    )}
                                </div>
                            ) : (
                                <div className="flex justify-center items-center text-gray-400">
                                    ไม่มีออเดอร์ที่กำลังดำเนินการอยู่
                                </div>
                            )}
                        </div>
                    )}

                    {tab === 4 && (
                        <div className="flex flex-col w-full">
                            <p className="mt-12 font-semibold text-2xl m-4 text-center">
                                ออเดอร์ที่เสร็จสิ้นแล้ว
                            </p>
                            {/* myOrder_finish_done */}
                            {jobsCetagory.myOrder_finish_done.length > 0 ? (
                                <div>
                                    {jobsCetagory.myOrder_finish_done.map(
                                        (e, idx) => (
                                            <MyJobCard
                                                key={idx}
                                                {...e}
                                                profile={profile}
                                                onClick={() =>
                                                    showJobDetailHandle(e)
                                                }
                                            />
                                        ),
                                    )}
                                </div>
                            ) : (
                                <div className="flex justify-center items-center text-gray-400">
                                    ไม่มีออเดอร์ที่เสร็จสิ้นแล้ว
                                </div>
                            )}
                        </div>
                    )}

                    {tab === 5 && (
                        <div className="flex flex-col w-full">
                            <p className="mt-12 font-semibold text-2xl m-4 text-center">
                                ออเดอร์ที่ถูกปฏิเสธ
                            </p>
                            {jobsCetagory.myOrder_unfinish_reject.length +
                                jobsCetagory.myOrder_close_reject.length +
                                jobsCetagory.myOrder_finish_reject.length >
                            0 ? (
                                <div>
                                    <div>
                                        {jobsCetagory.myOrder_unfinish_reject.map(
                                            (e, idx) => (
                                                <MyJobCard
                                                    key={idx}
                                                    {...e}
                                                    profile={profile}
                                                    onClick={() =>
                                                        showJobDetailHandle(e)
                                                    }
                                                />
                                            ),
                                        )}
                                    </div>
                                    <div>
                                        {jobsCetagory.myOrder_close_reject.map(
                                            (e, idx) => (
                                                <MyJobCard
                                                    key={idx}
                                                    {...e}
                                                    profile={profile}
                                                    onClick={() =>
                                                        showJobDetailHandle(e)
                                                    }
                                                />
                                            ),
                                        )}
                                    </div>
                                    <div>
                                        {jobsCetagory.myOrder_finish_reject.map(
                                            (e, idx) => (
                                                <MyJobCard
                                                    key={idx}
                                                    {...e}
                                                    profile={profile}
                                                    onClick={() =>
                                                        showJobDetailHandle(e)
                                                    }
                                                />
                                            ),
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-center items-center text-gray-400">
                                    ไม่มีออเดอร์ที่ถูกปฏิเสธ
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
            {/* <div>{JSON.stringify(profile)}</div> */}
        </div>
    )
}

export default home
