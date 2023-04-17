import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function newOrderModal({ job, setJob }) {
    const [isLoading, setIsLoading] = useState(false)
    const [ownerData, setOwnerData] = useState({})
    const [creatOrder, setCreatOrder] = useState({
        restaurant: '',
        destination: '',
        menu: '',
        description: '',
        count: 1,
    })

    useEffect(() => {
        getProfileById(job.owner)
    }, [job.owner])

    // Fetch Profile
    async function getProfileById(id) {
        try {
            const res = await axios({
                url: 'https://localhost:7130/api/Users/ById?id=' + id,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            setOwnerData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    //Send order
    async function creatOrderHandler() {
        const token = localStorage.getItem('token')
        console.log('clickyyyy')

        if (
            creatOrder.restaurant == '' ||
            creatOrder.menu == '' ||
            creatOrder.count == '' ||
            creatOrder.destination == ''
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

        setIsLoading(true)

        try {
            const res = await axios({
                url: 'https://localhost:7130/api/Order',
                method: 'POST',
                data: {},
            })
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    function convertTimestampToTime(timestamp) {
        const temp = new Date(timestamp)
        const H = ('00' + temp.getHours()).slice(-2)
        const M = ('00' + temp.getMinutes()).slice(-2)
        return `${H} : ${M}`
        // return temp.toISOString()
    }

    return (
        <>
            {job ? (
                <>
                    <ToastContainer />
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex flex-col items-center justify-center center pt-8 border-b border-solid">
                                    <div className=" text-xl font-semibold flex items-center">
                                        <i className="mdi mdi-account-circle text-6xl pr-4"></i>
                                        {ownerData.firstname}{' '}
                                        {ownerData.lastname}
                                    </div>
                                    <div>
                                        ปิดรับ order{' '}
                                        {convertTimestampToTime(job.time)}
                                    </div>
                                    <div className="font-semibold">
                                        รับฝากแล้ว {job.count}/{job.limit} กล่อง
                                    </div>
                                    <div className=" text-orange-500">
                                        หมายเหตุ: {job.description}
                                    </div>

                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setJob(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    {/* ชื่อร้าน */}
                                    <label
                                        htmlFor="restaurant"
                                        className="font-normal text-lg mt-4 text-black"
                                    >
                                        ชื่อร้าน
                                    </label>
                                    <input
                                        type="text"
                                        id="restaurant"
                                        className="w-full px-4 py-2 mt-2 mb-4 shadow-lg"
                                        placeholder="eg. เทคเตออินโน"
                                    />
                                    <div className="flex justify-between">
                                        <div className="w-full">
                                            {/* เมนู */}
                                            <label
                                                htmlFor="menu"
                                                className="font-normal text-lg mt-4 text-black"
                                            >
                                                เมนู
                                            </label>
                                            <input
                                                type="text"
                                                id="menu"
                                                className="w-full px-4 py-2 mt-2 mb-4 shadow-lg"
                                                placeholder="eg. พาสต้า"
                                            />
                                        </div>
                                        <div>
                                            {/* จำนวน */}
                                            <label
                                                htmlFor="count"
                                                className="font-normal text-lg mt-4 text-black"
                                            >
                                                จำนวน
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                id="count"
                                                className="w-full px-4 py-2 mt-2 mb-4 shadow-lg"
                                                placeholder="eg. 1"
                                            />
                                        </div>
                                    </div>

                                    {/* จัดส่งที่ */}
                                    <label
                                        htmlFor="destination"
                                        className="font-normal text-lg mt-4 text-black"
                                    >
                                        จัดส่งที่
                                    </label>
                                    <input
                                        type="text"
                                        id="destination"
                                        className="w-full px-4 py-2 mt-2 mb-4 shadow-lg"
                                        placeholder="eg. ECC ISAG(701)"
                                    />
                                    {/* หมายเหตุ */}
                                    <label
                                        htmlFor="description"
                                        className="font-normal text-lg mt-4 text-black"
                                    >
                                        หมายเหตุ
                                    </label>
                                    <input
                                        type="text"
                                        id="destination"
                                        className="w-full px-4 py-2 mt-2 mb-4 shadow-lg"
                                        placeholder="eg. ไม่ใส่กระเทียม"
                                    />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setJob(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setJob(false)}
                                    >
                                        Send Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}
