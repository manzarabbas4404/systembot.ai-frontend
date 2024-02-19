'use client'
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"



const HeaderDashboard = (props) => {
    const router = useRouter()
    return (
        <>
            <div className="w-full sticky top-0 bg-[#ffffff] shadow-sm ">
                <header className="h-[55px] max-w-[1500px] mx-auto w-full flex items-center justify-between ">
                    <h3 className=" uppercase text-[15px] text-[#516991] font-[700] ">{props.title}</h3>
                    <div
                        className="flex items-center gap-[6px] cursor-pointer "
                        onClick={() => {
                            Cookies.remove('auth_token')
                            Cookies.remove('user_id')
                            router.push('/auth/login/')
                        }}
                    >
                        <i class="fa-solid text-[14px] text-slate-900 fa-arrow-up-right-from-square"></i>
                        <p className=" text-slate-900 font-[600] ">Logout</p>
                    </div>
                </header>
            </div>
        </>
    )
}

export default HeaderDashboard