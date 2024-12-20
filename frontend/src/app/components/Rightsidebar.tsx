"use client";
import * as React from "react"
import { Button } from "@/components/ui/button"
import {ChevronRight} from "lucide-react";
import { useEffect,useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from 'next/image';
import { TrendingTokens } from "../utils/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

function RightSidebar({TopTokens}:{TopTokens:TrendingTokens[] | null}) {
    const router = useRouter();
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false)

    const handleTokenClick = (id: string) => {
        router.push(`/token/${id}`);
    }
    return (
        <aside className={`fixed md:w-80 md:static inset-y-0 right-0 z-50 dark:bg-[#1f2937e2] w-64 transform ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out text-black dark:text-white`}>
            <div className="flex items-center justify-between p-4 border-b-2 dark:border-gray-700">
            <h2 className="text-xl font-bold">Top Tokens</h2>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setRightSidebarOpen(false)}>
                <ChevronRight className="h-6 w-6" />
            </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-5rem)]">
                <div className="p-4 pr-5">
                    {
                        TopTokens == null && <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-5">
                                <Skeleton className="w-[40px] h-[30px] rounded-full" />
                                <Skeleton className="w-[200px] h-[25px] rounded-full" />
                                <Skeleton className="w-[200px] h-[25px] rounded-full" />
                            </div>
                            <div className="flex items-center gap-5">
                                <Skeleton className="w-[40px] h-[30px] rounded-full" />
                                <Skeleton className="w-[200px] h-[25px] rounded-full" />
                                <Skeleton className="w-[200px] h-[25px] rounded-full" />
                            </div>
                        </div> 
                    }
                    {TopTokens?.map((token, index) => (
                    <div key={index} className="flex justify-between items-center mb-4 cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-700 px-5 rounded-md" onClick={() => handleTokenClick(token?.id)}>
                        <div className="flex items-center" >
                            <div className="flex-shrink-0 pr-2">
                                <Image
                                    src={token?.image}
                                    alt="Bitcoin Logo"
                                    width={20}
                                    height={20}
                                    className="w-5 h-5 md:w-5 md:h-5"
                                />
                            </div>
                            <span className="text-lg">{token?.name}</span>
                            </div>
                            <div className="text-right">
                            <div>${token?.price.toLocaleString()}</div>
                            <div className={token?.percent_change_15m >= 0 ? 'text-green-400 font-semibold' : 'text-red-400 font-semibold'}>
                                {token?.percent_change_15m}%
                            </div>
                            </div>
                    </div>
                    ))}
                </div>
            </ScrollArea>
        </aside>
    )

}

export default RightSidebar;