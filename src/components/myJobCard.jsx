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
        <div className="flex justify-center mx-10">
            <div className="w-5/6 rounded-3xl shadow-xl cursor-pointer mb-1.5 hover:scale-105 justify-center p-3 bg-gray-300">
                <div className="flex justify-between">
                    <Avatar className="w-14 h-14 absolute " {...config} />
                    <div className="flex font-Kanit w-3/5 px-3.5">
                        <div className="flex py-2.5 ml-12 text-xl">
                            {ownerData?.username}
                        </div>
                        <div className="py-2.5 opacity-50 ml-2">
                            {'@'}
                            {ownerData?.firstname} {ownerData?.lastname}
                        </div>
                        <div className="pl-2.5 py-2.5">
                            เบอร์ติดต่อ {profile?.phone}
                        </div>
                    </div>
                    <div
                        className={
                            'flex items-center rounded-xl px-2 mx-8 bg-opacity-60  ' +
                            (myOrder?.status === 'waiting'
                                ? 'bg-yellow-500'
                                : myOrder?.status === 'accept'
                                ? 'bg-green-500'
                                : myOrder?.status === 'reject'
                                ? 'bg-red-500'
                                : myOrder?.status === 'Done'
                                ? 'bg-blue-500'
                                : 'bg-black')
                        }
                    >
                        {myOrder?.status === 'waiting'
                            ? 'รอการยืนยันออเดอร์'
                            : myOrder?.status === 'accept'
                            ? 'ออเดอร์ของคุณได้รับการยืนยันแล้ว'
                            : myOrder?.status === 'reject'
                            ? 'ออเดอร์ของคุณถูกปฏิเสธแล้ว'
                            : myOrder?.status === 'Done'
                            ? 'ออเดอร์นี้สำเร็จแล้ว'
                            : 'error'}
                    </div>
                </div>

                <div className="flex pl-2.5 pt-2 pb-2">
                    <div className="bg-[#c3c3c3] bg-opacity-40 w-3/5 flex flex-col rounded-3xl ml-4 mr-2 items-center font-Kanit">
                        <div className="my-4">เมนูที่คุณฝากซื้อ</div>
                        <div className="text-4xl text-[#FFFFFF]">
                            {myOrder?.menu}
                        </div>
                        <div className="mb-4">
                            {myOrder?.count} กล่อง ร้าน{myOrder?.restaurant}
                        </div>
                        <div className="flex w-full justify-around mb-2">
                            <div>ส่งที่: {myOrder?.destination}</div>
                            <div>หมายเหตุ: {myOrder?.description}</div>
                        </div>
                    </div>
                    <div className="bg-[#d9d9d9] bg-opacity-[0.23] w-2/5 rounded-3xl ml-2 mr-4 flex flex-col items-center justify-center">
                        <div className="">เพื่อนของคุณจะออกไปเมื่อถึงเวลา</div>
                        <div className="text-4xl mb-4">
                            {convertTimestampToTime(time)} น.
                        </div>
                        <div className="text-[#FFFFFF] mb-2">
                            สถานะตอนนี้{' '}
                            {status === 'unfinish'
                                ? 'กำลังเปิดรับออเดอร์อยู่'
                                : status === 'close'
                                ? 'ปิดรับออเดอร์แล้ว กำลังออกไปซื้อ'
                                : status === 'finish'
                                ? 'ส่งออเดอร์ครบแล้ว ปิดจ๊อบ'
                                : 'error'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
