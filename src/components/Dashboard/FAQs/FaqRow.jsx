'use client'
import { ClearMyFaqs, ImportFile, getMyFAQs } from "@/Redux/Actions/GHLActions"
import { useEffect, useState } from "react"
import { CSVLink } from "react-csv"
import toast from "react-hot-toast"



const FAQRow = ({ account, bots, setOpenWidget, checked, onSelect, handleUpdateAccountBot, handleUpdateAccountEnabled }) => {
    const [enabled, setEnabled] = useState(false)
    const [nFaqs, setNFaqs] = useState([])


    const headers = [
        { label: 'Question', key: 'question' },
        { label: 'Answer', key: 'answer' },
    ];
    const handleEnabled = () => {
        handleUpdateAccountEnabled(account.id, enabled)
    }

    const onSelectImportFile = (file) => {
        let tid = toast.loading('Please wait...')
        console.log(file)
        ImportFile(
            { location_id: account.id, file: file },
            (response) => {
                toast.success(response?.message || 'Faqs Updated', { id: tid })
                let dt = response.data || []
                setNFaqs([
                    ...nFaqs,
                    ...dt
                ])
                console.log(response)
            },
            (response) => {
                toast.error(response?.message || 'Something went wrong', { id: tid })
                console.log(response)
            },
        )
    }

    const handleClearFaqs = () => {
        let tid = toast.loading('Please wait...')
        ClearMyFaqs(
            { location_id: account.id },
            (response) => {
                setNFaqs([])
                toast.success(response?.message || 'Faqs Cleared', { id: tid })
            }
        )
    }

    useEffect(() => {
        setEnabled(account?.enabled)
    }, [account?.enabled])

    useEffect(() => {
        setNFaqs(account?.faqs)
    }, [])

    return (
        <tr >
            {/* className="flex bg-[#ffffff] items-center justify-center transition-all px-[26px] py-[8px] hover:bg-[#afa6e417] " */}
            <td >
                <input
                    type="checkbox"
                    className=" h-[18px] w-[18px] "
                    id={`account-id-${account.id}`}
                    checked={checked}
                    onChange={onSelect}
                />
            </td>
            <td >
                <label htmlFor={`account-id-${account.id}`} className="text-[14px] font-[500] text-slate-600/80 line-clamp-2">{account?.name}</label>
            </td>
            <td >
                <p className="text-[14px] font-[500] text-center text-slate-600/80 ">{nFaqs?.length || 0}</p>
            </td>
            <td >
                <div
                    className={`rounded-[30px] mx-auto transition-all flex items-center p-[2px] cursor-pointer w-[40px] ${enabled ? 'bg-green-400 justify-end' : 'bg-[#465352] justify-start'}`}
                    onClick={handleEnabled}
                >
                    <svg width="16" height="16" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.505859" width="20" height="20" rx="10" fill="white" />
                    </svg>
                </div>
            </td>
            <td >
                <p className="text-[14px] font-[500] text-center text-slate-600/80 ">{account?.updated_at}</p>
            </td>
            <td >
                <div className="flex-1 flex items-center justify-center gap-[5px] ">
                    <CSVLink
                        data={nFaqs}
                        headers={headers}
                        filename='faqs.csv'
                    >
                        <div className="border border-slate-300 shadow-sm px-[7px] group py-[10px] hover:bg-[#0037FE] transition-all cursor-pointer rounded-[7px] flex items-center justify-center ">
                            <i class="fa-solid fa-file-export group-hover:text-[#ffffff] text-slate-500"></i>
                        </div>
                    </CSVLink>
                    <label htmlFor={`import_csv_file_${account.id}`} className="border border-slate-300 shadow-sm px-[7px] group py-[10px] hover:bg-[#0037FE] transition-all cursor-pointer rounded-[7px] flex items-center justify-center ">
                        <i class="fa-solid fa-file-import group-hover:text-[#ffffff] text-slate-500"></i>
                    </label>
                    <input
                        className="hidden"
                        type="file"
                        id={`import_csv_file_${account.id}`}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={(e) => {
                            onSelectImportFile(e.target.files[0])
                        }}
                    />
                    <div
                        className="border border-slate-300 shadow-sm px-[20px] group py-[9px] hover:bg-[#0037FE] transition-all cursor-pointer gap-[8px] text-[14px] rounded-[7px] flex items-center justify-center "
                        onClick={(e) => {
                            setOpenWidget(account)
                        }}
                    >
                        <i class="fa-solid fa-eye group-hover:text-[#ffffff] text-slate-500"></i>
                        <p className="group-hover:text-[#ffffff] text-slate-600 ">Widget</p>
                    </div>
                    <div
                        className="border border-slate-300 shadow-sm px-[20px] group py-[9px] hover:bg-[#0037FE] transition-all cursor-pointer gap-[8px] text-[14px] rounded-[7px] flex items-center justify-center "
                        onClick={handleClearFaqs}
                    >
                        <i class="fa-solid fa-trash group-hover:text-[#ffffff] text-slate-500"></i>
                        <p className="group-hover:text-[#ffffff] whitespace-nowrap text-slate-600 ">Clear FAQs</p>
                    </div>
                </div>
            </td>
            <td>
                <div className="text-[#0037FE] relative whitespace-nowrap gap-[6px] group text-[15px] w-full font-[500] hover:text-[#ffffff] hover:bg-[#0037FE] transition-all rounded-[10px] px-[32px] py-[8px] cursor-pointer border-[#0037FE] border flex items-center justify-center ">
                    {
                        account?.bot ?
                            account?.bot
                            :
                            'Training Bot'
                    }
                    <i class="fa-solid fa-angle-up group-hover:rotate-180 transition-all "></i>
                    <div className="pt-[10px] z-50 w-full absolute top-[36px] hidden group-hover:block ">
                        <div className="bg-[#ffffff] py-[8px] max-h-[250px] shadow-light h-full overflow-auto rounded-[8px] ">
                            <div
                                className="px-[8px] text-[14px] py-[5px] text-slate-500 hover:text-[#0037FE]/80 hover:bg-blue-100/50 transition-all cursor-pointer "
                                onClick={() => { handleUpdateAccountBot(account.id, null) }}
                            >
                                Training Bot
                            </div>
                            {
                                bots?.map(bot => {
                                    return (
                                        <div
                                            className="px-[8px] text-[14px] py-[5px] text-slate-500 hover:text-[#0037FE]/80 hover:bg-blue-100/50 transition-all cursor-pointer "
                                            onClick={() => { handleUpdateAccountBot(account.id, bot.id) }}
                                        >
                                            {bot?.agency_name}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default FAQRow