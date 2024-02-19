'use client'
import React, { useEffect, useState } from "react"

import LocationCard from "../LocationCardInAddUserProps/Card"
import api_variables from "@/Redux/api_variables";
import Cookies from "js-cookie";
import toast from "react-hot-toast";



const AddNewUsersPopup = ({ edit, ...props }) => {
    const [Cancle, setShowModel] = useState(false);
    const [userData, setUserData] = useState({})

    const handleSubmit = () => {
        if (!userData.email || (!edit && !userData.password)) {
            toast.error('All fields are required')
            return
        }
        let status_code = undefined
        let tid = toast.loading('Please wait...')
        fetch(`${api_variables.BASE_URL}/auth/create_user/`,
            {
                headers: { 'Content-Type': 'application/json', Authorization: `Token ${Cookies.get('auth_token')}` },
                body: JSON.stringify(userData),
                method: 'POST'
            })
            .then(response => {
                status_code = response.status
                return response.json()
            })
            .then(response => {
                if (status_code == 201) {
                    toast.success(response.message || 'User updated successfully', { id: tid })
                    props.onClose && props.onClose(response.user)
                }
                else {
                    toast.error(response.message || 'Something went wrong', { id: tid })
                }
            })
            .catch(err => {
                toast.error('Something went wrong', { id: tid })
            })
    }

    useEffect(() => {
        if (edit) {
            setUserData(edit)
        }
    }, [])

    return (
        <>
            <main className=" fixed bg-[#00000063] inset-0 h-[100vh] ">
                <div className=" rounded-[10px] overflow-hidden shadow-sm mt-[24px] max-w-[500px] w-full mx-auto ">
                    <div className="w-full px-[16px] py-[13px] flex items-center bg-[#0037FE] justify-between ">
                        <h2 className="text-[#ffffff] text-[20px] font-[600]  ">
                            Add User
                        </h2>
                        <i
                            onClick={() => {
                                props.onClose && props.onClose()
                            }}
                            class="fa-solid fa-xmark text-slate-400 hover:text-[#ffffff] transition-all text-[24px] cursor-pointer "></i>
                    </div>
                    <div className="bg-[#ffffff] px-[28px] py-[22px] pb-[40px] ">
                        <div className="w-full ">
                            <label className="text-[12px] text-[#304d83] font-[700]"  >Email</label>
                            <input
                                placeholder="Email"
                                className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] "
                                type="email"
                                value={userData.email}
                                onChange={(e) => {
                                    setUserData({
                                        ...userData,
                                        email: e.target.value
                                    })
                                }}
                            />
                        </div>
                        <div className="w-full mt-[16px] ">
                            <label className="text-[12px] text-[#304d83] font-[700]"  >Password</label>
                            <input
                                placeholder="Password"
                                className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] "
                                type="password"
                                value={userData.password}
                                onChange={(e) => {
                                    setUserData({
                                        ...userData,
                                        password: e.target.value
                                    })
                                }}
                            />
                        </div>
                        <div className="flex items-center gap-[8px] mt-[40px] ">
                            <button
                                onClick={() => {
                                    props.onClose && props.onClose()
                                }}
                                className="rounded-[8px] text-[15px] font-[600] px-[30px] py-[7px] border border-[#0037FE] hover:bg-[#0037FE] transition-all text-[#0037FE] hover:text-[#ffffff] ">
                                Close
                            </button>
                            <button
                                className="rounded-[8px] text-[15px] font-[600] px-[30px] py-[7px] border border-[#0037FE] bg-[#0037FE] hover:bg-green-700/90 hover:border-green-700/90 transition-all text-[#ffffff] "
                                onClick={handleSubmit}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AddNewUsersPopup