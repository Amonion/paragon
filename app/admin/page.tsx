'use client'
import BarGraphGrades from '@/components/Admin/BarGraphGrades'
import LatestExpenses from '@/components/Admin/LatestExpenses'
import PieGraph from '@/components/Admin/PieGraph'
import StatDuration from '@/components/Admin/StatDuration'
import LatestTransactions from '@/components/Admin/Transaction/LatestTransactions'
import TransactionStore from '@/src/zustand/Transaction'
import { useEffect, useState } from 'react'

export default function Admin() {
  const defaultFrom = () => {
    const d = new Date()
    const day = d.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // Calculate how many days to subtract to get back to Monday
    const diffToMonday = day === 0 ? 6 : day - 1

    const monday = new Date(d)
    monday.setDate(d.getDate() - diffToMonday)
    monday.setHours(0, 0, 0, 0)

    return monday
  }

  const defaultTo = () => {
    const d = new Date()
    const day = d.getDay()

    // Calculate how many days to add to get to Sunday
    const diffToSunday = day === 0 ? 0 : 7 - day

    const sunday = new Date(d)
    sunday.setDate(d.getDate() + diffToSunday)
    sunday.setHours(23, 59, 59, 999)

    return sunday
  }

  const [fromDate, setFromDate] = useState<Date>(defaultFrom)
  const [toDate, setToDate] = useState<Date>(defaultTo)
  const { getTransactionBarchart, getLatestTransactions } = TransactionStore()

  useEffect(() => {
    if (fromDate && toDate) {
      getTransactionBarchart(
        `/transactions/barchart?dateFrom=${fromDate}&dateTo=${toDate}`
      )
      getLatestTransactions(
        `/transactions?dateFrom=${fromDate}&dateTo=${toDate}`
      )
    }
  }, [toDate, fromDate])

  return (
    <>
      <div className="sm:space-y-5 space-y-2  text-[var(--text-primary)] w-full">
        <StatDuration
          title="CEO: Paragon Farms Limited"
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
        />

        <div className="flex flex-wrap">
          <div className="card_body pad w-full sm:w-auto mb-2 sm:mb-0 sm:flex-1 sm:mr-5">
            <BarGraphGrades />
          </div>
          <div className="card_body sharp w-full sm:max-w-[270px] min-w-[260px] sm:w-auto px-2 py-4 rounded-xl">
            <PieGraph />
          </div>
        </div>
        <div className="flex w-full flex-col sm:flex-row">
          <LatestTransactions />

          <div className="relative w-full sm:w-1/3">
            <LatestExpenses />
          </div>
        </div>
      </div>
    </>
  )
}
