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
                'md:px-16 md:py-4 rounded-3xl shadow-xl cursor-pointer mb-4 md:w-3/5 w-[60%] hover:scale-105  ' +
                (status === 'accept'
                    ? 'bg-white md:w-3/6 w-[60%]'
                    : status === 'reject'
                    ? 'bg-gray-300  md:w-3/6 w-[60%]'
                    : status === 'waiting'
                    ? 'bg-white'
                    : '')
            }
        >
            <div className="font-Kanit flex md:flex-row flex-col md:text-xl">
                <div className="flex flex-col items-center md:items-start md:w-4/5 w-[100%] justify-center mt-2 md:mt-0">
                    <Avatar
                        className="md:hidden md:w-14 md:h-14 w-10 h-10 mr-2"
                        {...config}
                    />
                    
                    <div className="flex md:flex-row flex-col w-[100%]">
                        <Avatar
                            className="md:block hidden md:w-14 md:h-14 w-10 h-10 mr-2"
                            {...config}
                        />
                        <div className="font-medium md:text-base text-base md:flex items-center text-center md:pb-2 md:w-1/3 w-[100%] ">
                            <p>{owner.firstname} {owner.lastname}</p>
                        </div>
                        <div className="md:text-sm text-xs md:w-1/2 text-center items-center md:py-6 mt-1 md:mt-0">
                            <p>โทร&nbsp;:&nbsp;&nbsp;{owner.phone}</p>
                        </div>
                    </div>

                    <div className="flex md:flex-row flex-col justify-end md:w-auto w-[100%] px-[15%] md:px-0  ">
                        <div className="md:w-[50%] w-[100%]  items-start flex flex-col ">
                            <div className=" flex ">
                                <p>ร้าน&nbsp;:&nbsp;&nbsp;</p>
                                <p className="md:font-medium ">{restaurant}</p>
                            </div>
                            <div className=" flex">
                                <p>เมนู&nbsp;:&nbsp;&nbsp;</p>
                                <p className="md:font-medium">{menu}</p>
                            </div>
                            <div className=" flex">
                                <p>หมายเหตุ&nbsp;:&nbsp;&nbsp;</p>
                                <p className="md:font-medium">{description}</p>
                            </div>
                            <div className=" flex"></div>
                        </div>
                        <div className="md:w-[40%] w-[100%]">
                            <div className=" flex items-center">
                                <p className="w-24">จำนวน: </p>
                                <p className="md:font-medium">{count}</p>
                            </div>
                            <div className=" flex items-center">
                                <p>ส่งที่&nbsp;:&nbsp;&nbsp;</p>
                                <p className="md:font-medium">{destination}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {status == 'waiting' && (
                    <div className="flex justify-center md:mt-0 mt-2">
                        <div className="flex items-center justify-center mx-2 my-2">
                            <button
                                className="bg-[#1E8449] hover:bg-[#196F3D] active:bg-[#145A32] text-white md:h-2/5  rounded-xl w-20 "
                                onClick={() => acceptHandler()}
                            >
                                ยืนยัน
                            </button>
                        </div>
                        <div className="flex items-center justify-center mx-2">
                            <button
                                className="bg-[#FDFEFE] hover:bg-[#E5E7E9] active:bg-[#D7DBDD] text-black md:h-2/5  rounded-xl border-solid border-neutral-300 border-2 w-20  "
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
