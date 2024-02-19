'use client'
import { resetBotSimulation, sendBotMessage } from "@/Redux/Actions/BotActions"
import { useParams, useSearchParams } from "next/navigation"
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
                console.log(line)
                // element.innerHTML = element.innerHTML + i == 0 ? element.innerHTML : '<br/>'
                if (i > 0) {
                    element.innerHTML = element.innerHTML + '<br/><br/>'
                }
                let l_int_id = undefined
                let l_c = 0
                for (let j = 0; j < line.length; j++) {
                    let next_ans = line[j]
                    if (next_ans) {
                        element.innerHTML = element.innerHTML + next_ans
                        l_c = l_c + 1
                        await sleep(line_tm);
                    }
                    else {
                        break
                    }
                }
                // let sleep_time = line.length * line_tm
                // await sleep(sleep_time);
            }
        }
        setAddingAnswer(false)
    }
    let tid = undefined
    useEffect(() => {
        if (!tid){
            tid = setTimeout(() => {
                handleProcess()
            }, 10);
        }
    }, [conversation.answer])
    return (
        <>
            <div className="w-full group px-4 bg-white">
                    {
                        conversation?.question && 
                            <div className="py-[28px] max-w-max ml-auto flex justify-between ">
                                <div className="flex-1 flex items-center flex-row-reverse gap-[22px] ">
                                    <div className="flex items-center justify-center  ">
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xlink="http://www.w3.org/1999/xlink" width="30" height="30" x="0" y="0" viewBox="0 0 512 512" space="preserve" class=""><g><path d="M437.02 330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521 243.251 404 198.548 404 148 404 66.393 337.607 0 256 0S108 66.393 108 148c0 50.548 25.479 95.251 64.262 121.962-36.21 12.495-69.398 33.136-97.281 61.018C26.629 379.333 0 443.62 0 512h40c0-119.103 96.897-216 216-216s216 96.897 216 216h40c0-68.38-26.629-132.667-74.98-181.02zM256 256c-59.551 0-108-48.448-108-108S196.449 40 256 40s108 48.448 108 108-48.449 108-108 108z" fill="#0037fe" opacity="1" data-original="#000000" class=""></path></g></svg>
                                    </div>
                                    <span className="Hello text-[12px] bg-[#0237ff] text-white px-4 py-2 rounded-xl rounded-tr-none font-[500] ">
                                        {conversation?.question}
                                    </span>
                                </div>
                            </div>
                    }
            </div>
            <div className="bg-white w-full group ">
                <div className=" py-[28px] max-w-max flex justify-between">
                    <div className="flex-1 flex items-end gap-2 ">
                        <div className="flex items-center justify-center ">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24" class="chat-msg-img_-d0t" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><title></title><path fill="#30b6ff" d="M11.999 0c-2.25 0-4.5.06-6.6.21a5.57 5.57 0 00-5.19 5.1c-.24 3.21-.27 6.39-.06 9.6a5.644 5.644 0 005.7 5.19h3.15v-3.9h-3.15c-.93.03-1.74-.63-1.83-1.56-.18-3-.15-6 .06-9 .06-.84.72-1.47 1.56-1.53 2.04-.15 4.2-.21 6.36-.21s4.32.09 6.36.18c.81.06 1.5.69 1.56 1.53.24 3 .24 6 .06 9-.12.93-.9 1.62-1.83 1.59h-3.15l-6 3.9V24l6-3.9h3.15c2.97.03 5.46-2.25 5.7-5.19.21-3.18.18-6.39-.03-9.57a5.57 5.57 0 00-5.19-5.1c-2.13-.18-4.38-.24-6.63-.24zm-5.04 8.76c-.36 0-.66.3-.66.66v2.34c0 .33.18.63.48.78 1.62.78 3.42 1.2 5.22 1.26 1.8-.06 3.6-.48 5.22-1.26.3-.15.48-.45.48-.78V9.42c0-.09-.03-.15-.09-.21a.648.648 0 00-.87-.36c-1.5.66-3.12 1.02-4.77 1.05-1.65-.03-3.27-.42-4.77-1.08a.566.566 0 00-.24-.06z"></path></svg>
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
                                        <span className="bg-[#e1e6fc] block max-w-[900px] rounded-2xl text-[12px] font-[500]  text-slate-700 px-4 py-2  rounded-tl-none">
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


const SnippetGPTConversation = ({ onMessage }) => {
    const searchparams = useSearchParams()
    const { agency_id, bot_id, contact_id } = useParams()
    const [botConv, setBotConversation] = useState([
    ])
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
                location_id: bot_id,
                contact_id: contact_id,
                message: text,
                botId : bot_id
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

    useEffect(()=>{
        let introMessage = searchparams.get('introMessage')
        if (introMessage){
            setBotConversation([
                ...botConv,
                {question : '', answer : introMessage , loading : false}
            ])
        }
    }, [])

    return (
        <>
            {/* <div className="bg-[#ffffff] pb-[30px] ">
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
            </div> */}
            <div className="flex flex-col h-full pb-3">
                <div className="w-full py-4 text-center bg-gradient-to-tr from-[#325863] to-[#559da8]">
                    <h3 className="text-[#ffffff] font-[500]">Live Chat</h3>
                </div>
                <div className="flex-1 overflow-auto">
                    {
                        botConv?.length > 0 ?
                            <div className={`transition-all px-2`}>
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
                </div>
                <div className="w-full px-2">
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default SnippetGPTConversation