import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import Avatar, { genConfig } from 'react-nice-avatar'
import restaurant from './data/restaurant.json'

export default function newOrderModal({
    job,
    setJob,
    processJobAndMyorder,
    setPage,
}) {
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
        if (job.owner) {
            getProfileById(job.owner)
        }
    }, [job.owner])

    // Fetch Profile
    async function getProfileById(id) {
        try {
            const res = await axios({
                url: import.meta.env.VITE_API + '/api/Users/ById?id=' + id,
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
        if (isLoading) {
            return
        }
        const token = localStorage.getItem('token')

        if (
            // creatOrder.restaurant == '' ||
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
                url: import.meta.env.VITE_API + '/api/Order',
                method: 'POST',
                data: {
                    Job: job.id,
                    Restaurant:
                        creatOrder.restaurant == ''
                            ? job.restaurants
                            : creatOrder.restaurant,
                    Destination: creatOrder.destination,
                    Menu: creatOrder.menu,
                    Description:
                        creatOrder.description == ''
                            ? '-'
                            : creatOrder.description,
                    Count: creatOrder.count,
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data) {
                toast.success('🍔 You just order now', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                })
                setTimeout(async () => {
                    setIsLoading(false)
                    setCreatOrder({
                        restaurant: '',
                        destination: '',
                        menu: '',
                        description: '',
                        count: 1,
                    })
                    // Show Ads
                    localStorage.setItem('show_ads', 'show')
                    // Auto set tab after submit order
                    await processJobAndMyorder()
                    setPage(1)
                    return setJob(false)
                }, 1000)
            }
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

    const config = genConfig(ownerData.firstname + ownerData.lastname)

    return (
        <>
            {job ? (
                <>
                    <ToastContainer />
                    <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative md:w-auto w-[80%] my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex flex-col items-center justify-center center md:pt-8 pt-4 border-b border-solid ">
                                    <Avatar
                                        className="block md:hidden w-14 h-14 mr-2"
                                        {...config}
                                    />
                                    <div className=" md:text-xl text-lg font-semibold flex items-center">
                                        <Avatar
                                            className="md:block hidden w-14 h-14 mr-2"
                                            {...config}
                                        />
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
                                        className="ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setJob(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative px-4  flex-auto">
                                    <div className="my-4 text-slate-500 md:text-lg text-sm leading-relaxed">
                                        {/* ชื่อร้าน */}
                                        <label
                                            htmlFor="restaurant"
                                            className="font-normal md:md:text-lg text-sm  mt-2 text-black"
                                        >
                                            ร้านเดียวกัน หรือร้านไหนดีเอ่ย ?
                                        </label>
                                        <select
                                            className="block w-full bg-white border my-2 border-green-500 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                            value={creatOrder.restaurant}
                                            onChange={(e) => {
                                                setCreatOrder({
                                                    ...creatOrder,
                                                    restaurant: e.target.value,
                                                })
                                            }}
                                        >
                                            <option>{job.restaurants}</option>

                                            {restaurant.map(
                                                (restaurants, idx) => {
                                                    return (
                                                        <option key={idx}>
                                                            {restaurants.name}
                                                        </option>
                                                    )
                                                },
                                            )}
                                        </select>

                                        <div className="flex justify-between mt-4">
                                            <div className="w-full">
                                                {/* เมนู */}
                                                <label
                                                    htmlFor="menu"
                                                    className="font-normal md:text-lg text-sm mt-2 text-black"
                                                >
                                                    เมนู
                                                </label>
                                                <input
                                                    type="text"
                                                    id="menu"
                                                    className="w-full px-4 py-2 mt-2 mb-2 shadow-lg"
                                                    placeholder="eg. พาสต้า"
                                                    value={creatOrder.menu}
                                                    onChange={(e) => {
                                                        setCreatOrder({
                                                            ...creatOrder,
                                                            menu: e.target
                                                                .value,
                                                        })
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                {/* จำนวน */}
                                                <label
                                                    htmlFor="count"
                                                    className="font-normal md:text-lg text-sm mt-2 text-black"
                                                >
                                                    จำนวน
                                                </label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    id="count"
                                                    className="w-full px-4 py-2 mt-2 mb-2 shadow-lg"
                                                    placeholder="eg. 1"
                                                    value={creatOrder.count}
                                                    onChange={(e) => {
                                                        setCreatOrder({
                                                            ...creatOrder,
                                                            count: e.target
                                                                .value,
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* จัดส่งที่ */}
                                        <label
                                            htmlFor="destination"
                                            className="font-normal md:text-lg text-sm mt-2 text-black"
                                        >
                                            จัดส่งที่
                                        </label>
                                        <input
                                            type="text"
                                            id="destination"
                                            className="w-full px-4 py-2 mt-2 mb-2 shadow-lg"
                                            placeholder="eg. ECC ISAG(701)"
                                            value={creatOrder.destination}
                                            onChange={(e) => {
                                                setCreatOrder({
                                                    ...creatOrder,
                                                    destination: e.target.value,
                                                })
                                            }}
                                        />
                                        {/* หมายเหตุ */}
                                        <label
                                            htmlFor="description"
                                            className="font-normal md:text-lg text-sm mt-4 text-black"
                                        >
                                            หมายเหตุ
                                        </label>
                                        <input
                                            type="text"
                                            id="description"
                                            className="w-full px-4 py-2 mt-2 shadow-lg"
                                            placeholder="eg. ไม่ใส่กระเทียม"
                                            value={creatOrder.description}
                                            onChange={(e) => {
                                                setCreatOrder({
                                                    ...creatOrder,
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
                                        onClick={() => setJob(false)}
                                    >
                                        ยกเลิก
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => creatOrderHandler()}
                                    >
                                        สั่งเลย
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
