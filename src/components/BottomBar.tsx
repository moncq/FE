// components/Navbar.tsx
import {
    HomeIcon,
    BellIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { UserIcon as UserFilled } from '@heroicons/react/24/solid';
import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="flex justify-between items-center p-4 border-b border-gray-300 sticky bottom-0 bg-white">
            {/* Home (active) */}
            <button className="text-red-700">
                <HomeIcon className="w-6 h-6" />
            </button>

            {/* Notifications */}
            <button className="text-gray-800 hover:text-black">
                <BellIcon className="w-6 h-6" />
            </button>

            {/* Settings */}
            <button className="text-gray-800 hover:text-black">
                <Cog6ToothIcon className="w-6 h-6" />
            </button>

            {/* Avatar */}
            <span className='flex items-end justify-center rounded-[100px] bg-blue-100 p-2'>
                <UserFilled className='flex w-6 h-6' />
            </span>
        </nav>
    );
};

export default Navbar;
