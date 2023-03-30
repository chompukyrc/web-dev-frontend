import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
        setTimeout(() => {
            console.log('loigin')

            setIsLoading(false)
            return navigate('/')
        }, 1000)
    }

    return (
        <div className="flex justify-center w-full bg-gray-200 h-screen items-center relative overflow-hidden">
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
                    <div className="flex flex-col justify-center items-center w-1/2 bg-white rounded-r-primary">
                        <div className="pt-24 text-2xl">
                            Hello ! Hungry guys
                        </div>
                        <div className="px-24 pt-12 ">
                            {/* username */}
                            <label
                                htmlFor="username"
                                className=" font-semibold text-lg"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="w-full pl-8 p-2 mt-4 mb-8 shadow-lg"
                                placeholder="Enter your username"
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
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full pl-8 p-2 mt-2 mb-8 shadow-lg"
                                placeholder="Enter your password"
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
                                        ? 'Loading...'
                                        : 'Login'}
                                </button>
                            </div>
                            {/* line */}
                            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                            <div className="p-2 w-full flex justify-center">
                                <div>don't you have an account?</div>
                                <div
                                    className="pl-2 pb-24 font-semibold text-green-600 cursor-pointer hover:underline"
                                    onClick={() => {
                                        navigate('/register')
                                    }}
                                >
                                    Create account
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
