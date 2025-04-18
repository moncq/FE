/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // Main style
import "react-date-range/dist/theme/default.css"; // Theme

interface DateRangePickerComponentProps {
    isOpen: boolean;
    onChangeDate?: (range: { startDate: Date; endDate: Date }) => void;
    close: () => void
}

export default function DateRangePickerComponent({
    isOpen,
    onChangeDate,
    close
}: DateRangePickerComponentProps) {
    const [range, setRange] = useState([
        {
            startDate: addDays(new Date(), -1),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                close()
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (item: any) => {
        setRange([item.selection]);
        if (onChangeDate) {
            onChangeDate({
                startDate: item.selection.startDate,
                endDate: item.selection.endDate,
            });
        }
    };

    return (
        <div ref={ref} className="relative">
            {isOpen && (
                <div className="absolute top-2 z-10 shadow-lg border rounded-md bg-white right-0">
                    <DateRange
                        editableDateInputs={true}
                        onChange={handleSelect}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                        rangeColors={["#4F46E5"]}
                        months={1}
                        direction="horizontal"
                    />
                </div>
            )}
        </div>
    );
}
