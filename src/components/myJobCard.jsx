import React from 'react'

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
}) {
    // const config = genConfig(owner.firstname + owner.lastname)

    function convertTimestampToTime(timestamp) {
        const temp = new Date(timestamp)
        const H = ('00' + temp.getHours()).slice(-2)
        const M = ('00' + temp.getMinutes()).slice(-2)
        return `${H} : ${M}`
        // return temp.toISOString()
    }

    return (
        <div className="w-full flex flex-col items-center">
            <div className="bg-[#499D4D] w-screen rounded-3xl shadow-xl cursor-pointer mb-4 hover:scale-105">
                <div>รูป username</div>
                <div className="flex">
                    <div className="bg-red-300 w-1/2 flex flex-col">
                        <div>ร้าน: {restaurants}</div>
                        <div>หมายเหตุ: {description}</div>
                        <div>เวลา: {convertTimestampToTime(time)}</div>
                        <div>status: {status}</div>
                    </div>
                    <div className="bg-blue-300 w-1/2">ขวา</div>
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
