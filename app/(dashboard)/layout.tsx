import React from 'react';
import Navbar from "@/components/navbar";
import Sidebar from "../../components/Sidebar";
import Image from "next/image";

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={'h-screen relative'}>
            <div className={'hidden h-screen md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 z-[800] bg-gray-900'}>
                <Sidebar />
            </div>
            <main className={'md:pl-72'}>
                <Navbar />
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;