/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { ThemeProvider } from "next-themes"
import Sidebar from "./Sidebar"
import TopBar from "./TopBar"
import { useEffect, useState } from "react";
import BottomBar from "./BottomBar";
import { Bars3Icon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { ROUTER_PATH } from "@/config/routerPath";
import Login from "@/app/login/page";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [searchText, setSearchText] = useState("");
    const [isOpenSideBar, setOpenSideBar] = useState(false);
    const pathname = usePathname();
    const [isAuthPage, setAuthPage] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            setAuthPage(true);
        } else {
            setAuthPage(false);
        }
    }, [children, pathname]);

    // Avoid flickering: render nothing until auth check is done

    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            {!isAuthPage ? (
                <Login />
            ) :
                <div className="bg-white flex flex-col 2xl:flex-row min-h-screen text-[#333333] md:pl-4 md:pr-10">
                    <div className="hidden 2xl:block"><Sidebar /></div>
                    <div className="flex-1">
                        <div className="hidden 2xl:block sticky top-0"><TopBar onSearchChange={setSearchText} /></div>
                        <div className="p-4">
                            <div className="2xl:hidden">
                                {isOpenSideBar ? <Sidebar onClickLinks={() => setOpenSideBar(false)} /> : <Bars3Icon className="w-6 h-6" onClick={() => setOpenSideBar(true)} />}
                            </div>
                            {children}
                        </div>

                    </div>
                    <div className="block 2xl:hidden sticky bottom-0"><BottomBar /></div>
                </div>
            }
        </ThemeProvider>
    )
}