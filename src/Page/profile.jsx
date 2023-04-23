import React, { useState, useEffect } from 'react'
import Avatar, { genConfig } from 'react-nice-avatar'
import axios, { Axios } from 'axios'

export default function profile() {
    const config = genConfig()
    const token = localStorage.getItem('token')
    const [editProfile, setEditProfile] = useState(0) //0-common 1-editProfile 2-editPassword
    const [password,setPassword] = useState({
        oldpassword:"",
        newpassword:"",
        confirmpassword:""
    })
    const [userProfile,setUserProfile] = useState({})
    const [updatedProfile,setUpdatedProfile] = useState({
        username:"",
        firstname:"",
        lastname:"",
        phone:""
    })

    useEffect(() =>{
        const fetchProfile = async () => {
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
        fetchProfile()
    },[])

    async function fetchProfile(){
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
                    Phone: updatedProfile.phone
                },
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            fetchProfile()
            setEditProfile(0)
        } catch (error) {
            console.log(error)
        }
    }

    async function passwordHandler(){
        if(password.newpassword!=password.confirmpassword){
            console.log("Password Doesn't Match")
        }
        else{
            try {
                const res = await axios({
                    url: import.meta.env.VITE_API + '/api/Users/UpdateUserPassword',
                    method: 'POST',
                    data: {
                        OldPassword:password.oldpassword,
                        NewPassword:password.newpassword,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                console.log("Change Password Success!!")
                fetchProfile()
                setEditProfile(0)
            }
            catch (error) {
                console.log("Password Incorrect")
            }
        }
    }

    return (
        <div>
            <div className="flex absolute justify-center items-center w-full h-full z-0">
                <div className="rounded-full bg-[#E67E22] h-secondary w-secondary"></div>
            </div>

            <div className="flex flex-col justify-center items-center h-screen">
                <img
                    src="/assets/burgur-top.png"
                    width={'300px'}
                    className="rotate-[6.10rad]"
                />
                <div className="bg-white flex flex-col justify-center items-center rounded-primary max-w-2xl w-full shadow-2xl z-10 my-10">
                    <Avatar className="w-14 h-14 mr-2 my-8" {...config} />
                    <div className="flex items-center justify-center font-Kanit mx-auto pb-2">
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
                                            placeholder={userProfile.username}
                                            onChange={(e) => {
                                                setUpdatedProfile({
                                                    ...updatedProfile,
                                                    username: e.target.value,
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
                                            placeholder={userProfile.firstname}
                                            onChange={(e) => {
                                                setUpdatedProfile({
                                                    ...updatedProfile,
                                                    firstname: e.target.value,
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
                                            placeholder={userProfile.lastname}
                                            onChange={(e) => {
                                                setUpdatedProfile({
                                                    ...updatedProfile,
                                                    lastname: e.target.value,
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
                                            placeholder={userProfile.phone}
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
                                                oldpassword: e.target.value,
                                            })
                                        }}
                                        className="border-2 border-gray rounded-lg flex flex-col my-1 pl-2 w-56" />
                                    </div>
                                    <div className="flex">
                                        <p className="text-right mr-2 my-2 w-32">
                                            รหัสผ่านใหม่ :
                                        </p>
                                        <input 
                                        onChange={(e) => {
                                            setPassword({
                                                ...password,
                                                newpassword: e.target.value,
                                            })
                                        }}
                                        className="border-2 border-gray rounded-lg flex flex-col my-1 pl-2 w-56" />
                                    </div>
                                    <div className="flex">
                                        <p className="text-right mr-2 my-2 w-32">
                                            ยืนยันรหัสผ่านใหม่ :
                                        </p>
                                        <input 
                                        onChange={(e) => {
                                            setPassword({
                                                ...password,
                                                confirmpassword: e.target.value,
                                            })
                                        }}
                                        className="border-2 border-gray rounded-lg flex flex-col my-1 pl-2 w-56" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex font-Kanit">
                        <div className="basis-1/2 flex justify-end py-5 px-2">
                            {/* {editProfile} */}
                            {editProfile === 0 && (
                                <div className="flex">
                                    <button
                                        className="bg-[#FDFEFE] hover:bg-[#E5E7E9] active:bg-[#D7DBDD] text-black py-2 mx-4 rounded-xl border-neutral-300 border-2 w-[200px] flex justify-center"
                                        onClick={() => setEditProfile(1)}
                                    >
                                        แก้ไขโปรไฟล์
                                    </button>
                                    <button
                                        className="bg-[#FDFEFE] hover:bg-[#E5E7E9] active:bg-[#D7DBDD] text-black py-2 mx-4 rounded-xl border-neutral-300 border-2 w-[200px] flex justify-center"
                                        onClick={() => setEditProfile(2)}
                                    >
                                        เปลี่ยนรหัสผ่าน
                                    </button>
                                </div>
                            )}
                            {editProfile === 1 && (
                                <div className="flex">
                                    <button
                                        className="hover:bg-gray-300 text-black bg-gray-200 py-2 mx-4 rounded-primary w-40 flex justify-center"
                                        onClick={() => setEditProfile(0)}
                                    >
                                        ยกเลิก
                                    </button>
                                    <button
                                        className="hover:bg-green-700 text-white bg-green-600 py-2 mx-4 rounded-primary w-40 flex justify-center"
                                        onClick={profileHandler}
                                    >
                                        ยืนยันการแก้ไข
                                    </button>
                                </div>
                            )}
                            {editProfile === 2 && (
                                <div className="flex">
                                    <button
                                        className="hover:bg-gray-300 text-black bg-gray-200 py-2 mx-4 rounded-primary w-40 flex justify-center"
                                        onClick={() => setEditProfile(0)}
                                    >
                                        ยกเลิก
                                    </button>
                                    <button
                                        className="hover:bg-green-700 text-white bg-green-600 py-2 mx-4 rounded-primary w-40 flex justify-center"
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
                    width={'250px'}
                    className=" rotate-[6.10rad]"
                />
            </div>
        </div>
    )
}
