'use client'

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import usePlayer from "@/hooks/usePlayer";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({
    children, className
}) => {
    const player = usePlayer();
    const router = useRouter();
    const authModal = useAuthModal();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        player.reset();
        router.refresh();

        if (error) {
            toast.error(error.message)
;        } else {
            toast.success('Logged out!')
        }
    }

  return (
    <div
        className={twMerge(`h-fit bg-gradient-to-b from-[#6dfce4] p-6`, className)}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex">
            
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
            <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                <HiHome className="text-black" size={16}/>
            </button>
            <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                <BiSearch className="text-black" size={16}/>
            </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
            {user ? (
                <div className="flex gap-x-4 items-center">
                    <Button
                        onClick={handleLogout}
                        className="bg-white px-6 py-2"
                    >
                        Logout
                    </Button>
                    <Button
                        onClick={() => router.push('/account')}
                        className="bg-white"
                    >
                        <FaUserAlt />
                    </Button>
                </div>
            ) : (
                <>
                    <div>
                        <Button
                            onClick={authModal.onOpen}
                            className="bg-transparent text-neutral-100 font-medium"
                        >
                            Sign up
                        </Button>
                    </div>
                    <div>
                        <Button
                            onClick={authModal.onOpen}
                            className="bg-white px-6 py-2"
                        >
                            Sign in
                        </Button>
                    </div>
                </>
            )}
        </div>
      </div>
      {children}
    </div>
  )
}

export default Header
