'use client'
import { useRouter } from "next/navigation"
import Logo from "./Logo"
import { useEffect } from "react"



const LandingPage = () => {
    const router = useRouter()
    useEffect(() => {
        router.push('/dashboard')
    }, [])
    return (
        <>
            {/* <main className="max-w-[1400px] mx-auto ">
                <Logo />
            </main> */}
        </>
    )
}

export default LandingPage