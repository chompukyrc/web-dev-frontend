import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import Dialog from '../components/dialog'
// import Avatar, { genConfig } from 'react-nice-avatar'
import axios from 'axios'
import NotificationIcon from '../components/notification/notificationIcon'
import ProfileIcon from '../components/profile/profileIcon'

const Layout = ({ children }) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    // const [open, setOpen] = useState(false)
    const [profile, setProfile] = useState({})

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios({
                    url: import.meta.env.VITE_API + '/api/Users/Profile',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setProfile(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProfile()
    }, [])

    // const config = genConfig(profile.firstname + profile.lastname)

    return (
        <div>
            <div className="bg-[#60B664] flex w-screen justify-between font-Kanit text-[20px] py-1">
                <div
                    className="flex items-center text-white cursor-pointer ml-40"
                    onClick={() => {
                        navigate('/')
                    }}
                >
                    🍔&nbsp;&nbsp; Feed
                    <p className="text-amber-300">&nbsp; My &nbsp;</p> Friend
                </div>
                <div className="flex items-center mr-20 space-x-1">
                    <div
                        className="hover:bg-[#4da452] cursor-pointer text-white flex justify-center items-center w-40 py-2"
                        onClick={() => {
                            navigate('/')
                        }}
                    >
                        <i className="mdi mdi-home px-1"></i>
                        หน้าหลัก
                    </div>

                    <div
                        className="hover:bg-[#4da452] cursor-pointer text-white flex justify-center items-center w-40 py-2"
                        onClick={() => {
                            navigate('/aboutUs')
                        }}
                    >
                        <i className="mdi mdi-developer-board px-2"></i>
                        เกี่ยวกับเรา
                    </div>
                    {/* <div
                        className="hover:bg-[#4da452] cursor-pointer text-white flex justify-center items-center w-40 py-4"
                        onClick={() => {
                            navigate('/profile')
                        }}
                    >
                        <Avatar className="mx-2 w-8 h-8" {...config} />
                        {profile.username}
                    </div> */}
                    {/* <div className="hover:bg-[#4da452] cursor-pointer text-white flex justify-center items-center w-20 py-4"> */}
                    <NotificationIcon />
                    <ProfileIcon />
                    {/* </div> */}
                    {/* <div
                        className="hover:bg-[#4da452] cursor-pointer text-white flex justify-center items-center w-40 py-2"
                        onClick={() => setOpen(true)}
                    >
                        <i className="mdi mdi-logout p-1"></i>
                        ออกจากระบบ
                    </div> */}
                </div>
            </div>
            <main>{children}</main>
        </div>
    )
}

export default Layout