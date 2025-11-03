'use client'
import React from 'react'
import Link from 'next/link'
import { PageHeader } from '@/components/Public/PageBanner'

function Products() {
  return (
    <>
      <PageHeader page="Products" title="Paragon Poultry Products" />

      <div className="flex justify-center py-[90px] bg-[var(--backgroundColor)]">
        <div className="customContainer">
          <div className="flex flex-col items-center">
            <div className="flex flex-col text-center max-w-[450px]">
              <div className="text-[30px] text-[var(--primaryTextColor)] mb-2 font-bold">
                Poultry Farm Products
              </div>
              <div className="text-[16px] text-[var(--secondaryTextColor)] mb-18">
                Conveniently customize proactive web services for leveraged
                interfaces without Globally
              </div>
            </div>
            <Products />
            <Link
              className="text-[20px] text-white bg-[var(--customColor)] rounded py-[10px] px-[30px]"
              href={'/'}
            >
              SIGN IN
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products
