import React, { useState, createRef, useEffect } from 'react'
import interestDataJSON from './data/restaurant.json'

export default function InterestCardContainer({ selected, handleSelected }) {
    // dropdown props
    const [interestData, setInterestData] = useState([])

    // Load data from JSON
    useEffect(() => {
        setInterestData(interestDataJSON)
    }, [interestDataJSON])

    return (
        <div>
            <div className="bg-white md:h-20 h-13  ">
                <p className="md:p-6 p-4 pb-2 md:text-2xl text-sm text-left md:ml-40">
                    เลือกร้านที่คุณสนใจ 🔍{' '}
                </p>
            </div>

            <div className="flex justify-center md:h-auto h-[100px]">
                <div className="flex flex-row flex-wrap md:h-[120px] md:w-3/4 w-[90%] text-xs md:text-lg ">
                    {interestDataJSON.map((interest, idx) => {
                        return (
                            <Tag
                                key={idx}
                                interest={interest}
                                handleSelected={handleSelected}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const Tag = ({ interest, handleSelected }) => {
    const [clicked, setClicked] = useState(false)

    function clickHandler(e) {
        setClicked(!clicked)
        handleSelected(e, clicked)
    }

    return (
        <>
            <button
                className={`md:mx-5 mx-1 bg-green-600 md:h-8 h-6 w-auto rounded-full text-center drop-shadow-sm hover:bg-slate-800 ; ${
                    clicked ? 'bg-green-900' : ''
                }
        `}
                onClick={() => clickHandler(interest)}
            >
                <p className="md:px-6 px-2 text-white">{interest.name}</p>
            </button>
        </>
    )
}
