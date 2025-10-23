'use client'
import Link from 'next/link'
import Hero from '@/components/Public/Hero'
import Image from 'next/image'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Welcome from '@/components/Public/Welcome'
import Testimonial from '@/components/Public/Testimonial'

export default function Home() {
  return (
    <div>
      <Hero />

      {/* ///////WELCOME SECTION//////////// */}
      <Welcome />

      {/* ///////BLOG1 SECTION//////////// */}
      <div className="flex justify-center py-[90px] bg-[var(--secondaryCustomColor)]">
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
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full gap-4 mb-9">
              <div className="flex flex-col items-center shadow-[0_2px_6px_rgba(0,0,0,0.1)] rounded-[15px] bg-[var(--backgroundColor)] p-3 md:p-7">
                <Image
                  src="/poultryImage3.jpg"
                  sizes="100vw"
                  className="h-full w-full object-contain bg-[var(--secondaryTextColor)] mb-7"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="flex mb-1 md:text-[20px] text-[17px]">
                  <i className="bi bi-star text-[var(--customColor)] mr-1"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1"></i>
                  <i className="bi bi-star text-[var(--customColor)]"></i>
                </div>
                <div className="text-[var(--primaryTextColor md:text-[22px]  md:font-bold mb-2 text-center">
                  Light Brown Eggs
                </div>
                <div className="flex">
                  <div className="text-[var(--customColor)] text-[18px] font-bold mr-3">
                    $29.99
                  </div>
                  <div className="text-[var(--primaryTextColor)] text-[18px] font-bold line-through mb-3">
                    $49.99
                  </div>
                </div>
                <div className="flex w-full justify-evenly">
                  <div className="flex justify-center h-[30px] w-[35px] cursor-pointer items-center border border-gray-200 rounded-[5px]">
                    <i className="bi bi-dash text-[var(--primaryTextColor)]"></i>
                  </div>
                  <div className="text-[var(--primaryTextColor)] text-[15px]">
                    9
                  </div>
                  <div className="flex justify-center h-[30px] w-[35px] cursor-pointer items-center border border-gray-200 rounded-[5px]">
                    <i className="bi bi-plus text-[var(--primaryTextColor)]"></i>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center shadow-[0_2px_6px_rgba(0,0,0,0.1)] rounded-[15px] bg-[var(--backgroundColor)] p-3 md:p-7">
                <Image
                  src="/poultryImage3.jpg"
                  sizes="100vw"
                  className="h-full w-full object-contain bg-[var(--secondaryTextColor)] mb-7"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="flex mb-1 md:text-[20px] text-[17px]">
                  <i className="bi bi-star text-[var(--customColor)] mr-1"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1"></i>
                  <i className="bi bi-star text-[var(--customColor)]"></i>
                </div>
                <div className="text-[var(--primaryTextColor md:text-[22px] md:font-bold mb-2 text-center">
                  Light Brown Eggs
                </div>
                <div className="flex">
                  <div className="text-[var(--customColor)] text-[18px] font-bold mr-3">
                    $29.99
                  </div>
                  <div className="text-[var(--primaryTextColor)] text-[18px] font-bold line-through mb-3">
                    $49.99
                  </div>
                </div>
                <div className="flex w-full justify-evenly">
                  <div className="flex justify-center h-[30px] w-[35px] cursor-pointer items-center border border-gray-200 rounded-[5px]">
                    <i className="bi bi-dash text-[var(--primaryTextColor)]"></i>
                  </div>
                  <div className="text-[var(--primaryTextColor)] text-[15px]">
                    9
                  </div>
                  <div className="flex justify-center h-[30px] w-[35px] cursor-pointer items-center border border-gray-200 rounded-[5px]">
                    <i className="bi bi-plus text-[var(--primaryTextColor)]"></i>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center shadow-[0_2px_6px_rgba(0,0,0,0.1)] rounded-[15px] bg-[var(--backgroundColor)] py-7 px-6">
                <Image
                  src="/poultryImage4.jpg"
                  sizes="100vw"
                  className="h-full w-full object-contain bg-[var(--secondaryTextColor)] mb-7"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="flex mb-1">
                  <i className="bi bi-star text-[var(--customColor)] mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)] text-[22px]"></i>
                </div>
                <div className="text-[var(--primaryTextColor text-[22px] font-bold mb-2">
                  Light Brown Eggs
                </div>
                <div className="flex">
                  <div className="text-[var(--customColor)] text-[18px] font-bold mr-3">
                    $29.99
                  </div>
                  <div className="text-[var(--primaryTextColor)] text-[18px] font-bold line-through">
                    $49.99
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center shadow-[0_2px_6px_rgba(0,0,0,0.1)] rounded-[15px] bg-[var(--backgroundColor)] py-7 px-6">
                <Image
                  src="/poultryImage5.jpg"
                  sizes="100vw"
                  className="h-full w-full object-contain bg-[var(--secondaryTextColor)] mb-7"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="flex mb-1">
                  <i className="bi bi-star text-[var(--customColor)] mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)] text-[22px]"></i>
                </div>
                <div className="text-[var(--primaryTextColor text-[22px] font-bold mb-2">
                  Light Brown Eggs
                </div>
                <div className="flex">
                  <div className="text-[var(--customColor)] text-[18px] font-bold mr-3">
                    $29.99
                  </div>
                  <div className="text-[var(--primaryTextColor)] text-[18px] font-bold line-through">
                    $49.99
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center shadow-[0_2px_6px_rgba(0,0,0,0.1)] rounded-[15px] bg-[var(--backgroundColor)] py-7 px-6">
                <Image
                  src="/poultryImage3.jpg"
                  sizes="100vw"
                  className="h-full w-full object-contain bg-[var(--secondaryTextColor)] mb-7"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="flex mb-1">
                  <i className="bi bi-star text-[var(--customColor)] mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)] text-[22px]"></i>
                </div>
                <div className="text-[var(--primaryTextColor text-[22px] font-bold mb-2">
                  Light Brown Eggs
                </div>
                <div className="flex">
                  <div className="text-[var(--customColor)] text-[18px] font-bold mr-3">
                    $29.99
                  </div>
                  <div className="text-[var(--primaryTextColor)] text-[18px] font-bold line-through">
                    $49.99
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center shadow-[0_2px_6px_rgba(0,0,0,0.1)] rounded-[15px] bg-[var(--backgroundColor)] py-7 px-6">
                <Image
                  src="/poultryImage3.jpg"
                  sizes="100vw"
                  className="h-full w-full object-contain bg-[var(--secondaryTextColor)] mb-7"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="flex mb-1">
                  <i className="bi bi-star text-[var(--customColor)] mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)] text-[22px]"></i>
                </div>
                <div className="text-[var(--primaryTextColor text-[22px] font-bold mb-2">
                  Light Brown Eggs
                </div>
                <div className="flex">
                  <div className="text-[var(--customColor)] text-[18px] font-bold mr-3">
                    $29.99
                  </div>
                  <div className="text-[var(--primaryTextColor)] text-[18px] font-bold line-through">
                    $49.99
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center shadow-[0_2px_6px_rgba(0,0,0,0.1)] rounded-[15px] bg-[var(--backgroundColor)] py-7 px-6">
                <Image
                  src="/poultryImage3.jpg"
                  sizes="100vw"
                  className="h-full w-full object-contain bg-[var(--secondaryTextColor)] mb-7"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="flex mb-1">
                  <i className="bi bi-star text-[var(--customColor)] mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)] text-[22px]"></i>
                </div>
                <div className="text-[var(--primaryTextColor text-[22px] font-bold mb-2">
                  Light Brown Eggs
                </div>
                <div className="flex">
                  <div className="text-[var(--customColor)] text-[18px] font-bold mr-3">
                    $29.99
                  </div>
                  <div className="text-[var(--primaryTextColor)] text-[18px] font-bold line-through">
                    $49.99
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center shadow-[0_2px_6px_rgba(0,0,0,0.1)] rounded-[15px] bg-[var(--backgroundColor)] py-7 px-6">
                <Image
                  src="/poultryImage3.jpg"
                  sizes="100vw"
                  className="h-full w-full object-contain bg-[var(--secondaryTextColor)] mb-7"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="flex mb-1">
                  <i className="bi bi-star text-[var(--customColor)] mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)] text-[22px]"></i>
                </div>
                <div className="text-[var(--primaryTextColor text-[22px] font-bold mb-2">
                  Light Brown Eggs
                </div>
                <div className="flex">
                  <div className="text-[var(--customColor)] text-[18px] font-bold mr-3">
                    $29.99
                  </div>
                  <div className="text-[var(--primaryTextColor)] text-[18px] font-bold line-through">
                    $49.99
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center shadow-[0_2px_6px_rgba(0,0,0,0.1)] rounded-[15px] bg-[var(--backgroundColor)] py-7 px-6">
                <Image
                  src="/poultryImage3.jpg"
                  sizes="100vw"
                  className="h-full w-full object-contain bg-[var(--secondaryTextColor)] mb-7"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="flex mb-1">
                  <i className="bi bi-star text-[var(--customColor)] mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)]  mr-1 text-[20px]"></i>
                  <i className="bi bi-star text-[var(--customColor)] text-[22px]"></i>
                </div>
                <div className="text-[var(--primaryTextColor text-[22px] font-bold mb-2">
                  Light Brown Eggs
                </div>
                <div className="flex">
                  <div className="text-[var(--customColor)] text-[18px] font-bold mr-3">
                    $29.99
                  </div>
                  <div className="text-[var(--primaryTextColor)] text-[18px] font-bold line-through">
                    $49.99
                  </div>
                </div>
              </div>
            </div>
            <Link
              className="text-[20px] text-white bg-[var(--customColor)] rounded py-[10px] px-[30px]"
              href={'/'}
            >
              SIGN IN
            </Link>
          </div>
        </div>
      </div>

      {/* ///////BLOG2 SECTION//////////// */}

      <div className="flex justify-center py-[90px] bg-[var(--backgroundColor)]">
        <div className="customContainer">
          <div className="flex flex-col items-center">
            <div className="flex flex-col text-center max-w-[450px]">
              <div className="text-[30px] text-[var(--primaryTextColor)] mb-2 font-bold">
                Poultry Farm Services
              </div>
              <div className="text-[16px] text-[var(--secondaryTextColor)] mb-18">
                Conveniently customize proactive web services for leveraged
                interfaces without Globally
              </div>
            </div>

            <div className="grid md:grid-cols-3 w-full gap-7">
              <div className="flex flex-col shadow py-[15px] px-[25px]">
                <div className="flex mb-6 items-center">
                  <Image
                    src="/poultryImage6.jpg"
                    sizes="100vw"
                    className="h-auto w-[70px] object-contain mr-4"
                    width={0}
                    height={0}
                    alt="real"
                  />
                  <div className="text-[var(--primaryTextColor)] text-[20px] font-bold hover:text-[var(--customColor)]">
                    Alternative egg
                  </div>
                </div>
                <div className="text-[var(--secondaryTextColor)]">
                  Continually aggregate frictionle enthusias generate user
                  friendly vortals empowered without globally results.
                </div>
              </div>
              <div className="flex flex-col shadow py-[15px] px-[25px]">
                <div className="flex mb-6 items-center">
                  <Image
                    src="/poultryImage7.jpg"
                    sizes="100vw"
                    className="h-auto w-[70px] object-contain mr-4"
                    width={0}
                    height={0}
                    alt="real"
                  />
                  <div className="text-[var(--primaryTextColor)] text-[20px] font-bold hover:text-[var(--customColor)]"></div>
                </div>
                <div className="text-[var(--secondaryTextColor)]">
                  Continually aggregate frictionle enthusias generate user
                  friendly vortals empowered without globally results.
                </div>
              </div>
              <div className="flex flex-col shadow py-[15px] px-[25px]">
                <div className="flex mb-6 items-center">
                  <Image
                    src="/poultryImage8.jpg"
                    sizes="100vw"
                    className="h-auto w-[70px] object-contain mr-4"
                    width={0}
                    height={0}
                    alt="real"
                  />
                  <div className="text-[var(--primaryTextColor)] text-[20px] font-bold hover:text-[var(--customColor)]">
                    Breeder Management
                  </div>
                </div>
                <div className="text-[var(--secondaryTextColor)]">
                  Continually aggregate frictionle enthusias generate user
                  friendly vortals empowered without globally results.
                </div>
              </div>
              <div className="flex flex-col shadow py-[15px] px-[25px]">
                <div className="flex mb-6 items-center">
                  <Image
                    src="/poultryImage9.jpg"
                    sizes="100vw"
                    className="h-auto w-[70px] object-contain mr-4"
                    width={0}
                    height={0}
                    alt="real"
                  />
                  <div className="text-[var(--primaryTextColor)] text-[20px] font-bold hover:text-[var(--customColor)]">
                    Poultry Climate
                  </div>
                </div>
                <div className="text-[var(--secondaryTextColor)]">
                  Continually aggregate frictionle enthusias generate user
                  friendly vortals empowered without globally results.
                </div>
              </div>
              <div className="flex flex-col shadow py-[15px] px-[25px]">
                <div className="flex mb-6 items-center">
                  <Image
                    src="/poultryImage10.jpg"
                    sizes="100vw"
                    className="h-auto w-[70px] object-contain mr-4"
                    width={0}
                    height={0}
                    alt="real"
                  />
                  <div className="text-[var(--primaryTextColor)] text-[20px] font-bold hover:text-[var(--customColor)]">
                    Residual Treatment
                  </div>
                </div>
                <div className="text-[var(--secondaryTextColor)]">
                  Continually aggregate frictionle enthusias generate user
                  friendly vortals empowered without globally results.
                </div>
              </div>
              <div className="flex flex-col shadow py-[15px] px-[25px]">
                <div className="flex mb-6 items-center">
                  <Image
                    src="/poultryImage11.jpg"
                    sizes="100vw"
                    className="h-auto w-[70px] object-contain mr-4"
                    width={0}
                    height={0}
                    alt="real"
                  />
                  <div className="text-[var(--primaryTextColor)] text-[20px] font-bold hover:text-[var(--customColor)]">
                    Exhaust Air Treament
                  </div>
                </div>
                <div className="text-[var(--secondaryTextColor)]">
                  Continually aggregate frictionle enthusias generate user
                  friendly vortals empowered without globally results.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ///////BLOG4 SECTION//////////// */}
      <div className="flex justify-center py-[90px] bg-[var(--secondaryCustomColor)]">
        <div className="flex flex-col items-center">
          <div className="flex flex-col text-center max-w-[450px]">
            <div className="text-[30px] text-[var(--primaryTextColor)] mb-2 font-bold">
              Poultry Farm Products
            </div>
            <div className="text-[16px] text-[var(--secondaryTextColor)] mb-18 px-2">
              Conveniently customize proactive web services for leveraged
              interfaces without Globally
            </div>
          </div>
          <div className="grid md:grid-cols-4 grid-cols-2 w-full md:gap-7 gap-4 mb-9 px-[12px]">
            <div className="md:h-[400px] h-[200px]">
              <Image
                src="/poultryImage12.jpg"
                sizes="100vw"
                className="h-full w-full object-cover"
                width={0}
                height={0}
                alt="real"
              />
            </div>
            <div className="md:h-[400px] h-[200px]">
              <Image
                src="/poultryImage13.jpg"
                sizes="100vw"
                className="h-full w-full object-cover"
                width={0}
                height={0}
                alt="real"
              />
            </div>
            <div className="md:h-[400px] h-[200px]">
              <Image
                src="/poultryImage14.jpg"
                sizes="100vw"
                className="h-full w-full object-cover"
                width={0}
                height={0}
                alt="real"
              />
            </div>
            <div className="md:h-[400px] h-[200px]">
              <Image
                src="/poultryImage15.jpg"
                sizes="100vw"
                className="h-full w-full object-cover"
                width={0}
                height={0}
                alt="real"
              />
            </div>
            <div className="md:h-[400px] h-[200px]">
              <Image
                src="/poultryImage16.jpg"
                sizes="100vw"
                className="h-full w-full object-cover"
                width={0}
                height={0}
                alt="real"
              />
            </div>
            <div className="md:h-[400px] h-[200px]">
              <Image
                src="/poultryImage17.jpg"
                sizes="100vw"
                className="h-full w-full object-cover"
                width={0}
                height={0}
                alt="real"
              />
            </div>
            <div className="md:h-[400px] h-[200px]">
              <Image
                src="/poultryImage18.jpg"
                sizes="100vw"
                className="h-full w-full object-cover"
                width={0}
                height={0}
                alt="real"
              />
            </div>
            <div className="md:h-[400px] h-[200px]">
              <Image
                src="/poultryImage19.jpg"
                sizes="100vw"
                className="h-full w-full object-cover"
                width={0}
                height={0}
                alt="real"
              />
            </div>
          </div>
          <Link
            className="text-[20px] text-white bg-[var(--customColor)] rounded py-[10px] px-[30px]"
            href={'/'}
          >
            LOAD GALLERY
          </Link>
        </div>
      </div>

      {/* /////// STAFF SECTION //////////// */}
      <div className="flex justify-center py-[90px] bg-[var(--backgroundColor)]">
        <div className="customContainer">
          <div className="flex flex-col items-center">
            <div className="flex flex-col text-center max-w-[450px]">
              <div className="text-[30px] text-[var(--primaryTextColor)] mb-2 font-bold">
                Our Team Member
              </div>
              <div className="text-[16px] text-[var(--secondaryTextColor)] mb-18">
                Conveniently customize proactive web services for leveraged
                interfaces without Globally
              </div>
            </div>
            <div className="grid md:grid-cols-4 w-full gap-7">
              <div className="flex flex-col items-center">
                <div className="h-[250px] w-full mb-4">
                  <Image
                    src="/poultryImage20.jpg"
                    sizes="100vw"
                    className="h-full w-full object-cover"
                    width={0}
                    height={0}
                    alt="real"
                  />
                </div>
                <div className="flex flex-col items-center shadow w-full rounded pb-[25px]">
                  <Link
                    className="text-[var(--primaryTextColor)] text-[20px] font-bold mb-[2px] hover:text-[var(--customColor)]"
                    href={'/'}
                  >
                    Jason Roy
                  </Link>

                  <div className="text-[var(--secondaryTextColor)] mb-3">
                    Manager
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    <Link
                      className="hover:text-[var(--customColor)]"
                      href={'/'}
                    >
                      <i className="bi bi-twitter-x"></i>
                    </Link>
                    <Link
                      className="hover:text-[var(--customColor)] text-blue-700"
                      href={'/'}
                    >
                      <i className="bi bi-facebook"></i>
                    </Link>
                    <Link
                      className="hover:text-[var(--customColor)] text-green-700"
                      href={'/'}
                    >
                      <i className="bi bi-whatsapp"></i>
                    </Link>
                    <Link
                      className="hover:text-[var(--customColor)] text-red-700"
                      href={'/'}
                    >
                      <i className="bi bi-instagram"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-[250px] w-full mb-4">
                  <Image
                    src="/poultryImage21.jpg"
                    sizes="100vw"
                    className="h-full w-full object-cover"
                    width={0}
                    height={0}
                    alt="real"
                  />
                </div>
                <div className="flex flex-col items-center shadow-lg w-full rounded pb-[25px]">
                  <Link
                    className="text-[var(--primaryTextColor)] text-[20px] font-bold mb-[2px] hover:text-[var(--customColor)]"
                    href={'/'}
                  >
                    Jason Roy
                  </Link>

                  <div className="text-[var(--secondaryTextColor)] mb-3">
                    Manager
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    <Link
                      className="hover:text-[var(--customColor)]"
                      href={'/'}
                    >
                      <i className="bi bi-twitter-x"></i>
                    </Link>
                    <Link
                      className="hover:text-[var(--customColor)] text-blue-700"
                      href={'/'}
                    >
                      <i className="bi bi-facebook"></i>
                    </Link>
                    <Link
                      className="hover:text-[var(--customColor)] text-green-700"
                      href={'/'}
                    >
                      <i className="bi bi-whatsapp"></i>
                    </Link>
                    <Link
                      className="hover:text-[var(--customColor)] text-red-700"
                      href={'/'}
                    >
                      <i className="bi bi-instagram"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-[250px] w-full mb-4">
                  <Image
                    src="/poultryImage22.jpg"
                    sizes="100vw"
                    className="h-full w-full object-cover"
                    width={0}
                    height={0}
                    alt="real"
                  />
                </div>
                <div className="flex flex-col items-center shadow-lg w-full rounded pb-[25px]">
                  <Link
                    className="text-[var(--primaryTextColor)] text-[20px] font-bold mb-[2px] hover:text-[var(--customColor)]"
                    href={'/'}
                  >
                    Jason Roy
                  </Link>

                  <div className="text-[var(--secondaryTextColor)] mb-3">
                    Manager
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    <Link
                      className="hover:text-[var(--customColor)]"
                      href={'/'}
                    >
                      <i className="bi bi-twitter-x"></i>
                    </Link>
                    <Link
                      className="hover:text-[var(--customColor)] text-blue-700"
                      href={'/'}
                    >
                      <i className="bi bi-facebook"></i>
                    </Link>
                    <Link
                      className="hover:text-[var(--customColor)] text-green-700"
                      href={'/'}
                    >
                      <i className="bi bi-whatsapp"></i>
                    </Link>
                    <Link
                      className="hover:text-[var(--customColor)] text-red-700"
                      href={'/'}
                    >
                      <i className="bi bi-instagram"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex relative hover:-top-4 transition-all duration-700 flex-col items-center">
                <div className="h-[250px] w-full">
                  <Image
                    src="/poultryImage23.jpg"
                    sizes="100vw"
                    className="h-full w-full object-cover"
                    width={0}
                    height={0}
                    alt="real"
                  />
                </div>
                <div className="flex flex-col items-center transition-all duration-300 shadow hover:shadow-lg w-full rounded py-[25px]">
                  <Link
                    className="text-[var(--primaryTextColor)] text-[20px] font-bold mb-[2px] hover:text-[var(--customColor)]"
                    href={'/'}
                  >
                    Jason Roy
                  </Link>

                  <div className="text-[var(--secondaryTextColor)] mb-3">
                    Manager
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    <Link
                      className="hover:text-[var(--customColor)]"
                      href={'/'}
                    >
                      <i className="bi bi-twitter-x"></i>
                    </Link>
                    <Link
                      className="hover:text-[var(--customColor)] text-blue-700"
                      href={'/'}
                    >
                      <i className="bi bi-facebook"></i>
                    </Link>
                    <Link
                      className="hover:text-[var(--customColor)] text-green-700"
                      href={'/'}
                    >
                      <i className="bi bi-whatsapp"></i>
                    </Link>
                    <Link
                      className="hover:text-[var(--customColor)] text-red-700"
                      href={'/'}
                    >
                      <i className="bi bi-instagram"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ////TESTIMONIAL SECTION//// */}
      <Testimonial />

      {/* ////NEWS SECTION//// */}
      <div className="flex justify-center py-[90px] bg-[var(--backgroundColor)]">
        <div className="customContainer">
          <div className="flex flex-col items-center">
            <div className="flex flex-col text-center max-w-[500px]">
              <div className="text-[35px] text-[var(--primaryTextColor)] mb-2 font-bold">
                Our Recent News
              </div>
              <div className="text-[16px] text-[var(--secondaryTextColor)] md:mb-15 mb-10">
                Conveniently customize proactive web services for leveraged
                interfaces without Globally
              </div>
            </div>
            <div className="grid md:grid-cols-3 w-full gap-7">
              <div className="flex flex-col items-start py-7 bg-[var(--backgroundColor)]">
                <Image
                  src="/poultryImage17.jpg"
                  sizes="100vw"
                  className="h-[270px] w-full object-cover mb-5"
                  width={0}
                  height={0}
                  alt="real"
                />
                <Link
                  className="text-[var(--primaryTextColor)] hover:text-[var(--customColor)] mb-4 text-[20px] font-bold"
                  href={'/'}
                >
                  Chicken ducklings to help solve Obesity...
                </Link>
                <div className="text-[var(--secondaryTextColor)] mb-4">
                  Conveniently customize proactive web services without
                  Globally. oe-enablfunctaizede-come rce Onceptualize
                  Technically initiatives.
                </div>
                <Link
                  className="text-[var(--primaryTextColor)] hover:text-[var(--customColor)] font-bold"
                  href={'/'}
                >
                  Read More
                </Link>
              </div>
              <div className="flex flex-col items-start py-7 bg-[var(--backgroundColor)]">
                <Image
                  src="/poultryImage12.jpg"
                  sizes="100vw"
                  className="h-[270px] w-full object-cover mb-5"
                  width={0}
                  height={0}
                  alt="real"
                />
                <Link
                  className="text-[var(--primaryTextColor)] hover:text-[var(--customColor)] mb-4 text-[20px] font-bold"
                  href={'/'}
                >
                  Chicken ducklings to help solve Obesity...
                </Link>
                <div className="text-[var(--secondaryTextColor)] mb-4">
                  Conveniently customize proactive web services without
                  Globally. oe-enablfunctaizede-come rce Onceptualize
                  Technically initiatives.
                </div>
                <Link
                  className="text-[var(--primaryTextColor)] hover:text-[var(--customColor)] font-bold"
                  href={'/'}
                >
                  Read More
                </Link>
              </div>
              <div className="flex flex-col items-start py-7 bg-[var(--backgroundColor)]">
                <Image
                  src="/poultryImage14.jpg"
                  sizes="100vw"
                  className="h-[270px] w-full object-cover mb-5"
                  width={0}
                  height={0}
                  alt="real"
                />
                <Link
                  className="text-[var(--primaryTextColor)] hover:text-[var(--customColor)] mb-4 text-[20px] font-bold"
                  href={'/'}
                >
                  Chicken ducklings to help solve Obesity...
                </Link>
                <div className="text-[var(--secondaryTextColor)] mb-4">
                  Conveniently customize proactive web services without
                  Globally. oe-enablfunctaizede-come rce Onceptualize
                  Technically initiatives.
                </div>
                <Link
                  className="text-[var(--primaryTextColor)] hover:text-[var(--customColor)] font-bold"
                  href={'/'}
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ////PARTNER SECTION//// */}
      <div className="flex py-[90px] bg-[var(--secondaryCustomColor)] justify-center">
        <div className="customContainer">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={10}
            slidesPerView={5} // Default for desktop
            slidesPerGroup={1}
            loop={true}
            speed={800} // Smooth transition speed (in ms)
            breakpoints={{
              0: { slidesPerView: 2 }, // 📱 Mobile (2 slides)
              640: { slidesPerView: 3 }, // 📱 Tablets (3 slides)
              1024: { slidesPerView: 5 }, // 💻 Desktops (5 slides)
            }}
            className="w-full"
          >
            <SwiperSlide>
              <Link href="/" className="w-full">
                <Image
                  src="/poultryImage24.jpg"
                  sizes="100vw"
                  className="h-auto w-[120px]"
                  width={0}
                  height={0}
                  alt="real"
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link href="/" className="w-full">
                <Image
                  src="/poultryImage25.jpg"
                  sizes="100vw"
                  className="h-auto w-[120px]"
                  width={0}
                  height={0}
                  alt="real"
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link href="/" className="w-full">
                <Image
                  src="/poultryImage26.jpg"
                  sizes="100vw"
                  className="h-auto w-[120px]"
                  width={0}
                  height={0}
                  alt="real"
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link href="/" className="w-full">
                <Image
                  src="/poultryImage27.jpg"
                  sizes="100vw"
                  className="h-auto w-[120px]"
                  width={0}
                  height={0}
                  alt="real"
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link href="/" className="w-full">
                <Image
                  src="/poultryImage28.jpg"
                  sizes="100vw"
                  className="h-auto w-[120px]"
                  width={0}
                  height={0}
                  alt="real"
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link href="/" className="w-full">
                <Image
                  src="/poultryImage28.jpg"
                  sizes="100vw"
                  className="h-auto w-[120px]"
                  width={0}
                  height={0}
                  alt="real"
                />
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="flex py-[120px] bg-[var(--backgroundColor)] justify-center">
        <div className="customContainer text-center">
          <div className="grid md:grid-cols-4 gap-5 w-full">
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
    </div>
  )
}
