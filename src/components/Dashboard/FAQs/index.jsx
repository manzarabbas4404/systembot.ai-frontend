'use client'
import LeftSide from "../LeftSide"
import HeaderDashboard from "../HeaderDashboard"
import FAQRow from "./FaqRow"
import { useEffect, useState } from "react"
import { RefreshGhlAccountSubAccounts, UpdateGHLSubAccount, UpdateGHLSubAccountMultipleEnable, getMyGHLAccountSubAccounts } from "@/Redux/Actions/GHLActions"
import { getMyBots } from "@/Redux/Actions/BotActions"
import toast from "react-hot-toast"


const FAQsPage = () => {
    const [subAccounts, setSubAccounts] = useState([])
    const [loadingAccounts, setLoadingAccounts] = useState(true)
    const [bots, setBots] = useState([])
    const [selected, setSelected] = useState({})
    const [disableBtn, setDisableBtn] = useState(false)

    const [openWidget, setOpenWidget] = useState(undefined)


    console.log(selected)

    const handleUpdateAccountBot = (ac_id, bt_id) => {
        let tid = toast.loading('Please wait...')
        UpdateGHLSubAccount(
            { account_id: ac_id, bot: bt_id },
            (response) => {
                setSubAccounts(prev => {
                    return prev.map(itm => itm.id == ac_id ? response : itm)
                })
                toast.success('Updated successfully', { id: tid })
            }
        )
    }
    const handleUpdateAccountEnabled = (ac_id, enabled) => {
        let tid = toast.loading('Please wait...')
        UpdateGHLSubAccount(
            { account_id: ac_id, enabled: !enabled },
            (response) => {
                setSubAccounts(prev => {
                    return prev.map(itm => itm.id == ac_id ? response : itm)
                })
                toast.success('Updated successfully', { id: tid })
            }
        )
    }

    const handleMultipleAccountsEnabled = (ids, enabled) => {
        console.log(ids)
        ids = ids.map(id => +id)
        let tid = toast.loading('Please wait...')
        UpdateGHLSubAccountMultipleEnable(
            { ids: ids, enable: enabled },
            (response) => {
                setSubAccounts(prev => {
                    return prev.map(itm => ids?.includes(itm.id) ? { ...itm, enabled: enabled } : itm)
                })
                toast.success('Updated successfully', { id: tid })
            }
        )
    }


    const handleRefreshSubAccount = () => {
        let tid = toast.loading('Please wait...')
        RefreshGhlAccountSubAccounts({}, (response) => {
            toast.success('Refreshed Successfully', { id: tid })
            setSubAccounts(response?.data || subAccounts)
        })
    }
    useEffect(() => {
        getMyBots({}, (response) => {
            setBots(response.data)
        })
    }, [])
    useEffect(() => {
        getMyGHLAccountSubAccounts({}, (response) => {
            setSubAccounts(response?.data || [])
            setLoadingAccounts(false)
        })
    }, [])

    useEffect(() => {
        let isSelected = false
        for (let id in selected) {
            if (selected[id]) {
                isSelected = true
            }
        }
        setDisableBtn(isSelected)
    }, [selected])

    useEffect(() =>{
        if (document != undefined){
            let body = document.querySelector('body')
            if (body){
                if (openWidget){
                    body.style.overflow = 'hidden'
                }
                else{
                    body.style.overflow = 'auto'
                }
            }
        }
    }, [openWidget])
    return (
        <>
            <main className="flex">
                <LeftSide />
                <div className="flex-1 ">
                    <HeaderDashboard title='FAQs' />
                    <div className=" p-[24px] bg-slate-100 min-h-[100vh] w-full ">
                        <div className="max-w-[1500px] mx-auto">
                            <div className="mt-[30px] ">
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-[60px] ">
                                        <div className="">
                                            <h2 className="text-gray-700 whitespace-nowrap text-[24px] font-[600] ">Manage FAQs by Sub-Accounts</h2>
                                            <p className="text-slate-500 whitespace-nowrap mt-[4px] ">(Agency Reference: 45371695328319)</p>
                                        </div>
                                        <div className="max-w-[360px] w-full border rounded-[10px] h-[42px] overflow-hidden flex items-center ">
                                            <div className=" h-full w-[46px] flex items-center justify-center bg-[#0037FE] ">
                                                <i class="fa-solid fa-magnifying-glass text-[#ffffff] text-[18px] "></i>
                                            </div>
                                            <input className=" h-full text-slate-400 flex-1 outline-none border-0 px-[14px] text-[15px] " placeholder="Type And Press Enter" type="search" name="" id="" />
                                        </div>
                                    </div>
                                    <div
                                        className="flex items-center font-[600] cursor-pointer text-[#ffffff] bg-[#0037FE] rounded-[7px] px-[20px] py-[11px] max-h-min text-[14px] gap-[7px] "
                                        onClick={handleRefreshSubAccount}
                                    >
                                        <i class="fa-solid fa-arrows-rotate "></i>
                                        <p>Refresh Sub-Accounts</p>
                                    </div>
                                </div>
                                <div className="mt-[12px] flex items-center justify-end gap-[32px]">
                                    <button
                                        className="disabled:bg-gray-700 flex items-center font-[600] cursor-pointer text-[#ffffff] bg-[#0037FE] rounded-[7px] px-[20px] py-[11px] max-h-min text-[14px] gap-[7px] "
                                        onClick={() => {
                                            handleMultipleAccountsEnabled(subAccounts.map(ac => ac.id), true)
                                        }}
                                    >
                                        <p>Enable All Location</p>
                                    </button>
                                    <button
                                        className="disabled:bg-gray-700 flex items-center font-[600] cursor-pointer text-[#ffffff] bg-[#0037FE] rounded-[7px] px-[20px] py-[11px] max-h-min text-[14px] gap-[7px] "
                                        onClick={() => {
                                            handleMultipleAccountsEnabled(subAccounts.map(ac => ac.id), false)
                                        }}
                                    >
                                        <p>Disable All Location</p>
                                    </button>
                                    <button
                                        disabled={!disableBtn} className="disabled:bg-gray-700 flex items-center font-[600] cursor-pointer text-[#ffffff] bg-[#0037FE] rounded-[7px] px-[20px] py-[11px] max-h-min text-[14px] gap-[7px] "
                                        onClick={() => {
                                            let ids = []
                                            for (let id in selected) {
                                                ids.push(id)
                                            }
                                            handleMultipleAccountsEnabled(ids, true)
                                        }}
                                    >
                                        <p>Enable Location</p>
                                    </button>
                                    <button
                                        disabled={!disableBtn} className="disabled:bg-gray-700 flex items-center font-[600] cursor-pointer text-[#ffffff] bg-[#0037FE] rounded-[7px] px-[20px] py-[11px] max-h-min text-[14px] gap-[7px] "
                                        onClick={() => {
                                            let ids = []
                                            for (let id in selected) {
                                                ids.push(id)
                                            }
                                            handleMultipleAccountsEnabled(ids, false)
                                        }}
                                    >
                                        <p>Disable Location</p>
                                    </button>
                                    <button className="disabled:bg-gray-700 flex items-center font-[600] cursor-pointer text-[#ffffff] bg-[#0037FE] rounded-[7px] px-[20px] py-[11px] max-h-min text-[14px] gap-[7px] ">
                                        <p>Import FAQs</p>
                                    </button>
                                </div>
                            </div>
                            {
                                loadingAccounts ?
                                    <div className="flex items-center justify-center my-10">
                                        Loading...
                                    </div>
                                    :
                                    <table className="mt-[20px] w-full rounded-[8px] border overflow-auto">
                                        <thead >
                                            {/* className=" bg-[#afa6e417] flex items-center px-[26px] py-[13px] justify-between " */}
                                            <tr>
                                                <th >
                                                    <input
                                                        type="checkbox"
                                                        className=" h-[18px] w-[18px] "
                                                        onChange={(e) => {
                                                            let d = {}
                                                            subAccounts.forEach(({ id }) => {
                                                                d[id] = e.target.checked
                                                            })
                                                            setSelected(d)
                                                        }}
                                                    />
                                                </th>
                                                <th>
                                                    <p className="text-[14px] font-[500] text-slate-600/80 whitespace-nowrap text-left">SUB-ACCOUNTS NAME</p>
                                                </th>
                                                <th >
                                                    <p className="text-[14px] font-[500] text-slate-600/80 whitespace-nowrap">NO OF FAQS</p>
                                                </th>
                                                <th>
                                                    <p className="text-[14px] font-[500] text-slate-600/80 whitespace-nowrap">ENABLED</p>
                                                </th>
                                                <th>
                                                    <p className="text-[14px] font-[500] text-slate-600/80 whitespace-nowrap">LAST UPDATED</p>
                                                </th>
                                                <th >
                                                    <div className="flex-[3] flex items-center justify-center ">
                                                        <p className="text-[14px] font-[500] text-slate-600/80 whitespace-nowrap">ACTION</p>
                                                    </div>
                                                </th>
                                                <th >
                                                    Bot
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                subAccounts?.map((account) => {
                                                    return (
                                                        <>
                                                            <FAQRow
                                                                setOpenWidget={setOpenWidget}
                                                                onSelect={(e) => {
                                                                    let s = { ...selected }
                                                                    s[`${account.id}`] = e.target.checked
                                                                    setSelected(s)
                                                                }}
                                                                checked={selected[`${account.id}`]}
                                                                account={account}
                                                                bots={bots}
                                                                handleUpdateAccountBot={handleUpdateAccountBot}
                                                                handleUpdateAccountEnabled={handleUpdateAccountEnabled}
                                                            />
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                            }
                            {/* <div className="rounded-[10px] bg-[#ffffff] px-[28px] border py-[18px ">
                                <p className="mb-[52px] text-slate-500 ">
                                    Please submit Highlevel integration details on the Integrations page, in order to manage FAQs for different Sub-Accounts. If you already submitted you Highlevel integration, then we may be pulling your locations. Please check back in 30 minutes.
                                </p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </main>
            {
                openWidget &&
                <div className="fixed inset-0 bg-black/50">
                    <div className="max-w-[700px] w-full fixed top-0 right-0 bottom-0 bg-white">
                        <iframe
                            width="100%"
                            frameborder="0"
                            webkitallowfullscreen
                            mozallowfullscreen
                            allowfullscreen
                            scrolling="yes"
                            data-app_url="${window.location}"
                            src={`https://systembot.ai/faq/45371695328319/${openWidget?.loc_id}/`}
                            className='border-none w-full h-full overflow-auto min-h-[385px] bg-white'
                        >
                        </iframe>
                        <a href="javascript:0;" onClick={() => { setOpenWidget(undefined) }} className="absolute top-5 right-5">
                            <i className="fa fa-times text-dark"></i>
                        </a>
                    </div>
                </div>
            }
        </>
    )
}

export default FAQsPage