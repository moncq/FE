import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

export interface StatsCardProps {
    title: string
    value: string | number
    percent: string
    trendUp?: boolean
    bgColor?: 'pink' | 'maroon' | 'white' | 'black'
}

const bgMap = {
    pink: 'bg-[#FFCCCC] text-[#333333]',
    maroon: 'bg-[#993333] text-white',
    white: 'bg-white text-[#333333] border border-[#333333]',
    black: 'bg-[#333333] text-white',
}

export const StatsCard = ({
    title,
    value,
    percent,
    trendUp = true,
    bgColor = 'white',
}: StatsCardProps) => {
    const TrendIcon = trendUp ? ArrowTrendingUpIcon : ArrowTrendingDownIcon
    const trendColor = trendUp ? 'text-green-600' : 'text-red-300'

    return (
        <div
            className={clsx(
                'rounded-2xl px-6 py-4 shadow-sm w-[20%] min-w-44 md:min-w-52',
                bgMap[bgColor],
                'flex flex-col justify-between'
            )}
        >
            <div className="text-sm">{title}</div>
            <div className='flex flex-row'>
                <div className="mt-1 text-2xl font-semibold">{value}</div>
                <div className={clsx('w-full mt-1 flex flex-row items-center space-x-1 text-sm justify-end', trendColor)}>
                    <span>{percent}</span>
                    <TrendIcon className="w-4 h-4" />
                </div>
            </div>

        </div>
    )
}
