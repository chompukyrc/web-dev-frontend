import React, { useState } from 'react'
import axios, { Axios } from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

function register() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [userRegister, setUserRegister] = useState({
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        confirmpassword: '',
        phone: '',
    })

    async function registerHandler() {
        console.log('Click!!!')

        if (
            userRegister.username == '' ||
            userRegister.password == '' ||
            userRegister.confirmpassword == '' ||
            userRegister.firstname == '' ||
            userRegister.lastname == '' ||
            userRegister.phone == ''
        ) {
            toast.error('🍔 กรอกข้อมูลให้ครบถ้วน', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
            return
        }
        if (userRegister.password != userRegister.confirmpassword) {
            toast.error('🍔 Confirm password is incorrect', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
            return
        }

        setIsLoading(true)

        try {
            const res = await axios({
                url: import.meta.env.VITE_API + '/api/Users/Register',
                method: 'POST',
                data: {
                    Username: userRegister.username,
                    Password: userRegister.password,
                    Firstname: userRegister.firstname,
                    Lastname: userRegister.lastname,
                    Phone: userRegister.phone,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (res.data) {
                toast.success('🍔 Registration successful', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                })
                setTimeout(() => {
                    setIsLoading(false)
                    return navigate('/login')
                }, 3000)
            }
        } catch (error) {
            toast.error('🍔 Username already in use', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
            setIsLoading(false)
        }
    }

    return (
        <div className="font-Kanit text-xl bg-gradient-to-br from-[#4a9d51] to-[#66aac0] flex justify-center w-full h-screen items-center relative overflow-x-hidden pt-20">
            <ToastContainer />
            <div className="bg-white flex flex-col justify-center items-center rounded-primary md:w-[40%] w-80 md:my-20 shadow-2xl">
                {/* decorate */}
                <img
                    src="/assets/burgur-top.png"
                    className="absolute md:top-0 top-[60px] md:right-1/4 -right-[0.5px] rotate-12 md:w-[18%] w-[35%]"
                />
                <img
                    src="/assets/burgur-bottom.png"
                    className="absolute -bottom-28 rotate-12 md:left-[400px] md:top-[750px] top-[780px] 
                    left-[0.5px] md:w-[18%] w-[35%]"
                />
                <div className=" text-green-600 font-medium md:text-4xl text-lg my-4">
                    สร้างบัญชี
                </div>
                <img
                    src="/assets/linegroup2.png"
                    className="md:absolute md:left-0 md:top-10 hidden md:block "
                />
                <div className="md:rounded-full md:bg-green-200 md:bg-gradient-to-t md:absolute md:-right-16 md:-bottom-20 md:w-80 md:h-80 md:block hidden"></div>
                <div className="md:text-2xl text-sm mb-4">
                    เพื่อเริ่มต้นใช้งาน!
                </div>
                <div className="flex flex-col w-2/3 md:text-lg text-sm">
                    {/* Name */}
                    <label htmlFor="name" className="font-semibold mt-4">
                        ชื่ออะไรเอ่ยย
                    </label>
                    <div className="flex flex-col md:flex-row">
                        <input
                            type="text"
                            id="firstname"
                            className="w-full px-4 py-2 mt-2 md:mb-4 mb-2 shadow-lg"
                            placeholder="ชื่อจริง"
                            value={userRegister.firstname}
                            onChange={(e) => {
                                setUserRegister({
                                    ...userRegister,
                                    firstname: e.target.value,
                                })
                            }}
                        />
                        <input
                            type="text"
                            id="lastname"
                            className="w-full px-4 py-2 md:mb-4 mb-2 shadow-lg"
                            placeholder="นามสกุล"
                            value={userRegister.lastname}
                            onChange={(e) => {
                                setUserRegister({
                                    ...userRegister,
                                    lastname: e.target.value,
                                })
                            }}
                        />
                    </div>

                    {/* Username */}
                    <label htmlFor="username" className="font-semibold mt-4">
                        ชื่อผู้ใช้
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full px-4 py-2 mt-2 md:mb-4 mb-2 shadow-lg"
                        placeholder="ชื่อผู้ใช้อะไรดีน้า"
                        value={userRegister.username}
                        onChange={(e) => {
                            setUserRegister({
                                ...userRegister,
                                username: e.target.value,
                            })
                        }}
                    />
                    {/* Password */}
                    <label htmlFor="password" className="font-semibold mt-4">
                        รหัสผ่าน
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 mt-2 md:mb-4 mb-2 shadow-lg"
                        placeholder="รหัสผ่านของคุณ "
                        value={userRegister.password}
                        onChange={(e) => {
                            setUserRegister({
                                ...userRegister,
                                password: e.target.value,
                            })
                        }}
                    />
                    {/* Confirm password */}
                    <label
                        htmlFor="confirmPassword"
                        className="font-semibold mt-4"
                    >
                        ยืนยันรหัสผ่าน
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-4 py-2 mt-2 md:mb-4 mb-2 shadow-lg"
                        placeholder="ยืนยันรหัสผ่านของคุณ"
                        value={userRegister.confirmpassword}
                        onChange={(e) => {
                            setUserRegister({
                                ...userRegister,
                                confirmpassword: e.target.value,
                            })
                        }}
                    />
                    {/* Phone */}
                    <label htmlFor="phone" className="font-semibold mt-4">
                        เบอร์โทรศัพท์
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-2 mt-2 md:mb-4 mb-2 shadow-lg"
                        placeholder="090-000-0000"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        value={userRegister.phone}
                        onChange={(e) => {
                            setUserRegister({
                                ...userRegister,
                                phone: e.target.value,
                            })
                        }}
                    />
                    {/* Submit button */}
                    <div className="w-full flex justify-center md:pt-8 pt-4">
                        <button
                            className="bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-600 text-white py-2 px-4 rounded-2xl w-3/5 flex justify-center"
                            onClick={registerHandler}
                            disabled={isLoading}
                        >
                            {isLoading === true ? 'กำลังสมัคร...' : 'สมัครเลย'}
                        </button>
                    </div>
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <div className="p-2 w-full flex justify-center md:text-lg text-xs">
                        <div>อ่าว มีบัญชีอยู่แล้วงั้นหรอ?</div>
                        <div
                            className="pl-2 pb-4 font-semibold text-green-600 cursor-pointer hover:underline"
                            onClick={() => {
                                navigate('/login')
                            }}
                        >
                            เข้าสู่ระบบ
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default register
