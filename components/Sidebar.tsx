"use client"

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {Montserrat} from "next/font/google";
import {cn} from "@/lib/utils";
import {
    ChatBubbleLeftIcon,
    CodeBracketIcon, CogIcon,
    HomeIcon,
    MusicalNoteIcon,
    PhotoIcon,
    VideoCameraIcon
} from "@heroicons/react/20/solid";
import {usePathname} from "next/navigation";

const montserrat = Montserrat({
    weight: '600',
    subsets: ["latin"]
})

const routes = [
    {
        label: 'Dashboard',
        icon: <HomeIcon className={'h-5 w-5 mr-3'} />,
        href: '/dashboard',
        color: 'text-sky-500'
    },
    {
        label: 'Conversation',
        icon: <ChatBubbleLeftIcon className={'h-5 w-5 mr-3'} />,
        href: '/conversation',
        color: 'text-violet-500'
    },
    {
        label: 'Image Generation',
        icon: <PhotoIcon className={'h-5 w-5 mr-3'} />,
        href: '/image',
        color: 'text-pink-700'
    },
    {
        label: 'Video Generation',
        icon: <VideoCameraIcon className={'h-5 w-5 mr-3'} />,
        href: '/video',
        color: 'text-orange-700'
    },
    {
        label: 'Music generation',
        icon: <MusicalNoteIcon className={'h-5 w-5 mr-3'} />,
        href: '/music',
        color: 'text-emerald-500'
    },
    {
        label: 'Code generation',
        icon: <CodeBracketIcon className={'h-5 w-5 mr-3'} />,
        href: '/code',
        color: 'text-green-700'
    },
    {
        label: 'Settings',
        icon: <CogIcon className={'h-5 w-5 mr-3'} />,
        href: '/settings',
    },
]

const Sidebar = () => {
    const pathname = usePathname()
    return (
        <div className={'space-y-4 py-4 flex flex-col h-full bg-[#111872 text-white'}>
            <div className="px-3 py-2 flex-1">
                <Link href={'/dashboard'} className={'flex items-center pl-3 mb-14'}>
                    <div className={'relative w-8 h-8 mr-4'}>
                        <Image fill alt={'logo'} src={'/logo.png'} />
                    </div>
                    <h3 className={cn("text-2xl font-bold", montserrat.className)}>Malia ai</h3>
                </Link>
                <div className={'space-y-1'}>
                    {routes.map(route=>(
                        <Link href={route.href}
                            key={route.href}
                              className={
                                    cn(
                                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                        pathname === route.href ? "text-white bg-white/10": 'text-zinc-400'
                                    )
                              }
                        >
                                <div className={cn('flex items-center flex-1',route?.color)}>
                                    {route.icon}
                                    <p>
                                        {route.label}
                                    </p>
                                </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;