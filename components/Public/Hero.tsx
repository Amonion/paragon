'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

export default function Hero() {
  return (
    <section className=" flex relative w-full justify-center">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false, // keeps autoplay after user swipes
        }}
        spaceBetween={0}
        slidesPerView={1}
        speed={1500} // 🔥 Smooth transition (1 second)
        loop={true} // continuous loop for seamless feel
        className="w-full transition-transform duration-1000 ease-in-out"
      >
        <SwiperSlide>
          <Image
            src="/poultryImage1.jpg"
            sizes="100vw"
            className="h-full w-full object-cover absolute z-0"
            width={0}
            height={0}
            alt="paragon"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0" />
          <div className="flex w-full justify-center">
            <div className="customContainer relative z-10">
              <div className="flex items-center flex-col z-20 min-h-[80vh] justify-center">
                <div className="text-white text-[48px] font-bold mb-[5px]">
                  Fresh Killed Poultry
                </div>
                <div className="text-white text-[48px] mb-[3px] font-semibold/10">
                  Chikens Specialty Game Meats
                </div>
                <div className="text-white text-[48px] mb-5 font-semibold/10">
                  Eggs And More!!!
                </div>
                <Link
                  href={'/'}
                  className="text-white rounded bg-[var(--customColor)] text-[13px] px-[20px] py-[10px] font-bold"
                >
                  DICOVER NOW
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/poultryImage1.jpg"
            sizes="100vw"
            className="h-full w-full object-cover absolute z-0"
            width={0}
            height={0}
            alt="paragon"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0" />
          <div className="flex w-full justify-center">
            <div className="customContainer relative z-10">
              <div className="flex items-center flex-col z-20 min-h-[80vh] justify-center">
                <div className="text-white text-[48px] font-bold mb-[5px]">
                  Fresh Killed Poultry
                </div>
                <div className="text-white text-[48px] mb-[3px] font-semibold/10">
                  Chikens Specialty Game Meats
                </div>
                <div className="text-white text-[48px] mb-5 font-semibold/10">
                  Eggs And More!!!
                </div>
                <Link
                  href={'/'}
                  className="text-white rounded bg-[var(--customColor)] text-[13px] z-20 px-[20px] py-[10px] font-bold"
                >
                  DICOVER NOW
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/poultryImage1.jpg"
            sizes="100vw"
            className="h-full w-full object-cover absolute z-0"
            width={0}
            height={0}
            alt="paragon"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0" />
          <div className="flex w-full justify-center">
            <div className="customContainer relative z-10">
              <div className="flex items-center flex-col z-20 min-h-[80vh] justify-center">
                <div className="text-white text-[48px] font-bold mb-[5px]">
                  Fresh Killed Poultry
                </div>
                <div className="text-white text-[48px] mb-[3px] font-semibold/10">
                  Chikens Specialty Game Meats
                </div>
                <div className="text-white text-[48px] mb-5 font-semibold/10">
                  Eggs And More!!!
                </div>
                <Link
                  href={'/'}
                  className="text-white rounded bg-[var(--customColor)] text-[13px] z-20 px-[20px] py-[10px] font-bold"
                >
                  DICOVER NOW
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  )
}
