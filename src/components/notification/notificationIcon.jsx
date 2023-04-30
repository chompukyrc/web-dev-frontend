import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NotificationCard from './notificationCard'

export default function NotificationIcon() {
    const [open, setOpen] = useState(false)
    const [notification, setNotification] = useState([])
    const [notReadCounter, setNotReadCounter] = useState(0)

    async function fetchNotification() {
        const res = await axios({
            url: import.meta.env.VITE_API + '/api/Notification/ListByUserId',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })

        const counter = res.data?.filter((e) => e.isRead === false).length
        setNotReadCounter(counter)
        setNotification(res.data?.reverse())
        // console.log(res.data)
    }

    // Fetch notification on init
    // and set interval for 2 second
    useEffect(() => {
        setInterval(() => {
            fetchNotification()
        }, 3000)
    }, [])

    useEffect(() => {
        async function updateToRead() {
            try {
                let temp = notification.map((e) => ({ ...e, isRead: true }))
                setNotification(temp)

                await axios({
                    url:
                        import.meta.env.VITE_API +
                        '/api/Notification/UpdateToRead',
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token',
                        )}`,
                    },
                })
            } catch (error) {}
        }

        // Update All Notification Status to isRead = true
        if (open) {
            updateToRead()
        }
    }, [open])

    return (
        <div className="relative md:w-1/12 w-1/2 flex justify-center font-Kanit">
            <i
                className={
                    'hover:bg-[#4da452] cursor-pointer text-white flex justify-center items-center mx-[3%] p-4 px-8 mdi w-8' +
                    (open ? ' mdi-bell ' : ' mdi-bell-outline ')
                }
                onClick={() => {
                    setOpen(!open)
                }}
            >
                {!open && notReadCounter !== 0 ? (
                    <span className="absolute flex items-center justify-center mb-8 ml-8 w-4 h-4 p-2 text-xs font-bold text-white bg-red-500 rounded-full">
                        {notReadCounter}
                    </span>
                ) : (
                    <span></span>
                )}
            </i>

            {open && (
                <div
                    className=" absolute right-0 bg-gray-200 w-96 rounded-md text-sm bg-opacity-80 z-50"
                    style={{ top: '4.5rem' }}
                >
                    {notification.map((e, idx) => (
                        <NotificationCard key={idx} {...e} />
                    ))}
                </div>
            )}
        </div>
    )
}
