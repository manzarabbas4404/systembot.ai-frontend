


'use client'
import LeftSide from "../LeftSide"
import HeaderDashboard from "../HeaderDashboard"
import Cookies from "js-cookie"
import { useState } from "react"
import api_variables from "@/Redux/api_variables"
import toast from "react-hot-toast"



const AccountPage = () => {
    const [editPassword, setEditPassword] = useState(false)
    const [password, setPassword] = useState('')

    const UpdateUserPassword = () => {
        let status_code = undefined
        let tid = toast.loading('Please wait...')
        fetch(`${api_variables.BASE_URL}/auth/update_user_password/`,
            {
                headers: { 'Content-Type': 'application/json', Authorization: `Token ${Cookies?.get('auth_token')}` },
                body: JSON.stringify({ password: password }),
                method: 'POST'
            })
            .then(response => {
                status_code = response.status
                return response.json()
            })
            .then(response => {
                if (status_code == 200) {
                    toast.success(response.message || 'Updated', { id: tid })
                    setEditPassword(false)
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
            <main className="flex">
                <LeftSide />
                <div className="flex-1 ">
                    <HeaderDashboard title='Account' />
                    <div className=" p-[24px] bg-slate-100 overflow-auto pt-[40px] h-[100vh] w-full ">
                        <div className="max-w-[1500px] mx-auto ">
                            <h2 className=" text-gray-700 text-[26px] font-[600] " >Account Details</h2>
                            <div className="flex items-center gap-[40px] mt-[30px] ">
                                <h2 className=" text-gray-700 text-[21px] font-[600] " >Email:</h2>
                                <p className="text-black/50 text-[17px] font-[500]">{Cookies.get('email')}</p>
                            </div>
                            <div className="flex items-center gap-[40px] mt-[30px] ">
                                <h2 className=" text-gray-700 text-[21px] font-[600] " >Password:</h2>
                                {
                                    editPassword ?
                                        <input
                                            id="password"
                                            placeholder="*******" class="fs-5 border outline-none mx-3 px-3 py-1 rounded-lg" type="password"
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}
                                        ></input>
                                        :
                                        <p className="text-black/50 text-[17px] font-[500]">*********</p>
                                }
                            </div>
                            <div className="mt-[30px] flex items-center gap-[15px] ">
                                {/* <button className="rounded-[8px] text-[15px] font-[600] px-[30px] py-[7px] border border-[#0037FE] hover:bg-[#0037FE] transition-all text-[#0037FE] hover:text-[#ffffff] ">
                                    Billing
                                </button> */}
                                {
                                    editPassword ?
                                        <button
                                            className="rounded-[8px] text-[15px] font-[600] px-[30px] py-[7px] border border-[#0037FE] bg-[#0037FE] hover:bg-green-700/90 hover:border-green-700/90 transition-all text-[#ffffff] "
                                            onClick={() => {
                                                UpdateUserPassword()
                                            }}
                                        >
                                            Update
                                        </button>
                                        :
                                        <button
                                            className="rounded-[8px] text-[15px] font-[600] px-[30px] py-[7px] border border-[#0037FE] bg-[#0037FE] hover:bg-green-700/90 hover:border-green-700/90 transition-all text-[#ffffff] "
                                            onClick={() => {
                                                setEditPassword(true)
                                            }}
                                        >
                                            Edit Profile
                                        </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AccountPage