import React, { useState } from 'react'
import Avatar, { genConfig } from 'react-nice-avatar'

export default function profile() {
    const config = genConfig()
    const [editProfile, setEditProfile] = useState(0) //0-common 1-editProfile 2-editPassword

    return (
        <div>
            <div className="flex absolute justify-center items-center w-full h-full z-0">
                <div className="rounded-full bg-[#E67E22] h-secondary w-secondary"></div>
            </div>

            <div className="flex flex-col justify-center items-center h-screen">
                <img
                    src="/assets/burgur-top.png"
                    width={'300px'}
                    className="rotate-[6.10rad]"
                />
                <div className="bg-white flex flex-col justify-center items-center rounded-primary max-w-2xl w-full shadow-2xl z-10 my-10">
                    <Avatar className="w-14 h-14 mr-2 my-8" {...config} />
                    <div className="flex items-center justify-center font-Kanit mx-auto pb-2">
                        <div className=" text-left">
                            {editProfile === 0 && (
                                <div>
                                    <div className="flex">
                                        <p className="text-right mr-2 my-2 w-40">
                                            ชื่อผู้ใช้ :
                                        </p>
                                        <p className="ml-2 my-2 text-left w-40">
                                            Pornahee
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <p className="text-right mr-2 my-2 w-40">
                                            ชื่อจริง :
                                        </p>
                                        <p className="ml-2 my-2 text-left w-40">
                                            Noparut
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <p className="text-right mr-2 my-2 w-40">
                                            นามสกุล :
                                        </p>
                                        <p className="ml-2 my-2 text-left w-40">
                                            Pornahee
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <p className="text-right mr-2 my-2 w-40">
                                            เบอร์โทรศัพท์ :
                                        </p>
                                        <p className="ml-2 my-2 text-left w-40">
                                            0980980998
                                        </p>
                                    </div>
                                </div>
                            )}
                            {editProfile === 1 && (
                                <div>
                                    <div className="flex">
                                        <p className="text-right mr-2 my-2 w-24">
                                            ชื่อผู้ใช้ :
                                        </p>
                                        <input
                                            className="border-2 border-gray rounded-lg flex flex-col my-1 pl-2 w-56"
                                            placeholder="pornahee"
                                        />
                                    </div>
                                    <div className="flex">
                                        <p className="text-right mr-2 my-2 w-24">
                                            ชื่อจริง :
                                        </p>
                                        <input
                                            className="border-2 border-gray rounded-lg flex flex-col my-1 pl-2 w-56"
                                            placeholder="Noparut"
                                        />
                                    </div>
                                    <div className="flex">
                                        <p className="text-right mr-2 my-2 w-24">
                                            นามสกุล :
                                        </p>
                                        <input
                                            className="border-2 border-gray rounded-lg flex flex-col my-1 pl-2 w-56"
                                            placeholder="Chantan"
                                        />
                                    </div>
                                    <div className="flex">
                                        <p className="text-right mr-2 my-2 w-24">
                                            เบอร์โทรศัพท์ :
                                        </p>
                                        <input
                                            className="border-2 border-gray rounded-lg flex flex-col my-1 pl-2 w-56"
                                            placeholder="09009009099"
                                        />
                                    </div>
                                </div>
                            )}
                            {editProfile === 2 && (
                                <div>
                                    <div className="flex">
                                        <p className="text-right mr-2 my-2 w-32">
                                            รหัสผ่านเดิม :
                                        </p>
                                        <input className="border-2 border-gray rounded-lg flex flex-col my-1 pl-2 w-56" />
                                    </div>
                                    <div className="flex">
                                        <p className="text-right mr-2 my-2 w-32">
                                            รหัสผ่านใหม่ :
                                        </p>
                                        <input className="border-2 border-gray rounded-lg flex flex-col my-1 pl-2 w-56" />
                                    </div>
                                    <div className="flex">
                                        <p className="text-right mr-2 my-2 w-32">
                                            ยืนยันรหัสผ่านใหม่ :
                                        </p>
                                        <input className="border-2 border-gray rounded-lg flex flex-col my-1 pl-2 w-56" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex font-Kanit">
                        <div className="basis-1/2 flex justify-end py-5 px-2">
                            {/* {editProfile} */}
                            {editProfile === 0 && (
                                <div className="flex">
                                    <button
                                        className="bg-[#FDFEFE] hover:bg-[#E5E7E9] active:bg-[#D7DBDD] text-black py-2 mx-4 rounded-xl border-neutral-300 border-2 w-[200px] flex justify-center"
                                        onClick={() => setEditProfile(1)}
                                    >
                                        แก้ไขโปรไฟล์
                                    </button>
                                    <button
                                        className="bg-[#FDFEFE] hover:bg-[#E5E7E9] active:bg-[#D7DBDD] text-black py-2 mx-4 rounded-xl border-neutral-300 border-2 w-[200px] flex justify-center"
                                        onClick={() => setEditProfile(2)}
                                    >
                                        เปลี่ยนรหัสผ่าน
                                    </button>
                                </div>
                            )}
                            {editProfile === 1 && (
                                <div className="flex">
                                    <button
                                        className="hover:bg-gray-300 text-black bg-gray-200 py-2 mx-4 rounded-primary w-40 flex justify-center"
                                        onClick={() => setEditProfile(0)}
                                    >
                                        ยกเลิก
                                    </button>
                                    <button
                                        className="hover:bg-green-700 text-white bg-green-600 py-2 mx-4 rounded-primary w-40 flex justify-center"
                                        onClick={() => setEditProfile(0)}
                                    >
                                        ยืนยันการแก้ไข
                                    </button>
                                </div>
                            )}
                            {editProfile === 2 && (
                                <div className="flex">
                                    <button
                                        className="hover:bg-gray-300 text-black bg-gray-200 py-2 mx-4 rounded-primary w-40 flex justify-center"
                                        onClick={() => setEditProfile(0)}
                                    >
                                        ยกเลิก
                                    </button>
                                    <button
                                        className="hover:bg-green-700 text-white bg-green-600 py-2 mx-4 rounded-primary w-40 flex justify-center"
                                        onClick={() => setEditProfile(0)}
                                    >
                                        ยืนยันการแก้ไข
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <img
                    src="/assets/burgur-bottom.png"
                    width={'250px'}
                    className=" rotate-[6.10rad]"
                />
            </div>
        </div>
    )
}
