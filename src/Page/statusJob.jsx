import React, { useState, useEffect } from 'react'
import OrderStatusCard from '../components/orderStatusCard'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function statusJob() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const { jobId } = useParams()
    const [orders, setOrder] = useState([])
    const [job, setJob] = useState({})
    const [page, setPage] = useState(0)

    useEffect(() => {
        async function getJobById() {
            try {
                const res = await axios({
                    url: import.meta.env.VITE_API + '/api/Job/ById?id=' + jobId,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                const now = new Date().setDate(24)
                if (now > res.data?.time) {
                    console.log('show alert')
                }
                setJob(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        getJobById()
    }, [])

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
    async function closeJobHandler() {
        try {
            const res = await axios({
                url:
                    import.meta.env.VITE_API +
                    '/api/Job/UpdateStatusToClose?id=' +
                    jobId,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
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
            setTimeout(() => {
                return location.reload()
            }, 2000)
        } catch (error) {
            console.log(error)
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
            <ToastContainer />
            <nav className="shadow-xl text-center">
                <div className="bg-white m-0 h-30 text-xl">
                    {/* <p className="p-6 text-2xl ">Your Oder</p> */}
                    <div className="bg-red-300">
                        <p>ร้านที่คุณจะไป: {job.restaurants}</p>
                        <p>
                            จะออกไปซื้อเวลา: {convertTimestampToTime(job.time)}{' '}
                            น.
                        </p>
                        <p>รับฝากสูงสุด: {job.limit} กล่อง </p>
                        <p>หมายเหตุ: {job.description}</p>
                        <p>
                            สถานะ:{' '}
                            {job.status === 'unfinish'
                                ? 'คุณกำลังเปิดรับออเดอร์อยู่'
                                : job.status === 'close'
                                ? 'คุณปิดรับออเดอร์แล้ว'
                                : job.status === 'finish'
                                ? 'คุณสิ้นสุดภารกิจนี้แล้ว'
                                : 'error'}
                        </p>
                        {/* <pre>{JSON.stringify(job, null, 2)}</pre> */}
                    </div>
                    {job.status === 'unfinish' && (
                        <button
                            className="bg-red-400 m-8 p-4 hover:scale-110 rounded-xl"
                            onClick={() => closeJobHandler()}
                        >
                            ปิดรับออเดอร์เพิ่ม
                        </button>
                    )}
                    {job.status === 'close' && (
                        <button
                            className="bg-red-400 m-8 p-4 hover:scale-110 rounded-xl"
                            onClick={() => finishJobHandler()}
                        >
                            สิ้นสุดการฝากซื้อครั้งนี้
                        </button>
                    )}
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
                        New Oder
                    </button>
                    <button
                        className={`font-bold text-lg w-1/2 ; ${
                            page === 1
                                ? 'border-b-4 border-green-600 '
                                : 'bg-gray-300'
                        }`}
                        onClick={() => setPage(1)}
                    >
                        Accepted Order
                    </button>
                </div>
            </nav>
            {page === 0 && (
                <div className="flex justify-center items-center flex-col pt-8 animate-in duration-500 slide-in-from-right">
                    {orders
                        .filter((e) => e.status == 'waiting')
                        .map((e, idx) => (
                            <OrderStatusCard {...e} key={idx} />
                        ))}
                </div>
            )}
            {page === 1 && (
                <div className="flex justify-center items-center flex-col pt-8 animate-in duration-500 slide-in-from-left">
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
