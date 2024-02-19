
import Link from "next/link"
import Logo from "../Logo"


const LeftSide = () => {
    return (
        <>
            <div className="h-[100vh] sticky top-0 overflow-auto w-[240px] py-[4px] px-[12px] bg-[#ffffff] ">
                <Link href={`/dashboard`} className="flex items-center justify-center gap-[8px] mt-[6px]">
                    <Logo/>
                </Link>
                <div className="flex flex-col gap-[4px] mt-[18px] ">
                    <Link href={`/dashboard`} className="flex items-center px-[18px] py-[9px] rounded-[7px] group gap-[7px] w-full cursor-pointer hover:bg-blue-100 transition-all ">
                        <div className="h-[24px] w-[24px] flex items-center justify-center ">
                            <i class="fa-solid fa-share-nodes group-hover:text-[#0037FE] text-slate-800 font-[500] "></i>
                        </div>
                        <p className=" text-slate-800 font-[600] group-hover:text-[#0037FE]  ">Integrations</p>
                    </Link>
                    <Link href={`/dashboard/bots`} className="flex items-center px-[18px] py-[9px] rounded-[7px] group gap-[7px] w-full cursor-pointer hover:bg-blue-100 transition-all ">
                        <div className="h-[24px] w-[24px] flex items-center justify-center ">
                            <i class="fa-solid fa-robot group-hover:text-[#0037FE] text-slate-800"></i>
                        </div>
                        <p className=" text-slate-800 font-[600] group-hover:text-[#0037FE]  ">Bots</p>
                    </Link>
                    <Link href={`/dashboard/faqs`} className="flex items-center px-[18px] py-[9px] rounded-[7px] group gap-[7px] w-full cursor-pointer hover:bg-blue-100 transition-all ">
                        <div className="h-[24px] w-[24px] flex items-center justify-center ">
                        <i class="fa-solid fa-question group-hover:text-[#0037FE] text-slate-800"></i>
                        </div>
                        <p className=" text-slate-800 font-[600] group-hover:text-[#0037FE]  ">FAQs</p>
                    </Link>
                    <Link href={`/dashboard/audit-logs`} className="flex items-center px-[18px] py-[9px] rounded-[7px] group gap-[7px] w-full cursor-pointer hover:bg-blue-100 transition-all ">
                        <div className="h-[24px] w-[24px] flex items-center justify-center ">
                        <i class="fa-solid fa-retweet group-hover:text-[#0037FE] text-slate-800"></i>
                        </div>
                        <p className=" text-slate-800 font-[600] group-hover:text[#0037FE]  ">Audit Logs</p>
                    </Link>
                    <Link href={`/dashboard/manage-users`} className="flex items-center px-[18px] py-[9px] rounded-[7px] group gap-[7px] w-full cursor-pointer hover:bg-blue-100 transition-all ">
                        <div className="h-[24px] w-[24px] flex items-center justify-center ">
                        <i class="fa-solid fa-users group-hover:text-[#0037FE] text-slate-800"></i>
                        </div>
                        <p className=" text-slate-800 font-[600] group-hover:text-[#0037FE]  ">Manage Users</p>
                    </Link>
                    <Link href={`/dashboard/my-account`} className="flex items-center px-[18px] py-[9px] rounded-[7px] group gap-[7px] w-full cursor-pointer hover:bg-blue-100 transition-all ">
                        <div className="h-[24px] w-[24px] flex items-center justify-center ">
                        <i class="fa-solid fa-user group-hover:text-[#0037FE] text-slate-800"></i>
                        </div>
                        <p className=" text-slate-800 font-[600] group-hover:text-[#0037FE]  ">Account</p>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default LeftSide