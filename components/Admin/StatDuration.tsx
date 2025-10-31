'use client'
import 'react-datepicker/dist/react-datepicker.css'
import TransactionStore from '@/src/zustand/Transaction'

interface StatDurationProps {
  url: string
  title: string
}
const StatDuration: React.FC<StatDurationProps> = ({ title }) => {
  const { fromDate, toDate, setFromDate, setToDate, setPeriod } =
    TransactionStore()

  return (
    <div className="flex flex-wrap items-start lg:items-center mb-3 text-[var(--text-secondary)]">
      <div className="pageTitle mb-1 sm:mb-0">{title}</div>

      <div className="grid grid-cols-2 gap-2 ml-auto">
        <label
          htmlFor="from"
          className="statDuration start cursor-pointer flex items-center"
        >
          <input
            id="from"
            type="datetime-local"
            value={
              fromDate ? new Date(fromDate).toISOString().slice(0, 16) : ''
            }
            onChange={(e) => setFromDate(new Date(e.target.value))}
            className="border-none outline-none bg-transparent"
          />
        </label>

        <label
          htmlFor="to"
          className="statDuration start cursor-pointer flex items-center"
        >
          <input
            id="to"
            type="datetime-local"
            value={toDate ? new Date(toDate).toISOString().slice(0, 16) : ''}
            onChange={(e) => setToDate(new Date(e.target.value))}
            className="border-none outline-none bg-transparent"
          />
        </label>
      </div>
      {(fromDate || toDate) && (
        <div
          onClick={setPeriod}
          className="w-10 h-10 flex justify-center items-center bg-[var(--primary)] cursor-pointer ml-2"
        >
          <i className="bi bi-x-lg text-[var(--customRedColor)]"></i>
        </div>
      )}
    </div>
  )
}

export default StatDuration
