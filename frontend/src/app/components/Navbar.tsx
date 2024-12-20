"use client";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { House } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import lightlogo from "../lightlogo.png"
import darklogo from "../darklogo.png"
import Image from "next/image";
declare global {
    interface Window {
        ethereum?: any;
    }
}

function Navbar() {

    const { theme, setTheme } = useTheme();
    // const [connectWalletFlag, setConnectWalletFlag] = useState(true);
    const router = useRouter();
    const [address, setAddress] = useState<null | string>(null);
    const { toast } = useToast();

    useEffect(() => {
        const address = localStorage.getItem("address");
        if(address) {
            setAddress(address);
        }
    }, []);
    
    const changeTheme = () => { 
        setTheme(theme == "dark" ? "light" : "dark");
    }

    const connectWallet = async() => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner()
        localStorage.setItem("address", signer.address);
        setAddress(signer.address);

        toast({
            title: "Wallet connected successfully",
            description: "You can check your address details in your profile.",
            className: "bg-green-100 border-l-4 border-green-500 text-green-700"
        })

    }

    const disconnectWallet = () => {
        localStorage.removeItem("address");
        setAddress(null);
        toast({
            title: "Wallet disconnected successfully",
            description: "",
            className: "bg-blue-100 border-l-4 border-[#111827] text-[#111827]"
        })
    }

    const redirectToHome = () => {
        router.push("/");
    }

    return (
        <nav className="flex border-b dark:border-gray-700 dark:bg-gray-900 shadow-md justify-between px-6 py-3">
            <div className="flex gap-[5vw]">
            {/* {theme==="dark"?<Image src={lightlogo} width={200} height={18} className="hover:cursor-pointer" onClick={()=>{
                redirectToHome()
            }}/>:<Image src={darklogo} width={200} height={20} className="hover:cursor-pointer" onClick={()=>{
                redirectToHome()}}/>} */}
                <h1 className="text-3xl font-semibold max-sm:text-2xl cursor-pointer" onClick={redirectToHome}>
                    CryptoLens
                </h1>
            </div>
            <div className="flex gap-3">
                {
                    address === null && 
                    <Button variant="default" className="font-semibold dark:bg-[#1F2937] dark:text-white" onClick={connectWallet}>
                        Connect Wallet
                    </Button>
                }
                <Button variant="ghost" onClick={redirectToHome}>
                    <House />
                </Button>
                <Button variant="ghost" onClick={changeTheme}>
                    {
                        theme == "dark" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />
                    }
                </Button>
                {
                    address !== null && 
                    <Button variant="ghost" onClick={disconnectWallet}>
                        Disconnect
                    </Button>
                }
            </div>
        </nav>
    )
}

export default Navbar;