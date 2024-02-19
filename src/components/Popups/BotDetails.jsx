






'use client'
import { UpdateGhlAccountOpenAiKey } from "@/Redux/Actions/GHLActions"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"






const BotDetails = ({ showDetailModel, ...props }) => {
    const [data, setData] = useState({})

    console.log(data)

    useEffect(() => {
        if (showDetailModel) {
            setData(showDetailModel)
        }
    }, [showDetailModel])

    return (
        <>
            <main className=" fixed bg-[#00000063] inset-0 h-[100vh] z-50 ">
                <div className=" rounded-[10px] overflow-hidden shadow-sm mt-[24px] max-w-[500px] w-full mx-auto z-50 ">
                    <div className="w-full px-[16px] py-[13px] flex items-center bg-[#0037FE] justify-between ">
                        <h2 className="text-[#ffffff] text-[20px] font-[600]  ">
                            Bot
                        </h2>
                        <span
                            onClick={() => {
                                props.onClose && props.onClose()
                            }}
                        >
                            <i class="fa-solid fa-xmark text-slate-400 hover:text-[#ffffff] transition-all text-[24px] cursor-pointer "></i>
                        </span>
                    </div>
                    <div className="bg-[#ffffff] px-[28px] py-[22px] pb-[40px] max-h-[500px] overflow-y-auto">
                        <div className=" ">
                            <h2 className="text-[15px] text-slate-500 font-[600] ">Bot Name</h2>
                            <p className="text-[14px] text-slate-500/70 font-[500] ">{data?.agency_name}</p>
                        </div>
                        <div className=" mt-[17px] ">
                            <h2 className="text-[15px] text-slate-500 font-[600] ">Bot Description</h2>
                            <p className="text-[14px] text-slate-500/70 font-[500] ">{data?.description}</p>
                        </div>
                        <div className=" mt-[17px] ">
                            <h2 className="text-[15px] text-slate-500 font-[600] ">Bot Webhook</h2>
                            <p className="text-[14px] text-slate-500/70 font-[500] ">{data?.bot_webhook_url}</p>
                        </div>
                        <div className=" mt-[17px] ">
                            <h2 className="text-[15px] text-slate-500 font-[600] ">OpenAi Key</h2>
                            <p className="text-[14px] text-slate-500/70 font-[500] ">sk-***********************************************y</p>
                        </div>
                        <div className="flex items-start gap-3 mt-[17px] ">
                            <div className="flex-1 ">
                                <h2 className="text-[15px] text-slate-500 font-[600] ">Bot Prompt</h2>
                                <p className="text-[14px] text-slate-500/70 font-[500] line-clamp-3">{data?.prompt_name}</p>
                            </div>
                            <div className="flex-1 ">
                                <h2 className="text-[15px] text-slate-500 font-[600] ">Bot Prompt Type</h2>
                                <p className="text-[14px] text-slate-500/70 font-[500] ">{data?.prompt_type}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 mt-[17px] ">
                            <div className="flex-1 ">
                                <h2 className="text-[15px] text-slate-500 font-[600] ">Bot Reference</h2>
                                <p className="text-[14px] text-slate-500/70 font-[500] ">{data?.webhook_id}</p>
                            </div>
                            <div className="flex-1 ">
                                <h2 className="text-[15px] text-slate-500 font-[600] ">Bot Type</h2>
                                <p className="text-[14px] text-slate-500/70 font-[500] ">{data?.ai_type}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 mt-[17px] ">
                            <div className="flex-1 ">
                                <h2 className="text-[15px] text-slate-500 font-[600] ">Bot Conversation Limit</h2>
                                <p className="text-[14px] text-slate-500/70 font-[500] ">{data?.convesation_limit}</p>
                            </div>
                            <div className="flex-1 ">
                                <h2 className="text-[15px] text-slate-500 font-[600] ">Bot Gpt Model</h2>
                                <p className="text-[14px] text-slate-500/70 font-[500] ">{data?.gpt_model}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-[8px] mt-[30px] ">
                            <button
                                className="rounded-[8px] text-[15px] font-[600] px-[30px] py-[7px] border border-[#0037FE] hover:bg-[#0037FE] transition-all text-[#0037FE] hover:text-[#ffffff] "
                                onClick={() => {
                                    props.onClose && props.onClose()
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default BotDetails