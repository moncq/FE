/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export interface SellTrendsData {
  labels: string[],
  datasets: any[]
}

interface SellTrendsChartProps {
  saleData?: SellTrendsData
}

const SellTrendsChart: React.FC<SellTrendsChartProps> = ({ saleData }) => {
  const [data, setData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "This year",
        data: [12000, 7000, 9000, 16000, 25000, 20000, 23000],
        borderColor: "#7f1d1d",
        backgroundColor: "rgba(127, 29, 29, 0.1)",
        fill: true,
        tension: 0.2,
        pointRadius: 6,              // Size of the dot
        pointBorderWidth: 3,         // Thickness of outer ring
        pointBorderColor: '#000000', // Black border
        pointBackgroundColor: '#ffffff', // White fill
        pointHoverRadius: 8,
        pointHoverBorderWidth: 3,
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#000000',
      },
      {
        label: "Last year",
        data: [5000, 14000, 22000, 6000, 12000, 18000, 30000],
        borderColor: "#fca5a5",
        backgroundColor: "rgba(252, 165, 165, 0.05)",
        borderDash: [5, 5],
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
    ],
  });

  useEffect(() => {
    if (saleData) {
      setData({ ...saleData })
    }
  }, [saleData])


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          color: "#1f2937",
        },
      },
      tooltip: {
        enabled: true,
        intersect: false,
        padding: 12,
        backgroundColor: "rgba(255,255,255,0.95)",
        titleColor: "#374151", // dark text
        bodyColor: "#000",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 18,
        },
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            const value = context.parsed.y || 0;
            return value.toLocaleString(); // e.g., "11,598"
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value: any) {
            return value >= 1000 ? value / 1000 + "K" : value;
          },
          color: "#6b7280",
        },
        grid: {
          display: true,
        },
      },
      x: {
        ticks: {
          color: "#6b7280",
          padding: 10
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-[#333333] p-4 shadow-md bg-white w-full">
      <h2 className="font-semibold text-gray-700 mb-4">Sell Trends Over Times</h2>
      <div className="w-full md:h-96 h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SellTrendsChart;