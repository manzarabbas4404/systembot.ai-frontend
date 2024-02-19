'use client'
import Link from "next/link"
import Logo from "../../Logo"
import LeftSide from "../LeftSide"
import HeaderDashboard from "../HeaderDashboard"
import BotPageSingleCard from "../../BotPageSingleCard"
import { useEffect, useState } from "react"
import { getMyBots } from "@/Redux/Actions/BotActions"


const BotsPage = () => {
    const [mainBots, setMainBots] = useState([])
    const [bots, setBots] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        getMyBots({}, (response) => {
            setLoading(false)
            setBots(response.data)
            setMainBots(response.data)
        }, () => { setLoading(false) })
    }, [])

    useEffect(() => {
        if (searchText) {
            setBots(mainBots?.filter((bot) => {
                if (bot?.agency_name?.toLowerCase()?.includes(searchText?.toLowerCase())) {
                    return bot
                }
            }))
        }
        else {
            setBots(mainBots)
        }
    }, [searchText])
    return (
        <>
            <main className="flex">
                <LeftSide />
                <div className="flex-1 ">
                    <HeaderDashboard title='BOTS' />
                    <div className=" p-[24px] bg-slate-100 min-h-[100vh] w-full ">
                        <div className="max-w-[1500px] mx-auto">
                            <div className="max-w-[540px] border rounded-[10px] h-[42px] overflow-hidden flex items-center ">
                                <div className=" h-full w-[46px] flex items-center justify-center bg-[#0037FE] ">
                                    <i class="fa-solid fa-magnifying-glass text-[#ffffff] text-[18px] "></i>
                                </div>
                                <input
                                    className=" h-full text-slate-400 flex-1 outline-none border-0 px-[14px] text-[15px] "
                                    placeholder="Type And Press Enter"
                                    type="search"
                                    onChange={(e) => {
                                        if (!e.target.value) {
                                            setSearchText('')
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key == 'Enter') {
                                            setSearchText(e.target.value)
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex items-start gap-[22px] flex-wrap mt-[16px] ">
                                <div className=" border bg-[#ffffff] rounded-[10px] w-[540px] ">
                                    <div className="px-[28px] py-[24px]  ">
                                        <h2 className="text-[#0037FE] font-[600] text-[17px] ">Get Started</h2>
                                        <p className="text-slate-500 mt-[6px] ">Let's Create a bot</p>
                                    </div>
                                    <div className=" bg-slate-200 h-[1px] w-full mt-[40px] ">

                                    </div>
                                    <Link href={`/dashboard/bots/manage-bots`} className="px-[28px] cursor-pointer group py-[16px] transition-all flex items-center justify-end gap-[7px] ">
                                        <p className="text-slate-500 font-[600] group-hover:text-[#0037FE] ">Continue</p>
                                        <i class="fa-solid fa-arrow-right text-[15px] group-hover:text-[#0037FE] text-slate-500"></i>
                                    </Link>
                                </div>
                                {
                                    loading ?
                                        <div className="flex items-center justify-center">
                                            Loading...
                                        </div>
                                        :
                                        bots?.map((bot, boti) => {
                                            return (
                                                <BotPageSingleCard
                                                    bot={bot}
                                                    onCloned={(data)=>{
                                                        setBots([
                                                            ...bots,
                                                            data
                                                        ])
                                                    }}
                                                    onDelete={(id) => {
                                                        setBots([
                                                            ...bots?.filter(itm => itm.id != id)
                                                        ])
                                                    }}
                                                />
                                            )
                                        })
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default BotsPage