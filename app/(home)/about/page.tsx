'use client'
import Link from 'next/link'
import Image from 'next/image'
import Welcome from '@/components/Public/Welcome'
import Testimonial from '@/components/Public/Testimonial'

export default function Home() {
  return (
    <div>
      {/* ////About Blog1//// */}
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
              <div className="text-white text-[35px] font-bold mb-[8px]">
                Poultry Farm About us
              </div>
              <div className="flex items-center">
                <Link
                  href={'/'}
                  className="text-white text-[17px] mb-[3px] mr-1"
                >
                  Home /
                </Link>
                <div className="text-[var(--customColor)] text[17px]">
                  About
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ///////BLOG3 SECTION//////////// */}
      <Welcome />

      {/* ///About Blog2/// */}
      <div className="flex bg-[var(--backgroundColor)] justify-center pb-[100px]">
        <div className="customContainer text-center">
          <div className="grid grid-cols-4 gap-5 w-full">
            <div className="flex flex-col items-center  py-20 px-8 border-[3px] border-gray-100/40">
              <Image
                src="/poultryImage29.jpg"
                sizes="100vw"
                className="h-auto w-[65px] mb-3"
                width={0}
                height={0}
                alt="real"
              />
              <div className="text-[var(--primaryTextColor)] text-[20px] hover:text-[var(--customColor)] mb-3 font-bold">
                Products Range
              </div>
              <div className="text-[var(--secondaryTextColor)]">
                Conveniently customize recaptiualize focused inter without
                globally
              </div>
            </div>
            <div className="flex flex-col items-center border-[3px] border-gray-100/40 py-20 px-8">
              <Image
                src="/poultryImage30.jpg"
                sizes="100vw"
                className="h-auto w-[65px] mb-3"
                width={0}
                height={0}
                alt="real"
              />
              <div className="text-[var(--primaryTextColor)] text-[20px] hover:text-[var(--customColor)] mb-3 font-bold">
                Quality Matters
              </div>
              <div className="text-[var(--secondaryTextColor)]">
                Conveniently customize recaptiualize focused inter without
                globally
              </div>
            </div>
            <div className="flex flex-col items-center border-[3px] border-gray-100/40 py-20 px-8">
              <Image
                src="/poultryImage31.jpg"
                sizes="100vw"
                className="h-auto w-[65px] mb-3"
                width={0}
                height={0}
                alt="real"
              />
              <div className="text-[var(--primaryTextColor)] text-[20px] hover:text-[var(--customColor)] mb-3 font-bold">
                Products Range
              </div>
              <div className="text-[var(--secondaryTextColor)]">
                Conveniently customize recaptiualize focused inter without
                globally
              </div>
            </div>
            <div className="flex flex-col items-center border-[3px] border-gray-100/40 py-20 px-8">
              <Image
                src="/poultryImage32.jpg"
                sizes="100vw"
                className="h-auto w-[65px] mb-3"
                width={0}
                height={0}
                alt="real"
              />
              <div className="text-[var(--primaryTextColor)] text-[20px] hover:text-[var(--customColor)] mb-3 font-bold">
                Products Range
              </div>
              <div className="text-[var(--secondaryTextColor)]">
                Conveniently customize recaptiualize focused inter without
                globally
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ///About Blog3/// */}
      <div className="flex py-[100px] bg-[var(--secondaryCustomColor)] justify-center">
        <div className="customContainer">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="text-[var(--primaryTextColor)] text-[40px] font-bold">
                History
              </div>
              <div className="text-[var(--primaryTextColor)] text-[55px] mb-8 font-bold">
                30 Years Farm Traditions
              </div>
            </div>
            <div className="grid grid-cols-3 gap-7">
              <div className="flex flex-col col-span-2 bg-[var(--backgroundColor)] py-6 px-6">
                <Image
                  src="/poultryImage35.jpg"
                  sizes="100vw"
                  className="h-full w-full object-cover mb-4"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="flex">
                  <div className="flex flex-col mr-9">
                    <div className="text-[40px] text-[var(--primaryTextColor)] font-semibold">
                      Since
                    </div>
                    <div className="text-[55px] text-[var(--primaryTextColor)] font-bold">
                      1985
                    </div>
                  </div>
                  <div className="text text-[var(--secondaryTextColor)]">
                    Continually productize compelling quality for packed with
                    elated Productize compelling quality for packed with all
                    elated themv Setting up to website and creating pages
                    Continually productize compelling quality for packed with
                    elated Productize compelling quality
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-center bg-[var(--backgroundColor)] py-6">
                <div className="text-[35px] text-[var(--primaryTextColor)] font-bold mb-8">
                  Our Achievement
                </div>
                <div className="grid grid-cols-2 ">
                  <div className="flex flex-col items-center mb-10">
                    <Image
                      src="/poultryImage36.jpg"
                      sizes="100vw"
                      className="h-auto w-[50px] object-contain mb-3"
                      width={0}
                      height={0}
                      alt="real"
                    />
                    <div className="text-[20px] text-[var(--primaryTextColor)] font-bold mb-2">
                      32
                    </div>
                    <div className="text-[20px] text-[var(--secondaryTextColor)] font-bold">
                      Customers
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <Image
                      src="/poultryImage37.jpg"
                      sizes="100vw"
                      className="h-auto w-[50px] object-contain mb-3"
                      width={0}
                      height={0}
                      alt="real"
                    />
                    <div className="text-[20px] text-[var(--primaryTextColor)] font-bold mb-2">
                      1+
                    </div>
                    <div className="text-[20px] text-[var(--secondaryTextColor)] font-bold">
                      Award Won
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <Image
                      src="/poultryImage38.jpg"
                      sizes="100vw"
                      className="h-auto w-[50px] object-contain mb-3"
                      width={0}
                      height={0}
                      alt="real"
                    />
                    <div className="text-[20px] text-[var(--primaryTextColor)] font-bold mb-2">
                      28+
                    </div>
                    <div className="text-[20px] text-[var(--secondaryTextColor)] font-bold">
                      Volunteers
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <Image
                      src="/poultryImage39.jpg"
                      sizes="100vw"
                      className="h-auto w-[50px] object-contain mb-3"
                      width={0}
                      height={0}
                      alt="real"
                    />
                    <div className="text-[20px] text-[var(--primaryTextColor)] font-bold mb-2">
                      23k+
                    </div>
                    <div className="text-[20px] text-[var(--secondaryTextColor)] font-bold">
                      Poultry
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ////TESTIMONIAL SECTION//// */}
      <Testimonial />
    </div>
  )
}
