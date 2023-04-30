import React, { useState, useEffect } from 'react'
import Img1 from './imgForAd/img1.png'
import Img2 from './imgForAd/img2.png'
import Img3 from './imgForAd/img3.png'
import Img4 from './imgForAd/img4.png'
import Img5 from './imgForAd/img5.png'

export default function PremiumPopup({ isPremium }) {
    const [countdown, setCountdown] = useState(6)
    const [isShow, setIsShow] = useState(false)
    const [img, setImg] = useState()

    const images = [Img1, Img2, Img3, Img4, Img5]

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

        setImg(images[Math.floor(Math.random() * images.length)])
        return () => clearInterval(interval)
    }, [])

    return (
        isShow &&
        !isPremium && (
            <div className="fixed inset-x-0 top-0 left-0 bg-gray-300 bg-opacity-80 w-screen h-screen flex justify-center items-center">
                <div
                    className="animate animate-in slide-in-from-top rounded-xl w-1/2 flex-col z-50 p-8 bg-white flex justify-center items-center"
                    style={{
                        animationDuration: '2000ms',
                        transitionDuration: '2000ms',
                    }}
                >
                    <img className="" src={img} alt="" />
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
