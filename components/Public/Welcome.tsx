import React from 'react'
import Image from 'next/image'

function Welcome() {
  return (
    <div className="flex justify-center bg-[var(--backgroundColor)] py-[75px]">
      <div className="customContainer">
        <div className="grid md:grid-cols-2 gap-3 px-[12px]">
          <Image
            src="/poultryImage2.jpg"
            sizes="100vw"
            className="h-full w-full object-contain"
            width={0}
            height={0}
            alt="real"
          />
          <div className="flex flex-col items-start">
            <div className="md:text-[40px] text-[25px] text-[var(--primaryTextColor)] font-bold mb-6">
              Welcome to Our Poultry And Egg Farm.
            </div>
            <div className="text-[var(--secondaryTextColor)] mb-6">
              Continually productize compelling quality for packed with Elated
              productize compelling quality for packed with all Elated
              ThemSetting up to website and creating pages.
            </div>
            <div className="flex flex=col ">
              <div className="text-[var(--customColor)] mr-2">
                <i className="bi bi-check2-square"></i>
              </div>
              <div className="text-[var(--secondaryTextColor)] mb-3">
                We are providing different services
              </div>
            </div>
            <div className="flex flex=col ">
              <div className="text-[var(--customColor)] mr-2">
                <i className="bi bi-check2-square"></i>
              </div>
              <div className="text-[var(--secondaryTextColor)] mb-3">
                We are providing different services
              </div>
            </div>
            <div className="flex flex=col">
              <div className="text-[var(--customColor)] mr-2">
                <i className="bi bi-check2-square"></i>
              </div>
              <div className="text-[var(--secondaryTextColor)] mb-3">
                We are providing different services
              </div>
            </div>
            <div className="flex flex=col ">
              <div className="text-[var(--customColor)] mr-2">
                <i className="bi bi-check2-square"></i>
              </div>
              <div className="text-[var(--secondaryTextColor)] mb-3">
                We are providing different services
              </div>
            </div>
            <div className="flex flex=col">
              <div className="text-[var(--customColor)] mr-2">
                <i className="bi bi-check2-square"></i>
              </div>
              <div className="text-[var(--secondaryTextColor)] mb-6">
                We are providing different services
              </div>
            </div>
            <div className="text-white text-[15px] rounded bg-[var(--customColor)] px-[22px] py-[13px] font-bold">
              READ MORE
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
