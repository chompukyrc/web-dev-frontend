import React from 'react'
import { formatDistance } from 'date-fns'
import { th } from 'date-fns/locale'

export default function NotificationCard({
    action,
    isRead,
    time,
    restaurants,
}) {
    return (
        <div className="bg-white p-2 px-4 m-2 rounded-xl flex">
            <div className="flex justify-center items-center">
                {action === 'accept' ? (
                    <p className="mdi mdi-comment-check text-green-600 text-3xl mx-2"></p>
                ) : action === 'reject' ? (
                    <p className="mdi mdi-comment-remove text-red-600 text-3xl mx-2"></p>
                ) : (
                    <p className="mdi mdi-playlist-check text-blue-600 text-3xl mx-2"></p>
                )}
            </div>
            <div className="flex flex-col justify-center">
                <p className="mt-1">
                    ออเดอร์ของคุณ ที่ไปร้าน
                    <span className=" underline font-bold">
                        {restaurants}
                    </span>{' '}
                    {action === 'accept'
                        ? 'ได้รับการยืนยันแล้ว'
                        : action === 'reject'
                        ? 'ถูกปฏิเสธ'
                        : 'เสร็จสิ้นแล้ว'}
                </p>
                <div className="text-blue-500 text-xs text-end">
                    {/* 8 minute ago */}
                    {formatDistance(new Date(time), new Date(), {
                        locale: th,
                        addSuffix: true,
                    })}
                </div>
            </div>
        </div>
    )
}
