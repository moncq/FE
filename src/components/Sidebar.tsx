import React from 'react';
import Link from 'next/link';
import { UserIcon, ShoppingBagIcon, BuildingLibraryIcon, DocumentCheckIcon, XCircleIcon, SunIcon } from '@heroicons/react/24/outline';
import { ChartPieIcon, UserIcon as UserFilled } from '@heroicons/react/24/solid';

interface SideBarProps {
  onClickLinks?: () => void
}

const Sidebar: React.FC<SideBarProps> = ({ onClickLinks }) => {
  return (
    <div className="w-full 2xl:w-64 h-screen bg-white sticky top-0 pl-6 pt-4 pr-4 flex flex-col gap-10">
      <div className='flex flex-row items-center justify-start w-full'>
        <span className='flex items-end justify-center rounded-[100px] bg-blue-100 p-2'>
          <UserFilled className='flex w-6 h-6' />
        </span>
        <div className="flex p-4 text-2xl font-bold">
          Sky
        </div>
        <div className='w-full justify-end flex 2xl:hidden' onClick={onClickLinks}>
          <XCircleIcon className='w-10 h-10' />
        </div>
      </div>

      <ul className="mt-6 space-y-4">
        <li>
          <p className='text-gray-400'>Dashboards</p>
          <div className='pl-2'>
            <Link href="/dashboard" className="flex items-center space-x-2 hover:bg-gray-200  p-2 rounded-lg" onClick={onClickLinks}>
              <ChartPieIcon className='w-6 h-6' />
              <span>Overview</span>
            </Link>
          </div>

        </li>
        <span className='text-gray-400'>Manages</span>
        <div className='pl-2'>
          <li>
            <Link href="#" className="flex items-center space-x-2 hover:bg-gray-200  p-2 rounded-lg" onClick={onClickLinks}>
              <UserIcon className='w-6 h-6' />
              <span>Customer</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center space-x-2 hover:bg-gray-200  p-2 rounded-lg" onClick={onClickLinks}>
              <ShoppingBagIcon className='w-6 h-6' />
              <span>Order</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center space-x-2 hover:bg-gray-200  p-2 rounded-lg" onClick={onClickLinks}>
              <BuildingLibraryIcon className='w-6 h-6' />
              <span>Inventory</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center space-x-2 hover:bg-gray-200  p-2 rounded-lg" onClick={onClickLinks}>
              <DocumentCheckIcon className='w-6 h-6' />
              <span>Report</span>
            </Link>
          </li>
        </div>

      </ul>
      <div className='flex items-end bottom-0 h-full'>
        <div className='flex flex-row items-center justify-center gap-2 pb-2 pt-2 bg-[#993333] text-white w-full rounded-tr-[16px]'>
          <SunIcon className='w-10 h-10'/>
          <h2 className='font-semibold text-xl'>Moncq</h2>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;