import React from 'react'

const Layout = ({ children }) => {
    return (
        <div className="">
            <div className="bg-[#60B664] flex">
                <img
                    src="/assets/logo.png"
                    className="relative m-4"
                    width={'70px'}
                />
                <div className="right-0">profile</div>
            </div>
            <main className="">{children}</main>
        </div>
    )
}

export default Layout
