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
            className={'cursor-pointer p-4 rounded-lg bg-white'}
            onClick={onClick}
        >
            <div className=" flex items-center">
                <Avatar className="w-14 h-14 mr-2" {...config} />
                {ownerData.firstname} {ownerData.lastname}
            </div>
            <div>
                <p>ไปร้าน {restaurants}</p>
            </div>
            <div>
                <p>จะไปซื้อเวลา {convertTimestampToTime(time)}</p>
            </div>
            <div>
                <p>ฝากได้อีก {limit - count} กล่อง</p>
            </div>
        </div>
    )
}
