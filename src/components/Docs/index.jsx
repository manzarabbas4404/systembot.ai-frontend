'use client'

import { useEffect, useState } from "react"
import Logo from "../Logo"
import CopySvg from "../SVGs/CopySvg"
import Table from "../Table"
import LockSvg from "./LockSvg"
import toast from "react-hot-toast"
import parse from 'html-react-parser';





const DocumentsPage = () => {
    const [data, setData] = useState([])
    const [activeBar, setActiveBar] = useState(undefined)

    const [activeApi, setActiveApi] = useState(undefined)

    console.log(activeApi)

    useEffect(() =>{
        
        fetch(
            'https://backend.systembot.ai/administration/get_docs/'
        )
        .then(response =>{
            return response.json()
        })
        .then(result =>{
            setData(result.data)
        })
    }, [])
    return (
        <>
            <div className="px-[22px] py-[11px] ">
                <Logo/>
            </div>
            <main className="flex ">
                <div className="w-[260px] h-[100vh] bg-[#F9FAFC] sticky top-0 overflow-auto px-[16px] py-[12px] ">
                    <div className=" px-[16px] text-[14px] font-[600] py-[7px] bg-[#f2f2f2] text-[#484948] ">
                        ASPIRE CONNECT V1
                    </div>
                    <div className="mt-[14px] ">
                        <div className=" cursor-pointer px-[16px] py-[7px] " >
                            {
                                data?.map(group =>{
                                    return (
                                        <>
                                            <div className="flex items-center gap-[8px]" onClick={() =>{setActiveBar(group.id)}}>
                                                <i class="fa-solid text-slate-700 text-[12px] rotate-[270deg] fa-chevron-down"></i>
                                                <i class="fa-solid fa-folder text-[#ef5b25] text-[12px] "></i>
                                                <p className=" text-slate-800 text-[14px] ">{group?.name}</p>
                                            </div>
                                            {
                                                activeBar == group.id && 
                                                group?.apis?.map(api =>{
                                                    return (
                                                        <div
                                                            onClick={() => {
                                                                let inp_examp = api.input_example || ''
                                                                if (inp_examp?.length > 10){
                                                                    inp_examp = inp_examp.replaceAll('{', '<span className="text-orange-600">{</span>')
                                                                    inp_examp = inp_examp.replaceAll('}', '<span className="text-orange-600">}</span>')
                                                                }
                                                                let output_examp = api.output_example || ''
                                                                if (output_examp?.length > 0){
                                                                    output_examp = output_examp.replaceAll('{', '<span className="text-orange-600">{</span>')
                                                                    output_examp = output_examp.replaceAll('}', '<span className="text-orange-600">}</span>')
                                                                }
                                                                setActiveApi({...api, input_example : inp_examp, output_example : output_examp })
                                                            }}
                                                            className=" flex items-center gap-[8px] cursor-pointer px-[22px] py-[7px] ">
                                                            <p className={` uppercase font-[600] text-[10px] mt-[3px] ${api.method == 'Post' ? 'text-yellow-600' : api.method == 'Put' ? 'text-blue-600' : api.method == 'Delete' ? 'text-red-600' : 'text-green-600' } `}>{api.method}</p>
                                                            <p className=" text-slate-800 text-[14px] ">{api.url}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                {
                    activeApi &&
                    <div className="flex-1 flex w-full h-[100vh] ">
                        <div className="p-[18px] flex-1 ">
                            <div >
                                <div className="flex items-center justify-between ">
                                    <h2 className="text-[18px] font-[600] "><span className={`${activeApi.method == 'Post' ? 'text-yellow-600' : activeApi.method == 'Put' ? 'text-blue-600' : activeApi.method == 'Delete' ? 'text-red-600' : 'text-green-600' }  pr-[7px] `}>{activeApi?.method}</span> {activeApi?.url}</h2>
                                    <LockSvg/>
                                </div>
                            </div>
                            <div className="flex mt-[14px] items-center justify-between px-[16px] py-[2px] group bg-[#f9f9f9] ">
                                <p className="text-[12px] font-[400] py-[5px] ">https://backend.systembot.ai{activeApi?.url}</p>
                                <span onClick={()=>{
                                    navigator.clipboard.writeText(`https://backend.systembot.ai${activeApi?.url}`)
                                    toast.success('Copied')
                                }} title="Copy" className=" hidden group-hover:block max-w-max cursor-pointer "><CopySvg/></span>
                            </div>
                            <div className="mt-[22px] ">
                                <h2 className="text-[#2e2d2d] font-[600] text-[15px] ">{activeApi?.title}.</h2>
                                {
                                    activeApi?.variables?.length > 0 &&
                                    <p className="text-[12px] text-[#2e2d2d] font-[400] mt-[9px] ">Required JSON fields in the body</p>
                                }
                            </div>
                            {
                                activeApi?.variables?.length > 0 &&
                                <div className="mt-[18px] ">
                                    <Table rows={activeApi?.variables}/>
                                </div>
                            }
                            {
                                activeApi?.token_required && 
                                <div className="border-b">
                                    <div className="mt-[22px]">
                                        <h2 className="text-[#2e2d2d] font-[600] text-[15px] ">Authorization:</h2>
                                        <p className="mt-[10px] text-[12px] text-[#2e2d2d] font-[400] flex items-center gap-[4px] ">Provide your Auth Access Token (Bearer Token). </p>
                                        {/* <a className="text-[#f15951] hover:underline decoration-slice cursor-pointer select-none ">You can find here</a> */}
                                    </div>
                                    <div className="mt-[26px] border-b flex items-center gap-[6px] ">
                                        <h2 className="text-[#2e2d2d] font-[600] text-[15px] ">AUTHORIZATION</h2>
                                        <p className="text-[15px] text-[#7e7d7d] font-[400] flex items-center gap-[4px] ">Bearer Token</p>
                                    </div>
                                    <div className="flex items-center mt-[18px] mb-2">
                                        <div className="flex-1 ">
                                            <p className="text-[12px] text-[#2e2d2d] font-[600] ">Token</p>
                                        </div>
                                        <div className="flex-1 ">
                                            <p className="text-[12px] text-[#2e2d2d] font-[400] ">Token</p>
                                        </div>
                                    </div>
                                </div>
                            }

                            <div className="border-b mb-2">
                                <div className="mt-[26px] flex items-center gap-[6px] mb-1">
                                    <h2 className="text-[#2e2d2d] font-[600] text-[15px] ">HEADERS</h2>
                                </div>
                                <div className="flex items-center mb-[10px]">
                                    <div className="flex-1 ">
                                        <p className="text-[12px] text-[#2e2d2d] font-[600] ">Content-Type</p>
                                    </div>
                                    <div className="flex-1 ">
                                        <p className="text-[12px] text-[#2e2d2d] font-[400] ">application/json</p>
                                    </div>
                                </div>
                                {
                                    activeApi?.token_required && 
                                    <div className="flex items-center mb-[20px]">
                                        <div className="flex-1 ">
                                            <p className="text-[12px] text-[#2e2d2d] font-[600] ">Authorization</p>
                                        </div>
                                        <div className="flex-1 ">
                                            <p className="text-[12px] text-[#2e2d2d] font-[400] ">Bearer &#60;access_token&#62;</p>
                                        </div>
                                    </div>
                                }
                            </div>
                            {/* <div className="mt-[30px] border-b flex items-center gap-[6px] ">
                                <h2 className="text-[#2e2d2d] font-[600] text-[15px] ">Body</h2>
                                <p className="text-[15px] text-[#7e7d7d] font-[400] flex items-center gap-[4px] ">raw (json)</p>
                            </div> */}
                            <div className="w-full">
                                {
                                    activeApi.input_example?.length > 10 &&
                                    <div className="flex-1 mb-4">
                                        <h3>Input Example</h3>
                                        <div className="bg-gray-900 max-w-[900px] w-full rounded-lg px-3 py-3 text-white">
                                            <pre>{parse(activeApi.input_example)}</pre>
                                        </div>
                                    </div>
                                }
                                <div className="w-full">
                                    <h3>Ouput Example</h3>
                                    <div className="bg-gray-900 max-w-[900px] w-full rounded-lg px-3 py-3 text-white overflow-auto">
                                        <p><pre className="w-full">{parse(activeApi.output_example)}</pre></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="flex-1 ">

                        </div> */}
                    </div>
                }

            </main>
        </>
    )
}

export default DocumentsPage