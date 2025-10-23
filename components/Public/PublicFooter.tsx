'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function PublicFooter() {
  return (
    <>
      <div className="flex py-[90px] justify-center bg-[var(--secondaryCustomColor)] relative">
        <Image
          src="/poultryImage33.jpg"
          sizes="100vw"
          className="h-full w-full object-cover absolute z-0 top-0 left-0"
          width={0}
          height={0}
          alt="paragon"
        />
        <div className="customContainer">
          <div className="grid md:grid-cols-4 w-full px-[10px]">
            <div className="flex flex-col mb-8 md:mb-0">
              <Image
                style={{ height: 'auto' }}
                src="/paragonLogo.png"
                loading="lazy"
                sizes="100vw"
                className="sm:w-70 w-[250px] mb-4"
                width={0}
                height={0}
                alt="Paragon Logo"
              />
              <div className="text mb-3 text-[var(--secondaryTextColor)]">
                Conveniently customizec web services aggregate frictionle
                internet withouevs Conveniently customizec.
              </div>
              <div className="text-[var(--secondaryTextColor)]">
                Enthusiastically scale synergistic technologies for leveraged
                with technology quickly.
              </div>
            </div>
            <div className="flex flex-col mb-8 md:mb-0">
              <div className="text-[var(--primaryTextColor)] text-[26px] font-bold mb-4">
                Keep In Touch
              </div>
              <div className="flex">
                <i className="bi bi-telephone-fill mb-2 text-[var(--customColor)] mr-3"></i>
                <div className="flex flex-col">
                  <div className="text-[var(--secondaryTextColor)]">
                    +88130-589-745-6987
                  </div>
                  <div className="text text-[var(--secondaryTextColor)] mb-4">
                    +1655-456-523
                  </div>
                </div>
              </div>
              <div className="flex">
                <i className="bi bi-clock mb-2 text-[var(--customColor)] mr-3"></i>
                <div className="flex flex-col">
                  <div className="text-[var(--secondaryTextColor)]">
                    Mon - Fri 09:00 - 18:00
                  </div>
                  <div className="text text-[var(--secondaryTextColor)] mb-4">
                    (except public holidays)
                  </div>
                </div>
              </div>
              <div className="flex">
                <i className="bi bi-geo-alt-fill mb-2 text-[var(--customColor)] mr-3"></i>
                <div className="flex flex-col">
                  <div className="text-[var(--secondaryTextColor)]">
                    25/2 Lane2 Vokte Street Building
                  </div>
                  <div className="text text-[var(--secondaryTextColor)]">
                    Melborn City
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-8 md:mb-0">
              <div className="text-[var(--primaryTextColor)] text-[26px] font-bold mb-4">
                Poultry Farm Product
              </div>
              <div className="flex">
                <Image
                  src="/poultryImage3.jpg"
                  sizes="100vw"
                  className="h-[70px] w-[85px] mr-3"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="flex flex-col mb-7">
                  <div className="hover:text-[var(--secondaryTextColor)] text-[var(--primaryTextColor)] font-semibold">
                    Light Brown Eggs
                  </div>
                  <div className="text text-[var(--primaryTextColor)]/70 mb-4">
                    $25.99
                  </div>
                </div>
              </div>
              <div className="flex">
                <Image
                  src="/poultryImage4.jpg"
                  sizes="100vw"
                  className="h-[70px] w-[85px] mr-3"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="flex flex-col">
                  <div className="hover:text-[var(--secondaryTextColor)] text-[var(--primaryTextColor)] font-semibold">
                    Little Chicken Broiler
                  </div>
                  <div className="text text-[var(--primaryTextColor)]/70 mb-4">
                    $25.99
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-[var(--primaryTextColor)] text-[28px] mb-4 font-bold">
                Instagram Feed
              </div>
              <div className="grid grid-cols-3 md:gap-3 gap-3 w-full">
                <Image
                  src="/poultryImage14.jpg"
                  sizes="100vw"
                  className="h-[80px] w-full"
                  width={0}
                  height={0}
                  alt="real"
                />
                <Image
                  src="/poultryImage19.jpg"
                  sizes="100vw"
                  className="h-[80px] w-full"
                  width={0}
                  height={0}
                  alt="real"
                />
                <Image
                  src="/poultryImage18.jpg"
                  sizes="100vw"
                  className="h-[80px] w-full"
                  width={0}
                  height={0}
                  alt="real"
                />
                <Image
                  src="/poultryImage17.jpg"
                  sizes="100vw"
                  className="h-[80px] w-full"
                  width={0}
                  height={0}
                  alt="real"
                />
                <Image
                  src="/poultryImage16.jpg"
                  sizes="100vw"
                  className="h-[80px] w-full"
                  width={0}
                  height={0}
                  alt="real"
                />
                <Image
                  src="/poultryImage15.jpg"
                  sizes="100vw"
                  className="h-[80px] w-full"
                  width={0}
                  height={0}
                  alt="real"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-[50px] bg-[var(--backgroundColor)]">
        <div className="customContainer">
          <div className="flex justify-center flex-wrap">
            <i className="bi bi-c-circle mr-1"></i>
            <div className="text-[var(--primaryCustomColor)] mr-2 font-bold">
              2020
            </div>
            <Link
              className="text-[var(--customColor)] mr-1 font-bold"
              href={'/'}
            >
              Poultry Farm
            </Link>
            <div className="text-[var(--primaryCustomColor)] text-[15px] mr-2 font-bold">
              .All Rights Reserved By
            </div>
            <Link className="text-[var(--customColor)]" href={'/'}>
              LabArtisan
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
