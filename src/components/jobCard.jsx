import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Avatar, { genConfig } from 'react-nice-avatar'

export default function jobCard({
    id,
    description,
    limit,
    owner,
    restaurants,
    status,
    time,
    count,
    onClick,
}) {
    // console.log(id, description, limit, owner, restaurants, status, time)
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

    function convertTimestampToTime(timestamp) {
        const temp = new Date(timestamp)
        const H = ('00' + temp.getHours()).slice(-2)
        const M = ('00' + temp.getMinutes()).slice(-2)
        return `${H} : ${M}`
        // return temp.toISOString()
    }

    const config = genConfig(ownerData.firstname + ownerData.lastname)

    return (
        <div
            className={`cursor-pointer p-4 rounded-[30px] drop-shadow-xl text-white hover:scale-110 ;
        ${limit - count <= 0 ? 'bg-[#FF6B6B]' : 'bg-[#499D4D]'} 
        `}
            onClick={onClick}
        >
            <div className=" flex items-center">
                <Avatar className="w-14 h-14 mr-2" {...config} />
                <div className="flex items-baseline align-bottom">
                    <div className=" text-xl mr-2">{ownerData.username}</div>
                    <div className=" text-md opacity-50 ">
                        {'@ '}
                        {ownerData.firstname} {ownerData.lastname}
                    </div>
                </div>
            </div>
            <div className="w-100 h-50 p-3 rounded-[20px] backdrop-opacity-10 backdrop-invert bg-white/30 text-center ">
                <div>
                    <p>
                        จะไปร้าน{' '}
                        <span className="underline decoration-green-200">
                            {restaurants}
                        </span>{' '}
                        เวลา{' '}
                    </p>{' '}
                    <p className="text-3xl font-bold">
                        {convertTimestampToTime(time)}
                    </p>
                </div>
                <div>
                    <p className="text-black pt-2">
                        ฝากได้อีก {limit - count} กล่อง
                    </p>
                </div>
            </div>
        </div>
    )
}
