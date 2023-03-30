import React from 'react'
import { useNavigate } from 'react-router-dom'

function register() {
    const navigate = useNavigate()

    return (
        <div className="bg-gradient-to-br from-[#4a9d51] to-[#66aac0] flex justify-center w-full h-screen items-center relative overflow-x-hidden pt-20">
            <div className="bg-white flex flex-col justify-center items-center rounded-primary max-w-3xl w-full my-20 shadow-2xl">
                {/* decorate */}
                <img
                    src="/assets/burgur-top.png"
                    width={'350px'}
                    className=" absolute top-0 rotate-45 "
                    style={{ left: '60%' }}
                />
                <img
                    src="/assets/burgur-bottom.png"
                    width={'350px'}
                    className="absolute -bottom-28 rotate-12"
                    style={{ right: '60%' }}
                />
                <div className=" text-green-600 font-bold text-4xl my-4">
                    Create an account
                </div>
                <img
                    src="/assets/linegroup2.png"
                    className="absolute left-0 top-10"
                />
                <div className=" rounded-full bg-[#e3e3e3e3] absolute -right-16 -bottom-20 w-80 h-80"></div>
                <div className="text-2xl mb-4">to get start now!</div>
                <div className="flex flex-col w-2/3">
                    {/* Name */}
                    <label
                        htmlFor="name"
                        className="font-semibold text-lg mt-4"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="firstname"
                        className="w-full px-4 py-2 mt-2 mb-4 shadow-lg "
                        placeholder="Enter your first name"
                    />
                    <input
                        type="text"
                        id="lastname"
                        className="w-full px-4 py-2 mb-4 shadow-lg"
                        placeholder="Enter your last name"
                    />
                    {/* Username */}
                    <label
                        htmlFor="username"
                        className="font-semibold text-lg mt-4"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full px-4 py-2 mt-2 mb-4 shadow-lg"
                        placeholder="Enter your username"
                    />
                    {/* Password */}
                    <label
                        htmlFor="password"
                        className="font-semibold text-lg mt-4"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 mt-2 mb-4 shadow-lg"
                        placeholder="Enter your password"
                    />
                    {/* Confirm password */}
                    <label
                        htmlFor="confirmPassword"
                        className="font-semibold text-lg mt-4"
                    >
                        Confirm password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-4 py-2 mt-2 mb-4 shadow-lg"
                        placeholder="Confirm your password"
                    />
                    <div className="w-full flex justify-center pt-8">
                        <button className="bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-600 text-white py-2 px-4 rounded-2xl w-3/5 flex justify-center">
                            Submit
                        </button>
                    </div>
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <div className="p-2 w-full flex justify-center">
                        <div>Already have an account?</div>
                        <div
                            className="pl-2 pb-4 font-semibold text-green-600 cursor-pointer hover:underline"
                            onClick={() => {
                                navigate('/login')
                            }}
                        >
                            Login
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default register
