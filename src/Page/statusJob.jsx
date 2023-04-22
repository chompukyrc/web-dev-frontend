import React, { useState, useEffect } from 'react'
import OrderStatusCard from '../components/orderStatusCard'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function statusJob() {
    const { jobId } = useParams()
    const [orders, setOrder] = useState([])
    const [page, setPage] = useState(0)

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
        }, 2000)
        return () => clearInterval(interval)
    }, [jobId])

    return (
        <div>
            <nav className="shadow-xl text-center">
                <div className="bg-white m-0 h-20  text-xl">
                    <p className="p-6 text-2xl ">Your Oder</p>
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
                <div className="flex justify-center items-center flex-col pt-8 ">
                    {orders
                        .filter((e) => e.status == 'waiting')
                        .map((e, idx) => (
                            <OrderStatusCard {...e} key={idx} />
                        ))}
                </div>
            )}
            {page === 1 && (
                <div className="flex justify-center items-center flex-col pt-8 ">
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
            <div className="flex justify-center ">
                <button className="bg-red-500 bottom-0 fixed m-8 p-4 hover:scale-110">
                    ปิดรับออเดอร์
                </button>
            </div>
        </div>

        // <div className="flex flex-col items-center ">
        //     <div className="my-8 text-2xl bg-white">Your Order</div>
        //     <div className="bg-gray-200 flex justify-around w-5/6 rounded-t-3xl">
        //         <button
        //     className={
        //         'font-medium text-xl w-1/2 h-12 hover:underline rounded-t-3xl' +
        //         (page === 0 ? '  bg-gray-300' : ' ')
        //     }
        //     onClick={() => setPage(0)}
        // >
        //     New Order
        //         </button>
        //         <button
        //             className={
        //                 ' font-medium text-xl w-1/2 h-12 hover:underline rounded-t-3xl' +
        //                 (page === 1 ? '  bg-gray-300' : ' ')
        //             }
        //             onClick={() => setPage(1)}
        //         >
        //             Accepted Order
        //         </button>
        //     </div>

        // {page === 0 && (
        //     <div className="flex justify-center items-center flex-col pt-8 bg-gray-300 w-5/6">
        //         {orders
        //             .filter((e) => e.status == 'waiting')
        //             .map((e, idx) => (
        //                 <OrderStatusCard {...e} key={idx} />
        //             ))}
        //     </div>
        // )}
        // {page === 1 && (
        //     <div className="flex justify-center items-center flex-col pt-8 bg-gray-300 w-5/6">
        //         {orders
        //             .filter((e) => e.status == 'accept')
        //             .map((e, idx) => (
        //                 <OrderStatusCard {...e} key={idx} />
        //             ))}
        //         <div className="w-full flex justify-center items-center p-8 flex-col">
        //             <div className="w-9/12 border-b-2 mb-2 border-black"></div>
        //             reject
        //         </div>
        //         <div className="w-full flex flex-col items-center">
        //             {orders
        //                 .filter((e) => e.status == 'reject')
        //                 .map((e, idx) => (
        //                     <OrderStatusCard {...e} key={idx} />
        //                 ))}
        //         </div>
        //     </div>
        // )}
        // </div>
    )
}
