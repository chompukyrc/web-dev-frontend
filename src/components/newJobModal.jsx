import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function newJobModal({ showModal, setShowModal }) {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [creatJob, setCreatJob] = useState({
        restaurant: '',
        time: '00:00',
        limit: 1,
        description: '',
    })

    async function creatJobHandler() {
        const token = localStorage.getItem('token')
        console.log('clickyyyy')

        if (
            creatJob.restaurant == '' ||
            creatJob.time == '' ||
            creatJob.limit == ''
        ) {
            toast.error('🍔 Missing Information', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
            return
        }

        const _time = creatJob.time.split(':')
        const now = new Date()
        now.setHours(parseInt(_time[0]), parseInt(_time[1]))

        setIsLoading(true)

        try {
            const res = await axios({
                url: import.meta.env.VITE_API + '/api/Job',
                method: 'POST',
                data: {
                    Restaurants: creatJob.restaurant,
                    Time: now.getTime(),
                    Limit: parseInt(creatJob.limit),
                    Description:
                        creatJob.description == '' ? '-' : creatJob.description,
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log(res)
            if (res.data) {
                toast.success('🍔 You are delivery man now', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                })
                setTimeout(() => {
                    setIsLoading(false)
                    // return navigate('/statusJob')
                    window.location.reload(false)
                    // navigate('/', {})
                }, 3000)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    return (
        <div>
            {showModal ? (
                <>
                    <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        🍔 You'll be the delivery man for your
                                        friend
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <div className="my-4 text-slate-500 text-lg leading-relaxed">
                                        {/* ร้านที่ไปได้ */}
                                        <label
                                            htmlFor="restaurant"
                                            className="font-normal text-lg mt-4 text-black"
                                        >
                                            ร้านที่ไปได้
                                        </label>
                                        <input
                                            type="text"
                                            id="restaurant"
                                            className="w-full px-4 py-2 mt-2 mb-4 shadow-lg"
                                            placeholder="eg. ทุกร้านในโรงพระเทพ"
                                            value={creatJob.restaurant}
                                            onChange={(e) => {
                                                setCreatJob({
                                                    ...creatJob,
                                                    restaurant: e.target.value,
                                                })
                                            }}
                                        />

                                        <div className="flex justify-between">
                                            {/* เวลา */}
                                            <div>
                                                <label
                                                    htmlFor="time"
                                                    className="font-normal text-lg mt-4 text-black"
                                                >
                                                    จะออกไปซื้อเวลา
                                                </label>
                                                <input
                                                    type="time"
                                                    id="time"
                                                    className="w-full px-4 py-2 mt-2 mb-4 shadow-lg"
                                                    value={creatJob.time}
                                                    onChange={(e) => {
                                                        setCreatJob({
                                                            ...creatJob,
                                                            time: e.target
                                                                .value,
                                                        })
                                                    }}
                                                />
                                            </div>
                                            {/* ลิมิตจำนวนกล่อง */}
                                            <div>
                                                <label
                                                    htmlFor="limit"
                                                    className="font-normal text-lg mt-4 text-black"
                                                >
                                                    ลิมิตจำนวนกล่อง
                                                </label>
                                                <input
                                                    type="number"
                                                    id="limit"
                                                    className="w-full px-4 py-2 mt-2 mb-4 shadow-lg"
                                                    placeholder="eg. 10"
                                                    min="1"
                                                    value={creatJob.limit}
                                                    onChange={(e) => {
                                                        setCreatJob({
                                                            ...creatJob,
                                                            limit: e.target
                                                                .value,
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* หมายเหตุ */}
                                        <label
                                            htmlFor="description"
                                            className="font-normal text-lg mt-4 text-black"
                                        >
                                            หมายเหตุ
                                        </label>
                                        <input
                                            type="text"
                                            id="description"
                                            className="w-full px-4 py-2 mt-2 shadow-lg"
                                            placeholder="eg. ไปส่งแค่ที่ตึกECCนะจ้ะ"
                                            value={creatJob.description}
                                            onChange={(e) => {
                                                setCreatJob({
                                                    ...creatJob,
                                                    description: e.target.value,
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={creatJobHandler}
                                        disabled={isLoading}
                                    >
                                        {isLoading === true
                                            ? 'Loading...'
                                            : 'Submit'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    )
}
