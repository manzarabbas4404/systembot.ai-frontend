'use client'
import { UpdateMyGhlAccount, getMyGHLAccount } from "@/Redux/Actions/GHLActions"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"



const HilevelPopup = ({ data, setData, ...props }) => {
    const handleSubmit = () => {
        let tid = toast.loading('Updating, Please wait...')
        UpdateMyGhlAccount(data, (response) => {
            toast.success('Updated successfully', { id: tid })
            props.onClose && props.onClose()
        })
    }

    return (
        <>
            <main className=" fixed bg-[#00000063] inset-0 h-[100%] ">
                <div className=" rounded-[10px] overflow-hidden shadow-sm mt-[24px] max-w-[500px] w-full mx-auto ">
                    <div className="w-full px-[16px] py-[13px] flex items-center bg-[#0037FE] justify-between ">
                        <h2 className="text-[#ffffff] text-[20px] font-[600]  ">
                            Update Highlevel
                        </h2>
                        <i
                            class="fa-solid fa-xmark text-slate-400 hover:text-[#ffffff] transition-all text-[24px] cursor-pointer "
                            onClick={() => {
                                props.onClose && props.onClose()
                            }}
                        ></i>
                    </div>
                    <div className="bg-[#ffffff] px-[28px] py-[22px] pb-[40px] ">
                        <div className=" w-full">
                            <lable className="text-[12px] text-[#304d83] font-[700]">
                                Account Type
                            </lable>
                            <select
                                className="w-full text-[15px] border rounded-[6px] outline-none px-[8px] py-[8px] text-slate-400 mt-[6px] "
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        account_type: e.target.value
                                    })
                                }}
                            >
                                <option selected={data?.account_type == 'Agency' ? true : false} value="Agency">Agency</option>
                                <option selected={data?.account_type == 'Location' ? true : false} value="Location">Location</option>
                            </select>
                        </div>
                        {
                            data?.account_type == 'Agency' &&
                            <>
                                <div className="w-full mt-[16px] ">
                                    <label className="text-[12px] text-[#abafb6] font-[700]"  >Agency Name</label>
                                    <input
                                        placeholder="XYZ"
                                        className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] "
                                        type="text"
                                        value={data?.agency_name}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                agency_name: e.target.value
                                            })
                                        }}
                                    />
                                </div>
                                <div className="w-full mt-[16px] ">
                                    <label className="text-[12px] text-[#304d83] font-[700]"  >Agency Domain</label>
                                    <input
                                        placeholder="www.example.com"
                                        className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] " type="email"
                                        value={data?.agency_domain}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                agency_domain: e.target.value
                                            })
                                        }}
                                    />
                                </div>
                                <div className="w-full mt-[16px] ">
                                    <label className="text-[12px] text-[#304d83] font-[700]"  >HighLevel Agency API Key</label>
                                    <input
                                        placeholder="XXXXXXXXXXXXXXXX" className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] " type="text"
                                        value={data?.api_key}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                api_key: e.target.value
                                            })
                                        }}
                                    />
                                </div>
                            </>
                        }

                        <div className="flex items-center gap-[8px] mt-[14px] ">
                            <button
                                className="rounded-[8px] text-[15px] font-[600] px-[30px] py-[7px] border border-[#0037FE] hover:bg-[#0037FE] transition-all text-[#0037FE] hover:text-[#ffffff] "
                                onClick={() => {
                                    props.onClose && props.onClose()
                                }}
                            >
                                Close
                            </button>
                            <button
                                className="rounded-[8px] text-[15px] font-[600] px-[30px] py-[7px] border border-[#0037FE] bg-[#0037FE] hover:bg-green-700/90 hover:border-green-700/90 transition-all text-[#ffffff] "
                                onClick={handleSubmit}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default HilevelPopup