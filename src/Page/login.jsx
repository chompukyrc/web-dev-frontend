import React, { useState } from 'react'
import axios, { Axios } from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

function login() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [userLogin, setUserLogin] = useState({
        username: '',
        password: '',
    })

    async function loginHandler() {
        console.log('Click!!!')
        setIsLoading(true)

        try {
            const res = await axios({
                url: import.meta.env.VITE_API + '/api/Users/Login',
                method: 'POST',
                data: {
                    Username: userLogin.username,
                    Password: userLogin.password,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (res.data) {
                setTimeout(() => {
                    setIsLoading(false)
                    localStorage.setItem('token', res.data)
                    return navigate('/')
                }, 2000)
            }
        } catch (error) {
            toast.error('🍔 Username or password is incorrect!', {
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
        <div className="flex justify-center w-full bg-gray-200 h-screen items-center relative overflow-hidden font-Kanit">
            <ToastContainer />
            <div className="w-full h-full absolute flex z-0">
                <div className="bg-gradient-to-br from-[#4a9d51] to-[#66aac0] w-1/2 h-full"></div>
                <div className="bg-gray w-1/2 h-full"></div>
            </div>
            <div className=" rounded-full bg-green-600 absolute right-0 -top-20 w-96 h-96"></div>
            <img
                src="/assets/linegroup.png"
                width={'300px'}
                className="absolute right-0 bottom-0"
            />
            <div className="max-w-6xl w-full z-10">
                <div className=" rounded-primary flex flex-row justify-center">
                    {/* กล่องซ้าย */}
                    <div className=" flex flex-col relative justify-center items-center w-1/2 bg-opacity-20 bg-white rounded-l-primary">
                        <img
                            src="/assets/burgur-top.png"
                            width={'1000px'}
                            className=" absolute -top-32 -right-12 animate-waving2 rotate-12 "
                        />
                        <img src="/assets/logo.png" className="z-20" />
                        <img
                            src="/assets/burgur-bottom.png"
                            width={'600px'}
                            className="absolute -left-32 -bottom-56 rotate-12 animate-waving"
                        />
                    </div>
                    {/* กล่องขวา */}
                    <div className="flex flex-col justify-center items-center w-1/2 bg-white rounded-r-primary text-xl">
                        <div className='flex flex-row text-3xl pt-24'>
                            <div className="text-green-500">
                            สวัสดีน้าา !  
                            </div>
                            <div className="text-3xl">
                            &nbsp;&nbsp;เหล่าผู้หิวโหย 🤤
                            </div>
                        </div>
                        
                        <div className="px-24 pt-12 ">
                            {/* username */}
                            <label
                                htmlFor="username"
                                className=" font-semibold text-lg"
                            >
                                ชื่อผู้ใช้
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="w-full pl-8 p-2 mt-4 mb-8 shadow-lg"
                                placeholder="ชื่อผู้ใช้ของคุณ"
                                value={userLogin.username}
                                onChange={(e) => {
                                    setUserLogin({
                                        ...userLogin,
                                        username: e.target.value,
                                    })
                                }}
                            />
                            {/* password */}
                            <label
                                htmlFor="password"
                                className=" font-semibold text-lg"
                            >
                                รหัสผ่าน
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full pl-8 p-2 mt-2 mb-8 shadow-lg"
                                placeholder="รหัสผ่านของคุณ"
                                value={userLogin.password}
                                onChange={(e) => {
                                    setUserLogin({
                                        ...userLogin,
                                        password: e.target.value,
                                    })
                                }}
                            />
                            <div className="w-full flex justify-center pt-8">
                                <button
                                    onClick={loginHandler}
                                    disabled={isLoading}
                                    className="bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-600 text-white py-2 px-4 rounded-2xl w-3/5 flex justify-center"
                                >
                                    {isLoading === true
                                        ? 'กำลังโหลด...'
                                        : 'เข้าสู่ระบบ'}
                                </button>
                            </div>
                            {/* line */}
                            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                            <div className="p-2 w-full flex justify-center text-lg">
                                <div>ยังไม่มีบัญชีอย่างนั้นหรอ ?</div>
                                <div
                                    className="pl-2 pb-24 font-semibold text-green-600 cursor-pointer hover:underline"
                                    onClick={() => {
                                        navigate('/register')
                                    }}
                                >
                                    สร้างเลย !
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default login
