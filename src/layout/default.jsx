import React from 'react'

const Layout = ({ children }) => {
    return (
        <div className="">
            {/* <img
                src="/assets/burger&line.png"
                className=" absolute bottom-0 left-0"
                width={'500px'}
            /> */}
            <div className="w-full bg-[#60B664] flex flex-col items-center pt-4">
                <img
                    src="/assets/logo.png"
                    className=" relative m-4"
                    width={'100px'}
                />
            </div>
            <main className="">{children}</main>
        </div>
    )
}

export default Layout
