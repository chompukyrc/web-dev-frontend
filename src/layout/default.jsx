import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Dialog from '../components/dialog'

const Layout = ({ children }) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const handleConfirm = (result) => {
        if (result) {
            console.log('some action...')
            localStorage.clear()
            window.location.reload()
        }

        setOpen(false)
    }

    return (
        <div>
            <div className="bg-[#60B664] flex w-screen justify-around">
                <div
                    className="flex items-center text-white text-lg font-semibold cursor-pointer"
                    onClick={() => {
                        navigate('/')
                    }}
                >
                    <img
                        src="/assets/logo.png"
                        className="relative m-4"
                        width={'60px'}
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
                        onClick={() => setOpen(true)}
                    >
                        <i className="mdi mdi-logout p-1"></i>
                        Logout
                    </div>
                    <Dialog
                        text={'Are you sure to Logout?'}
                        open={open}
                        handleConfirm={handleConfirm}
                    />
                </div>
            </div>
            <main>{children}</main>
        </div>
    )
}

export default Layout
