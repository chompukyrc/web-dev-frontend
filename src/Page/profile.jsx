import React from 'react'
import Avatar, { genConfig } from 'react-nice-avatar'

export default function profile() {
    return (
        <div className="md:1/3w">
            <div className="absolute justify-center rounded-full bg-[#E67E22] right-[460px] top-[180px] h-[600px] w-[600px] z-0"></div>
            <div className="flex justify-center aligin-center">
                <img
                    src="/assets/burgur-top.png"
                    width={'300px'}
                    className=" solid top-0 rotate-[6.10rad] justify-center items-center"
                />
            </div>

            <div className="flex justify-center ">
                <div className="bg-white flex flex-col justify-center items-center rounded-[36px] max-w-2xl w-full my-10 shadow-2xl z-10">
                    <div className="flex flex-col items-center mx-auto">
                        <img
                            src="/assets/burgur-top.png"
                            className=" solid top-0 rotate-[6.10rad]  items-center w-20 h-14 my-10"
                        />
                        <div className="flex font-Kanit mx-auto">
                            <div className="pb-2 text-right">
                                <p>ชื่อผู้ใช้ :</p>
                                <p>ชื่อ :</p>
                                <p>นามสกุล :</p>
                                <p>เบอร์โทรศัพท์ :</p>
                            </div>
                            <div className="pb-2 text-left">
                                <p className="ml-10">Pornahee</p>
                                <p className="ml-10">Noparut</p>
                                <p className="ml-10">Chantan</p>
                                <p className="ml-10">0957585165</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex font-Kanit">
                        <div className="basis-1/2 flex justify-end py-5 px-2">
                            <button className="bg-[#FDFEFE] hover:bg-[#E5E7E9] active:bg-[#D7DBDD] text-black py-2 mx-4 rounded-xl border-neutral-300 border-2 w-[200px] flex justify-center">
                                แก้ไขโปรไฟล์
                            </button>
                        </div>
                        <div className="basis-1/2 py-5 px-1">
                            <button className="bg-[#FDFEFE] hover:bg-[#E5E7E9] active:bg-[#D7DBDD] text-black py-2 mx-4 rounded-xl border-neutral-300 border-2 w-[200px] flex justify-center">
                                แก้ไขรหัสผ่าน
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center aligin-center">
                <img
                    src="/assets/burgur-bottom.png"
                    width={'300px'}
                    className=" solid top-0 rotate-[6.10rad] justify-center items-center"
                />
            </div>
        </div>
    )
}
// w-14 h-14 mr-2
