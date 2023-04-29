import React, { useState, useEffect } from 'react'
import Img1 from './imgForAd/img1.png'
import Img2 from './imgForAd/img2.png'
import Img3 from './imgForAd/img3.png'
import Img4 from './imgForAd/img4.png'
import Img5 from './imgForAd/img5.png'
import Img6 from './imgForAd/img6.png'
import Img7 from './imgForAd/img7.png'
import Img8 from './imgForAd/img8.png'
import Img9 from './imgForAd/img9.png'

export default function PremiumPopup({ isPremium }) {
    const [countdown, setCountdown] = useState(5)
    const [isShow, setIsShow] = useState(true)
    const images = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9]

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
                    <img
                        src={images[Math.floor(Math.random() * images.length)]}
                        alt=""
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
