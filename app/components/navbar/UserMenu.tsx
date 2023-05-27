"use client"

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModel from '@/app/hooks/useRegisterModel';
import useLoginModel from '@/app/hooks/useLoginModel';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser,
}) => {
    const registerModel = useRegisterModel();
    const loginModel = useLoginModel();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onApply = useCallback(() => {
        if (!currentUser) {
            return loginModel.onOpen();
        }
    }, [currentUser, loginModel])

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onApply}
                    className="
                hidden
                md:block
                text-sm
                font-semibold
                py-3
                px-4
                rounded-full
                hover:bg-neutral-100
                transition
                cursor-pointer
                "
                >
                    Your online workspace
                </div>
                <div
                    onClick={toggleOpen}
                    className=" 
                     bg-red-100
                     p-4 
                     md:py-1 
                     md:px-2 
                     border-[1px] 
                     border-neutral-200 
                     flex
                     flex-row
                     items-center 
                     gap-3 
                     rounded-full 
                     cursor-pointer 
                     hover:shadow-md 
                     transition"
                >
                    <AiOutlineMenu />
                    <div className=" hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    className="
                    absolute 
                    rounded-xl 
                    shadow-md
                    w-[40vw]
                    md:w-3/4
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm
                "
                >
                    <div className=" flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem
                                    onClick={() => { }}
                                    label="My jobs"
                                />
                                <MenuItem
                                    onClick={() => { }}
                                    label="Favorites"
                                />
                                <MenuItem
                                    onClick={() => { }}
                                    label=" My Applications"
                                />
                                <MenuItem
                                    onClick={() => { }}
                                    label="My Work"
                                />
                                <MenuItem
                                    onClick={() => { }}
                                    label="My workspace Home "
                                />
                                <hr />
                                <MenuItem
                                    onClick={() => signOut()}
                                    label="Logout"
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={loginModel.onOpen}
                                    label="login"
                                />
                                <MenuItem
                                    onClick={registerModel.onOpen}
                                    label="Sign Up"
                                />
                            </>

                        )}
                    </div>
                </div>
            )
            }
        </div >
    );
}

export default UserMenu;