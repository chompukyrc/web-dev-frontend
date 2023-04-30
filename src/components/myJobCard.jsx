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

    useEffect(() => {
        getProfileById(owner)
    }, [owner])

    // console.log(profile)

    const config = genConfig(ownerData.firstname + ownerData.lastname)

    return (
        <div className="flex justify-center md:mx-10 mx-2 font-Kanit md:text-base text-xs mt-1 md:mt-4">
            <div className="md:w-5/6 w-[100%] rounded-3xl shadow-xl cursor-pointer mb-1.5 hover:scale-105 justify-center p-3 bg-white">
                <div className="flex  flex-col md:flex-row ">
                    <Avatar
                        className="md:w-14 md:h-14 w-10 h-10 absolute "
                        {...config}
                    />
                    <div className="flex flex-col ml-12 md:ml-0  md:flex-row  md:w-3/5 w-[80%] md:px-3.5 md:text-lg text-base ">
                        <div className="md:py-2.5  md:ml-12  ">
                            {ownerData?.username}
                        </div>
                        <div className="md:py-2.5 opacity-50 md:ml-2 text-xs md:text-lg">
                            {'@'}
                            {ownerData?.firstname} {ownerData?.lastname}
                        </div>
                        <div className="md:pl-2.5 md:py-2.5 md:text-lg text-xs">
                            โทร {ownerData?.phone}
                        </div>
                    </div>
                    <div className="flex justify-center md:w-2/5 w-[100%] py-2 md:py-0">
                        <div
                            className={
                                'flex items-center rounded-3xl md:px-3 px-2 bg-opacity-30 py-1 md:py-0 ' +
                                (myOrder?.status === 'waiting'
                                    ? 'bg-yellow-500 text-yellow-700'
                                    : myOrder?.status === 'accept'
                                    ? 'bg-green-500 text-green-700'
                                    : myOrder?.status === 'reject'
                                    ? 'bg-red-500 text-red-700'
                                    : myOrder?.status === 'Done'
                                    ? 'bg-blue-500 text-blue-700'
                                    : 'bg-black text-black')
                            }
                        >
                            {myOrder?.status === 'waiting'
                                ? 'รอการยืนยัน'
                                : myOrder?.status === 'accept'
                                ? 'ออเดอร์ของคุณได้รับการยืนยันแล้ว'
                                : myOrder?.status === 'reject'
                                ? 'ออเดอร์ของคุณถูกปฏิเสธ'
                                : myOrder?.status === 'Done'
                                ? 'ออเดอร์นี้สำเร็จแล้ว'
                                : 'error'}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between md:pl-2.5 md:py-2">
                    <div className="bg-[#c3c3c3] bg-opacity-40 md:w-3/5 w-1/2 flex flex-col rounded-3xl md:ml-4 md:mr-2 items-center ">
                        <div className="flex md:flex-row flex-col mt-4 items-center">
                            <p className="mr-1">{myOrder?.count} กล่อง </p>
                            <p>ร้าน{myOrder?.restaurant}</p>
                        </div>
                        <div className="md:text-4xl text-xl text-black my-4">
                            {myOrder?.menu}
                        </div>
                        <div className="flex w-full justify-around mb-2 md:mt-1 my-2">
                            <div>ส่งที่: {myOrder?.destination}</div>
                            <div className="hidden md:block">
                                หมายเหตุ: {myOrder?.description}
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#d9d9d9] bg-opacity-[0.23] md:w-2/5 w-1/2 rounded-3xl md:ml-2 md:mr-4 flex flex-col items-center justify-center">
                        <div className="hidden md:block my-2">
                            เพื่อนของคุณจะเริ่มออกไปซื้อเมื่อถึงเวลา{' '}
                        </div>
                        <div className="block md:hidden">
                            เพื่อนจะไปซื้อเวลา{' '}
                        </div>

                        <div className="md:text-4xl text-xl md:mb-4 md:mt-1">
                            {convertTimestampToTime(time)} น.
                        </div>
                        <p className="hidden md:block mb-2 text-orange-600">
                            ตอนนี้เพื่อนที่ไปซื้อ :
                        </p>
                        <div className="hidden md:block mb-2 text-orange-600">
                            {status === 'unfinish'
                                ? 'กำลังเปิดรับออเดอร์อยู่'
                                : status === 'close'
                                ? 'ปิดรับออเดอร์แล้ว กำลังออกไปซื้อ'
                                : status === 'finish'
                                ? 'ส่งออเดอร์ครบแล้ว ปิดจ๊อบแล้วจ้า'
                                : 'error'}
                        </div>
                        <div className="block md:hidden text-orange-600">
                            {status === 'unfinish'
                                ? 'รับออเดอร์อยู่'
                                : status === 'close'
                                ? 'กำลังออกไปซื้อ'
                                : status === 'finish'
                                ? 'ปิดจ๊อบแล้วจ้า'
                                : 'error'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
