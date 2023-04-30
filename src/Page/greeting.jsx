import React from 'react'
import { useNavigate } from 'react-router-dom'

function greeting() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col md:w-screen md:h-screen  md:justify-around justify-center font-Kanit md:mx-0 mx-20">
            <button
                className="text-green-600 flex justify-center items-center md:text-xl text-sm underline md:mt-12 mt-[20%] mb-[10%] md:mb-0 hover:text-green-700"
                onClick={() => navigate('/')}
            >
                ข้ามการแนะนำการใช้งาน
            </button>

            <div className="flex flex-col md:flex-row md:h-4/5 h-1/5 justify-around md:mx-24 mx-2">
                <img
                    src="/assets/Frame1.png"
                    className=" md:rounded-primary rounded-3xl hover:scale-105 md:mb-0 mb-[10%]"
                    onClick={() => navigate('/')}
                />
                <img
                    src="/assets/Frame2.png"
                    className=" md:rounded-primary rounded-3xl hover:scale-105"
                    onClick={() => navigate('/')}
                />
            </div>
        </div>
    )
}

export default greeting
