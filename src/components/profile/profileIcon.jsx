import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Avatar, { genConfig } from 'react-nice-avatar'
import Dialog from '../dialog'

export default function ProfileIcon() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [showLogout, setShowLogout] = useState(false)
    const [profile, setProfile] = useState({})

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios({
                    url: import.meta.env.VITE_API + '/api/Users/Profile',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token',
                        )}`,
                    },
                })
                setProfile(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProfile()
    }, [])

    const handleLogout = (result) => {
        if (result) {
            localStorage.clear()
            window.location.reload()
        }

        setShowLogout(false)
    }

    const config = genConfig(profile.firstname + profile.lastname)

    return (
        <>
            <Dialog
                text={'Are you sure to Logout?'}
                open={showLogout}
                handleConfirm={handleLogout}
                textConfirm={'LOGOUT'}
            />
            <div className="relative">
                <div
                    className={
                        'hover:bg-[#4da452] cursor-pointer text-white flex justify-center items-center w-44 py-2 px-2'
                    }
                    onClick={() => {
                        setOpen(!open)
                    }}
                >
                    <Avatar className="mx-2 w-8 h-8" {...config} />
                    {profile.username}
                </div>

                {open && (
                    <div
                        className=" absolute right-0 z-20 w-64 rounded-xl flex flex-col space-y-2 bg-gray-600 bg-opacity-70 p-2"
                        style={{ top: '3.8rem' }}
                    >
                        <div
                            className=" p-4 text-center text-white cursor-pointer text-md hover:bg-opacity-30 hover:bg-gray-300 rounded-xl"
                            onClick={() => {
                                setOpen(!open)
                                navigate('/profile')
                            }}
                        >
                            โปรไฟล์ของฉัน
                        </div>
                        <div
                            className="p-4 text-center text-red-500 cursor-pointer hover:bg-opacity-30 hover:bg-gray-300 rounded-xl"
                            onClick={() => {
                                setOpen(!open)
                                setShowLogout(true)
                            }}
                        >
                            <i className="mdi mdi-logout p-1"></i>
                            ออกจากระบบ
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
