import React, { useState, useEffect } from 'react'

export default function PremiumPopup({ isPremium }) {
    const [countdown, setCountdown] = useState(5)
    const [isShow, setIsShow] = useState(true)

    useEffect(() => {
        countdown > 0 && setTimeout(() => setCountdown(countdown - 1), 1000)
    }, [countdown])

    useEffect(() => {
        const interval = setInterval(() => {
            // console.log('Check Show ADS', localStorage.getItem('show_ads'))
            if (localStorage.getItem('show_ads') === 'show' && !isShow) {
                setIsShow(true)
                setCountdown(5)
                localStorage.removeItem('show_ads')
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        isShow &&
        !isPremium && (
            <div className="fixed inset-x-0 top-0 left-0 bg-gray-300 bg-opacity-80 w-screen h-screen">
                <div className=" rounded-xl flex-col z-50 fixed inset-x-0 top-32 left-1/2 -translate-x-1/2 p-8 bg-white flex justify-center items-center">
                    <iframe
                        width="853"
                        height="480"
                        src={`https://www.youtube.com/embed/vq1qVQtRJWo`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                    <div className="mt-8 h-14 flex justify-center items-center">
                        {countdown !== 0 ? (
                            <p className="text-md ">
                                ปิดโฆษณาได้ในอีก {countdown} วินาที
                            </p>
                        ) : (
                            <button
                                className="relative rounded-lg px-5 py-3 text-white bg-black w-48"
                                onClick={() => setIsShow(false)}
                            >
                                ปิด
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )
    )
}
