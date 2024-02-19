'use client'
import { resetBotSimulation, sendBotMessage } from "@/Redux/Actions/BotActions"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"


const AnimatedCursor = () => {
    return (
        <>
            <svg
                viewBox="8 4 8 16"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor"
            >
                <rect x="10" y="6" width="7" height="17" fill="#000" />
            </svg>
        </>
    )
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

const BotConversation = ({ conversation }) => {
    const answerElement = useRef()
    const [addingAnswer, setAddingAnswer] = useState(false)
    const [answer, setAnswer] = useState('')

    const handleProcess = async () => {
        setAddingAnswer(true)
        let answer = conversation.answer
        if (answer && answerElement && answerElement.current) {
            let lines = answer.split('\n')
            lines = lines.filter(itm => itm)

            let element = answerElement.current
            element.innerHTML = ''
            let line_tm = 30
            for (let i = 0; i < lines.length; i++) {
                let line = lines[i]
                // element.innerHTML = element.innerHTML + i == 0 ? element.innerHTML : '<br/>'
                if (i > 0) {
                    element.innerHTML = element.innerHTML + '<br/>'
                }
                let l_int_id = undefined
                let l_c = 0
                l_int_id = setInterval(() => {
                    let next_ans = line[l_c]
                    if (next_ans) {
                        element.innerHTML = element.innerHTML + next_ans
                        l_c = l_c + 1
                    }
                    else {
                        clearInterval(l_int_id)
                    }
                }, line_tm);
                let sleep_time = line.length * line_tm
                await sleep(sleep_time);
            }
        }
        setAddingAnswer(false)
    }
    useEffect(() => {
        handleProcess()
    }, [conversation.answer])
    return (
        <>
            <div className="w-full group px-4 bg-white">
                <div className="py-[28px] max-w-max ml-auto flex justify-between ">
                    <div className="flex-1 flex items-center flex-row-reverse gap-[22px] ">
                        <div className="flex items-center justify-center  ">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xlink="http://www.w3.org/1999/xlink" width="30" height="30" x="0" y="0" viewBox="0 0 512 512" space="preserve" class=""><g><path d="M437.02 330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521 243.251 404 198.548 404 148 404 66.393 337.607 0 256 0S108 66.393 108 148c0 50.548 25.479 95.251 64.262 121.962-36.21 12.495-69.398 33.136-97.281 61.018C26.629 379.333 0 443.62 0 512h40c0-119.103 96.897-216 216-216s216 96.897 216 216h40c0-68.38-26.629-132.667-74.98-181.02zM256 256c-59.551 0-108-48.448-108-108S196.449 40 256 40s108 48.448 108 108-48.449 108-108 108z" fill="#0037fe" opacity="1" data-original="#000000" class=""></path></g></svg>
                        </div>
                        <span className="Hello text-[15px] bg-[#0237ff] text-white px-4 py-2 rounded-xl rounded-tr-none font-[500] ">
                            {conversation?.question}
                        </span>
                    </div>
                    {/* <div className="flex items-center justify-end ">
                        <div className="hidden group-hover:block ">
                            <div className="flex cursor-pointer bg-[#0037FE] max-w-max items-center justify-center py-[7px] px-[9px] rounded-[7px] ">
                                <i class="fa-solid fa-plus text-[#ffffff] text-[16px] "></i>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="bg-white w-full group ">
                <div className=" py-[28px] max-w-max flex justify-between">
                    <div className="flex-1 flex items-center gap-[22px] ">
                        <div className="flex items-center justify-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xlink="http://www.w3.org/1999/xlink" width="30" height="30" x="0" y="0" viewBox="0 0 426 426.798" space="preserve" class=""><g><path d="M139.066 192.133c2.829.004 5.543-1.121 7.543-3.121s3.125-4.715 3.121-7.543c0-5.89 4.778-10.668 10.668-10.668 5.891 0 10.668 4.777 10.668 10.668s4.774 10.664 10.664 10.664c5.895 0 10.668-4.774 10.668-10.664 0-17.676-14.328-32-32-32-17.671 0-32 14.324-32 32a10.66 10.66 0 0 0 10.668 10.664zM283.629 262.594c-39.836 19.914-99.95 19.914-139.793 0-5.27-2.637-11.676-.5-14.313 4.77-2.632 5.269-.5 11.679 4.77 14.312a180.655 180.655 0 0 0 79.437 17.25 180.697 180.697 0 0 0 79.438-17.25c5.27-2.633 7.406-9.043 4.773-14.313-2.636-5.27-9.043-7.406-14.312-4.77zm0 0" fill="#0037fe" opacity="1" data-original="#000000" class=""></path><path d="M395.066 170.8h-10.668v-32c-.027-29.44-23.89-53.304-53.332-53.331h-32V62.168c14.692-5.191 23.508-20.219 20.872-35.578C317.3 11.227 303.983 0 288.397 0c-15.586 0-28.902 11.227-31.539 26.59-2.636 15.36 6.18 30.387 20.871 35.578v23.3h-128v-23.3c14.696-5.191 23.508-20.219 20.875-35.578C167.97 11.227 154.652 0 139.066 0c-15.586 0-28.906 11.227-31.539 26.59-2.636 15.36 6.176 30.387 20.871 35.578v23.3h-32c-29.441.032-53.3 23.891-53.332 53.333v32H32.398c-17.664.02-31.98 14.336-32 32v42.668c.02 17.664 14.336 31.98 32 32h10.668v42.664c.032 29.445 23.891 53.305 53.332 53.336h53.332v42.664a10.675 10.675 0 0 0 5.5 9.328 10.662 10.662 0 0 0 10.82-.285l82.743-51.707h82.273c29.442-.028 53.305-23.89 53.332-53.336v-42.664h10.668c17.664-.02 31.98-14.336 32-32V202.8c-.02-17.664-14.336-31.98-32-32zM288.398 21.47c5.891 0 10.668 4.773 10.668 10.664 0 5.894-4.777 10.668-10.668 10.668-5.89 0-10.668-4.774-10.668-10.668.012-5.883 4.782-10.653 10.668-10.664zm-149.332 0c5.891 0 10.664 4.773 10.664 10.664 0 5.894-4.773 10.668-10.664 10.668s-10.668-4.774-10.668-10.668c.008-5.887 4.778-10.656 10.668-10.664zM32.398 256.133c-5.886-.004-10.66-4.778-10.668-10.664V202.8c.008-5.887 4.782-10.66 10.668-10.668h10.668v64zm330.668 64c-.02 17.668-14.336 31.984-32 32H245.73c-1.996 0-3.953.562-5.644 1.625l-69.02 43.125V362.8a10.671 10.671 0 0 0-10.668-10.668h-64c-17.664-.016-31.98-14.332-32-32V138.8c.02-17.664 14.336-31.98 32-32h234.668c17.664.02 31.98 14.336 32 32zm42.664-74.664c-.007 5.886-4.777 10.656-10.664 10.664h-10.668v-64h10.668c5.887.012 10.657 4.781 10.664 10.668zm0 0" fill="#0037fe" opacity="1" data-original="#000000" class=""></path><path d="M267.066 149.469c-17.664.02-31.98 14.336-32 32 0 5.89 4.774 10.664 10.664 10.664 5.895 0 10.668-4.774 10.668-10.664s4.778-10.668 10.668-10.668 10.664 4.777 10.664 10.668 4.778 10.664 10.668 10.664c5.891 0 10.668-4.774 10.668-10.664-.02-17.664-14.336-31.98-32-32zm0 0" fill="#0037fe" opacity="1" data-original="#000000" class=""></path></g></svg>
                        </div>
                        <div>
                            {
                                conversation?.loading ?
                                    <span className="w-[20px] h-[20px] flex items-center justify-center relative rounded-full bg-gray-300">
                                        <span className="w-[20px] absolute h-[20px] rounded-full bg-gray-500 animate-ping">
                                        </span>
                                    </span>
                                    :
                                    <>
                                        <span className="bg-[#e1e6fc] block max-w-[900px] rounded-2xl text-[15px] font-[500]  text-slate-700 px-4 py-2  rounded-tl-none">
                                            <span className="Hello" ref={answerElement}>
                                                {conversation?.answer}
                                            </span>{addingAnswer && <AnimatedCursor />}
                                        </span>
                                    </>
                            }
                        </div>

                    </div>
                    {/* <div className="flex items-center justify-end ">
                        <div className="hidden group-hover:block ">
                            <div className="flex cursor-pointer bg-[#0037FE] max-w-max items-center justify-center py-[7px] px-[9px] rounded-[7px] ">
                                <i class="fa-solid fa-plus text-[#ffffff] text-[16px] "></i>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}


const GPTConversation = ({ onMessage }) => {
    const { agency_id, location_id, contact_id } = useParams()
    const [botConv, setBotConversation] = useState([])
    const [inputText, setInputText] = useState('')
    const [loading, setLoading] = useState(false)

    const handleResetSimulation = () =>{
        let tid = toast.loading('Please wait...')
        resetBotSimulation(
            {
                contact_id: contact_id,
            },
            (response) => {
                toast.success(response.message, {id : tid})
                setBotConversation([])
            },
            (response) =>{
                toast.error('Something went wrong', {id : tid})
            }
        )
    }

    const handleSubmit = () => {
        if (loading) {
            return
        }
        let text = inputText.trim()
        if (!inputText) {
            return
        }
        setBotConversation([
            ...botConv,
            {
                question: text,
                answer: '',
                loading: true
            }
        ])
        setLoading(true)
        sendBotMessage(
            {
                agency_id: agency_id,
                location_id: location_id,
                contact_id: contact_id,
                message: text
            },
            (response) => {
                setBotConversation(prev => {
                    return prev.map(itm => itm.loading ? ({ ...itm, answer: response.data, loading: false }) : itm)
                })
                onMessage && onMessage(response)
                setLoading(false)
            },
            (response) =>{
                toast.error('Something went wrong')
                setBotConversation(prev => {
                    return prev.map(itm => itm.loading ? ({ ...itm, answer: response.data, loading: false }) : itm)
                })
                setLoading(false)
            }
        )
        setInputText('')
    }

    return (
        <>
            <div className="bg-[#ffffff] pb-[30px] ">
                <div className="flex items-center justify-start mx-auto max-w-[1760px] py-[22px] ">
                    <button
                        className="px-[22px] text-[14px] font-[600] text-[#ffffff] rounded-[8px] bg-[#0037FE] transition-all hover:bg-green-500 py-[10px] flex items-center justify-center "
                        onClick={handleResetSimulation}
                    >
                        Reset Simulation
                    </button>
                </div>
                <div className="flex items-center gap-5 max-w-max mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xlink="http://www.w3.org/1999/xlink" width="70" height="70" x="0" y="0" viewBox="0 0 64 64" space="preserve" class=""><g><path d="M25 10h2.5v8h2V9c0-.55-.45-1-1-1h-1.33L31 3.54 34.83 8H33.5c-.55 0-1 .45-1 1v9h2v-8H37a1 1 0 0 0 .76-1.65l-6-7c-.38-.44-1.14-.44-1.52 0l-6 7c-.25.3-.31.71-.15 1.07.16.35.52.58.91.58zM46 15h2.5v8h2v-9c0-.55-.45-1-1-1h-1.33L52 8.54 55.83 13H54.5c-.55 0-1 .45-1 1v9h2v-8H58a1 1 0 0 0 .76-1.65l-6-7c-.38-.44-1.14-.44-1.52 0l-6 7c-.25.3-.31.71-.15 1.07.16.35.52.58.91.58zM6 23h2.5v8h2v-9c0-.55-.45-1-1-1H8.17L12 16.54 15.83 21H14.5c-.55 0-1 .45-1 1v9h2v-8H18a1 1 0 0 0 .76-1.65l-6-7c-.38-.44-1.14-.44-1.52 0l-6 7c-.25.3-.31.71-.15 1.07.16.35.52.58.91.58zM25 56h12c3.31 0 6-2.69 6-6V40c0-3.31-2.69-6-6-6H25c-3.31 0-6 2.69-6 6v10c0 3.31 2.69 6 6 6zm-4-16c0-2.21 1.79-4 4-4h12c2.21 0 4 1.79 4 4v10c0 2.21-1.79 4-4 4H25c-2.21 0-4-1.79-4-4z" fill="#0037fe" opacity="1" data-original="#000000" class=""></path><path d="M38.3 47.5h-1.5v-5h1.5v-2h-5v2h1.5v5h-1.5v2h5zM26.19 47.5h2.62l.44 2h2.05l-1.83-8.22a.997.997 0 0 0-.98-.78h-2c-.47 0-.87.33-.98.78l-1.83 8.22h2.05l.44-2zm1.11-5h.4l.67 3h-1.73l.67-3zM36.14 26.71l-2.43 2.43a.996.996 0 0 0 0 1.41l.51.51c-.22.44-.41.91-.57 1.43l1.91.59c.14-.46.3-.85.49-1.21.35-.65.25-1.46-.22-2.03l1.03-1.03c.57.47 1.38.57 2.03.23.46-.24.93-.42 1.47-.56.56-.17.94-.67.94-1.25v-.25h1.42v.23c0 .62.44 1.16 1 1.28.49.13.97.31 1.41.55.65.35 1.46.25 2.03-.22l1.03 1.03c-.47.57-.57 1.38-.23 2.02.19.37.35.75.47 1.12.22.72.85 1.22 1.59 1.28v1.43c-.74.06-1.36.55-1.6 1.29-.1.33-.24.68-.45 1.11-.35.65-.25 1.46.22 2.03l-1.03 1.03c-.57-.47-1.38-.57-2.02-.23-.37.19-.75.35-1.13.47l.6 1.91c.44-.14.88-.32 1.33-.54l.52.51c.19.2.45.29.71.29s.51-.1.71-.29l2.43-2.43a.996.996 0 0 0 0-1.41l-.51-.51c.23-.47.39-.86.5-1.22h.72c.55 0 1-.45 1-1v-3.42c0-.55-.45-1-1-1h-.72c-.14-.41-.3-.81-.5-1.22l.51-.51a.996.996 0 0 0 0-1.41l-2.43-2.43a.996.996 0 0 0-1.41 0l-.51.51c-.39-.2-.79-.36-1.22-.5v-.72c0-.55-.45-1-1-1h-3.42c-.55 0-1 .45-1 1v.72c-.42.14-.82.3-1.22.5l-.51-.51a.996.996 0 0 0-1.41 0z" fill="#0037fe" opacity="1" data-original="#000000" class=""></path><path d="m43.7 37.46 1.1 1.67c1.38-.91 2.2-2.45 2.2-4.12 0-2.76-2.24-5-5-5-1.67 0-3.21.82-4.12 2.2l1.67 1.1c.54-.81 1.46-1.3 2.46-1.3 1.65 0 3 1.35 3 3 0 1-.49 1.92-1.3 2.46zM26.6 58.3l-.29-.29c.12-.24.21-.47.29-.7l-1.9-.64c-.06.19-.16.4-.28.64-.27.53-.23 1.17.08 1.66l-.52.52c-.49-.31-1.14-.35-1.68-.07-.25.13-.52.25-.82.34-.58.18-1 .66-1.12 1.23h-.73c-.12-.57-.54-1.05-1.14-1.24-.27-.08-.55-.19-.81-.34-.53-.27-1.17-.23-1.66.08l-.52-.52c.31-.49.35-1.14.07-1.69-.13-.24-.25-.51-.33-.81-.18-.58-.66-1-1.23-1.12v-.7c.54-.02 1.02-.39 1.17-.93.1-.39.24-.73.41-1.06.27-.53.23-1.17-.08-1.66l.52-.52c.49.32 1.14.36 1.66.08.24-.12.45-.22.64-.28l-.63-1.9c-.22.07-.45.17-.7.29l-.29-.29c-.38-.38-1.04-.38-1.41 0l-1.88 1.88a.996.996 0 0 0 0 1.41l.29.29c-.11.22-.2.45-.29.69h-.4c-.55 0-1 .45-1 1v2.66c0 .55.45 1 1 1h.4c.08.24.18.47.28.69l-.28.28a.996.996 0 0 0 0 1.41l1.88 1.88c.19.19.44.29.71.29s.52-.11.71-.29l.29-.28c.22.11.46.21.69.29v.4c0 .55.45 1 1 1h2.66c.55 0 1-.45 1-1v-.4c.24-.08.47-.18.69-.28l.28.28c.38.38 1.04.38 1.41 0l1.88-1.88a.996.996 0 0 0 0-1.41z" fill="#0037fe" opacity="1" data-original="#000000" class=""></path><path d="m19.1 53.8-1.2-1.6c-.88.66-1.4 1.71-1.4 2.8 0 1.93 1.57 3.5 3.5 3.5 1.1 0 2.14-.52 2.8-1.4l-1.6-1.2a1.498 1.498 0 1 1-2.1-2.1z" fill="#0037fe" opacity="1" data-original="#000000" class=""></path></g></svg>
                    <h2 className=" text-center text-[#0037FE] font-[700] text-[36px] ">
                        Train Your AI
                    </h2>
                </div>
            </div>
            {
                botConv?.length > 0 ?
                    <div className={`bg-black/5 transition-all`}>
                        {
                            botConv?.map((conversation) => {
                                return (
                                    <BotConversation conversation={conversation} />
                                )
                            })
                        }
                    </div>
                    :
                    <></>
            }
            {
                contact_id &&
                <div className="pt-[100px] pb-[30px] w-full ">
                    <div className="max-w-[1100px] w-full mx-auto ">
                        <div className="h-[60px] w-full flex border overflow-hidden rounded-[8px] ">
                            <input
                                placeholder="Send a message to begin AI Conversation"
                                className="text-[15px] h-full bg-white disabled:cursor-not-allowed outline-none shadow-md px-[26px] flex-1 text-slate-800 font-[400] "
                                type="text"
                                value={inputText}
                                disabled={loading}
                                onKeyDown={(e) => {
                                    if (e.code == 'NumpadEnter' || e.key == 'Enter') {
                                        handleSubmit()
                                    }
                                }}
                                onChange={(e) => {
                                    setInputText(e.target.value)
                                }}
                            />
                            <div
                                className="w-[60px] pr-[10px] bg-[#ffffff] flex group items-center transition-all justify-center cursor-pointer "
                                onClick={handleSubmit}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xlink="http://www.w3.org/1999/xlink" width="30" height="30" x="0" y="0" viewBox="0 0 24 24" space="preserve" class=""><g><path fill="#0037fe" fill-rule="evenodd" d="m7.85 4.31 10.241 4.61c.734.33 1.346.605 1.801.861.443.25.932.581 1.194 1.11a2.5 2.5 0 0 1 0 2.217c-.262.53-.75.861-1.193 1.11-.455.257-1.068.532-1.802.862l-10.223 4.6c-.753.34-1.38.621-1.882.796-.488.169-1.07.318-1.647.157a2.5 2.5 0 0 1-1.657-1.5c-.218-.557-.127-1.152-.008-1.654.123-.518.342-1.17.603-1.952l1.02-3.047c.107-.318.114-.353.118-.379a.499.499 0 0 0 0-.128c-.004-.026-.01-.061-.116-.379L3.257 8.456c-.259-.78-.475-1.43-.596-1.948-.118-.501-.207-1.095.011-1.651A2.5 2.5 0 0 1 4.33 3.36c.576-.16 1.157-.011 1.643.157.502.174 1.127.455 1.877.793zM6.233 13H11.5a1 1 0 1 0 0-2H6.209a24.866 24.866 0 0 1-.012-.036L5.171 7.872c-.279-.839-.465-1.403-.563-1.822-.08-.34-.07-.46-.068-.476a.5.5 0 0 1 .312-.282c.015 0 .137.002.467.116.407.141.949.384 1.755.747l10.152 4.568c.79.355 1.319.594 1.686.801.297.167.376.255.387.266a.5.5 0 0 1 0 .42c-.01.01-.09.098-.387.266-.367.206-.896.445-1.686.8l-10.134 4.56c-.809.365-1.353.609-1.761.75-.332.115-.453.116-.468.117a.5.5 0 0 1-.313-.283c0-.015-.012-.136.07-.477.1-.42.288-.986.57-1.827l1.004-3.001.018-.054.02-.061z" clip-rule="evenodd" opacity="1" data-original="#000000" class=""></path></g></svg>
                            </div>
                        </div>
                        <p className="text-[13px] text-center mt-[10px] text-slate-400 " >This is a Simulation for testing purpose, and will not affect actual calendars or contact records.</p>
                    </div>
                </div>
            }
        </>
    )
}

export default GPTConversation