/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect, useState } from 'react';
import SalesByCategoryChart, { CategorySaleData } from '@/components/chart/SalesByCategoryChart';
import SellTrendsChart, { SellTrendsData } from '@/components/chart/SellTrendsChart';
import TopSellingProductChart, { TopSaleData } from '@/components/chart/TopSellingProductChart';
import { StatsCard, StatsCardProps } from '@/components/ui/StatsCard';
import { addDays, format } from "date-fns";
import DateRangePickerComponent from '@/components/DateRangePicker';
import { getAPI, postAPI } from '@/services/apiService';
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const [statusData, setStatusData] = useState<StatsCardProps[]>([]);
  const [saleTrends, setSaleTrends] = useState<SellTrendsData>();
  const [topSale, setTopSale] = useState<TopSaleData>();
  const [categorySale, setCategoryData] = useState<CategorySaleData>();
  const [collection, setCollection] = useState([{
    id: 0,
    name: 'Collection'
  }]);
  const [isLoading, setIsLoading] = useState(false);
  const [collectionSelected, setCollectionSelected] = useState(0);
  const [range, setRange] = useState(
    {
      startDate: addDays(new Date(), -1),
      endDate: new Date(),
    },
  );

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useRouter();
  const getTopData = async () => {
    setIsLoading(true);
    try {
      const payload = {
        collectionId: collectionSelected,
        startDate: range.startDate,
        endDate: range.endDate
      }
      const response = await getAPI('/admin/metric/topMetrics', payload);
      setStatusData(response.data)

    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 401) {
        // login fail
        navigate.push('/login');
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getSellTrend = async () => {
    setIsLoading(true);
    try {
      const payload = {
        collectionId: collectionSelected,
        startDate: range.startDate,
        endDate: range.endDate
      }
      const response = await getAPI('/admin/metric/sellTrend', payload);
      setSaleTrends(response.data)

    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 401) {
        // login fail
        navigate.push('/login');
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getTopSelling = async () => {
    setIsLoading(true);
    try {
      const payload = {
        collectionId: collectionSelected,
        startDate: range.startDate,
        endDate: range.endDate
      }
      const response = await getAPI('/admin/metric/topSelling', payload);
      setTopSale(response.data)

    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 401) {
        // login fail
        navigate.push('/login');
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getCategorySelling = async () => {
    setIsLoading(true);
    try {
      const payload = {
        collectionId: collectionSelected,
        startDate: range.startDate,
        endDate: range.endDate
      }
      const response = await getAPI('/admin/metric/saleByCategory', payload);
      setCategoryData(response.data)

    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 401) {
        // login fail
        navigate.push('/login');
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getCollection = async () => {
    setIsLoading(true);
    try {
      const response = await getAPI('/admin/collection/getAll');
      setCollection([{
        id: 0,
        name: 'Collection'
      }, ...response.data])

    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 401) {
        // login fail
        navigate.push('/login');
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTopData();
    getSellTrend();
    getTopSelling();
    getCategorySelling();
  }, [collectionSelected, range])

  useEffect(() => {
    getCollection();
  }, [])

  return (
    <div className='md:pt-4 flex flex-col gap-4'>
      <div className='flex flex-col md:flex-row md:items-center mb-4 justify-start'>
        <h3 className='hidden lg:block font-semibold'>Overview</h3>
        <div className='flex flex-col gap-2 justify-end w-full items-center'>
          <div className='flex flex-row w-full justify-end gap-2'>
            <select className='rounded-md hover:bg-gray-300 transition duration-200 p-1 cursor-pointer' onChange={(e) => setCollectionSelected(Number(e.target.value))}>
              {collection.map((t, index) => <option key={`collection-option-${index}`} value={t.id}>{t.name}</option>)}
            </select>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="font-semibold rounded-md hover:bg-gray-300 transition duration-200 p-1 cursor-pointer"
            >
              {`${format(range.startDate, "MMM dd")} → ${format(
                range.endDate,
                "MMM dd"
              )}`}
            </button>

          </div>
          <div className='flex w-full justify-end'>
            <DateRangePickerComponent isOpen={isOpen} onChangeDate={setRange} close={() => setIsOpen(false)} />
          </div>


        </div>
      </div>

      <div className="flex flex-wrap gap-2 lg:gap-6 2xl:gap-14">
        {statusData.map((t, index) => <StatsCard title={t.title} value={t.value} percent={t.percent} trendUp={t.trendUp} bgColor={t.bgColor} key={`top-card-${index}`} />)}
      </div>
      <div>
        <SellTrendsChart saleData={saleTrends}/>
      </div>
      <div className='flex 2xl:flex-row flex-col gap-4 lg:gap-2 w-full'>
        <div className='flex w-full'>
          <TopSellingProductChart saleData={topSale}/>
        </div>
        <div className='flex w-full'>
          <SalesByCategoryChart saleData={categorySale}/>
        </div>

      </div>

    </div>
  );
}

export default Home;
