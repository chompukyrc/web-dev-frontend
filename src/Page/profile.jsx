import React, { useState, useEffect } from 'react'
import Avatar, { genConfig } from 'react-nice-avatar'
import axios, { Axios } from 'axios'
import { ToastContainer, toast } from 'react-toastify'

export default function profile() {
    const token = localStorage.getItem('token')
    const [editProfile, setEditProfile] = useState(0) //0-common 1-editProfile 2-editPassword
    const [password, setPassword] = useState({
        oldpassword: '',
        newpassword: '',
        confirmpassword: '',
    })
    const [userProfile, setUserProfile] = useState({})
    const [updatedProfile, setUpdatedProfile] = useState({
        username: '',
        firstname: '',
        lastname: '',
        phone: '',
    })

    useEffect(() => {
        fetchProfile()
    }, [editProfile])

    async function fetchProfile() {
        try {
            const res = await axios({
                url: import.meta.env.VITE_API + '/api/Users/Profile',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setUserProfile(res.data)
            setUpdatedProfile(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function profileHandler() {
        try {
            const res = await axios({
                url: import.meta.env.VITE_API + '/api/Users/UpdateUserProfile',
                method: 'POST',
                data: {
                    Username: updatedProfile.username,
                    Firstname: updatedProfile.firstname,
                    Lastname: updatedProfile.lastname,
                    Phone: updatedProfile.phone,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            toast.success('🍔 แก้ไขโปรไฟล์สำเร็จ', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
            fetchProfile()
            setEditProfile(0)
        } catch (error) {
            console.log(error)
        }
    }

    async function passwordHandler() {
        if (password.newpassword != password.confirmpassword) {
            toast.error('🍔 การยืนยันรหัสผ่านไม่ถูกต้อง', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
        } else {
            try {
                const res = await axios({
                    url:
                        import.meta.env.VITE_API +
                        '/api/Users/UpdateUserPassword',
                    method: 'POST',
                    data: {
                        OldPassword: password.oldpassword,
                        NewPassword: password.newpassword,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                toast.success('🍔 เปลี่ยนรหัสผ่านสำเร็จ', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                })
                fetchProfile()
                setEditProfile(0)
            } catch (error) {
                toast.error('🍔 คุณป้อนรหัสผ่านเดิมไม่ถูกต้อง', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                })
            }
        }
    }

    const config = genConfig(userProfile.firstname + userProfile.lastname)

    return (
        <div>
            <ToastContainer />
            <div className="flex justify-center w-screen h-screen md:text-base text-sm">
                <div className="absolute z-0 rounded-full bg-gradient-to-br from-[#4a9d51] to-[#66aac0] h-secondary w-secondary mt-[12%]"></div>
                <div className="flex flex-col  items-center h-screen w-screen  ">
                    <img
                        src="/assets/burgur-top.png"
                        className="rotate-[6.10rad] md:w-[25%] w-[40%] "
                    />
                    <div className="bg-white flex flex-col justify-center items-center rounded-primary md:w-[70%] w-[90%] shadow-2xl z-10">
                        <Avatar className="w-24 h-24 my-4" {...config} />
                        <div className="flex  items-center justify-center font-Kanit mx-auto pb-2">
                            <div className=" text-left">
                                {editProfile === 0 && (
                                    <div>
                                        <div className="flex">
                                            <p className="text-right mr-2 my-2 w-40">
                                                ชื่อผู้ใช้ :
                                            </p>
                                            <p className="ml-2 my-2 text-left w-40">
                                                {userProfile.username}
                                            </p>
                                        </div>
                                        <div className="flex">
                                            <p className="text-right mr-2 my-2 w-40">
                                                ชื่อจริง :
                                            </p>
                                            <p className="ml-2 my-2 text-left w-40">
                                                {userProfile.firstname}
                                            </p>
                                        </div>
                                        <div className="flex">
                                            <p className="text-right mr-2 my-2 w-40">
                                                นามสกุล :
                                            </p>
                                            <p className="ml-2 my-2 text-left w-40">
                                                {userProfile.lastname}
                                            </p>
                                        </div>
                                        <div className="flex">
                                            <p className="text-right mr-2 my-2 w-40">
                                                เบอร์โทรศัพท์ :
                                            </p>
                                            <p className="ml-2 my-2 text-left w-40">
                                                {userProfile.phone}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {editProfile === 1 && (
                                    <div>
                                        <div className="flex">
                                            <p className="text-right mr-2 my-2 w-24">
                                                ชื่อผู้ใช้ :
                                            </p>
                                            <input
                                                className="border-2 border-gray rounded-lg flex flex-col my-1 pl-2 w-56"
                                                value={updatedProfile.username}
                                                onChange={(e) => {
                                                    setUpdatedProfile({
                                                        ...updatedProfile,
                                                        username:
                                                            e.target.value,
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="flex">
                                            <p className="text-right mr-2 my-2 w-24">
                                                ชื่อจริง :
                                            </p>
                                            <input
                                                className="border-2 border-gray rounded-lg flex flex-col my-1 pl-2 w-56"
                                                value={updatedProfile.firstname}
                                                onChange={(e) => {
                                                    setUpdatedProfile({
                                                        ...updatedProfile,
                                                        firstname:
                                                            e.target.value,
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="flex">
                                            <p className="text-right mr-2 my-2 w-24">
                                                นามสกุล :
                                            </p>
                                            <input
                                                className="border-2 border-gray rounded-lg flex flex-col my-1 pl-2 w-56"
                                                value={updatedProfile.lastname}
                                                onChange={(e) => {
                                                    setUpdatedProfile({
                                                        ...updatedProfile,
                                                        lastname:
                                                            e.target.value,
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="flex">
                                            <p className="text-right mr-2 my-2 w-24">
                                                เบอร์โทรศัพท์ :
                                            </p>
                                            <input
                                                className="border-2 border-gray rounded-lg flex flex-col my-1 pl-2 w-56"
                                                value={updatedProfile.phone}
                                                onChange={(e) => {
                                                    setUpdatedProfile({
                                                        ...updatedProfile,
                                                        phone: e.target.value,
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                                {editProfile === 2 && (
                                    <div>
                                        <div className="flex">
                                            <p className="text-right mr-2 my-2 w-32">
                                                รหัสผ่านเดิม :
                                            </p>
                                            <input
                                                onChange={(e) => {
                                                    setPassword({
                                                        ...password,
                                                        oldpassword:
                                                            e.target.value,
                                                    })
                                                }}
                                                className="border-2 border-gray rounded-lg flex flex-col my-1 pl-2 w-[50%] md:w-56"
                                            />
                                        </div>
                                        <div className="flex">
                                            <p className="text-right mr-2 my-2 w-32">
                                                รหัสผ่านใหม่ :
                                            </p>
                                            <input
                                                onChange={(e) => {
                                                    setPassword({
                                                        ...password,
                                                        newpassword:
                                                            e.target.value,
                                                    })
                                                }}
                                                className="border-2 border-gray rounded-lg flex flex-col my-1 pl-2 w-[50%] md:w-56"
                                            />
                                        </div>
                                        <div className="flex">
                                            <p className="text-right mr-2 my-2 w-32 ">
                                                ยืนยันรหัสผ่านใหม่ :
                                            </p>
                                            <input
                                                onChange={(e) => {
                                                    setPassword({
                                                        ...password,
                                                        confirmpassword:
                                                            e.target.value,
                                                    })
                                                }}
                                                className="border-2 border-gray rounded-lg flex flex-col my-1 pl-2 w-[50%] md:w-56"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex font-Kanit">
                            <div className="basis-1/2 flex justify-end md:py-5 pb-5 px-2">
                                {/* {editProfile} */}
                                {editProfile === 0 && (
                                    <div className="flex md:flex-row flex-col">
                                        <button
                                            className="bg-[#FDFEFE] hover:bg-[#E5E7E9] active:bg-[#D7DBDD] text-black py-2 mx-4 rounded-xl border-neutral-300 border-2 md:w-[200px] w-[150px] flex justify-center md:mb-0 mb-2"
                                            onClick={() => setEditProfile(1)}
                                        >
                                            แก้ไขโปรไฟล์
                                        </button>
                                        <button
                                            className="bg-[#FDFEFE] hover:bg-[#E5E7E9] active:bg-[#D7DBDD] text-black py-2 mx-4 rounded-xl border-neutral-300 border-2 md:w-[200px] w-[150px] flex justify-center"
                                            onClick={() => setEditProfile(2)}
                                        >
                                            เปลี่ยนรหัสผ่าน
                                        </button>
                                    </div>
                                )}
                                {editProfile === 1 && (
                                    <div className="flex ">
                                        <button
                                            className="hover:bg-gray-300 text-black bg-gray-200 py-2 mr-4 rounded-primary md:w-40 w-[80px] flex justify-center"
                                            onClick={() => setEditProfile(0)}
                                        >
                                            ยกเลิก
                                        </button>
                                        <button
                                            className="hover:bg-green-700 text-white bg-green-600 py-2  rounded-primary w-[120px] md:w-40 flex justify-center"
                                            onClick={profileHandler}
                                        >
                                            ยืนยันการแก้ไข
                                        </button>
                                    </div>
                                )}
                                {editProfile === 2 && (
                                    <div className="flex">
                                        <button
                                            className="hover:bg-gray-300 text-black bg-gray-200 py-2 mr-4 rounded-primary md:w-40 w-[80px] flex justify-center"
                                            onClick={() => setEditProfile(0)}
                                        >
                                            ยกเลิก
                                        </button>
                                        <button
                                            className="hover:bg-green-700 text-white bg-green-600 py-2  rounded-primary w-[120px] md:w-40 flex justify-center"
                                            onClick={passwordHandler}
                                        >
                                            ยืนยันการแก้ไข
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <img
                        src="/assets/burgur-bottom.png"
                        className=" rotate-[6.10rad] md:w-[25%] w-[40%]"
                    />
                </div>
            </div>
        </div>
    )
}
