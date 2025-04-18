/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface CategorySaleData {
  labels: string[],
  datasets: any[]
}

interface CategorySaleProps {
  saleData?: CategorySaleData
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right" as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        boxWidth: 8,
        boxHeight: 8,
        color: "#4B5563",
        font: {
          size: 12,
        },
        generateLabels: (chart: any) => {
          const { data } = chart;
          return data.labels.map((label: string, i: number) => {
            const value = data.datasets[0].data[i];
            return {
              text: `${label}      ${value}%`,
              fillStyle: data.datasets[0].backgroundColor[i],
              strokeStyle: data.datasets[0].backgroundColor[i],
              lineWidth: 1,
              hidden: false,
              index: i,
            };
          });
        },
      },
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const label = context.label || "";
          const value = context.raw;
          return `${label}: ${value}%`;
        },
      },
    },
  },
};

const SalesByCategoryChart: React.FC<CategorySaleProps> = ({ saleData }) => {

  const [data, setData] = useState({
    labels: ["women", "men", "tops", "tees"],
    datasets: [
      {
        label: "Sales",
        data: [52.1, 22.8, 13.9, 11.2],
        backgroundColor: [
          "#1F1F1F",      // dark gray (women)
          "#A0C4FF",      // soft blue (men)
          "#9BF6B0",      // mint green (tops)
          "#FFCAD4",      // light pink (tees)
        ],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  });

  useEffect(() => {
    if (saleData) {
      setData({ ...saleData })
    }
  }, [saleData])

  return (
    <div className="w-full p-4 h-72 lg:h-96 bg-white rounded-xl shadow-sm border">
      <h2 className="text-sm font-semibold text-gray-700 mb-2">Sales by category</h2>
      <div className="flex h-52 lg:h-72 items-center justify-center">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}

export default SalesByCategoryChart;