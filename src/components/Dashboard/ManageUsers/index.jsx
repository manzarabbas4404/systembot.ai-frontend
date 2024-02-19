'use client'
import React, { useEffect, useState } from "react"


import LeftSide from "../LeftSide"
import HeaderDashboard from "../HeaderDashboard"
import AddNewUsersPopup from "../../Popups/AddNewUsersPopup"
import api_variables from "@/Redux/api_variables"
import Cookies from "js-cookie"
import toast from "react-hot-toast"



const ManageUsers = () => {
    const [showModel, setShowModel] = useState(false);
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [edit, setEdit] = useState(undefined)

    const handleDelete = (id) => {
        let tid = toast.loading('Please wait...')
        let status_code = undefined
        fetch(`${api_variables.BASE_URL}/auth/delete_user/${id}`,
            {
                headers: { Authorization: `Token ${Cookies.get('auth_token')}` },
                method: 'DELETE'
            })
            .then(response => {
                status_code = response.status
                return response.json()
            })
            .then(response => {
                if (status_code == 200) {
                    toast.success(response.message, { id: tid })
                    setUsers(prev => prev.filter(itm => itm.id != id))
                }
                else{
                    toast.error(response.message, { id: tid })
                }
            })
            .catch(err => {
            })
    }

    useEffect(() => {
        fetch(`${api_variables.BASE_URL}/auth/get_all_users/`,
            {
                headers: { Authorization: `Token ${Cookies.get('auth_token')}` },
            })
            .then(response => {
                return response.json()
            })
            .then(response => {
                console.log(response)
                setUsers(response.data || [])
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            })
    }, [])
    return (
        <>
            <main className="flex">
                <LeftSide />
                <div className="flex-1 ">
                    <HeaderDashboard title='users' />
                    <div className=" p-[24px] bg-slate-100 overflow-auto pt-[80px] h-[100vh] w-full ">
                        <div className="max-w-[1500px] mx-auto ">
                            <div className="flex items-center justify-between ">
                                <h2 className=" text-gray-700 text-[26px] font-[600] " >Agency Users</h2>
                                <div onClick={() => setShowModel(true)} className="flex text-[14px] items-center rounded-[8px] cursor-pointer gap-[8px] px-[22px] py-[10px] bg-[#0037FE] text-[#ffffff] ">
                                    <i class="fa-solid fa-plus"></i>
                                    Add New Users
                                </div>
                            </div>
                            <div className="mt-[16px] rounded-[8px] border overflow-hidden ">
                                <div className=" bg-[#afa6e417] flex items-center px-[16px] gap-2 py-[12px] justify-between ">
                                    <p className="text-[14px] text-slate-600/80 w-[80px]">ID</p>
                                    <p className="text-[14px] text-slate-600/80 flex-1">USER EMAIL</p>
                                    <p className="text-[14px] text-slate-600/80 ">ACTIONS</p>
                                </div>
                                {
                                    loading ?
                                        <div className="">Loading...</div>
                                        :
                                        users?.length > 0 ?
                                            users.map((user, i) => {
                                                return (
                                                    <div className="flex items-center px-[16px] py-[12px] justify-between gap-2 hover:bg-[#afa6e417] cursor-pointer">
                                                        <p className="w-[80px] line-clamp-1">{i + 1}</p>
                                                        <p className="flex-1">{user.email}</p>
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                title="Edit" class="border px-[8px] group py-[8px] hover:bg-[#0037FE] transition-all cursor-pointer rounded-[6px] flex items-center justify-center "
                                                                onClick={() => {
                                                                    setEdit(user)
                                                                }}
                                                            >
                                                                <i class="fa-solid fa-pen group-hover:text-[#ffffff] text-slate-500"></i>
                                                            </div>
                                                            <div
                                                                title="Delete" class="border px-[8px] group py-[8px] hover:bg-[#0037FE] transition-all cursor-pointer rounded-[6px] flex items-center justify-center "
                                                                onClick={() => {
                                                                    handleDelete(user.id)
                                                                }}
                                                            >
                                                                <i class="fa-solid fa-trash-can group-hover:text-[#ffffff] text-slate-500"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            :
                                            < div className="flex text-slate-400 hover:text-[#0037FE] bg-[#ffffff] items-center justify-center transition-all px-[26px] py-[12px] hover:bg-[#afa6e417] ">
                                                No Users Found
                                            </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main >
            {
                (showModel || edit) ?
                    <>
                        <AddNewUsersPopup
                            edit={edit}
                            onClose={(data) => {
                                if (data) {
                                    if (edit) {
                                        setUsers(prev => prev.map(user => user.id == edit.id ? data : user))
                                    }
                                    else {
                                        setUsers([
                                            data,
                                            ...users,
                                        ])
                                    }
                                }
                                setEdit(undefined)
                                setShowModel(false)
                            }}
                        />
                    </>
                    :
                    <>

                    </>
            }
        </>
    )
}

export default ManageUsers