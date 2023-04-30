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

            <div className="flex justify-center">
                <div className="flex flex-row flex-wrap h-24 md:w-3/4 w-auto text-sm md:text-lg ">
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
            {/* <button
                className={`mx-2 border-2 border-green-600 h-8 w-auto rounded-full text-center drop-shadow-sm hover:bg-green-600 ; ${
                    clicked ? 'bg-green-700 text-white' : ''
                }
        `}
                onClick={() => clickHandler(interest)}
            >
                <p className="px-6 text-green-600">{interest.name}</p>
            </button> */}
        </>
    )
}
