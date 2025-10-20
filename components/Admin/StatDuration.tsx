'use client'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import { useState } from 'react'
import { AuthStore } from '@/src/zustand/user/AuthStore'
import TransactionStore from '@/src/zustand/Transaction'

interface StatDurationProps {
  url: string
  title: string
}
const StatDuration: React.FC<StatDurationProps> = ({ url, title }) => {
  const [showPicker, setShowPicker] = useState(false)
  const [showToPicker, setShowToPicker] = useState(false)
  const { user } = AuthStore()

  const {
    period,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    setPeriod,
    getUtility,
  } = TransactionStore()

  const getData = () => {
    if (url) {
      getUtility(
        `${url}/?period=${period}&username=${user?.username}&dateFrom=${fromDate}&dateTo=${toDate}`
      )
    }
  }

  return (
    <div className="flex flex-wrap items-start lg:items-center justify-between mb-3">
      <div className="pageTitle mb-1 sm:mb-0">{title}</div>
      {period === 'custom' ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="relative">
            <div
              onClick={() => setShowPicker(!showPicker)}
              className="statDuration start cursor-pointer flex items-center"
            >
              <DateLabel label={'From'} />
              {fromDate ? fromDate.toLocaleDateString('en-GB') : 'dd/mm/yyyy'}
            </div>
            {showPicker && (
              <div className="absolute top-full mt-2 z-50 bg-[var(--white)] shadow-lg rounded-lg p-2">
                <DatePicker
                  selected={fromDate}
                  onChange={(date) => {
                    if (date) {
                      setFromDate(date)
                    }
                    setShowPicker(false)
                  }}
                  inline
                />
              </div>
            )}
          </div>
          <div className="relative">
            <div
              onClick={() => setShowToPicker(!showToPicker)}
              className="statDuration start cursor-pointer flex items-center"
            >
              <DateLabel label={'To'} />
              {toDate ? toDate.toLocaleDateString('en-GB') : 'dd/mm/yyyy'}
            </div>
            {showToPicker && (
              <div className="absolute right-0 top-full mt-2 z-50 bg-[var(--white)] shadow-lg rounded-lg p-2">
                <DatePicker
                  selected={toDate}
                  onChange={(date) => {
                    if (date) {
                      setToDate(date)
                    }
                    setShowToPicker(false)
                  }}
                  inline
                />
              </div>
            )}
          </div>
          <div onClick={getData} className={`statDuration `}>
            Fetch
          </div>
          <div
            onClick={() => setPeriod(period === 'custom' ? 'week' : 'custom')}
            className={`statDuration ${period === 'custom' ? 'active' : ''}`}
          >
            Custom
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          <div
            onClick={() => setPeriod('week')}
            className={`statDuration ${period === 'week' ? 'active' : ''}`}
          >
            Weekly
          </div>
          <div
            onClick={() => setPeriod('month')}
            className={`statDuration ${period === 'month' ? 'active' : ''}`}
          >
            Monthly
          </div>
          <div
            onClick={() => setPeriod('year')}
            className={`statDuration ${period === 'year' ? 'active' : ''}`}
          >
            Yearly
          </div>
          <div
            onClick={() => setPeriod(period === 'custom' ? 'week' : 'custom')}
            className={`statDuration ${period === 'custom' ? 'active' : ''}`}
          >
            Custom
          </div>
        </div>
      )}
    </div>
  )
}

const DateLabel = ({ label }: { label: string }) => {
  return (
    <>
      <i className="bi bi-calendar mr-2 sm:mr-1"></i>
      <div className="text-[var(--custom)] mr-2">{label}:</div>
    </>
  )
}

export default StatDuration
