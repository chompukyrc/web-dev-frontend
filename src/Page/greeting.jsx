import React from 'react'
import { useNavigate } from 'react-router-dom'

function greeting() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col w-screen h-screen justify-around font-Kanit">
            <button
                className="text-green-600 flex justify-center items-center text-xl underline mt-12 hover:text-green-700"
                onClick={() => navigate('/')}
            >
                ข้ามการแนะนำการใช้งาน
            </button>

            <div className="flex h-4/5 justify-around mx-24">
                <img
                    src="/assets/Frame1.png"
                    className=" rounded-primary hover:scale-105"
                    onClick={() => navigate('/')}
                />
                <img
                    src="/assets/Frame2.png"
                    className=" rounded-primary hover:scale-105"
                    onClick={() => navigate('/')}
                />
            </div>
        </div>
    )
}

export default greeting
