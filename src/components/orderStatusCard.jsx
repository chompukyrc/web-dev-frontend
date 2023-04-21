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

    async function acceptHandler() {
        try {
            const res = await axios({
                url: import.meta.env.VITE_API + '/api/Order/Accept?id=' + id,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
        } catch (error) {
            console.log(error)
        }
    }
    async function rejectHandler() {
        try {
            const res = await axios({
                url: import.meta.env.VITE_API + '/api/Order/Reject?id=' + id,
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
        <div
            className={
                'w-8/12 px-16 py-4 rounded-3xl shadow-xl cursor-pointer mb-4 hover:scale-105 ' +
                (status === 'reject' ? 'bg-gray-300' : 'bg-white ')
            }
        >
            <div className=" font-bold text-xl flex flex-row items-center pb-2">
                <Avatar className="w-14 h-14 mr-2" {...config} />
                {owner.firstname} {owner.lastname}
            </div>
            <div className="flex row justify-between">
                <div className="basis-1/4 flex flex-col">
                    <div className=" flex">
                        <p className="w-12">ร้าน:</p>
                        <p className=" font-bold">{restaurant}</p>
                    </div>
                    <div className=" flex">
                        <p className="w-12">เมนู:</p>
                        <p className="font-bold">{menu}</p>
                    </div>
                </div>
                <div className="basis-1/4">
                    <div className=" flex">
                        <p className="w-24">จำนวน: </p>
                        <p className="font-bold">{count}</p>
                    </div>
                    <div className=" flex">
                        <p className="w-24">หมายเหตุ: </p>
                        <p className="font-bold">{description}</p>
                    </div>
                </div>
                <div className="basis-1/4">
                    <div className=" flex">
                        <p className="w-12">เบอร์:</p>
                        <p className="font-bold">{owner.phone}</p>
                    </div>
                    <div className=" flex">
                        <p className="w-12">ส่งที่: </p>
                        <p className="font-bold">{destination}</p>
                    </div>
                </div>
                {status == 'waiting' && (
                    <div className="basis-1/4 flex align-center justify-end">
                        <div className="flex flex-row justify-items-end items-center">
                            <div class="basis-1/2 flex justify-end">
                                <button
                                    className="bg-[#1E8449] hover:bg-[#196F3D] active:bg-[#145A32] text-white py-2 mx-2 rounded-xl w-20 flex justify-center"
                                    onClick={() => acceptHandler()}
                                >
                                    Accept
                                </button>
                            </div>
                            <div class="basis-1/2">
                                <button
                                    className="bg-[#FDFEFE] hover:bg-[#E5E7E9] active:bg-[#D7DBDD] text-black py-2 mx-2 rounded-xl border-solid border-neutral-300 border-2 w-20 flex justify-center"
                                    onClick={() => rejectHandler()}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
