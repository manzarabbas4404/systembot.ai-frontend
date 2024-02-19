



'use client'
import { UpdateGhlAccountOpenAiKey } from "@/Redux/Actions/GHLActions"
import { useState } from "react"
import toast from "react-hot-toast"






const CopyTextPopup = (props) => {
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
            <main className=" fixed bg-[#00000063] inset-0 h-[100vh] flex items-center justify-center z-50 ">
                <div className=" rounded-[10px] overflow-hidden py-[38px] shadow-sm max-w-[500px] gap-[19px] flex flex-col bg-[#ffffff] items-center w-full mx-auto ">
                    <i class="fa-solid fa-circle-check text-[60px] text-green-600 "></i>
                    <h2 className="text-[22px] font-[600] text-slate-600 ">
                        Copied to Clipboard
                    </h2>
                    <button
                        className="rounded-[8px] text-[15px] font-[600] px-[30px] py-[7px] border border-[#0037FE] hover:bg-[#0037FE] transition-all text-[#0037FE] hover:text-[#ffffff] "
                        onClick={() => {
                            props.onClose && props.onClose()
                        }}
                    >
                        Close
                    </button>
                </div>
            </main>
        </>
    )
}

export default CopyTextPopup