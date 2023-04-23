import React, { useState } from 'react'
import Avatar, { genConfig } from 'react-nice-avatar'

export default function profile() {
    const config = genConfig()
    const [editProfile, setEditProfile] = useState(0) //1-common 2-editProfile 3-editPassword

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
                            {editProfile === 1 ? (
                                <div className="flex">
                                    <p className="text-right mr-2 my-2">
                                        ชื่อผู้ใช้ :
                                    </p>
                                    <input
                                        className="border-2 border-gray rounded-lg flex flex-col my-1 pl-2"
                                        placeholder="Pornahee"
                                    />
                                </div>
                            ) : (
                                <div className="flex">
                                    <p className="text-right mr-2 my-2">
                                        ชื่อผู้ใช้ :
                                    </p>
                                    <p className="ml-2 my-2">Pornahee</p>
                                </div>
                            )}
                            {editProfile === 1 ? (
                                <div className="flex">
                                    <p className="text-right mr-2 my-2">
                                        ชื่อจริง :
                                    </p>
                                    <input
                                        className="border-2 border-gray rounded-lg flex flex-col my-1 pl-2"
                                        placeholder="Noparut"
                                    />
                                </div>
                            ) : (
                                <div className="flex">
                                    <p className="text-right mr-2 my-2">
                                        ชื่อจริง :
                                    </p>
                                    <p className="ml-2 my-2">Noparut</p>
                                </div>
                            )}
                            {editProfile === 1 ? (
                                <div className="flex">
                                    <p className="text-right mr-2 my-2">
                                        นามสกุล :
                                    </p>
                                    <input
                                        className="border-2 border-gray rounded-lg flex flex-col my-1 pl-2"
                                        placeholder="Chantan"
                                    />
                                </div>
                            ) : (
                                <div className="flex">
                                    <p className="text-right mr-2 my-2">
                                        นามสกุล :
                                    </p>
                                    <p className="ml-2 my-2">Chantan</p>
                                </div>
                            )}
                            {editProfile === 1 ? (
                                <div className="flex">
                                    <p className="text-right mr-2 my-2">
                                        เบอร์โทรศัพท์ :
                                    </p>
                                    <input
                                        className="border-2 border-gray rounded-lg flex flex-col my-1 pl-2"
                                        placeholder="0957585165"
                                    />
                                </div>
                            ) : (
                                <div className="flex">
                                    <p className="text-right mr-2 my-2">
                                        เบอร์โทรศัพท์ :
                                    </p>
                                    <p className="ml-2 my-2">0957585165</p>
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
                                        className="bg-[#FDFEFE] hover:bg-[#E5E7E9] active:bg-[#D7DBDD] text-black py-2 mx-4 rounded-xl border-neutral-300 border-2 w-[200px] flex justify-center"
                                        onClick={() => setEditProfile(0)}
                                    >
                                        ยืนยันแก้ไขโปรไฟล์
                                    </button>
                                </div>
                            )}
                            {editProfile === 2 && (
                                <div className="flex">
                                    <button
                                        className="bg-[#FDFEFE] hover:bg-[#E5E7E9] active:bg-[#D7DBDD] text-black py-2 mx-4 rounded-xl border-neutral-300 border-2 w-[200px] flex justify-center"
                                        onClick={() => setEditProfile(0)}
                                    >
                                        ยืนยันแก้ไขพาสเวิด
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
