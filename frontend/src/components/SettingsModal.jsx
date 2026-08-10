import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react';

function SettingsModal(props) {

    const [focusTime, setFocusTime] = useState(props.focusTime / 60);
    const [smallBreakTime, setSmallBreakTime] = useState(props.smallBreakTime / 60);
    const [longBreakTime, setLongBreakTime] = useState(props.longBreakTime / 60);

    useEffect(() => {
        props.switchFocusTime(focusTime * 60);
    }, [focusTime])

    useEffect(() => {
        props.switchSmallBreakTime(smallBreakTime * 60);
    }, [smallBreakTime])

    useEffect(() => {
        props.switchLongBreakTime(longBreakTime * 60);
    }, [longBreakTime])

    return (
        <>
            <div
                className={`justify-center hs-overlay size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto bg-black/50 ${props.isOpen ? 'flex pointer-events-auto' : 'hidden pointer-events-none'}`}
                role="dialog"
                tabIndex="-1"
                aria-labelledby="modal-label"
            >
                <div className={`m-3 sm:mx-auto sm:w-full sm:max-w-lg transition-all duration-200 ease-in-out ${props.isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} min-h-[calc(100%-56px)] flex items-center`}>

                    <div className="w-full flex flex-col bg-gray-green border border-light-green shadow-2xs rounded-xl pointer-events-auto">

                        <section className="flex justify-between items-center py-3 px-4 border-b border-light-green">
                            <h3 id="modal-label" className="font-bold text-light-green text-xl">
                                Settings
                            </h3>
                            <button
                                type="button"
                                onClick={() => props.setIsOpen(false)}
                                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent border-light-green text-gray-800 cursor-pointer focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                                aria-label="Close"
                            >
                                <span className="sr-only">Close</span>
                                <X color='white' />
                            </button>
                        </section>

                        <main className="p-4 overflow-y-auto">
                            <div className="flex flex-row gap-2">
                                <span className="text-light-green text-lg">Focus:</span>
                                <input type="number" value={focusTime} onChange={(e) => setFocusTime(e.target.value)} className="w-20 border-b border-light-green focus:outline-none text-light-green text-lg" />
                            </div>
                            <div className="flex flex-row gap-2 mt-2">
                                <span className="text-light-green text-lg">Small Break:</span>
                                <input type="number" value={smallBreakTime} onChange={(e) => setSmallBreakTime(e.target.value)} className="w-20 border-b border-light-green focus:outline-none text-light-green text-lg" />
                            </div>
                            <div className="flex flex-row gap-2 mt-2">
                                <span className="text-light-green text-lg">Long Break:</span>
                                <input type="number" value={longBreakTime} onChange={(e) => setLongBreakTime(e.target.value)} className="w-20 border-b border-light-green focus:outline-none text-light-green text-lg" />
                            </div>
                        </main>

                        <section className="flex justify-center items-center gap-10 py-3 px-4 border-t border-light-green">
                            <button
                                type="button"
                                onClick={() => props.setIsOpen(false)}
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-light-green bg-light-green text-black shadow-2xs hover:bg-hover-light-green focus:outline-hidden cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                            >
                                Close
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SettingsModal;