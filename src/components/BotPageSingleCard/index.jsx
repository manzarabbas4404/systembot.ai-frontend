import { cloneMyBot, deleteMyBot, getMyBots } from "@/Redux/Actions/BotActions"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import React, { useEffect, useState } from "react"
import BotClone from "../Popups/BotClone";
import CopyTextPopup from "../Popups/CopyBotText";
import BotDetails from "../Popups/BotDetails";


const BotPageSingleCard = ({ bot, onDelete, onCloned }) => {
    const router = useRouter()

    const [showModel, setShowModel] = useState(false);
    const [showSecondModel, setShowSecondModel] = useState(false);
    const [showDetailModel, setShowDetailModel] = useState(undefined);
    const [data, setData] = useState({})

    const handleDelete = () => {
        let tid = toast.loading("Please wait...")
        deleteMyBot(
            { id: bot.id },
            (response) => {
                toast.success(response?.message || 'Deleted Succesfully', { id: tid })
                onDelete && onDelete(bot.id)
            }
        )
    }

    const handleCopyWebhookId = () => {
        navigator.clipboard.writeText(`https://backend.systembot.ai/webhook/${bot?.webhook_id}/`)
        setShowSecondModel(true)
    }
    const handleCopySnipperId = () => {
        let script= `
            <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
            <script src="https://backend.systembot.ai/static/cdn/bot_snippet.js" botSnippetWidget="true" agencyId="45371695328319" botId="${bot.id}"></script>
        `
        navigator.clipboard.writeText(script)
        setShowSecondModel(true)
    }

    const handleClone = () => {
        let tid = toast.loading("Please wait...")
        cloneMyBot(
            { id: bot.id },
            (response) => {
                console.log(response)
                onCloned && onCloned(response)
                toast.success(response?.message || 'Cloned Succesfully', { id: tid })
            }
        )
    }
    return (
        <>
            <div className=" border bg-[#ffffff] rounded-[10px] w-[540px]">
                <div className="px-[28px] py-[24px]  ">
                    <h2 className="text-[#0037FE] font-[600] text-[17px] ">{bot?.agency_name}</h2>
                    <div className="relative group">
                        <p className="text-slate-500 mt-[6px] line-clamp-1">https://backend.systembot.ai/webhook/{bot?.webhook_id}/</p>
                        <div className="hidden group-hover:flex items-center gap-3 absolute right-0 top-0 ">
                            <div onClick={() => { handleCopyWebhookId() }} className=" cursor-pointer px-[16px] text-[13px] rounded-[6px] py-[7px] bg-[#0037FE] flex items-center gap-[4px] text-[#ffffff] ">
                                <i class="fa-solid text-[#ffffff] fa-copy"></i>
                                Copy Webhook
                            </div>
                            <div onClick={() => { handleCopySnipperId() }} className=" cursor-pointer px-[16px] text-[13px] rounded-[6px] py-[7px] bg-red-600 flex items-center gap-[4px] text-[#ffffff] ">
                                <i class="fa-solid text-[#ffffff] fa-copy"></i>
                                Copy Snippet
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" bg-slate-200 h-[1px] w-full mt-[40px] ">

                </div>
                <div className="flex items-center justify-between px-[28px] py-[10px]  ">
                    <div className={`border px-[18px] py-[6px] rounded-[6px]  ${bot.ai_type == "Booking" ? 'hover:bg-green-100 border-green-200' : 'hover:bg-red-100 border-red-200'} `}>
                        {
                            bot.ai_type == "Booking" ?
                                <p className="text-green-700/100 font-[600] text-[14px] cursor-pointer ">Booking</p>
                                :
                                <p className="text-red-700/100 font-[600] text-[14px] cursor-pointer ">NON-BOOKING</p>
                        }
                    </div>
                    <div className="flex items-center gap-[10px] ">
                        <div
                            title="Clone" className="border px-[8px] group py-[8px] hover:bg-[#0037FE] transition-all cursor-pointer rounded-[6px] flex items-center justify-center "
                            onClick={() => {
                                handleClone()
                            }}
                        >
                            <i class="fa-solid group-hover:text-[#ffffff] text-slate-500 fa-copy"></i>
                        </div>
                        <div
                            title="Edit" className="border px-[8px] group py-[8px] hover:bg-[#0037FE] transition-all cursor-pointer rounded-[6px] flex items-center justify-center "
                            onClick={() => {
                                router.push(`/dashboard/bots/manage-bots/?isEdit=true&id=${bot.id}`)
                            }}
                        >
                            <i class="fa-solid fa-pen group-hover:text-[#ffffff] text-slate-500"></i>
                        </div>
                        <div
                            title="Delete"
                            className="border px-[8px] group py-[8px] hover:bg-[#0037FE] transition-all cursor-pointer rounded-[6px] flex items-center justify-center "
                            onClick={handleDelete}
                        >
                            <i class="fa-solid fa-trash-can group-hover:text-[#ffffff] text-slate-500"></i>
                        </div>
                        <div
                            onClick={() => setShowDetailModel(bot)} title="BOT DETAIL" className="border px-[8px] group py-[8px] hover:bg-[#0037FE] transition-all cursor-pointer rounded-[6px] flex items-center justify-center "
                        >
                            <i class="fa-solid fa-bars group-hover:text-[#ffffff] text-slate-500"></i>
                        </div>
                    </div>
                </div>
            </div>


            {
                showModel ?
                    <BotClone
                        onClose={() => {
                            setShowModel(false)
                        }}
                    />
                    :
                    <>

                    </>
            }

            {
                showSecondModel ?
                    <CopyTextPopup
                        onClose={() => {
                            setShowSecondModel(false)
                        }}
                    />
                    :
                    <>

                    </>
            }

            {
                showDetailModel ?
                    <BotDetails
                        showDetailModel={showDetailModel}
                        onClose={() => {
                            setShowDetailModel(false)
                        }}
                    />
                    :
                    <>

                    </>
            }


        </>
    )
}

export default BotPageSingleCard