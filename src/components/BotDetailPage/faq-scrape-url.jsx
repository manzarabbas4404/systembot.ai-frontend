


import { ScrapeURl } from "@/Redux/Actions/GHLActions"
import { useState } from "react"
import toast from "react-hot-toast"



const ScrapeURL = ({ ghl_account, sub_account, onClose }) => {
    const [faqData, setFaqData] = useState({scrap_type : 'add'})
    console.log(sub_account)

    const handleAddFaq = () => {
        if (!faqData.url){
            toast.error('URL is required')
            return
        }
        let tid = toast.loading('Please wait...')
        ScrapeURl(
            {
                sub_account: sub_account,
                url: faqData.url,
                scrap_type: faqData.scrap_type,
            },
            (response) => {
                toast.success('Completed', { id: tid })
                onClose && onClose(response.data)
            },
            (response) => {
                toast.success('No Faqs', { id: tid })
                onClose && onClose()
            },
        )
    }
    return (
        <>
            <div className="fixed inset-0 bg-black/50" >
                <div className="w-full h-full flex items-center justify-center ">
                    <div className=" bg-white rounded-[14px] max-w-[470px] w-full overflow-hidden ">
                        <div className=" flex items-center justify-between px-[22px] py-[14px] bg-[#0037FE]  ">
                            <h5 className="text-capitalize text-[21px] text-[#ffffff] font-[600] ">Scrape URL </h5>
                            <button type="button" className="" onClick={() => onClose()} >
                                <i className="fa-solid fa-xmark text-[22px] text-slate-400 hover:text-[#ffffff] transition-all "></i>
                            </button>
                        </div>
                        <div className="px-[14px] py-[18px] ">
                            <div className="form-group mb-3 flex flex-col gap-[5px] ">
                                <label htmlFor="Parent Url" className="text-[14px] font-[600] text-slate-800 " >Parent Url</label>
                                <input className=" py-[9px] px-[8px] text-[14px] w-full outline-none border rounded-[8px] text-slate-400 "
                                    type="text"
                                    placeholder="https://www.example.com"
                                    onChange={(e) => {
                                        setFaqData({ ...faqData, url: e.target.value })
                                    }}
                                    id="Parent Url"
                                ></input>
                            </div>
                            <div className="form-group mb-3 flex flex-col gap-[5px]">
                                <label htmlFor="answer" className="text-[14px] font-[600] text-slate-800 ">Type</label>
                                {/* <textarea className=" py-[4px] px-[8px] text-[14px] w-full h-[64px] outline-none border rounded-[8px] "
                                    type="text" placeholder="Answer" 
                                    onChange={(e) => {
                                        setFaqData({ ...faqData, answer: e.target.value })
                                    }}
                                    id="answer"
                                ></textarea> */}
                                <select 
                                className=" py-[9px] px-[8px] text-[14px] w-full outline-none border text-slate-400 rounded-[8px]" name="" id=""
                                onChange={(e) =>{
                                    setFaqData({
                                        ...faqData,
                                        scrap_type : e.target.value
                                    })
                                }}
                                >
                                    <option value="add" selected>Add</option>
                                    <option value="replace">Replace</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-[6px] px-[14px] py-[18px] ">
                            <button className="px-[22px] py-[7px] rounded-[6px] bg-[#0037FE] text-[#ffffff] hover:bg-red-900 transition-all " onClick={() => onClose()} type="button" > Close </button>
                            <button className="px-[22px] py-[7px] rounded-[6px] bg-[#0037FE] text-[#ffffff] " onClick={handleAddFaq} type="button" ><span>Add</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScrapeURL