/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export interface TopSaleData {
    labels: string[],
    datasets: any[]
}

interface TopSaleDataProps {
    saleData?: TopSaleData
}

const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            ticks: {
                color: "#9ca3af",
                callback: function (value: any) {
                    return value >= 1000 ? value / 1000 + "K" : value;
                },
            },
            grid: {
                drawBorder: false,
                color: "#f3f4f6",
            },
        },
        x: {
            ticks: {
                color: "#6b7280",
            },
            grid: {
                display: false,
            },
        },
    },
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: function (context: any) {
                    return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
                },
            },
        },
    },
};

const TopSellingProductChart: React.FC<TopSaleDataProps> = ({ saleData }) => {
    const [data, setData] = useState({
        labels: ["Hoodies", "Jackets", "Sweaters", "Cardigans", "Skirts", "Other"],
        datasets: [
            {
                label: "Top Selling Product",
                data: [15000, 30000, 22000, 33000, 13000, 26000],
                backgroundColor: [
                    "rgba(133, 144, 255, 0.7)",
                    "rgba(129, 235, 224, 0.7)",
                    "rgba(48, 48, 48, 0.9)",
                    "rgba(132, 183, 255, 0.8)",
                    "rgba(255, 184, 184, 0.6)",
                    "rgba(144, 238, 174, 0.7)",
                ],
                borderRadius: 6,
                borderSkipped: false,
                barPercentage: 0.5,
            },
        ],
    });

    useEffect(() => {
        if (saleData) {
          setData({ ...saleData })
        }
      }, [saleData])
      
    return (
        <div className="h-72 lg:h-96 p-4bg-white rounded-xl shadow-sm border w-full p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Top Selling Product</h2>
            <div className="h-52 lg:h-72">
                <Bar options={options} data={data} />
            </div>
        </div>
    );
}

export default TopSellingProductChart;
