'use client'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Faq from "./Faq"
import { ImportFile, getMyFAQs } from "@/Redux/Actions/GHLActions"
import AddFaq from "./addFaq"
import ScrapeURL from "./faq-scrape-url"
import GPTConversation from "./GPTConversation"
import { CSVLink } from "react-csv"
import toast from "react-hot-toast"

const BotDetailPage = () => {
    const { agency_id, location_id, contact_id } = useParams()
    const [loading, setLoading] = useState(true)
    const [mainFaqs, setMainFaqs] = useState([])
    const [faqs, setFaqs] = useState([])
    const [add_faq, setAddFaq] = useState(false)
    const [scrpe_url, setScrapeUrl] = useState(false)

    const [searchActive, setSearchActive] = useState(false)
    const [searchText, setSearchText] = useState('')

    const [edit, setEdit] = useState(undefined)

    const headers = [
        { label: 'Question', key: 'question' },
        { label: 'Answer', key: 'answer' },
    ];

    const onSelectImportFile = (file) => {
        let tid = toast.loading('Please wait...')
        console.log(file)
        ImportFile(
            { location_id: location_id, file: file },
            (response) => {
                toast.success(response?.message || 'Faqs Updated', { id: tid })
                let dt = response.data || []
                setFaqs([
                    ...faqs,
                    ...dt
                ])
            },
            (response) => {
                toast.error(response?.message || 'Something went wrong', { id: tid })
            },
        )
    }

    useEffect(() => {
        getMyFAQs(
            { agency_id: agency_id, location_id: location_id, contact_id: contact_id },
            (response) => {
                setMainFaqs(response.data || [])
                setFaqs(response.data || [])
                setLoading(false)
            }
        )
    }, [])

    useEffect(() => {
        if (searchText) {
            setFaqs(mainFaqs?.filter(itm => itm?.question?.toLowerCase().includes(searchText?.toLowerCase())))
        }
        else {
            setFaqs(mainFaqs)
        }
    }, [searchText])


    return (
        <>
            <main className="px-[22px] pb-10" >
                <GPTConversation
                    onMessage={(data) => {
                        setFaqs([
                            ...data?.faq,
                            ...faqs,
                        ])
                    }}

                />
                <div className=" py-[60px] min-h-[100vh] ">
                    <div className=" max-w-[1230px] mx-auto ">
                        <div className="flex items-center gap-[8px] mb-3 flex-wrap justify-center ">
                            <div
                                className="flex items-center justify-center gap-[7px] "
                                onClick={() => { setAddFaq(true) }}
                            >
                                <div className="flex flex-col justify-center items-center w-[80px] h-[80px] cursor-pointer gap-[7px] border-[2px] group border-[#0037FE] bg-[#ffffff] rounded-[13px] transition-all text-[15px] font-[600] px-[15px] text-[#0037FE] py-[10px] ">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xlink="http://www.w3.org/1999/xlink" width="29" height="29" x="0" y="0" viewBox="0 0 64 64" space="preserve"><g><g fill="#000"><path fill-rule="evenodd" d="M36.804 20.603A2 2 0 0 1 36 19V6H21.557c-5.112 0-9.387 3.836-9.812 8.856-.739 8.712-.927 15.777-.57 24.058a2 2 0 1 1-3.996.172c-.365-8.47-.171-15.706.58-24.568C8.366 7.354 14.442 2 21.557 2h16.43a2.002 2.002 0 0 1 1.36.521L55.88 17.52a2 2 0 0 1 .651 1.343c.727 10.534.609 19.547-.353 30.67C55.56 56.676 49.494 62 42.4 62H31.957a2 2 0 1 1 0-4h10.444c5.097 0 9.36-3.814 9.792-8.813.898-10.393 1.046-18.863.447-28.531-2.5-.805-4.456-1.156-6.417-1.147-2.163.01-4.465.459-7.652 1.408a2 2 0 0 1-1.766-.314zM40 16.376c2.229-.551 4.217-.857 6.204-.867.396-.002.788.008 1.18.03L40 8.616z" clip-rule="evenodd" fill="#0037fe" opacity="1" data-original="#000000"></path><path d="M19 44a2 2 0 1 0-4 0v6H9a2 2 0 1 0 0 4h6v6a2 2 0 1 0 4 0v-6h6a2 2 0 1 0 0-4h-6z" fill="#0037fe" opacity="1" data-original="#000000"></path></g></g></svg>
                                    <span className="text-sm">Add</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-[7px] ">
                                <div
                                    className="flex flex-col justify-center items-center w-[80px] h-[80px] cursor-pointer gap-[7px] border-[2px] group border-[#0037FE] bg-[#ffffff] rounded-[13px] transition-all text-[15px] font-[600] px-[15px] text-[#0037FE] py-[10px] "
                                    onClick={() => { setSearchActive(!searchActive) }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xlink="http://www.w3.org/1999/xlink" width="29" height="29" x="0" y="0" viewBox="0 0 682.667 682.667" space="preserve" class=""><g><defs><clipPath id="a" clipPathUnits="userSpaceOnUse"><path d="M0 512h512V0H0Z" fill="#0037fe" opacity="1" data-original="#000000"></path></clipPath><clipPath id="b" clipPathUnits="userSpaceOnUse"><path d="M0 512h512V0H0Z" fill="#0037fe" opacity="1" data-original="#000000"></path></clipPath></defs><g clip-path="url(#a)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)"><path d="M0 0h-100v100Z" transform="translate(375 397)" fill="none" stroke="#0037fe" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="" data-original="#000000" opacity="1" class=""></path></g><path d="M0 0h170" transform="matrix(1.33333 0 0 -1.33333 100 233.333)" fill="none" stroke="#0037fe" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="" data-original="#000000" opacity="1" class=""></path><path d="M0 0h130" transform="matrix(1.33333 0 0 -1.33333 100 313.333)" fill="none" stroke="#0037fe" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="" data-original="#000000" opacity="1" class=""></path><path d="M0 0h130" transform="matrix(1.33333 0 0 -1.33333 100 393.333)" fill="none" stroke="#0037fe" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="" data-original="#000000" opacity="1" class=""></path><path d="M0 0h130" transform="matrix(1.33333 0 0 -1.33333 100 473.333)" fill="none" stroke="#0037fe" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="" data-original="#000000" opacity="1" class=""></path><g clip-path="url(#b)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)"><path d="M0 0c35.146-35.147 35.146-92.132 0-127.279-35.147-35.147-92.133-35.147-127.279 0-35.148 35.147-35.148 92.132 0 127.279C-92.133 35.147-35.147 35.147 0 0Z" transform="translate(412.147 290.64)" fill="none" stroke="#0037fe" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="" data-original="#000000" opacity="1" class=""></path><path d="m0 0-84.853 84.853" transform="translate(497 78.508)" fill="none" stroke="#0037fe" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="" data-original="#000000" opacity="1" class=""></path><path d="M0 0v83.987l-99.996 100H-320c-22.092 0-40-17.909-40-40v-402c0-22.091 17.908-40 40-40h280c22.092 0 40 17.909 40 40v85.987" transform="translate(375 313.013)" fill="none" stroke="#0037fe" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="" data-original="#000000" opacity="1" class=""></path></g></g></svg>
                                    <span className="text-sm">Search</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-[7px] ">
                                <div
                                    onClick={() => { setScrapeUrl(true) }}
                                    className="flex flex-col justify-center items-center w-[80px] h-[80px] cursor-pointer gap-[7px] border-[2px] group border-[#0037FE] bg-[#ffffff] rounded-[13px] transition-all text-[15px] font-[600] px-[1px] text-[#0037FE] py-[10px] ">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xlink="http://www.w3.org/1999/xlink" width="29" height="29" x="0" y="0" viewBox="0 0 480.004 480" space="preserve" class=""><g><path d="M336 224.004h80c4.422 0 8-3.582 8-8v-160c0-4.418-3.578-8-8-8h-80a8 8 0 0 0-8 8v160a8 8 0 0 0 8 8zm8-16v-16h64v16zm64-144v112h-64v-112zm0 0" fill="#0037fe" opacity="1" data-original="#000000"></path><path d="M448 .004H32a31.655 31.655 0 0 0-22.727 9.27A31.668 31.668 0 0 0 0 32.003v272a31.668 31.668 0 0 0 9.273 22.73A31.655 31.655 0 0 0 32 336.004h166.563l-13.336 80H144v16h192v-16h-41.223l-13.336-80H448a31.657 31.657 0 0 0 32-32v-272a31.657 31.657 0 0 0-32-32zm-416 16h416a15.643 15.643 0 0 1 16 16v224H16v-224a15.65 15.65 0 0 1 16-16zm246.555 400h-77.106l13.328-80h50.45zm169.445-96H32a15.65 15.65 0 0 1-16-16v-32h448v32a15.643 15.643 0 0 1-16 16zm0 0" fill="#0037fe" opacity="1" data-original="#000000"></path><path d="M232 288.004h16v16h-16zM64 224.004h224c4.422 0 8-3.582 8-8v-160c0-4.418-3.578-8-8-8H64a8 8 0 0 0-8 8v160a8 8 0 0 0 8 8zm8-16v-16h208v16zm208-144v112H72v-112zm0 0" fill="#0037fe" opacity="1" data-original="#000000"></path></g></svg>
                                    <span className="text-sm">Read Site</span>
                                </div>
                            </div>
                            <label
                                className="flex items-center justify-center gap-[7px] "
                                htmlFor="import_csv_file"
                            >
                                <div className="flex flex-col justify-center items-center w-[80px] h-[80px] cursor-pointer gap-[7px] border-[2px] group border-[#0037FE] bg-[#ffffff] rounded-[13px] transition-all text-[15px] font-[600] px-[15px] text-[#0037FE] py-[10px] ">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xlink="http://www.w3.org/1999/xlink" width="29" height="29" x="0" y="0" viewBox="0 0 32 32" space="preserve" class=""><g><path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" fill="#0037fe" opacity="1" data-original="#000000" class=""></path><path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" fill="#0037fe" opacity="1" data-original="#000000" class=""></path></g></svg>
                                    <span className="text-sm">Upload</span>
                                </div>
                            </label>
                            <input
                                className="hidden"
                                type="file"
                                id={`import_csv_file`}
                                accept=".csv, .pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                onChange={(e) => {
                                    onSelectImportFile(e.target.files[0])
                                }}
                            />
                            <CSVLink
                                data={faqs}
                                headers={headers}
                                filename='faqs.csv'
                            >
                                <div className="flex items-center justify-center gap-[7px] ">
                                    <div className="flex flex-col justify-center items-center w-[80px] h-[80px] cursor-pointer gap-[7px] border-[2px] group border-[#0037FE] bg-[#ffffff] rounded-[13px] transition-all text-[15px] font-[600] px-[15px] text-[#0037FE] py-[10px] ">
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xlink="http://www.w3.org/1999/xlink" width="29" height="29" x="0" y="0" viewBox="0 0 128 128" space="preserve" class=""><g><path d="M128 65c0 15.439-12.563 28-28 28H80c-2.211 0-4-1.791-4-4s1.789-4 4-4h20c11.027 0 20-8.973 20-20s-8.973-20-20-20h-4c-2.211 0-4-1.791-4-4 0-15.439-12.563-28-28-28S36 25.561 36 41c0 2.209-1.789 4-4 4h-4C16.973 45 8 53.973 8 65s8.973 20 20 20h20c2.211 0 4 1.791 4 4s-1.789 4-4 4H28C12.563 93 0 80.439 0 65s12.563-28 28-28h.223C30.219 19.025 45.5 5 64 5s33.781 14.025 35.777 32H100c15.438 0 28 12.561 28 28zm-50.828 37.172L68 111.344V61c0-2.209-1.789-4-4-4s-4 1.791-4 4v50.344l-9.172-9.172c-1.563-1.563-4.094-1.563-5.656 0s-1.563 4.094 0 5.656l16 16c.781.781 1.805 1.172 2.828 1.172s2.047-.391 2.828-1.172l16-16c1.563-1.563 1.563-4.094 0-5.656s-4.094-1.563-5.656 0z" fill="#0037fe" opacity="1" data-original="#000000"></path></g></svg>
                                        <span className="text-sm">Download</span>
                                    </div>
                                </div>
                            </CSVLink>
                        </div>
                        {
                            searchActive &&
                            <div class="mb-3 flex rounded-[12px] border overflow-hidden">
                                <input
                                    type="search" class="flex-1 bg-white py-2 px-3 outline-none" placeholder="Type and Press Enter"
                                    onKeyDown={(e) => {
                                        if (e.key == 'Enter') {
                                            setSearchText(e.target.value)
                                        }
                                    }}
                                />
                                <span class="input-group-text px-4 flex items-center justify-center text-white bg-[#0037FE]" id="basic-addon1">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                </span>
                            </div>
                        }
                        <div className="mt-[20px] pb-8">
                            {
                                loading ?
                                    <div>
                                        Loading...
                                    </div>
                                    :
                                    faqs?.length > 0 ?
                                        faqs?.map(faq => {
                                            return (
                                                <Faq
                                                    faq={faq}
                                                    onEditClick={() => {
                                                        setEdit(faq)
                                                    }}
                                                    onDelete={() => {
                                                        setFaqs([
                                                            ...faqs.filter(itm => itm.id != faq.id)
                                                        ])
                                                    }}
                                                />
                                            )
                                        })
                                        :
                                        <div>
                                            No Faq
                                        </div>
                            }
                        </div>
                    </div>
                </div>
            </main>
            {
                (add_faq || edit) &&
                <AddFaq
                    edit={edit}
                    ghl_account={agency_id}
                    sub_account={location_id}
                    onClose={(data) => {
                        if (edit) {
                            setEdit(undefined)
                            if (data) {
                                console.log(data)
                                console.log(edit)
                                setFaqs(prev => [
                                    ...prev.map(itm => itm.id == edit.id ? data : itm)
                                ])
                            }
                        }
                        else {
                            if (data) {
                                setFaqs([
                                    data,
                                    ...faqs
                                ])
                            }
                            setAddFaq(false)
                        }
                    }}
                />
            }
            {
                scrpe_url &&
                <ScrapeURL
                    ghl_account={agency_id}
                    sub_account={location_id}
                    onClose={(data) => {
                        if (data) {
                            setFaqs([
                                ...data,
                                ...faqs
                            ])
                        }
                        setScrapeUrl(false)
                    }}
                />
            }
        </>
    )
}

export default BotDetailPage