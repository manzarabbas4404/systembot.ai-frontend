import { AddFaqHandler, getMyFAQs } from "@/Redux/Actions/GHLActions"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"



const AddFaq = ({ ghl_account, edit, sub_account, onClose }) => {
    const [faqData, setFaqData] = useState({})

    const handleAddFaq = () => {
        if (!faqData?.question || !faqData?.answer) {
            toast.error('All Fields are required')
            return
        }
        let tid = toast.loading('Please wait...')
        AddFaqHandler(
            {
                ...faqData,
                sub_account: sub_account,
                question: faqData.question,
                answer: faqData.answer,
            },
            (response) => {
                onClose && onClose(response)
                toast.success(`Faq ${edit ? 'Updated' : 'Added'} successfully`, { id: tid })
            }
        )
    }

    useEffect(() => {
        if (edit) {
            setFaqData(edit)
        }
    }, [edit])
    return (
        <>
            <div className="fixed inset-0 bg-black/50" >
                <div className="w-full h-full flex items-center justify-center ">
                    <div className=" bg-white rounded-[14px] max-w-[470px] w-full overflow-hidden ">
                        <div className=" flex items-center justify-between px-[22px] py-[14px] bg-[#0037FE]  ">
                            <h5 className="text-capitalize text-[21px] text-[#ffffff] font-[600] ">{edit ? 'Edit' : 'Add'} FAQs </h5>
                            <button type="button" className="" onClick={() => onClose()} >
                                <i className="fa-solid fa-xmark text-[22px] text-slate-400 hover:text-[#ffffff] transition-all "></i>
                            </button>
                        </div>
                        <div className="px-[14px] py-[18px] ">
                            <div className="form-group mb-3 flex flex-col gap-[5px] ">
                                <label htmlFor="question" className="text-[14px] font-[600] text-slate-800 " >Question</label>
                                <textarea className=" py-[4px] px-[8px] text-[14px] w-full h-[64px] outline-none border rounded-[8px]  placeholder:text-slate-400"
                                    type="text"
                                    placeholder="Question"
                                    value={faqData.question}
                                    onChange={(e) => {
                                        setFaqData({ ...faqData, question: e.target.value })
                                    }}
                                    id="question"
                                ></textarea>
                            </div>
                            <div className="form-group mb-3 flex flex-col gap-[5px]">
                                <label htmlFor="answer" className="text-[14px] font-[600] text-slate-800 ">Answer</label>
                                <textarea className=" py-[4px] px-[8px] text-[14px] w-full h-[64px] outline-none border rounded-[8px] placeholder:text-slate-400 "
                                    type="text" placeholder="Answer"
                                    value={faqData.answer}
                                    onChange={(e) => {
                                        setFaqData({ ...faqData, answer: e.target.value })
                                    }}
                                    id="answer"
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-[6px] px-[14px] py-[18px] ">
                            <button className="px-[22px] py-[7px] rounded-[6px] bg-[#0037FE] text-[#ffffff] hover:bg-red-900 transition-all " onClick={() => onClose()} type="button" > Close </button>
                            <button className="px-[22px] py-[7px] rounded-[6px] bg-[#0037FE] text-[#ffffff] " onClick={handleAddFaq} type="button" ><span>{edit ? 'Edit' : 'Add'}</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddFaq