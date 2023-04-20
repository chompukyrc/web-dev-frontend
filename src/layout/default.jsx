import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'

const Layout = ({ children }) => {
    const navigate = useNavigate()

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    function logoutHandler() {
        setTimeout(() => {
            localStorage.clear()
            window.location.reload()
        }, 5000)
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
                        <i className="mdi mdi-home p-1"></i>
                        Home
                    </div>
                    <div
                        className="p-4 bg-[#60B664] hover:bg-[#4da452] cursor-pointer text-white"
                        onClick={() => {
                            navigate('/profile')
                        }}
                    >
                        <i className="mdi mdi-account p-1"></i>
                        Profile
                    </div>
                    <div
                        className="p-4 bg-[#60B664] hover:bg-[#4da452] cursor-pointer text-white"
                        onClick={() => {
                            navigate('/aboutUs')
                        }}
                    >
                        <i className="mdi mdi-developer-board p-1"></i>
                        About Us
                    </div>
                    <div
                        className="p-4 bg-[#60B664] hover:bg-[#4da452] cursor-pointer text-white"
                        onClick={() => logoutHandler()}
                    >
                        <i className="mdi mdi-logout p-1"></i>
                        Loguot
                    </div>
                </div>
            </div>
            <main>{children}</main>
        </div>
    )
}

export default Layout
