import React, { useState, useEffect } from 'react'
import OrderStatusCard from '../components/orderStatusCard'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function statusJob() {
    const { jobId } = useParams()
    const [orders, setOrder] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        const token = localStorage.getItem('token')

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

                setOrder(orders)
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
        }, 2000)
        return () => clearInterval(interval)
    }, [jobId])

    return (
        <div className="flex flex-col items-center">
            <div className="mt-8 text-2xl">Your Order</div>
            <div className=" bg-gray-300 my-8 flex justify-around w-full border-b-2 border-black">
                <button
                    className="font-semibold text-2xl m-4 w-1/2 hover:underline  === value ? 'your-class' : 'or-default-to'"
                    onClick={() => setPage(0)}
                >
                    New Order
                </button>
                <button
                    className="font-semibold text-2xl m-4 w-1/2 hover:underline"
                    onClick={() => setPage(1)}
                >
                    Accepted Order
                </button>
            </div>

            {page === 0 && (
                <div className="w-full flex flex-col items-center">
                    {orders
                        .filter((e) => e.status == 'waiting')
                        .map((e, idx) => (
                            <OrderStatusCard {...e} key={idx} />
                        ))}
                </div>
            )}
            {page === 1 && (
                <div className="w-full flex justify-center flex-col ">
                    <div className="w-full flex flex-col items-center">
                        {orders
                            .filter((e) => e.status == 'accept')
                            .map((e, idx) => (
                                <OrderStatusCard {...e} key={idx} />
                            ))}
                    </div>
                    <div className="w-full flex justify-center items-center py-8">
                        <div className="w-10/12 border-b-2 mb-4 border-black"></div>
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
