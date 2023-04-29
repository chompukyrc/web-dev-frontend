import React, { useState, useEffect } from 'react'
import InputNumberContainer from './inputNumberContainer'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'

export default function PremiumFooter({ isPremium }) {
    const [isLogin, setIsLogin] = useState(true)
    const [isShow, setIsShow] = useState(true)
    const [ready, setReady] = useState(false)
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
    useEffect(() => {
        let fillAll = true
        // ตรวจสอบว่าเติมครบ 14 หลักหรือไม่
        for (let i = 0; i < 14; i++) {
            if (trueMoney[i] === '') {
                fillAll = false
                break
            }
        }

        if (fillAll) {
            // console.log('Ready')
            setReady(true)
        } else {
            setReady(false)
        }
    }, [trueMoney])

    const handleSubmit = async () => {
        try {
            // Random 0-9
            const rand = Math.floor(Math.random() * 10)
            // 40%
            if (rand >= 0 && rand <= 4) {
                const res = await axios({
                    url:
                        import.meta.env.VITE_API +
                        '/api/Users/UpdateToPremiumUser',
                    method: 'POST',
                    data: {},
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token',
                        )}`,
                    },
                })

                toast.success('🍔 You are premium member <3', {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                })

                window.location.reload()
            } else {
                toast.error('🍔 เลขบัตรไม่ถูกต้อง!!', {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                })
                setTrueMoney([
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
            }
        } catch (error) {}
    }

    return (
        isShow &&
        !isPremium && (
            <div
                style={{
                    animationDuration: '3000ms',
                    transitionDuration: '3000ms',
                }}
                className="font-Kanit animate animate-in slide-in-from-bottom 
                md:pt-8 pb-4 pl-4 pr-4 fixed md:inset-x-0 bottom-0 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 
                bg-opacity-60 md:h-24 h-60 z-50 flex flex-col md:flex-row items-center space-x-4 justify-center md:w-auto w-[100%] "
            >
                <ToastContainer />
                <p className=" text-white md:text-3xl text-lg mb-4 text-center">
                    สมัครพรีเมียมเมมเบอร์วันนี้ เพื่อรับ {' '}
                    <span className=" font-bold md:text-6xl text-2xl">
                        สิทธิพิเศษ
                    </span>
                    กว่าใคร
                </p>
                <div className="md:p-2  text-center text-white animate animate-bounce duration-1500 font-bold">
                    <p className="md:text-2xl text-lg">
                        เพียง{' '}
                        <span className="md:text-4xl text-2xl text-green-400">
                            50
                        </span>{' '}
                        ทรูมันนี่
                    </p>
                    <p>
                        <span className="md:text-2xl text-lg text-green-400">
                            ลด 49%{' '}
                        </span>
                        <span className="line-through">จากเดิม 90 บาท</span>
                    </p>
                </div>
                <InputNumberContainer
                    trueMoney={trueMoney}
                    setTrueMoney={setTrueMoney}
                />
                <div className="relative ">
                    <div className="absolute -inset-1 rounded-lg "></div>
                    <button
                        className={
                            ' relative rounded-lg px-7 md:py-4 py-2 text-white ' +
                            (ready ? ' bg-black ' : 'bg-gray-400 opacity-25 ')
                        }
                        disabled={!ready}
                        onClick={handleSubmit}
                    >
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
