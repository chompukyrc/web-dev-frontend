import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'

const Layout = ({ children }) => {
    const navigate = useNavigate()

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div>
            <div className="bg-[#60B664] flex w-screen justify-around">
                <div className="flex items-center text-white text-lg font-semibold">
                    <img
                        src="/assets/logo.png"
                        className="relative m-4"
                        width={'60px'}
                        onClick={() => {
                            navigate('/')
                        }}
                    />
                    Feed My Friend
                </div>
                <div className="flex items-center">
                    <div
                        className="p-4 bg-[#60B664] hover:bg-[#4da452] cursor-pointer text-white"
                        onClick={() => {
                            navigate('/')
                        }}
                    >
                        Home
                    </div>
                    <div
                        className="p-4 bg-[#60B664] hover:bg-[#4da452] cursor-pointer text-white"
                        onClick={() => {
                            navigate('/profile')
                        }}
                    >
                        Profile
                    </div>
                    <div
                        className="p-4 bg-[#60B664] hover:bg-[#4da452] cursor-pointer text-white"
                        onClick={() => {
                            navigate('/aboutUs')
                        }}
                    >
                        About Us
                    </div>
                    <div className="p-4 bg-[#60B664] hover:bg-[#4da452] cursor-pointer text-white">
                        Loguot
                    </div>
                </div>
            </div>
            <main>{children}</main>
        </div>
    )
}

export default Layout
