


'use client'
import { UpdateGhlAccountOpenAiKey } from "@/Redux/Actions/GHLActions"
import { useState } from "react"
import toast from "react-hot-toast"






const BotDetailsInAuditLogs = ({ showModel, ...props }) => {
    const [data, setData] = useState({})

    const handleUpdate = () => {
        if (!data?.text) {
            return
        }
        let text = data?.text?.trim()
        let tid = toast.loading('Please wait...')
        UpdateGhlAccountOpenAiKey(
            { openai_key: text },
            (response) => {
                toast.success(response?.message || 'Updated successfully', { id: tid })
                props.onClose && props.onClose()
            },
            (error) => {
                toast.error(error?.message || 'Something went wrong', { id: tid })
            }
        )

    }
    return (
        <>
            <main className=" fixed bg-[#00000063] inset-0 h-[100vh] z-50 ">
                <div className=" rounded-[10px] overflow-hidden shadow-sm mt-[24px] max-w-[500px] w-full mx-auto z-50 ">
                    <div className="w-full px-[16px] py-[13px] flex items-center bg-[#0037FE] justify-between ">
                        <h2 className="text-[#ffffff] text-[20px] font-[600]  ">
                            Bot Details
                        </h2>
                        <span
                            onClick={() => {
                                props.onClose && props.onClose()
                            }}
                        >
                            <i class="fa-solid fa-xmark text-slate-400 hover:text-[#ffffff] transition-all text-[24px] cursor-pointer "></i>
                        </span>
                    </div>
                    <div className=" px-[40px] py-[32px] bg-[#ffffff] ">
                        <div className="flex justify-between">
                            <h2 className="text-[21px] font-[600] text-slate-600 ">Bot Name :</h2>
                            <p className="text-[17px] font-[500] text-slate-400 ">{showModel?.bot}</p>
                        </div>
                        <div className="flex justify-between mt-[15px] ">
                            <h2 className="text-[21px] font-[600] text-slate-600 ">Bot Type :</h2>
                            <p className="text-[17px] font-[500] text-slate-400 ">{showModel?.bot_type}</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default BotDetailsInAuditLogs