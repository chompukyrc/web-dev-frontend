import React from 'react'

export default function Dialog({ text, open, handleConfirm, textConfirm }) {
    return (
        <>
            <div className={open ? 'confirm show' : 'confirm'}>
                <div className="confirm-content">
                    <div>
                        <h2 className=" font-normal mt-12 md:text-xl text-sm">{text}</h2>
                    </div>
                </div>
                <div className="flex md:justify-end justify-start h-16 items-center p-4 ">
                    <button
                        onClick={() => handleConfirm(false)}
                        className="md:text-xl text-sm m-2 cursor-pointer hover:bg-[#d4d4d4] text-[#348c2f] font-normal border-[#348c2f] border-2 w-24 h-8 align-baseline rounded-primary"
                    >
                        ยกเลิก
                    </button>
                    <button
                        onClick={() => handleConfirm(true)}
                        className="md:text-xl text-sm m-2 cursor-pointer hover:bg-[#2b7428] text-white w-24 h-8 bg-[#348c2f] align-baseline rounded-primary"
                    >
                        {textConfirm}
                    </button>
                </div>
            </div>
            <div className="overlay" onClick={() => handleConfirm(false)} />
        </>
    )
}
