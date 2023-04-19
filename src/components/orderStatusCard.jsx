import React from 'react'

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
    return (
        <div className="bg-white w-8/12 px-16 py-4 rounded-3xl shadow-xl cursor-pointer">
            <div className=" font-bold text-xl flex flex-row items-center pb-2">
                <i className="mdi mdi-account-circle text-4xl pr-1"></i>
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
                    <button className="bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-600 text-white py-2 mx-2 rounded-2xl w-20 flex justify-center">
                        Accept
                    </button>
                    <button className="bg-gradient-to-b from-red-400 to-red-600 hover:from-red-500 hover:to-red-600 text-white py-2 mx-2 rounded-2xl w-20 flex justify-center">
                        Reject
                    </button>
                </div>
            </div>
        </div>
    )
}
