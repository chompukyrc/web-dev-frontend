import React, { useState } from 'react'

export default function NotificationIcon() {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative">
            <i
                className={
                    'hover:bg-[#4da452] cursor-pointer text-white flex justify-center items-center w-20 py-2  mdi ' +
                    (open ? ' mdi-bell ' : ' mdi-bell-outline ')
                }
                onClick={() => {
                    setOpen(!open)
                }}
            ></i>
            {open && (
                <div
                    className=" absolute right-0 z-20 bg-red-300 w-96"
                    style={{ top: '4.5rem' }}
                >
                    Hello world
                </div>
            )}
        </div>
    )
}
