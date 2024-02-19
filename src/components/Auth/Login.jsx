'use client'

import Link from "next/link"
import Logo from "../Logo"
import { useState } from "react"
import api_variables from "@/Redux/api_variables"
import toast from "react-hot-toast"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"



const Login = () => {
    const [data, setData] = useState({})
    const router = useRouter()
    const [attempts, setAttempts] = useState(0)

    const handleSubmit = () => {
        if (!data?.email || !data?.password) {
            toast.error('Both fields are required')
            return
        }
        let tid = toast.loading('working')
        let status_code;
        fetch(`${api_variables.BASE_URL}/auth/login/`,
            {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                method: 'POST'
            })
            .then(response => {
                status_code = response.status
                return response.json()
            })
            .then(response => {
                setAttempts(response.attempts)
                if (status_code == 200) {
                    Cookies.set('auth_token', response?.token, { expires: 7 })
                    Cookies.set('user_id', response?.user_id, { expires: 7 })
                    Cookies.set('email', data.email, { expires: 7 })
                    toast.success(response.message || 'Logged In', { id: tid })
                    router.push('/dashboard')
                }
                else {
                    toast.error(response.message || 'Something went wrong', { id: tid })
                }

            })
            .catch(err => {
                toast.error('Something went wrong', { id: tid })
            })
    }

    return (
        <>
            <div className=" relative w-full ">
                <div className="w-full bg-cover bg-repeat bg-center h-[600px] bg-[#000000]  " style={{ backgroundImage: 'url("https://d2jx2rerrg6sh3.cloudfront.net/images/news/ImageForNews_748142_16841175132986795.jpg")' }} >
                    <div className=" w-full h-full bg-black/50 ">

                    </div>
                </div>
                <div className="w-full bg-[#ffffff] ">

                </div>
                <main className="max-w-[1220px] mx-auto absolute inset-[50%] ">
                    <div className="flex flex-col gap-[10px] items-center pb-[40px]  ">
                        <div className="flex items-center justify-center gap-[14px] ">
                            <div className=" flex items-center ">
                                <i class="fa-solid fa-angle-left text-[#ffffff] text-[25px] "></i>
                                <i class="fa-solid fa-angle-right text-[#ffffff] text-[25px] "></i>
                            </div>
                            <h2 className="text-[#ffffff] text-[54px] font-[500] ">
                                Chatbot
                            </h2>
                        </div>
                        <div className="w-[400px] mt-[16px] bg-[#ffffff] rounded-[12px] shadow-light px-[16px] py-[28px] ">
                            <h2 className="text-[#344767] text-[30px] font-[700] text-center " >
                                Welcome back
                            </h2>
                            <div className="mt-[18px]  ">
                                <label className="text-[12px] text-[#223b66] font-[500] " htmlFor="email">Email</label>
                                <input
                                    className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] "
                                    type="email" name="email" id="email" value={data?.email}
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            email: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div className="mt-[10px] ">
                                <label className="text-[12px] text-[#223b66] font-[500] " htmlFor="Password">Password</label>
                                <input
                                    className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] "
                                    type="password" name="Password" id="Password" value={data?.Password}
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            password: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div className="flex items-center gap-[6px] mt-[11px] ">
                                <input type="checkbox" name="checkbox" id="checkbox" />
                                <label htmlFor="checkbox" className=" text-slate-500 text-[14px] " >Remember me</label>
                            </div>
                            {
                                attempts ?
                                    <p className="text-xs">Attmepts Left {3 - attempts}</p>
                                    :
                                    <></>
                            }
                            <button
                                className="w-full mt-[26px] bg-[#0037FE] text-[#ffffff] rounded-[8px] py-[8px] cursor-pointer transition-all hover:bg-green-400 "
                                onClick={handleSubmit}
                            >
                                Login
                            </button>
                            <div className=" flex flex-col items-center gap-[8px] mt-[26px] ">
                                <div className="flex ite gap-[4px] " >
                                    <p className="text-slate-500 text-[14px] ">Don't have an account?</p>
                                    <Link href={`/auth/signup`} className="text-green-400 font-[600] cursor-pointer text-[14px]  ">Sign up</Link>
                                </div>
                                <div className="flex ite gap-[4px] " >
                                    <p className="text-slate-500 text-[14px] ">Forgot your password?</p>
                                    <Link href={`/auth/reset-password`} className="text-green-400 font-[600] cursor-pointer text-[14px]  ">Reset</Link>
                                </div>
                            </div>
                        </div>
                        <div className="mt-[32px] flex flex-col items-center gap-[15px] ">
                            <Link href={'https://aspiredigitalsolutions.com/terms-conditions/'} className="text-slate-500 text-[15px] whitespace-nowrap cursor-pointer ">Terms & Conditions</Link>
                            <p className="text-slate-500 whitespace-nowrap ">Copyright © 2023 Chatbot</p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Login