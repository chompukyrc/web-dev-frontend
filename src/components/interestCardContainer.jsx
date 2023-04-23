import React, { useState, createRef, useEffect } from 'react'
import interestDataJSON from './data/restaurant.json'
import Popper from 'popper.js'

export default function InterestCardContainer() {
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false)
    const [interestCards, setInterestCard] = useState([])
    const [interestData, setInterestData] = useState([
        // {
        //     name: 'เทคโน',
        // },
    ])
    const btnDropdownRef = createRef()
    const popoverDropdownRef = createRef()
    const openDropdownPopover = () => {
        new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: 'bottom-start',
        })
        setDropdownPopoverShow(true)
    }
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false)
    }

    function filterInterestData() {
        let temp = []
        interestData.forEach((e) => {
            const idx = interestCards.findIndex((ee) => ee.name === e.name)
            if (idx < 0) {
                temp.push(e)
            }
        })

        return temp
    }

    function addToInterest(data) {
        console.log(data)
        setInterestCard([...interestCards, data])
    }

    // Load data from JSON
    useEffect(() => {
        setInterestData(interestDataJSON)
    }, [interestDataJSON])

    return (
        <div>
            <div className="bg-white h-20  ">
                <p className="p-6 text-2xl text-left ml-40">
                    ร้านที่คุณอาจสนใจ 🔍{' '}
                </p>
            </div>
            {/* <div>{JSON.stringify(interestData)}</div> */}
            <div className="flex justify-center">
                <div className="flex flex-row flex-wrap h-20 w-3/4">
                    {interestCards.map((interest, idx) => {
                        return (
                            <button
                                key={idx}
                                className="mx-5 bg-green-600 h-8 w-auto rounded-full text-center drop-shadow-sm hover:bg-green-800"
                            >
                                <p className="px-6 text-white">
                                    {interest.name}
                                </p>
                            </button>
                        )
                    })}
                    {/* Add New InterestCard */}
                    <button
                        className="mx-5 bg-green-600 h-8 w-auto rounded-full text-center drop-shadow-sm hover:bg-green-800"
                        ref={btnDropdownRef}
                        onClick={() => {
                            dropdownPopoverShow
                                ? closeDropdownPopover()
                                : openDropdownPopover()
                        }}
                    >
                        <p className="px-6 text-white">+</p>
                    </button>

                    <div
                        ref={popoverDropdownRef}
                        className={
                            (dropdownPopoverShow ? 'block ' : 'hidden ') +
                            'text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 bg-green-600'
                        }
                        style={{ minWidth: '12rem' }}
                    >
                        {filterInterestData().map((e, idx) => (
                            <p
                                key={idx}
                                className={
                                    'text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white cursor-pointer'
                                }
                                onClick={() => {
                                    addToInterest(e)
                                }}
                            >
                                {e.name}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
