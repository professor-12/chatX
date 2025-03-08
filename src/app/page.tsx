"use client"

import { checkAuth } from "@/lib/_server/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter()
  const [loading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    const fn = async () => {
      const { data, error } = await checkAuth()
      if (error) {
        return router.replace("/login")
      }
      return router.push("/home")
    }
    fn()
  }, [])
  return (
    <div className="bg-background  h-screen">
      {
        loading ? <div className="flex items-center justify-center h-full"><svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide animate-spin lucide-loader"
        >
          <path d="M12 2v4" />
          <path d="m16.2 7.8 2.9-2.9" />
          <path d="M18 12h4" />
          <path d="m16.2 16.2 2.9 2.9" />
          <path d="M12 18v4" />
          <path d="m4.9 19.1 2.9-2.9" />
          <path d="M2 12h4" />
          <path d="m4.9 4.9 2.9 2.9" />
        </svg>
        </div> : <div className="flex items-center justify-center h-full">Loaded</div>
      }
    </div>
  );
}
