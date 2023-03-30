import React from 'react'

const Layout = ({ children }) => {
    return (
        <>
            <div>i am layout</div>
            <main>{children}</main>
        </>
    )
}

export default Layout
