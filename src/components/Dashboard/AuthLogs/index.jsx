'use client'
import Link from "next/link"
import Logo from "../../Logo"
import LeftSide from "../LeftSide"
import HeaderDashboard from "../HeaderDashboard"
import BotDetails from "@/components/Popups/BotDetails"
import { useEffect, useState } from "react"
import { getMyGHLAccountSubAccounts, getSubAccountAuditLogs } from "@/Redux/Actions/GHLActions"
import BotDetailsInAuditLogs from "@/components/Popups/BotDetailsInAuthLogs"


const AuthLogs = () => {
    const [data, setData] = useState({})
    const [showModel, setShowModel] = useState(false);
    const [subAccounts, setSubAccount] = useState([])
    const [selectedLoc, setSelectedLoc] = useState({})
    const [logs, setLogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [expanded_log, setExpandedLog] = useState([])

    console.log(logs)

    const RefereshLogs = (id) => {
        setLoading(true)
        getSubAccountAuditLogs(
            { id: id },
            (response) => {
                setLoading(false)
                setLogs(response?.data || [])
            }
        )
    }


    useEffect(() => {
        getMyGHLAccountSubAccounts({}, (response) => {
            let data = response.data
            if (data) {
                setSubAccount(data || [])
                setSelectedLoc(data[0])
            }
        })
    }, [])

    useEffect(() => {
        if (selectedLoc && selectedLoc.id) {
            RefereshLogs(selectedLoc?.id)
        }
    }, [selectedLoc])
    return (
        <>
            <main className="flex">
                <LeftSide />
                <div className="flex-1 ">
                    <HeaderDashboard title='LOGS' />
                    <div className=" p-[24px] bg-slate-100 min-h-[100vh] w-full ">
                        <div className="flex items-center justify-between gap-[240px] ">
                            <h2 className="text-gray-700 text-[24px] font-[600] whitespace-nowrap">Audit Logs</h2>
                            <div className="flex items-center gap-[7px] ">
                                <div className="w-[300px] border rounded-[10px] h-[42px] overflow-hidden flex items-center ">
                                    <div className=" h-full px-3 w-[46px] flex items-center justify-center bg-[#0037FE] ">
                                        <i class="fa-solid fa-magnifying-glass text-[#ffffff] text-[18px] "></i>
                                    </div>
                                    <input className="  h-full text-slate-400 flex-1 outline-none border-0 px-[14px] text-[15px] " placeholder="Search Contact ID" type="search" name="" id="" />
                                </div>
                                {/* <input type="date" name="" id="" /> */}
                                <div
                                    className="flex whitespace-nowrap items-center font-[600] cursor-pointer text-[#ffffff] bg-[#0037FE] rounded-[7px] px-[20px] py-[9px] max-h-min text-[14px] gap-[7px] "
                                    onClick={() => {
                                        RefereshLogs(selectedLoc?.id)
                                    }}
                                >
                                    <i class="fa-solid fa-arrows-rotate "></i>
                                    <p>Refresh Logs</p>
                                </div>
                                <div className="text-[#0037FE] relative whitespace-nowrap gap-[6px] group text-[15px] justify-between px-[18px] max-w-[200px] w-full font-[500] hover:text-[#ffffff] hover:bg-[#0037FE] transition-all rounded-[6px] py-[7px] cursor-pointer border-[#0037FE] border flex items-center ">
                                    {
                                        (selectedLoc && selectedLoc?.name) ?
                                            selectedLoc?.name
                                            :
                                            'Select Location'
                                    }
                                    <i class="fa-solid fa-angle-up group-hover:rotate-180 transition-all "></i>
                                    <div className="pt-[10px] left-0 right-0 z-50 w-full absolute top-[36px] hidden group-hover:block ">
                                        <div className="bg-[#ffffff] py-[8px] shadow-light rounded-[8px] max-h-[500px] overflow-auto">
                                            {/* <div className="px-[22px] mb-[6px] ">
                                                <input placeholder="Search Location" className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] " type="text" />
                                            </div> */}
                                            {
                                                subAccounts?.map(account => {
                                                    return (
                                                        <div
                                                            className="px-[8px] text-[14px] py-[5px] text-slate-500 hover:text-[#0037FE]/80 hover:bg-[#0037FE]/50 transition-all cursor-pointer "
                                                            onClick={() => {
                                                                setSelectedLoc(account)
                                                            }}
                                                        >
                                                            {account.name}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-[16px] rounded-[8px] border overflow-x-auto ">
                            <div className=" bg-[#afa6e417] gap-[30px] flex items-center px-[26px] border-b py-[12px] ">
                                <p className="text-[14px] font-[500] max-w-[400px] w-full text-slate-600/80 ">CONTACT ID</p>
                                <p className="text-[14px] font-[500] max-w-[400px] w-full text-slate-600/80 ">QUESTION</p>
                                <p className="text-[14px] font-[500] max-w-[400px] w-full text-slate-600/80 ">ANSWER</p>
                                <p className="text-[14px] font-[500] max-w-[400px] w-full text-slate-600/80 ">STATUS</p>
                                <p className="text-[14px] font-[500] max-w-[400px] w-full text-slate-600/80 ">TIMESTAMP</p>
                                <p className="text-[14px] font-[500] max-w-[400px] w-full text-slate-600/80 ">ACTION</p>
                            </div>
                            {
                                loading ?
                                    <div className="flex items-center justify-center my-10">
                                        Loading...
                                    </div>
                                    :
                                    logs?.length > 0 ?
                                        logs?.map(log => {
                                            return (
                                                <>
                                                    <div className="cursor-pointer flex group items-start gap-[30px] py-[12px] px-[26px] bg-[#ffffff] hover:bg-[#afa6e417] transition-all border-b justify-between ">
                                                        <p className="group-hover:text-[#0037FE] max-w-[400px] w-full text-slate-500 text-[14px] line-clamp-1" >{log?.contact}</p>
                                                        <p
                                                            className={`group-hover:text-[#0037FE] max-w-[400px] w-full text-slate-500 text-[14px] ${expanded_log?.includes(log.id) ? '' : 'line-clamp-1'}`}
                                                            onClick={() => { expanded_log?.includes(log.id) ? setExpandedLog([]) : setExpandedLog([log.id]) }}
                                                        >{log?.question}</p>
                                                        <p
                                                            className={`group-hover:text-[#0037FE] max-w-[400px] w-full text-slate-500 text-[14px] ${expanded_log?.includes(log.id) ? '' : 'line-clamp-1'}`}
                                                            onClick={() => { expanded_log?.includes(log.id) ? setExpandedLog([]) : setExpandedLog([log.id]) }}
                                                        >{log?.answer}</p>
                                                        <p className="group-hover:text-[#0037FE] max-w-[400px] w-full text-slate-500 text-[14px] line-clamp-1" >{log?.status}</p>
                                                        <p
                                                            className={`}group-hover:text-[#0037FE] max-w-[400px] w-full text-slate-500 text-[14px] ${expanded_log?.includes(log.id) ? '' : 'line-clamp-1'}`}
                                                            onClick={() => { expanded_log?.includes(log.id) ? setExpandedLog([]) : setExpandedLog([log.id]) }}
                                                        >{log?.created_at}</p>
                                                        <div className="max-w-[400px] w-full">
                                                            <div
                                                                className="border rounded-[8px] max-w-max px-[12px] cursor-pointer py-[9px] text-[14px] bg-[#ffffff] transition-all hover:bg-[#0037FE] hover:border-[#0037FE] hover:text-[#ffffff] text-slate-500 font-[600] shadow-light "
                                                                onClick={() => {
                                                                    setShowModel({
                                                                        bot: log.bot,
                                                                        bot_type: log.bot_type,
                                                                    })
                                                                }}
                                                            >
                                                                Bot Details
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* {
                                                        expanded_log?.includes(log.id) ?
                                                            <div className="px-5 py-3 w-full text-slate-500 text-[14px]">
                                                                <p><span className="font-semibold text-black">Question : </span>{log?.question}</p>
                                                                <p><span className="font-semibold text-black">Answer : </span>{log?.answer}</p>
                                                            </div>
                                                            :
                                                            <></>
                                                    } */}
                                                </>
                                            )
                                        })
                                        :
                                        <div className="flex text-slate-400 hover:text-[#0037FE] bg-[#ffffff] items-center justify-center transition-all px-[26px] py-[12px] hover:bg-[#afa6e417] ">
                                            Select a location from the filter above to display logs for the location.
                                        </div>
                            }
                        </div>
                    </div>
                </div>
            </main>

            {
                showModel ?
                    <BotDetailsInAuditLogs
                        showModel={showModel}
                        onClose={() => {
                            setShowModel(undefined)
                        }}
                    />
                    :
                    <>

                    </>
            }
        </>
    )
}

export default AuthLogs