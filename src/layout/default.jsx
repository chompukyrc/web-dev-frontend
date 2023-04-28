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
    const [open, setOpen] = useState(false)
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
            <div className="bg-[#60B664] h-[60px] md:h-auto flex w-[100%] justify-between items-center font-Kanit text-[20px]">
                <div
                    className="md:order-1 order-2 flex flex-row items-center text-white cursor-pointer md:ml-10% ml-[5%] md:text-[20px] text-[12px]"
                    onClick={() => {
                        navigate('/')
                    }}
                >
                    <div className="flex flex-col items-center md:ml-0 ml-[40%]">
                        <p className="md:hidden h-5 text-lg ">🍔</p>
                        <div className="flex ">
                            <p className="md:block hidden mr-[4%] ">🍔</p>
                            <p className="mr-[2%]">Feed</p>
                            <p className="text-amber-300 mr-[2%]">My</p>
                            <p>Friend</p>
                        </div>
                    </div>
                </div>
                <div className="md:block order-2 hidden mr-[5%] w-[40%]">
                    <div className="flex items-center ">
                        <div
                            className=" flex justify-center hover:bg-[#4da452] cursor-pointer text-white w-1/4 py-4 mx-[2%]"
                            onClick={() => {
                                navigate('/')
                            }}
                        >
                            <i className="mdi mdi-home mr-1"></i>
                            หน้าหลัก
                        </div>
                        <div
                            className="flex justify-center hover:bg-[#4da452] cursor-pointer text-white  w-1/4 py-4 mx-[2%]"
                            onClick={() => {
                                navigate('/aboutUs')
                            }}
                        >
                            <i className="mdi mdi-developer-board mr-1"></i>
                            เกี่ยวกับเรา
                        </div>
                        <NotificationIcon />
                        <ProfileIcon />
                    </div>
                </div>
                <div className="order-3 md:hidden flex w-1/4">
                    <NotificationIcon />
                    <ProfileIcon />
                </div>
                <div class="block md:hidden ml-[4%] order-1">
                    <button
                        class="flex items-center  rounded text-white "
                        onClick={() => {
                            setOpen(!open)
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="14"
                            viewBox="0 0 20 14"
                            id="menu"
                        >
                            <g
                                fill="none"
                                fill-rule="evenodd"
                                stroke="#FFF"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                transform="translate(1 1)"
                            >
                                <path d="M0 6h18M0 0h18M0 12h18"></path>
                            </g>
                        </svg>
                    </button>
                    {/* ไว้ก่อนเดะมาต่ออ */}
                    {/* {open && (
                        <div className="">
                        </div>
                    )} */}
                </div>
            </div>
            <main>{children}</main>
        </div>
    )
}

export default Layout
