import axios from 'axios'
import React, { useEffect } from 'react'
import Avatar, { genConfig } from 'react-nice-avatar'
import { useParams } from 'react-router-dom'

export default function orderStatusCard({
    id,
    job,
    owner,
    restaurant,
    destination,
    status,
    menu,
    count,
    description,
}) {
    const config = genConfig(owner.firstname + owner.lastname)
    const { orderId } = useParams()

    useEffect(() => {
        async function acceptHandler() {
            try {
                const res = await axios({
                    url:
                        import.meta.env.VITE_API +
                        '/api/Order/Accept?id=' +
                        orderId,
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            } catch (error) {
                console.log(error)
            }
        }
        async function rejectHandler() {
            try {
                const res = await axios({
                    url:
                        import.meta.env.VITE_API +
                        '/api/Order/Accept?id=' +
                        orderId,
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            } catch (error) {
                console.log(error)
            }
        }
        rejectHandler()
        acceptHandler()
    }, [[orderId]])

    return (
        <div className="bg-white w-8/12 px-16 py-4 rounded-3xl shadow-xl cursor-pointer mb-4">
            <div className=" font-bold text-xl flex flex-row items-center pb-2">
                <Avatar className="w-14 h-14 mr-2" {...config} />
                {owner.firstname} {owner.lastname}
            </div>
            <div className="flex justify-between">
                <div>
                    <div className=" flex">
                        <p className="w-12">ร้าน:</p>{' '}
                        <p className=" font-bold">{restaurant}</p>
                    </div>
                    <div className=" flex">
                        <p className="w-12">เมนู:</p> <p className="">{menu}</p>
                    </div>
                </div>
                <div>
                    <div>จำนวน: {count}</div>
                    <div>หมายเหตุ: {description}</div>
                </div>
                <div>
                    <div>เบอร์: {owner.phone}</div>
                    <div>ส่งที่: {destination}</div>
                </div>
                <div className="flex justify-between items-center">
                    <button
                        className="bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-600 text-white py-2 mx-2 rounded-2xl w-20 flex justify-center"
                        onClick={() => acceptHandler()}
                    >
                        Accept
                    </button>
                    <button
                        className="bg-gradient-to-b from-red-400 to-red-600 hover:from-red-500 hover:to-red-600 text-white py-2 mx-2 rounded-2xl w-20 flex justify-center"
                        onClick={() => rejecttHandler()}
                    >
                        Reject
                    </button>
                </div>
            </div>
        </div>
    )
}
