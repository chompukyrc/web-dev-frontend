import React from 'react'

export default function NotificationCard() {
    return (
        <div className="bg-white p-2 px-4 m-2 rounded-xl flex">
            <p className="mdi mdi-comment-check text-green-600 text-3xl mx-2"></p>
            <div className="flex flex-col justify-center">
                ออเดอร์ของคุณ ที่ไปร้านพี่ฝน ได้รับการยืนยันแล้ว
                <div className="text-blue-500 text-xs text-end">
                    8 minute ago
                </div>
            </div>
        </div>
    )
}
