'use client'
import React, { useEffect, useState } from "react"


import HilevelPopup from "../../Popups/IntegrationHilevelPopup"
import HeaderDashboard from "../HeaderDashboard"
import LeftSide from "../LeftSide"
import OpenAiPopup from "../../Popups/OpenAiPopup"
import { getMyGHLAccount } from "@/Redux/Actions/GHLActions"
import ClickFunnels from "@/components/Popups/ClickFunnels"




const Integration = () => {
    const [showModel, setShowModel] = useState(false);
    const [showSecondModel, setShowSecondModel] = useState(false);
    const [showThirdModel, setShowThirdModel] = useState(false);
    const [data, setData] = useState({})

    useEffect(() => {
        getMyGHLAccount({}, (response) => {
            setData(response)
        })
    }, [])

    return (
        <>
            <main className="flex">
                <LeftSide />
                <div className="flex-1 ">
                    <HeaderDashboard title='INTEGRATION' />
                    <div className=" p-[24px] bg-slate-100 min-h-[100vh] w-full ">
                        <div className=" flex items-center justify-start gap-[18px] max-w-[1500px] mx-auto ">
                            <div className="rounded-[10px] bg-[#ffffff] shadow-light w-[510px] flex flex-col items-center pb-[80px] pt-[100px] ">
                                <div>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbEAAAGkCAYAAAC/yxuZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAL2GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDYwLCAyMDIwLzA1LzEyLTE2OjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMTEtMDJUMTA6NTY6MjEtMDY6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA2LTE0VDIzOjA5OjM0KzA1OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTA2LTE0VDIzOjA5OjM0KzA1OjMwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUzYzc1NmU3LTMyY2MtMjY0Ni1iNzkxLTEwMTdiOWEzZjQ4YyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjAzNGQ4ZDA2LWRhYmUtMGM0Ny04Zjc1LWFkNGU3YzcyN2E0NyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjRlMGNmOGI0LTRlMjctNDkxYy1hNTA3LWFmODEzYjU5NGE5OCIgdGlmZjpPcmllbnRhdGlvbj0iMSIgdGlmZjpYUmVzb2x1dGlvbj0iNzIwMDAwLzEwMDAwIiB0aWZmOllSZXNvbHV0aW9uPSI3MjAwMDAvMTAwMDAiIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiIGV4aWY6Q29sb3JTcGFjZT0iMSIgZXhpZjpQaXhlbFhEaW1lbnNpb249IjE4NTMiIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSI0MjAiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjRlMGNmOGI0LTRlMjctNDkxYy1hNTA3LWFmODEzYjU5NGE5OCIgc3RFdnQ6d2hlbj0iMjAyMC0xMS0wMlQxMDo1NjoyMS0wNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBpbWFnZS9wbmcgdG8gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YmJiNzZhNjMtNTVkNi00MDdjLTljN2QtZTZkYmRlY2NiNWYwIiBzdEV2dDp3aGVuPSIyMDIwLTExLTAzVDE2OjE2OjIxLTA2OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MmFlZmU3YmQtMjJiYS00NjhmLThiNzktYzJiYTFjYWQ1NDIyIiBzdEV2dDp3aGVuPSIyMDIxLTAyLTA5VDEwOjUyOjI4LTA2OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjM3YjQ5NTQtNzAwMi00ZTA0LWI3ZTQtZjFiZTNhZjI2YzE2IiBzdEV2dDp3aGVuPSIyMDIxLTAyLTA5VDEwOjUyOjI4LTA2OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NTNjNzU2ZTctMzJjYy0yNjQ2LWI3OTEtMTAxN2I5YTNmNDhjIiBzdEV2dDp3aGVuPSIyMDIzLTA2LTE0VDIzOjA5OjM0KzA1OjMwIiBzdEV2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" class="w-20 h-auto mt-3 mb-2 ingration-box" alt="HighLevelLogo" /></div>
                                <h2 className="text-slate-600 text-[28px] font-[500] text-center ">
                                    Highlevel
                                </h2>
                                <p className=" text-slate-500 text-center mt-[8px] ">Set Up Your Highlevel Integration</p>
                                <button onClick={() => setShowModel(true)} className="py-[9px] px-[16px] rounded-[6px] text-[15px] text-[#ffffff] mt-[50px] cursor-pointer bg-[#0037FE] ">
                                    Connected
                                </button>
                            </div>
                            <div className="rounded-[10px] bg-[#ffffff] shadow-light w-[510px] flex flex-col items-center pb-[80px] pt-[100px] ">
                                <div><img src="https://app.zappychat.com/img/openai_logo.32d1d469.svg" class="w-20 h-auto mt-3 mb-2 ingration-box" alt="OpenAiLogo" /></div>
                                <h2 className="text-slate-600 text-[28px] font-[500] text-center ">
                                    OpenAi
                                </h2>
                                <p className=" text-slate-500 text-center mt-[8px] ">Set Up Your OpenAi Integration</p>
                                <button onClick={() => setShowSecondModel(true)} className="py-[9px] px-[16px] rounded-[6px] text-[15px] text-[#ffffff] mt-[50px] cursor-pointer bg-[#0037FE] ">
                                    {data?.openai_key ? 'Connected' : 'Connect Now'}
                                </button>
                            </div>
                            {/* <div className="rounded-[10px] bg-[#ffffff] shadow-light w-[510px] flex flex-col items-center pb-[80px] pt-[100px] ">
                                <h2 className="text-slate-600 text-[28px] font-[500] text-center ">
                                    Click Funnels
                                </h2>
                                <p className=" text-slate-500 text-center mt-[8px] ">Set Up Your Click Funnels Integration</p>
                                <button onClick={() => setShowThirdModel(true)} className="py-[9px] px-[16px] rounded-[6px] text-[15px] text-[#ffffff] mt-[50px] cursor-pointer bg-[#0037FE] ">
                                    {data?.openai_key ? 'Connected' : 'Connect Now'}
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </main>
            {
                showModel ?
                    <>
                        <HilevelPopup
                            onClose={() => { setShowModel(false) }}
                            data={data}
                            setData={setData}
                        />
                    </>
                    :
                    <>

                    </>
            }
            {
                showSecondModel ?
                    <OpenAiPopup
                        onClose={() => {
                            setShowSecondModel(false)
                        }}
                    />
                    :
                    <>

                    </>
            }

            {
                showThirdModel ?
                    <ClickFunnels
                        onClose={() => {
                            setShowThirdModel(false)
                        }}
                    />
                    :
                    <>

                    </>
            }
        </>
    )
}

export default Integration