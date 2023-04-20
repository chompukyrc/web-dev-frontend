import React from 'react'

export default function Dialog({ text, open, handleConfirm }) {
    return (
        <>
            <div className={open ? 'confirm show' : 'confirm'}>
                <div className="confirm-content">
                    <div>
                        <h2>{text}</h2>
                    </div>
                </div>
                <div className="confirm-btns">
                    <button
                        onClick={() => handleConfirm(true)}
                        className=" rounded-bl-xl border-r-2"
                    >
                        YES
                    </button>
                    <button
                        onClick={() => handleConfirm(false)}
                        className=" rounded-br-xl"
                    >
                        NO
                    </button>
                </div>
            </div>
            <div className="overlay" onClick={() => handleConfirm(false)} />
        </>
    )
}
