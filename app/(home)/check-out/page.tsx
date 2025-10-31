'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function CheckOut() {
  return (
    <div>
      {/*//// CheckOut Section 1 ////*/}
      <div className="relative">
        <Image
          src="/poultryImage34.jpg"
          sizes="100vw"
          className="h-full w-full object-cover absolute z-0"
          width={0}
          height={0}
          alt="paragon"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-0" />
        <div className="flex w-full justify-center">
          <div className="customContainer relative z-10">
            <div className="flex items-center flex-col z-20 min-h-[45vh] justify-center">
              <div className="text-white md:text-[35px] text-[28px] font-bold mb-[8px]">
                Check-Out Product
              </div>
              <div className="flex items-center">
                <Link
                  href={'/'}
                  className="text-white text-[17px] mb-[3px] mr-1"
                >
                  Home /
                </Link>
                <div className="text-[var(--customColor)] text-[17px]">
                  Check-Out
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*//// Check-Out Section 2////*/}
      <div className="flex py-[100px] justify-center bg-[var(--backgroundColor)]">
        <div className="customContainer">
          <div className="flex flex-col items-center ">
            <div className="mb-4 max-w-[800px]">
              <div className="flex px-7 py-8 flex-col shadow-sm mb-6">
                <div className="flex items-center flex-wrap ">
                  <div className="flex md:flex-col items-center mb-3 md:mb-0">
                    <div className="mb-3">
                      <Image
                        src="/poultryImage16.jpg"
                        sizes="100vw"
                        className="md:h-[70px] h-[85px] md:w-[70px] w-[85px] md:mr-0 mr-4"
                        width={0}
                        height={0}
                        alt="real"
                      />
                    </div>
                    <div className="text-[20px] text-[var(--primaryTextColor)]">
                      Crate of Egg
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                    <div className="flex text-[20px] mr-4 border-r-gray-300 border-r pr-[16px]">
                      <span className="mr-2 ">Price</span>
                      <span>N5000</span>
                    </div>
                    <div className="flex text-[20px] mr-4">
                      <span className="mr-2">Total</span>
                      <span className="mr-2">N5000</span>
                    </div>

                    <div className="flex w-full text-[20px]">
                      <div className="flex justify-center h-[30px] w-[35px] cursor-pointer items-center border border-gray-200 rounded-[5px]">
                        <i className="bi bi-dash text-[var(--primaryTextColor)]"></i>
                      </div>
                      <div className="text-[var(--primaryTextColor)] px-3">
                        <span className="mr-2">Qty</span>
                        <span>4</span>
                      </div>
                      <div className="flex justify-center h-[30px] w-[35px] cursor-pointer items-center border border-gray-200 rounded-[5px]">
                        <i className="bi bi-plus text-[var(--primaryTextColor)]"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex px-7 py-8 flex-col shadow-sm mb-6">
                <div className="flex">
                  <div className="text-[20px] text-[var(--primaryTextColor)] mr-4">
                    Total
                  </div>
                  <div className="text-[20px] text-[var(--primaryTextColor)]">
                    N5000
                  </div>
                </div>
              </div>
            </div>
            <Link
              className="text-[20px] text-white bg-[var(--customColor)] rounded py-[10px] px-[30px]"
              href={'/'}
            >
              Make Payment
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOut
