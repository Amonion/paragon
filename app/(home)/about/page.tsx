'use client'
import Image from 'next/image'
import Welcome from '@/components/Public/Welcome'
import Testimonial from '@/components/Public/Testimonial'
import { PageHeader } from '@/components/Public/PageBanner'
import Qualities from '@/components/Public/Qualities'

export default function Home() {
  return (
    <div>
      <PageHeader page="About" title="About Paragon Farms" />

      <Welcome />

      <Qualities />

      {/* ///About Blog3/// */}
      <div className="flex py-[100px] bg-[var(--secondaryCustomColor)] justify-center">
        <div className="customContainer">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="text-[var(--primaryTextColor)] text-[40px] font-bold">
                History
              </div>
              <div className="text-[var(--primaryTextColor)] text-[55px] mb-8 font-bold">
                3 Years Farm Traditions
              </div>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-7">
              <div className="flex flex-col sm:col-span-2 bg-[var(--backgroundColor)] py-6 px-6">
                <Image
                  src="/images/ceo.jpg"
                  sizes="100vw"
                  className="h-full w-full object-cover mb-4"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="flex flex-wrap">
                  <div className="flex flex-col mr-9">
                    <div className="text-[30px] sm:text-[40px] text-[var(--primaryTextColor)] font-semibold">
                      Since
                    </div>
                    <div className="text-[35px] sm:text-[55px] text-[var(--primaryTextColor)] font-bold">
                      2022
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
                      src="/images/care.png"
                      sizes="100vw"
                      className="h-[50px] w-auto object-contain mb-3"
                      width={0}
                      height={0}
                      alt="real"
                    />
                    <div className="text-[20px] text-[var(--primaryTextColor)] font-bold mb-2">
                      24/7
                    </div>
                    <div className="text-[20px] text-[var(--secondaryTextColor)] font-bold">
                      Customer Support
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <Image
                      src="/images/award.png"
                      sizes="100vw"
                      className="h-[50px] w-auto object-contain mb-3"
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
                      src="/images/customers.png"
                      sizes="100vw"
                      className="h-[50px] w-auto object-contain mb-3"
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
                      src="/images/birds.png"
                      sizes="100vw"
                      className="h-[50px] w-auto object-contain mb-3"
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
      <div className="f ">
        {' '}
        <Testimonial />
      </div>
    </div>
  )
}
