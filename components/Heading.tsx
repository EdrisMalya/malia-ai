import {cn} from "@/lib/utils";

interface HeadingProps {
    title: string,
    description: string,
    icon: any,
    bgColor?: string
}
const Heading = ({title, description, icon, bgColor}: HeadingProps) => {
    return (
        <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
            <div className={cn('p-2 w-fit rounded-lg', bgColor)}>
                {icon}
            </div>
            <div>
                <h2 className={'text-3xl font-bold'}>
                    {title}
                </h2>
                <p className={'text-sm text-muted-foreground'}>
                    {description}
                </p>
            </div>
        </div>
    );
};

export default Heading;