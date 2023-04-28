import axios from 'axios'
import React from 'react'
import Avatar, { genConfig } from 'react-nice-avatar'

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
                'px-16 py-4 rounded-3xl shadow-xl cursor-pointer mb-4 w-3/5 hover:scale-105  ' +
                (status === 'accept'
                    ? 'bg-white w-3/6'
                    : status === 'reject'
                    ? 'bg-gray-300  w-3/6'
                    : status === 'waiting'
                    ? 'bg-white'
                    : '')
            }
        >
            <div className="font-Kanit flex flex-row text-xl justify-around">
                <div className="flex flex-col w-4/5">
                    <div className="flex flex-row ">
                        <div className=" font-medium text-xl flex flex-row items-center pb-2 w-1/3 ">
                            <Avatar className="w-14 h-14 mr-2" {...config} />
                            &nbsp;&nbsp;{owner.firstname} {owner.lastname}
                        </div>
                        <div className="text-sm w-1/2 text-center items-center py-6">
                            <p>โทร&nbsp;:&nbsp;&nbsp;{owner.phone}</p>
                        </div>
                    </div>

                    <div className="flex row justify-end  ">
                        <div className="w-[50%]  items-start flex flex-col ">
                            <div className=" flex">
                                <p>ร้าน&nbsp;:&nbsp;&nbsp;</p>
                                <p className=" font-medium">{restaurant}</p>
                            </div>
                            <div className=" flex">
                                <p>เมนู&nbsp;:&nbsp;&nbsp;</p>
                                <p className="font-medium">{menu}</p>
                            </div>
                            <div className=" flex">
                                <p>หมายเหตุ&nbsp;:&nbsp;&nbsp;</p>
                                <p className="font-medium">{description}</p>
                            </div>
                            <div className=" flex"></div>
                        </div>
                        <div className="w-[40%]">
                            <div className=" flex items-center">
                                <p className="w-24">จำนวน: </p>
                                <p className="font-medium">{count}</p>
                            </div>
                            <div className=" flex items-center">
                                <p>ส่งที่&nbsp;:&nbsp;&nbsp;</p>
                                <p className="font-medium">{destination}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {status == 'waiting' && (
                    <div className="flex justify-center">
                        <div className="flex items-center justify-center mx-2">
                            <button
                                className="bg-[#1E8449] hover:bg-[#196F3D] active:bg-[#145A32] text-white h-2/5 rounded-xl w-20 "
                                onClick={() => acceptHandler()}
                            >
                                ยืนยัน
                            </button>
                        </div>
                        <div className="flex items-center justify-center mx-2">
                            <button
                                className="bg-[#FDFEFE] hover:bg-[#E5E7E9] active:bg-[#D7DBDD] text-black h-2/5 rounded-xl border-solid border-neutral-300 border-2 w-20  "
                                onClick={() => rejectHandler()}
                            >
                                ปฏิเสธ
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
