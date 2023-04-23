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
        <div className="w-full flex flex-col items-center">
            <div className="bg-[#499D4D] w-screen rounded-3xl shadow-xl cursor-pointer mb-4 hover:scale-105">
                <div>
                    <Avatar className="w-14 h-14 mr-2" {...config} />
                    <div>{ownerData.username}</div>
                    <div>
                        {'@'}
                        {ownerData.firstname} {ownerData.lastname}
                    </div>
                </div>
                <div className="flex">
                    <div className="bg-red-300 w-1/2 flex flex-col">
                        <div>ร้าน: {restaurants}</div>
                        <div>หมายเหตุ: {description}</div>
                        <div>เวลา: {convertTimestampToTime(time)}</div>
                        <div>status: {status}</div>
                    </div>
                    <div className="bg-blue-300 w-1/2">
                        <div>ร้าน: {myOrder.restaurant}</div>
                        <div>เมนู: {myOrder.menu}</div>
                        <div>จำนวน: {myOrder.count}</div>
                        <div>หมายเหตุ: {myOrder.description}</div>
                        <div>เบอร์: {profile?.phone}</div>
                        <div>ส่งที่: {myOrder.destination}</div>
                        <div>status: {myOrder.status}</div>
                    </div>
                </div>

                {/* <div className="flex row justify-between">
                    <div className="basis-1/4 flex flex-col">
                        <div className=" flex">
                            <p className="w-12">ร้าน:</p>
                            <p className=" font-bold">ไว้ก่อน</p>
                        </div>
                        <div className=" flex">
                            <p className="w-12">เมนู:</p>
                            <p className="font-bold">ไว้ก่อน</p>
                        </div>
                    </div>
                    <div className="basis-1/4">
                        <div className=" flex">
                            <p className="w-24">จำนวน: </p>
                            <p className="font-bold">ไว้ก่อน</p>
                        </div>
                        <div className=" flex">
                            <p className="w-24">หมายเหตุ: </p>
                            <p className="font-bold">ไว้ก่อน</p>
                        </div>
                    </div>
                    <div className="basis-1/4">
                        <div className=" flex">
                            <p className="w-12">เบอร์:</p>
                            <p className="font-bold">ไว้ก่อน</p>
                        </div>
                        <div className=" flex">
                            <p className="w-12">ส่งที่: </p>
                            <p className="font-bold">ไว้ก่อน</p>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
