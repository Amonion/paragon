'use client'

import BarGraphGrades from '@/components/Admin/BarGraphGrades'
import EventCalendarWidget from '@/components/Admin/EventCalendarWidget'
import LatestMessages from '@/components/Admin/LatestMessages'
import PieStudentGraph from '@/components/Admin/PieStudentGraph'
import StatDuration from '@/components/Admin/StatDuration'

export default function Home() {
  return (
    <>
      <div className="sm:space-y-5 space-y-2  text-[var(--text-primary)] w-full">
        {/* <div className="flex flex-wrap items-start lg:items-center justify-between mb-3">
          <div className="pageTitle mb-1 sm:mb-0">
            <span className="text-[var(--custom)] text-base mr-2 uppercase">
              CEO:
            </span>
            Paragon Farms Limited{' '}
          </div>
        </div> */}
        <StatDuration title="CEO: Paragon Farms Limited" url="" />
        {/* <SchoolDashboardCards /> */}

        <div className="flex flex-wrap">
          <div className="card_body pad w-full sm:w-auto mb-2 sm:mb-0 sm:flex-1 sm:mr-5">
            <BarGraphGrades />
          </div>
          <div className="card_body sharp w-full sm:max-w-[270px] min-w-[260px] sm:w-auto px-2 py-4 rounded-xl">
            <PieStudentGraph />
          </div>
        </div>
        <div className="flex w-full flex-col sm:flex-row">
          <LatestMessages />

          <div className="relative w-full sm:w-1/3">
            <EventCalendarWidget />
          </div>
        </div>
      </div>
    </>
  )
}
