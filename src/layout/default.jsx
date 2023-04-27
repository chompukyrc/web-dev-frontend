import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Dialog from '../components/dialog'
import Avatar, { genConfig } from 'react-nice-avatar'
import axios from 'axios'

const Layout = ({ children }) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [open, setOpen] = useState(false)
    const [profile, setProfile] = useState({})

    const handleConfirm = (result) => {
        if (result) {
            // console.log('some action...')
            localStorage.clear()
            window.location.reload()
        }

        setOpen(false)
    }

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

    const config = genConfig(profile.firstname + profile.lastname)

    return (
        <div>
            {/* <nav class="flex items-center justify-between flex-wrap p-6">
                <div class="block lg:hidden">
                    <button class="flex items-center px-3 py-2 border rounded text-gray-300 border-gray-400 hover:text-white hover:border-white">
                        <svg
                            class="fill-current h-3 w-3"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Menu</title>
                            <path d="M0 3a3 3 0 013-3h14a3 3 0 110 6H3a3 3 0 01-3-3zm0 8a3 3 0 013-3h14a3 3 0 110 6H3a3 3 0 01-3-3zm0 8a3 3 0 013-3h14a3 3 0 110 6H3a3 3 0 01-3-3z" />
                        </svg>
                    </button>
                </div>
                <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div class="text-sm lg:flex-grow">
                        <a
                            href="#"
                            class="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
                        >
                            Home
                        </a>
                        <a
                            href="#"
                            class="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
                        >
                            About
                        </a>
                        <a
                            href="#"
                            class="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </nav> */}
            <div className="bg-[#60B664] h-[60px] md:h-auto flex w-[100%] justify-between items-center font-Kanit text-[20px]">
                <div
                    className="flex flex-row items-center text-white cursor-pointer md:ml-10% ml-[5%]"
                    onClick={() => {
                        navigate('/')
                    }}
                >
                    <p className="w-20 mr-[2%]">🍔 Feed</p>
                    <p className="text-amber-300 mr-[2%]">My</p>
                    <p className="mr-[2%]">Friend</p>
                </div>
                <div className="md:block hidden mr-[5%] w-1/2">
                    <div className="flex items-center ">
                        <div
                            className="flex justify-center hover:bg-[#4da452] cursor-pointer text-white w-1/4 py-4 mx-[2%]"
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
                        <div
                            className="flex justify-center hover:bg-[#4da452] md:flex cursor-pointer text-white  w-1/6 py-4 mx-[2%]"
                            onClick={() => {
                                navigate('/profile')
                            }}
                        >
                            <Avatar className="mr-3 w-8 h-8" {...config} />
                            <p className="hidden md:block">
                                {profile.username}
                            </p>
                        </div>
                        <div
                            className="md:block hidden hover:bg-[#4da452] cursor-pointer text-white w-1/4 py-4 mx-[2%]"
                            onClick={() => setOpen(true)}
                        >
                            <i className="mdi mdi-logout mr-1"></i>
                            ออกจากระบบ
                        </div>
                        <Dialog
                            text={'Are you sure to Logout?'}
                            open={open}
                            handleConfirm={handleConfirm}
                            textConfirm={'LOGOUT'}
                        />
                    </div>
                </div>
                <div class="block md:hidden mr-[5%]">
                    <button class="flex items-center  rounded text-white ">
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
                </div>
            </div>
            <main>{children}</main>
        </div>
    )
}

export default Layout
