'use client'
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


const DashboardLayoutWrapper = ({ children }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let token = Cookies.get('auth_token')
        if (!token) {
            router.push('/auth/login')
        }
        else{
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }
    }, [])
    return (
        <>
            {
                loading ?
                <div className="flex z-[10] items-center justify-center fixed inset-0 bg-black/50">
                    Loading...
                </div>
                :
                children
            }
        </>
    )
}

export default DashboardLayoutWrapper