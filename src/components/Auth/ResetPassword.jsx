
'use client'
import Link from "next/link"
import Logo from "../Logo"
import { useState } from "react"
import toast from "react-hot-toast"
import api_variables from "@/Redux/api_variables"
import OTPInput from "react-otp-input"
import { useRouter } from "next/navigation"




const ResetPassword = () => {
    const router = useRouter()
    const [data, setData] = useState({})
    const [otp, setOtp] = useState('')

    const handleSendEmail = () => {
        if (!data.email) {
            toast.error('Email is required')
            return
        }
        let tid = toast.loading('working')
        let status_code;
        fetch(`${api_variables.BASE_URL}/auth/send_email_forgot_password/`,
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
                if (status_code == 201) {
                    toast.success(response.message || 'Email has been sent. Please check.', { id: tid })
                    setData({
                        ...data,
                        email_sent: true
                    })
                }
                else {
                    toast.error(response.message || 'Something went wrong', { id: tid })
                }

            })
            .catch(err => {
                toast.error('Something went wrong', { id: tid })
            })
    }
    const handleResetPassword = () => {
        if (!data.password) {
            toast.error('Password is required')
            return
        }
        let status_code = undefined
        let tid = toast.loading('Please wait...')
        fetch(`${api_variables.BASE_URL}/auth/update_user_password/`,
            {
                headers: { 'Content-Type': 'application/json', Authorization: `Token ${data?.token}` },
                body: JSON.stringify({ password: data?.password }),
                method: 'POST'
            })
            .then(response => {
                status_code = response.status
                return response.json()
            })
            .then(response => {
                if (status_code == 200) {
                    toast.success(response.message || 'Updated', { id: tid })
                    router.push('/auth/login/')
                }
                else {
                    toast.error(response.message || 'Something went wrong', { id: tid })
                }

            })
            .catch(err => {
                toast.error('Something went wrong', { id: tid })
            })
    }
    const handleVerifyOtp = () => {
        if (!otp) {
            toast.error('Invalid Otp')
            return
        }
        let tid = toast.loading('working')
        let status_code;
        fetch(`${api_variables.BASE_URL}/auth/verify_otp/`,
            {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, code: otp }),
                method: 'POST'
            })
            .then(response => {
                status_code = response.status
                return response.json()
            })
            .then(response => {
                if (status_code == 201) {
                    toast.success(response.message || 'Otp Verified.', { id: tid })
                    setData({
                        ...data,
                        token : response.token,
                        email_sent: true,
                        otp_verified: true,
                    })
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
                <div className="w-full bg-cover bg-repeat bg-center h-[440px] bg-[#000000]  " style={{ backgroundImage: 'url("https://dmej8g5cpdyqd.cloudfront.net/blog/wp-content/uploads/2013/12/security.jpg")' }} >

                </div>
                <div className="w-full bg-[#ffffff] ">

                </div>
                <main className="max-w-[1220px] mx-auto absolute inset-[50%] top-[30%] ">
                    <div className="flex flex-col gap-[10px] items-center pb-[40px]  ">
                        <div>
                            <h2 className="text-[#ffffff] text-[54px] font-[700] text-center whitespace-nowrap ">Reset Password</h2>
                            <p className="text-[#ffffff] text-[18px] font-[500] text-center whitespace-nowrap ">You will receive an e-mail in maximum 60 seconds</p>
                        </div>
                        <div className="w-[400px] mt-[54px] bg-[#ffffff] rounded-[8px] shadow-light p-[16px] ">
                            <div className="flex items-center gap-[14px] ">
                                <div className="rounded-[8px] flex items-center justify-center h-[50px] w-[50px] bg-green-400/80 ">
                                    <div className="bg-[#ffffff] rounded-[50px] h-[20px] w-[20px] flex items-center justify-center p-[5px] ">
                                        <i class="fa-solid fa-user text-[12px] text-green-400/80 "></i>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-[#344767] text-[20px] font-[600] ">
                                        Can't log in?
                                    </h2>
                                    <p className="text-[15px] text-slate-500 ">
                                        Restore access to your account
                                    </p>
                                </div>
                            </div>
                            {
                                data?.otp_verified &&
                                <>
                                    <div className="mt-[40px]">
                                        <label className="text-[12px] text-[#223b66] font-[500] " htmlFor="password">Set Password</label>
                                        <input
                                            placeholder="Set Password"
                                            className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] "
                                            type="password"
                                            id="password"
                                            value={data.password}
                                            onChange={(e) => {
                                                setData({ ...data, password: e.target.value })
                                            }}
                                        />
                                    </div>
                                    <button
                                        className="w-full mt-[26px] bg-[#0037FE] text-[#ffffff] rounded-[8px] py-[8px] cursor-pointer transition-all hover:bg-green-400 "
                                        onClick={handleResetPassword}
                                    >
                                        Update Password
                                    </button>
                                </>
                            }
                            {
                                data?.otp_verified ?
                                <></>
                                :
                                data?.email_sent ?
                                    <div className="mt-[40px]">
                                        <OTPInput
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={4}
                                            renderSeparator={<span className="mx-2"></span>}
                                            width='40px'
                                            containerStyle={'!w-full !flex-1 otp_input__container'}
                                            inputStyle='w-[400px]'
                                            renderInput={(props) => <input {...props} pattern="\d" maxlength="1" className="outline-none text-center border border-[#00000066] h-full w-full rounded-[8px] p-[12px] focus:border-[#0057FF] text-[24px] text-[#00000099] flex-1" />}
                                        />
                                        <button
                                            className="w-full mt-[26px] bg-[#0037FE] text-[#ffffff] rounded-[8px] py-[8px] cursor-pointer transition-all hover:bg-green-400 "
                                            onClick={handleVerifyOtp}
                                        >
                                            Verify
                                        </button>
                                    </div>
                                    :
                                    <>
                                        <div className="mt-[40px]  ">
                                            <label className="text-[12px] text-[#223b66] font-[500] " htmlFor="email">We will send a recovery link to</label>
                                            <input
                                                placeholder="Your e-mail"
                                                className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] "
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={data.email}
                                                onChange={(e) => {
                                                    setData({ ...data, email: e.target.value })
                                                }}
                                            />
                                        </div>
                                        <button
                                            className="w-full mt-[26px] bg-[#0037FE] text-[#ffffff] rounded-[8px] py-[8px] cursor-pointer transition-all hover:bg-green-400 "
                                            onClick={handleSendEmail}
                                        >
                                            Send Code
                                        </button>
                                    </>
                            }

                            <div className=" flex flex-col items-center gap-[8px] mt-[20px] mb-[22px] ">
                                <div className="flex ite gap-[4px] " >
                                    <p className="text-slate-500 text-[14px] ">Back to</p>
                                    <Link href={`/auth/login`} className="text-green-400 font-[600] cursor-pointer text-[14px]  ">Login</Link>
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

export default ResetPassword