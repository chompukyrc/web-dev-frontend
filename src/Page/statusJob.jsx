import React, { useState, useEffect } from 'react'
import OrderStatusCard from '../components/orderStatusCard'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function statusJob() {
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
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <nav className="shadow-xl text-center">
                <div className="bg-white m-0 h-30 text-xl">
                    <p className="p-6 text-2xl ">Your Oder</p>
                    <pre>{JSON.stringify(job, null, 2)}</pre>
                    <button
                        className="bg-red-300 m-8 p-4 hover:scale-110 rounded-primary"
                        onClick={() => closeJobHandler()}
                    >
                        ปิดรับออเดอร์
                    </button>
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
