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
                    return navigate('/greeting')
                }, 2000)
            }
        } catch (error) {
            toast.error('🍔 ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', {
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
        <div className="flex md:flex-row flex-col justify-center w-full bg-gray-200 h-screen items-center relative overflow-hidden font-Kanit">
            <ToastContainer />
            {/* <img
                src="/assets/burgur-top.png"
                className="md:hidden block animate-waving2 right-1/3 rotate-12 w-[100px] z-20"
            /> */}
            <img
                src="/assets/logo.png"
                className="z-20 block absolute md:hidden w-[150px] top-20"
            />

            <div className="w-full h-full absolute flex z-0">
                <div className="bg-gradient-to-br from-[#4a9d51] to-[#66aac0] w-full md:w-1/2  h-full"></div>
                <div className="bg-gray md:w-1/2 h-full"></div>
            </div>
            <div
                className=" rounded-full md:from-green-600 md:to-green-600 bg-gradient-to-br from-sky-300 to-green-500
            absolute md:right-0 md:-top-20  w-96 h-96"
            ></div>
            <img
                src="/assets/linegroup.png"
                width={'300px'}
                className="absolute right-0 bottom-0 "
            />

            <div className="max-w-6xl z-10 justify-center flex p-7 md:p-0">
                {/* กล่องซ้าย */}
                <div
                    className="md:flex hidden flex-col relative justify-center items-center h-auto 
                    w-1/2 bg-opacity-20 bg-white  sm:rounded-l-primary "
                >
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
                <div className="flex flex-col justify-center w-full  md:w-1/2 md:rounded-r-primary md:rounded-l-none rounded-primary items-center bg-white  text-xl">
                    <div className="flex flex-row text-lg md:text-3xl md:pt-24 pt-10">
                        <div className="text-green-500">สวัสดีน้าา !</div>
                        &nbsp;&nbsp;เหล่าผู้หิวโหย 🤤
                    </div>

                    <div className="ms:px-24 m:pt-12 px-6 pt-6 text-sm sm:text-lg">
                        {/* username */}
                        <label htmlFor="username" className=" font-semibold ">
                            ชื่อผู้ใช้
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full pl-8 p-4 rounded-md mt-4 mb-8 shadow-md shadow-slate-200"
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
                        <label htmlFor="password" className=" font-semibold ">
                            รหัสผ่าน
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full pl-8 p-4 mt-2 rounded-md mb-8 shadow-md shadow-slate-200"
                            placeholder="รหัสผ่านของคุณ"
                            value={userLogin.password}
                            onChange={(e) => {
                                setUserLogin({
                                    ...userLogin,
                                    password: e.target.value,
                                })
                            }}
                        />
                        <div className="flex justify-center md:pt-8">
                            <button
                                onClick={loginHandler}
                                disabled={isLoading}
                                className="bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-600 text-white mt-2 md:mt-0 py-2 px-4 rounded-2xl md:w-40 w-30 "
                            >
                                {isLoading === true
                                    ? 'กำลังโหลด...'
                                    : 'เข้าสู่ระบบ'}
                            </button>
                        </div>
                        {/* line */}
                        <hr className="h-px my-8 bg-gray-300 border-0"></hr>
                        <div className="p-2 w-full flex flex-row justify-center md:text-lg text-sm ">
                            <div>ยังไม่มีบัญชีอย่างนั้นหรอ ?</div>
                            <div
                                className="pl-2 md:pb-24 pb-8 font-semibold text-green-600 cursor-pointer hover:underline"
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
    )
}

export default login
