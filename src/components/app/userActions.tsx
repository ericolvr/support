import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar'

import {
    LogOut,
    Settings,
    User
} from 'lucide-react'


export function UserActions() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='w-64 mr-2'>
                <DropdownMenuLabel>Érico Oliveira</DropdownMenuLabel>
                <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <User className='mr-2 h-4 w-4' />
                            <span>Perfil</span>
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Settings className='mr-2 h-4 w-4' />
                        <span>Configurações</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                
                    <Link to='/logout' className='flex justify-start items-center'>
                        <DropdownMenuItem>
                                <LogOut className='mr-2 h-4 w-4' />
                                <span>Log out</span>
                        </DropdownMenuItem>
                    </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}