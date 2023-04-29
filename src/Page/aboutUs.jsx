import React from 'react'
import bambie from '/assets/bambie.jpg'
import morjor from '/assets/morjor.jpg'
import jubjub from '/assets/jubjub.jpg'
import nopapor from '/assets/nopapor.jpg'
import chompu from '/assets/chompu.jpg'
import burger from '/assets/burgur-top.png'
import line from '/assets/linegroup2.png'
export default function aboutUs() {
    const profiles = [
        {
            key: 1,
            img: jubjub,
            name: 'กตัญญู ธนูศิลป์',
            id: '64010001',
            job: '(Back-End)',
        },
        {
            key: 2,
            img: chompu,
            name: 'กัญญารัตน์ ไชยยันต์บูรณ์',
            id: '64010037',
            job: '(Full-stack)',
        },
        {
            key: 3,
            img: morjor,
            name: 'ณัชชา สวยสะอาด',
            id: '64010218',
            job: '(Front-End/UX-UI)',
        },
        {
            key: 4,
            img: nopapor,
            name: 'นพรุจ ฉันทันต์',
            id: '64010403',
            job: '(Front-End)',
        },
        {
            key: 5,
            img: bambie,
            name: 'นิสาชล อยู่ดี',
            id: '64010443',
            job: '(Front-End)',
        },
    ]
    return (
        <div className=" flex flex-col items-center font-Kanit">
            <div className="mt-8 mb-3 md:text-2xl md:w-screen w-5/6 text-base text-center">
                <p>โปรเจคนี้เป็นส่วนหนึ่งของวิชา</p>
                <p>WEB APPLICATION DEVELOPMENT</p>
                <p>ซึ่งพัฒนาโดย</p>
            </div>
            <div className="z-20 justify-center flex flex-wrap mx-auto md:w-[80%] w-[70%] bg-white md:pt-20 pt-10 rounded-[30px] shadow-xl">
                {profiles.map((profile) => {
                    return (
                        <div
                            className="md:w-1/3 text-center mx-50 relative md:text-lg text-sm mb-4 animate-in fade-in duration-1000"
                            key={profile.key}
                        >
                            <div className="absolute md:top-[-140px] top-[-30%] right-[-100px] rotate-[20deg] scale-[.35]">
                                <img src={burger} />
                            </div>
                            <img
                                src={profile.img}
                                className="mx-auto md:h-[200px] h-[150px] rounded-full shadow-2xl"
                            />
                            <h1 className="mt-6 font-medium">{profile.name}</h1>
                            <h1 className="font-medium">{profile.id}</h1>
                            <h1 className="font-light text-green-700 md:mb-auto mb-2">
                                {profile.job}
                            </h1>
                        </div>
                    )
                })}
            </div>
            <div>
                <div className="hidden md:block absolute top-[90%] right-0 z-10">
                    <img src={line} />
                </div>
            </div>
        </div>
    )
}
