import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
    return (
        <div className={'flex items-center h-screen justify-center'}>
            <div>This is malia AI website</div>
            <div>
                <Link href={'/sign-in'}>
                    <Button>
                        Login
                    </Button>
                </Link>
                <Link href={'/sign-up'}>
                    <Button>
                        Register
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;