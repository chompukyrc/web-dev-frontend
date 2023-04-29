import React, { useState } from 'react'

export default function NotificationIcon() {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative md:w-1/12 w-1/2 flex justify-center font-Kanit">
            <i
                className={
                    'hover:bg-[#4da452] cursor-pointer text-white flex justify-center items-center mx-[3%] p-4 px-8 mdi w-8' +
                    (open ? ' mdi-bell ' : ' mdi-bell-outline ')
                }
                onClick={() => {
                    setOpen(!open)
                }}
            >
                {!open ? (
                    <span className="absolute flex items-center justify-center mb-8 ml-8 w-4 h-4 p-2 text-xs font-bold text-white bg-red-500 rounded-full">
                        3
                    </span>
                ) : (
                    <span></span>
                )}
            </i>

            {open && (
                <div
                    className=" absolute right-0 z-20 bg-gray-200 w-96 rounded-md text-sm bg-opacity-80"
                    style={{ top: '4.5rem' }}
                >
                    <div className="bg-white p-2 px-4 m-2 rounded-xl flex">
                        <p className="mdi mdi-comment-check text-green-600 text-3xl mx-2"></p>
                        <div className="flex flex-col justify-center">
                            ออเดอร์ของคุณ ที่ไปร้านพี่ฝน ได้รับการยืนยันแล้ว
                            <div className="text-blue-500 text-xs text-end">
                                8 minute ago
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-2 px-4 m-2 rounded-xl flex">
                        <p className="mdi mdi-comment-remove text-red-600 text-3xl mx-2"></p>
                        <div className="flex flex-col justify-center">
                            ออเดอร์ของคุณ ที่ไปร้านเทคโนอินเตอร์ ถูกปฏิเสธ
                            <div className="text-blue-500 text-xs text-end">
                                8 minute ago
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-2 px-4 m-2 rounded-xl flex">
                        <p className="mdi mdi-playlist-check text-blue-600 text-3xl mx-2"></p>
                        <div className="flex flex-col justify-center">
                            ออเดอร์ของคุณ ที่ไปร้านเทคโนอินเตอร์ ถูกปฏิเสธ
                            <div className="text-blue-500 text-xs text-end">
                                8 minute ago
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
