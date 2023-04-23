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
            <div className="bg-white h-20  ">
                <p className="p-6 text-2xl text-left ml-40">
                    เลือกร้านที่คุณสนใจ 🔍{' '}
                </p>
            </div>

            <div className="flex justify-center">
                <div className="flex flex-row flex-wrap h-[120px] w-3/4 ">
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
                className={`mx-5 bg-green-600 h-8 w-auto rounded-full text-center drop-shadow-sm hover:bg-slate-800 ; ${
                    clicked ? 'bg-green-900' : ''
                }
        `}
                onClick={() => clickHandler(interest)}
            >
                <p className="px-6 text-white">{interest.name}</p>
            </button>
        </>
    )
}
