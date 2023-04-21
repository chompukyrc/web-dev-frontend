import React from 'react'
import chobhee from '/assets/chobhee.jpg'
import burger from '/assets/burgur-top.png'
export default function aboutUs() {
    const profiles = [
        { key: 1, img: chobhee, name: 'นายกตัญญู ธนูศิลป์', id: '64010001' ,job:'(Back-End)'},
        { key: 2, img: chobhee, name: 'นางสาวกัญญารัตน์ ไชยยันต์บูรณ์', id: '64010037' ,job:'(Front-End)'},
        { key: 3, img: chobhee, name: 'ณัชชา สวยสะอาด', id: '64010218' ,job:'(UX-UI)'},
        { key: 4, img: chobhee, name: 'นพรุจ ฉันทันต์', id: '64010403' ,job:'(Front-End)'},
        { key: 5, img: chobhee, name: 'นิสาชล อยู่ดี', id: '64010443' ,job:'(Front-End)'},
    ]

    return (
        <div className=" flex flex-col items-center ">
            <div className="mt-8 mb-16 text-2xl font-Kanit">โปรเจคนี้เป็นส่วนหนึ่งของวิชา WEB APPLICATION DEVELOPMENT ซึ่งพัฒนาโดย</div>
            <div className="flex flex-wrap mx-auto min-w-[768px]">
                {profiles.map((profile) => {
                    return (
                        <div
                            className="md:w-1/3 text-center mx-auto mb-14 relative"
                            key={profile.key}
                        >
                            <div className="absolute top-[-150px] right-[-150px] rotate-[20deg] scale-[.35]"><img src={burger}/></div>
                            <img src={profile.img} className="mx-auto h-60" />
                            <h1 className="mt-2 font-Kanit font-bold">{profile.name}</h1>
                            <h1 className="font-Kanit font-medium">{profile.id}</h1>
                            <h1 className='font-Kanit font-light'>{profile.job}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

