import React, { useState, useEffect } from 'react'
import OrderStatusCard from '../components/orderStatusCard'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Dialog from '../components/dialog'
import food from '/assets/bgOder.png'
import burgur from '/assets/burgur-top.png'

export default function statusJob() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const { jobId } = useParams()
    const [orders, setOrder] = useState([])
    const [job, setJob] = useState({})
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        async function getJobById() {
            try {
                const res = await axios({
                    url: import.meta.env.VITE_API + '/api/Job/ById?id=' + jobId,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                const now = new Date().getTime()
                console.log(now, res.data?.time, res.data.status)
                if (now > res.data?.time && res.data.status === 'unfinish') {
                    console.log('show alert')
                    setOpen(true)
                }
                setJob(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        getJobById()
    }, [])

    console.log(job)

    useEffect(() => {
        //fetch order
        async function getOrderById() {
            try {
                const res = await axios({
                    url:
                        import.meta.env.VITE_API +
                        '/api/Order/List?jobId=' +
                        jobId,
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                let orders = []
                orders = await Promise.all(
                    res.data.map(async (e) => {
                        const userProfile = await getProfileById(e.owner)
                        return {
                            ...e,
                            owner: userProfile,
                        }
                    }),
                )

                setOrder(orders.reverse())
            } catch (error) {
                console.log(error)
            }
        }

        //fetch profile
        async function getProfileById(id) {
            try {
                const res = await axios({
                    url: import.meta.env.VITE_API + '/api/Users/ById?id=' + id,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                return res.data
            } catch (error) {
                console.log(error)
            }
        }

        getOrderById()
        const interval = setInterval(() => {
            getOrderById()
        }, 5000)
        return () => clearInterval(interval)
    }, [jobId])

    //Update Status to "CLOSE"
    async function closeJobHandler(state) {
        if (state) {
            try {
                const res = await axios({
                    url:
                        import.meta.env.VITE_API +
                        '/api/Job/UpdateStatusToClose?id=' +
                        jobId,
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token',
                        )}`,
                    },
                })
                toast.success('🍔 คุณได้ปิดรับออเดอร์เพิ่มเติมแล้ว', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                })
                setOpen(false)
                setTimeout(() => {
                    return location.reload()
                }, 2000)
            } catch (error) {
                console.log(error)
            }
        } else {
            setOpen(false)
        }
    }

    //Update Status to "FINISH"
    async function finishJobHandler() {
        console.log('click')
        try {
            const res = await axios({
                url:
                    import.meta.env.VITE_API +
                    '/api/Job/UpdateStatusToFinish?id=' +
                    jobId,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            toast.success('🍔 คุณได้ปิดจ๊อบนี้แล้ว', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
            setTimeout(() => {
                return navigate('/')
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }

    function convertTimestampToTime(timestamp) {
        const temp = new Date(timestamp)
        const H = ('00' + temp.getHours()).slice(-2)
        const M = ('00' + temp.getMinutes()).slice(-2)
        return `${H} : ${M}`
        // return temp.toISOString()
    }

    return (
        <div>
            {/* dialog */}
            <Dialog
                text={'เกินเวลา'}
                open={open}
                handleConfirm={closeJobHandler}
                textConfirm={'closeJob'}
            />
            <ToastContainer />
            <nav className="shadow-xl text-center font-Kanit text-2xl">
                <div className="bg-white text-xl flex justify-center relative">
                    <img src={food} className="opacity-25 w-[100%] " />
                    <div className="flex justify-center absolute top-0 left-0 w-[100%]">
                        <div className="bg-white rounded-3xl w-1/4 border-4 border-green-800 m-[3%]">
                            <div className="mt-10">
                                <p
                                    className={`mb-3 ${
                                        job.status === 'unfinish'
                                            ? 'text-green-500'
                                            : job.status === 'close'
                                            ? 'text-red-500'
                                            : job.status === 'finish'
                                            ? 'text-gray-700'
                                            : ''
                                    }`}
                                >
                                    สถานะ :{' '}
                                    {job.status === 'unfinish'
                                        ? 'คุณกำลังเปิดรับออเดอร์อยู่'
                                        : job.status === 'close'
                                        ? 'คุณปิดรับออเดอร์แล้ว'
                                        : job.status === 'finish'
                                        ? 'คุณสิ้นสุดภารกิจนี้แล้ว'
                                        : 'error'}
                                </p>
                                <p>ร้านที่คุณจะไป {job.restaurants}</p>
                                <p className="text-3xl my-3">
                                    {convertTimestampToTime(job.time)} น.
                                </p>
                                <p>
                                    รับฝากแล้ว: {job.count} / {job.limit} กล่อง{' '}
                                </p>
                                <p>หมายเหตุ: {job.description}</p>
                            </div>

                            <div>
                                {job.status === 'unfinish' && (
                                    <button
                                        className="bg-red-400 m-2 p-4 hover:scale-110 rounded-xl"
                                        onClick={() => closeJobHandler(true)}
                                    >
                                        ปิดการรับฝาก
                                    </button>
                                )}
                                {job.status === 'close' && (
                                    <button
                                        className="bg-red-400 m-2 p-4 hover:scale-110 rounded-xl"
                                        onClick={() => finishJobHandler()}
                                    >
                                        สิ้นสุดการฝากซื้อครั้งนี้
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <img
                        src={burgur}
                        className="absolute right-[25%] rotate-[0.5rad] top-[-20%] scale-[40%]"
                    />
                </div>
                <div className="flex justify-around h-16">
                    <button
                        className={`w-1/2 ; ${
                            page === 0
                                ? 'border-b-4 border-green-600 '
                                : 'bg-gray-300'
                        }`}
                        onClick={() => setPage(0)}
                    >
                        ใหม่
                    </button>
                    <button
                        className={`w-1/2 ; ${
                            page === 1
                                ? 'border-b-4 border-green-600 '
                                : 'bg-gray-300'
                        }`}
                        onClick={() => setPage(1)}
                    >
                        ตอบรับแล้ว
                    </button>
                </div>
            </nav>
            {page === 0 && (
                <div className="flex justify-center items-center flex-col pt-8 animate-in duration-500 slide-in-from-left">
                    {orders
                        .filter((e) => e.status == 'waiting')
                        .map((e, idx) => (
                            <OrderStatusCard {...e} key={idx} />
                        ))}
                </div>
            )}
            {page === 1 && (
                <div className="flex justify-center items-center flex-col pt-8 animate-in duration-500 slide-in-from-right">
                    {orders
                        .filter((e) => e.status == 'accept')
                        .map((e, idx) => (
                            <OrderStatusCard {...e} key={idx} />
                        ))}
                    <div className="w-full flex justify-center items-center p-8 flex-col">
                        <div className="w-9/12 border-b-2 mb-2 border-black"></div>
                        reject
                    </div>
                    <div className="w-full flex flex-col items-center">
                        {orders
                            .filter((e) => e.status == 'reject')
                            .map((e, idx) => (
                                <OrderStatusCard {...e} key={idx} />
                            ))}
                    </div>
                </div>
            )}
        </div>
    )
}
