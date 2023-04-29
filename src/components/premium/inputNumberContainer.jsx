import React, { useState, useEffect, useRef } from 'react'

export default function InputNumberContainer({ trueMoney, setTrueMoney }) {
    const refs = [
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
    ]

    useEffect(() => {
        // console.log(trueMoney)
        for (let i = 0; i < 14; i++) {
            if (trueMoney[i] === '') {
                return refs[i]?.current.focus()
            }
        }
    }, [trueMoney])

    const handleKeyDown = (event, idx) => {
        if (event.key === 'Backspace') {
            // console.log('Delete', trueMoney[idx] === '', idx)
            if (trueMoney[idx] === '' && idx >= 1) {
                const temp = [...trueMoney]
                temp[idx - 1] = ''
                setTrueMoney(temp)
            } else if (idx === 13) {
                const temp = [...trueMoney]
                temp[13] = ''
                setTrueMoney(temp)
            }
        }
    }

    const onChangeHandle = (e, idx) => {
        const temp = [...trueMoney]
        if (e.target.value >= '0' && e.target.value <= '9') {
            temp[idx] = e.target.value
            setTrueMoney(temp)
        }
    }

    return (
        <div className="space-x-2 flex justify-center items-center ">
            {[0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0].map((e, idx) => (
                <div
                    className="flex justify-center items-center md:space-x-2 space-x-1 md:mb-0 mb-2"
                    key={idx}
                >
                    <input
                        onKeyDown={(e) => handleKeyDown(e, idx)}
                        value={trueMoney[idx]}
                        ref={refs[idx]}
                        onChange={(e) => onChangeHandle(e, idx)}
                        className="md:p-2 md:h-8 md:w-8 h-[14px] w-[14px] text-center text-xl"
                        maxLength={1}
                    ></input>
                    {e === 1 && <p className="text-center text-white">-</p>}
                </div>
            ))}
        </div>
    )
}
