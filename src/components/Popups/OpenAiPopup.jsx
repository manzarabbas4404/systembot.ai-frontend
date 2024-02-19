'use client'
import { UpdateGhlAccountOpenAiKey } from "@/Redux/Actions/GHLActions"
import { useState } from "react"
import toast from "react-hot-toast"






const OpenAiPopup = (props) => {
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
            <main className=" fixed bg-[#00000063] inset-0 h-[100vh] ">
                <div className=" rounded-[10px] overflow-hidden shadow-sm mt-[24px] max-w-[500px] w-full mx-auto ">
                    <div className="w-full px-[16px] py-[13px] flex items-center bg-[#0037FE] justify-between ">
                        <h2 className="text-[#ffffff] text-[20px] font-[600]  ">
                            Update OpenAI
                        </h2>
                        <span
                            onClick={() => {
                                props.onClose && props.onClose()
                            }}
                        >
                            <i class="fa-solid fa-xmark text-slate-400 hover:text-[#ffffff] transition-all text-[24px] cursor-pointer "></i>
                        </span>
                    </div>
                    <div className="bg-[#ffffff] px-[28px] py-[22px] pb-[40px] ">
                        <div className="w-full ">
                            <label className="text-[12px] text-[#304d83] font-[700]"  >OpenAI API Key</label>
                            <input
                                placeholder="XXXXXXXXXXXXXXXX"
                                className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] " type="text"
                                onChange={(e) => {
                                    setData({ ...data, text: e.target.value })
                                }}
                            />
                        </div>
                        <div className="flex items-center gap-[8px] mt-[14px] ">
                            <button
                                className="rounded-[8px] text-[15px] font-[600] px-[30px] py-[7px] border border-[#0037FE] hover:bg-[#0037FE] transition-all text-[#0037FE] hover:text-[#ffffff] "
                                onClick={() => {
                                    props.onClose && props.onClose()
                                }}
                            >
                                Close
                            </button>
                            <button
                                className="rounded-[8px] text-[15px] font-[600] px-[30px] py-[7px] border border-[#0037FE] bg-[#0037FE] hover:bg-green-700/90 hover:border-green-700/90 transition-all text-[#ffffff] "
                                onClick={handleUpdate}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default OpenAiPopup