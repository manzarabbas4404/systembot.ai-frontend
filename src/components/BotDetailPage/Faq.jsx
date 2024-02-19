import { DeleteSingleFaq, getMyFAQs } from "@/Redux/Actions/GHLActions"
import toast from "react-hot-toast"



const Faq = ({ faq, onDelete, onEditClick }) => {
    const handleDelete = () => {
        let tid = toast.loading('Please wait...')
        DeleteSingleFaq({ id: faq.id },
            (response) => {
                toast.success(response.message || 'Deleted successfully', { id: tid })
                onDelete && onDelete()
            },
            (response) => {
                toast.error(response.message || 'Something went wrong', { id: tid })
            },
        )
    }
    return (
        <>
            <div className="mb-[12px] transition-all cursor-pointer hover:shadow-xl pb-[40px] p-[22px] bg-[#ffffff] border rounded-[10px] w-full flex justify-between ">
                <div className="flex-1 ">
                    <p className=" text-slate-600 font-[600] hover:text-[#0037FE] ">Q: {faq?.question}</p>
                    <p className=" text-slate-500 mt-[6px] font-[400] ">A: {faq?.answer}</p>
                </div>
                <div className="w-[60px] gap-[9px] flex items-center flex-col ">
                    <div
                        className="flex items-center transition-all group hover:bg-[#0037FE] justify-center py-[10px] px-[9px] rounded-[5px] shadow-hard cursor-pointer  "
                        onClick={() => {
                            onEditClick && onEditClick()
                        }}
                    >
                        <i class="fa-solid fa-pen text-[220x] group-hover:text-[#ffffff] text-slate-500 "></i>
                    </div>
                    <div
                        // Delete Icon 
                        className="flex items-center transition-all group hover:bg-[#0037FE] justify-center py-[10px] px-[9px] rounded-[5px] shadow-hard cursor-pointer"
                        onClick={handleDelete}
                    >
                        {/* <i class="fa-solid fa-trash text-[20px] group-hover:text-[#ffffff] text-slate-500"></i> */}
                        <i class="fa-solid fa-trash-can text-[20px] group-hover:text-[#ffffff] text-slate-500"></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Faq