import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Avatar, { genConfig } from 'react-nice-avatar'

export default function myJobCard({
    id,
    description,
    limit,
    owner,
    restaurants,
    status,
    time,
    count,
    left,
    myOrder,
    profile,
}) {
    // const config = genConfig(owner.firstname + owner.lastname)

    function convertTimestampToTime(timestamp) {
        const temp = new Date(timestamp)
        const H = ('00' + temp.getHours()).slice(-2)
        const M = ('00' + temp.getMinutes()).slice(-2)
        return `${H} : ${M}`
        // return temp.toISOString()
    }

    const [ownerData, setOwnerData] = useState({})

    useEffect(() => {
        getProfileById(owner)
    }, [owner])

    // useEffect(() => {
    //     if (myOrder) {
    //         getProfileById(myOrder)
    //     }
    // }, [myOrder])

    async function getProfileById(id) {
        try {
            const res = await axios({
                url: import.meta.env.VITE_API + '/api/Users/ById?id=' + id,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            setOwnerData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const config = genConfig(ownerData.firstname + ownerData.lastname)

    return (
        <div className="flex justify-center mx-10">
            <div className="bg-[#FFC979] w-5/6 rounded-3xl shadow-xl cursor-pointer mb-1.5 hover:scale-105 justify-center p-3">
                <div className="flex">
                    <Avatar className="w-14 h-14 absolute " {...config} />
                    <div className="flex font-Kanit w-3/5 justify-between px-3.5">
                        <div className="flex py-2.5 ml-12">
                            {ownerData?.username}
                        </div>
                        <div className="flex py-2.5 ">
                            {'@'}
                            {ownerData?.firstname} {ownerData?.lastname}
                        </div>
                        <div className="flex pl-2.5 py-2.5">
                            {profile?.phone}
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-2/5 rounded-3xl">
                        <div className="bg-white px-2.5 py-2.5 rounded-3xl">
                            {myOrder?.status}
                        </div>
                    </div>
                </div>

                <div className="flex pl-2.5 pt-2 pb-2">
                    <div className="bg-[#c3c3c3] bg-opacity-40 w-3/5 flex flex-col rounded-3xl ml-4 mr-2 items-center font-Kanit">
                        <div className="mb-4">เมนูที่คุณฝาก</div>
                        <div className="text-4xl text-[#FFFFFF]">
                            {myOrder?.menu}
                        </div>
                        <div className="mb-4">{myOrder?.count} กล่อง ร้าน</div>
                        <div className="flex w-full justify-around mb-2">
                            <div>ส่งที่: {myOrder?.destination}</div>
                            <div>หมายเหตุ: {myOrder?.description}</div>
                        </div>
                    </div>
                    <div className="bg-[#d9d9d9] bg-opacity-[0.23] w-2/5 rounded-3xl ml-2 mr-4 flex flex-col items-center">
                        <div className="mb-4">สถานะของคนใจดี</div>
                        <div className="">ออกไปเวลา</div>
                        <div className="text-4xl mb-4">12:00</div>
                        <div className="text-[#FFFFFF] mb-2">
                            ตอนนี้กำลัง เตรียมตัวไป
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
// ส่งที่: {myOrder?.destination}หมายเหตุ:
// <div>ร้าน: {restaurants}</div>
// <div>หมายเหตุ: {description}</div>
// <div>เวลา: {convertTimestampToTime(time)}</div>
// <div>status: {status}</div>
// <div>ร้าน: {myOrder?.restaurant}</div>
// <div>เมนู: {myOrder?.menu}</div>
// <div>จำนวน: {myOrder?.count}</div>
// <div>หมายเหตุ: {myOrder?.description}</div>
// <div>เบอร์: {profile?.phone}</div>
// <div>ส่งที่: {myOrder?.destination}</div>
// <div>status: {myOrder?.status}</div>
