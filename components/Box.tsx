import { twMerge } from "tailwind-merge";

interface Boxprops {
    children: React.ReactNode;
    className?: string;
}

const Box: React.FC<Boxprops> = ({
    children, className
}) => {
    return (
        <div
            className={twMerge(`
            bg-neutral-900 rounded-xl h-fit w-full`, className
            )}
        >
            {children}
        </div>
    )
}

export default Box