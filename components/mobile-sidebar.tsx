'use client'
import React, {useEffect, useState} from 'react';
import {Bars3Icon} from "@heroicons/react/24/solid";
import {Button} from "@/components/ui/button";
import {Sheet, SheetTrigger, SheetContent} from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar";

const MobileSidebar = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    }, [])

    if(!isMounted){
        return null
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Button variant={'ghost'} size={'icon'} className={'md:hidden'}>
                    <Bars3Icon className={'h-6 '} />
                </Button>
            </SheetTrigger>
            <SheetContent side={'left'} className={'p-0 bg-gray-900'}>
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;