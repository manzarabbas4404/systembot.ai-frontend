
import Link from "next/link"
import Logo from "../Logo"




const SignupPage = () => {
    return (
        <>
            <div className=" relative w-full ">
                <div className="w-full bg-cover bg-repeat bg-center h-[540px] bg-[#000000]  " style={{backgroundImage : 'url("https://d2jx2rerrg6sh3.cloudfront.net/images/news/ImageForNews_748142_16841175132986795.jpg")'}} >
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
                                Welcome!
                            </h2>
                            <p className="text-[#344767] text-[18px] font-[500] text-center">
                                Register with us
                            </p>
                            <div className="mt-[18px]  ">
                                {/* <label className="text-[12px] text-[#223b66] font-[500] "  htmlFor="email">Email</label> */}
                                <input placeholder="Email" className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] " type="email" name="email" id="email" />
                            </div>
                            <div className="mt-[10px]  ">
                                {/* <label className="text-[12px] text-[#223b66] font-[500] "  htmlFor="Password">Password</label> */}
                                <input placeholder="Password" className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] " type="password" name="Password" id="Password" />
                            </div>
                            <div className="flex items-center gap-[6px] mt-[11px] ">
                                {/* <input type="checkbox" name="checkbox" id="checkbox" /> */}
                                <div className="rounded-[30px] transition-all flex items-center justify-start hover:justify-end bg-[#465352] hover:bg-green-400 p-[2px] cursor-pointer w-[40px] ">
                                    <svg width="16" height="16" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.505859" width="20" height="20" rx="10" fill="white"/>
                                    </svg>
                                </div>
                                <label htmlFor="checkbox" className=" text-slate-500 text-[14px] " >Remember me</label>
                            </div>
                            <button className="w-full mt-[26px] bg-[#0037FE] text-[#ffffff] rounded-[8px] py-[8px] cursor-pointer transition-all hover:bg-green-400 " >
                                Sign up
                            </button>
                            <div className=" flex flex-col items-center gap-[8px] mt-[26px] ">
                                <div className="flex ite gap-[4px] " >
                                    <p className="text-slate-500 text-[14px] ">Alredy have an account?</p>
                                    <Link href={`/auth/login`} className="text-green-400 font-[600] cursor-pointer text-[14px]  ">Login</Link>
                                </div>
                                {/* <div className="flex ite gap-[4px] " >
                                    <p className="text-slate-500 text-[14px] ">Forgot your password?</p>
                                    <p className="text-green-400 font-[600] cursor-pointer text-[14px]  ">Reset</p>
                                </div> */}
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

export default SignupPage