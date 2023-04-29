import React, { useState } from 'react'
import InputNumberContainer from './inputNumberContainer'

export default function PremiumPopup() {
    const [isLogin, setIsLogin] = useState(true)
    const [isShow, setIsShow] = useState(true)
    const [trueMoney, setTrueMoney] = useState([
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
    ])

    // Todo: check is login

    return (
        isShow && (
            <div
                style={{
                    animationDuration: '3000ms',
                    transitionDuration: '3000ms',
                }}
                className=" animate animate-in slide-in-from-bottom pt-8 pb-4 pl-4 pr-4 fixed inset-x-0 bottom-0 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-opacity-60 h-24 z-50 flex items-center space-x-4 justify-center"
            >
                <p className=" text-white text-3xl mb-4">
                    สมัครพรีเมียมเมมเบอร์วันนี้ เพื่อรับ
                    <span className=" font-bold text-6xl">สิทธิพิเศษ</span>
                    กว่าใคร
                </p>
                <div className="p-2 text-center text-white animate animate-bounce duration-1500 font-bold">
                    <p className="text-2xl">
                        เพียง{' '}
                        <span className="text-4xl text-green-400">50</span>{' '}
                        ทรูมันนี่
                    </p>
                    <p>
                        <span className="text-2xl text-green-400">ลด 49% </span>
                        <span className="line-through">จากเดิม 90 บาท</span>
                    </p>
                </div>
                <InputNumberContainer
                    trueMoney={trueMoney}
                    setTrueMoney={setTrueMoney}
                />
                <div className="relative">
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-75 blur"></div>
                    <button className="relative rounded-lg bg-black px-7 py-4 text-white">
                        สมัครเลย!
                    </button>
                </div>
                <button
                    className=" absolute top-2 right-2 text-sm text-white"
                    onClick={() => setIsShow(false)}
                >
                    <i className="mdi mdi-close"></i>
                </button>
            </div>
        )
    )
}
