import React from 'react'
import chobhee from "/assets/chobhee.jpg"
import burger from "/assets/burgur-top.png"
export default function aboutUs() {
    const profiles = [{ key: 1, img: chobhee, name: "Katanyoo Thanoosin", id: "64010001" },
    { key: 2, img: chobhee, name: "Kanyarat Chaiyanboon", id: "64010037" },
    { key: 3, img: chobhee, name: "Natcha Suaysaard", id: "64010218" },
    { key: 4, img: chobhee, name: "Noparut Chantan", id: "64010403" },
    { key: 5, img: chobhee, name: "Nisachon Yudee", id: "64010403" }]

    return (
        <div className=" flex flex-col items-center ">
            <div className="mt-8 mb-16 text-2xl">about us</div>
            <div className='flex flex-wrap mx-auto'>
                {profiles.map((profile) => {
                    return (
                        <div className='md:w-1/3 text-center mx-auto mb-14' key={profile.key}>
                            <img src={profile.img} className='mx-auto h-60' />
                            <h1 className='mt-2'>{profile.name}</h1>
                            <h1>{profile.id}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
// display: flex;
//     /* align-content: stretch; */
//     flex-direction: column;
//     align-items: center;