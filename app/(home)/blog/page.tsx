'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function Contact() {
  return (
    <div>
      {/* ///////MAIN BLOG SECTION//////////// */}
      <div className="flex py-[75px] justify-center bg-[var(--widgetBackground)]">
        <div className="customContainer">
          <div className="flex w-full gap-3">
            <div className="text w-2/3 min-h-[80vh] relative rounded-[5px] overflow-hidden">
              <Image
                src="/Feature1.jpg"
                sizes="100vw"
                className="h-full w-full object-cover"
                width={0}
                height={0}
                alt="real"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0"></div>
              <div className="flex flex-col absolute bottom-0 items-start p-12">
                <Link
                  href={'/'}
                  className="px-[7px] py-[2px] z-10  bg-[var(--customTextColor)] text-white text-[12px] mb-2"
                >
                  AMERICA
                </Link>
                <Link
                  href={'/'}
                  className="z-10 text-white text-[30px] mb-2 font-bold"
                >
                  African Nation Are Strugling To Save Their Wildlife
                </Link>
                <div className="flex items-center ">
                  <div className="text mr-1  text-white text-[12px]">BY</div>
                  <Link
                    href={'/'}
                    className="  text-white text-[12px] mr-4 font-bold"
                  >
                    ADMIN
                  </Link>
                  <div className="text-white flex">
                    <i className="bi bi-calendar mr-2"></i>
                    <div className="text-white">January 21, 2022</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative mb-3 rounded-[5px] overflow-hidden">
                <Image
                  src="/Feature1.jpg"
                  sizes="100vw"
                  className="h-full w-full  object-cover"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0"></div>
                <div className="flex flex-col absolute bottom-0 items-start p-6">
                  <Link
                    href={'/'}
                    className="px-[7px] py-[2px] z-10  bg-[var(--customTextColor)] text-white text-[12px] mb-2"
                  >
                    AMERICA
                  </Link>
                  <Link
                    href={'/'}
                    className="z-10 text-white text-[17px] mb-2 font-bold"
                  >
                    Novak appeals in court against dear less Care cancellation
                    of
                  </Link>
                  <div className="flex items-center ">
                    <div className="text mr-1  text-white text-[12px]">BY</div>
                    <Link
                      href={'/'}
                      className="  text-white text-[12px] mr-4 font-bold"
                    >
                      ADMIN
                    </Link>
                    <div className="text-white flex">
                      <i className="bi bi-calendar mr-2"></i>
                      <div className="text-white">January 21, 2022</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative mb-3 rounded-[5px] overflow-hidden">
                <Image
                  src="/Feature1.jpg"
                  sizes="100vw"
                  className="h-full w-full object-cover"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0"></div>
                <div className="flex flex-col absolute bottom-0 items-start p-6">
                  <Link
                    href={'/'}
                    className="px-[7px] py-[2px] z-10  bg-[var(--customTextColor)] text-white text-[12px] mb-2"
                  >
                    AMERICA
                  </Link>
                  <Link
                    href={'/'}
                    className="z-10 text-white text-[17px] mb-2 font-bold"
                  >
                    Novak appeals in court against dear less Care cancellation
                    of
                  </Link>
                  <div className="flex items-center ">
                    <div className="text mr-1  text-white text-[12px]">BY</div>
                    <Link
                      href={'/'}
                      className="  text-white text-[12px] mr-4 font-bold"
                    >
                      ADMIN
                    </Link>
                    <div className="text-white flex">
                      <i className="bi bi-calendar mr-2"></i>
                      <div className="text-white">January 21, 2022</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative rounded-[5px] overflow-hidden">
                <Image
                  src="/Feature1.jpg"
                  sizes="100vw"
                  className="h-full w-full object-cover"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0"></div>
                <div className="flex flex-col absolute bottom-0 items-start p-6">
                  <Link
                    href={'/'}
                    className="px-[7px] py-[2px] z-10  bg-[var(--customTextColor)] text-white text-[12px] mb-2"
                  >
                    AMERICA
                  </Link>
                  <Link
                    href={'/'}
                    className="z-10 text-white text-[17px] mb-2 font-bold"
                  >
                    Novak appeals in court against dear less Care cancellation
                    of
                  </Link>
                  <div className="flex items-center ">
                    <div className="text mr-1  text-white text-[12px]">BY</div>
                    <Link
                      href={'/'}
                      className="  text-white text-[12px] mr-4 font-bold"
                    >
                      ADMIN
                    </Link>
                    <div className="text-white flex">
                      <i className="bi bi-calendar mr-2"></i>
                      <div className="text-white">January 21, 2022</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex py-[75px] justify-center bg-white">
        <div className="customContainer">
          <div className="w-full rounded-md shadow-lg py-3 mb-10">
            <form className="grid grid-cols-2 text-[var(--primaryTextColor)] md:grid-cols-4 p-5 rounded-[5px] bg-white w-full">
              <div className="flex px-[10px] border border-gray-200 outline-0 text-black rounded items-center col-span-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="flex-1 py-[20px] border-known outline-0 text-black rounded text-lg"
                />
                <i className="bi bi-search"></i>
              </div>

              <button
                type="submit"
                className="bg-[var(--customTextColor)] cursor-pointer text-white rounded px-4 py-2 hover:bg-[var(--customTextDarkColor)]"
              >
                Search
              </button>
            </form>
          </div>
          <div className="text-[var(--secondaryTextColor)] font-bold text-[30px] mb-3">
            Top Stories
          </div>
          <div className="grid grid-cols-4 gap-5">
            <div className="flex flex-col">
              <div className="text relative mb-4">
                <Link
                  href={'/'}
                  className="px-[7px] py-[2px] z-10 top-4 left-4 bg-[var(--customTextColor)] text-white text-[12px] absolute"
                >
                  AMERICA
                </Link>
                <Image
                  src="/Feature1.jpg"
                  sizes="100vw"
                  className="h-[250px] w-full object-cover"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0"></div>
              </div>

              <div className="text">
                <Link
                  href={'/'}
                  className="z-10 text-black text-[20px] mb-3 block font-bold"
                >
                  Novak appeals in court against dear less Care cancellation of
                </Link>
                <div className="flex items-center ">
                  <div className="text mr-1  text-[var(#C1C1C4)] text-[12px]">
                    BY
                  </div>
                  <Link
                    href={'/'}
                    className="  text-black text-[12px] mr-4 font-bold"
                  >
                    ADMIN
                  </Link>
                  <div className="text-black flex">
                    <i className="bi bi-calendar mr-2"></i>
                    <div className="text-[var(#C1C1C4)]">January 21, 2022</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text relative mb-4">
                <Link
                  href={'/'}
                  className="px-[7px] py-[2px] z-10 top-4 left-4 bg-[var(--customTextColor)] text-white text-[12px] absolute"
                >
                  AMERICA
                </Link>
                <Image
                  src="/Feature1.jpg"
                  sizes="100vw"
                  className="h-[250px] w-full object-cover"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0"></div>
              </div>

              <div className="text">
                <Link
                  href={'/'}
                  className="z-10 text-black text-[20px] mb-3 block font-bold"
                >
                  Novak appeals in court against dear less Care cancellation of
                </Link>
                <div className="flex items-center ">
                  <div className="text mr-1  text-[var(#C1C1C4)] text-[12px]">
                    BY
                  </div>
                  <Link
                    href={'/'}
                    className="  text-black text-[12px] mr-4 font-bold"
                  >
                    ADMIN
                  </Link>
                  <div className="text-black flex">
                    <i className="bi bi-calendar mr-2"></i>
                    <div className="text-[var(#C1C1C4)]">January 21, 2022</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text relative mb-4">
                <Link
                  href={'/'}
                  className="px-[7px] py-[2px] z-10 top-4 left-4 bg-[var(--customTextColor)] text-white text-[12px] absolute"
                >
                  AMERICA
                </Link>
                <Image
                  src="/Feature1.jpg"
                  sizes="100vw"
                  className="h-[250px] w-full object-cover"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0"></div>
              </div>

              <div className="text">
                <Link
                  href={'/'}
                  className="z-10 text-black text-[20px] mb-3 block font-bold"
                >
                  Novak appeals in court against dear less Care cancellation of
                </Link>
                <div className="flex items-center ">
                  <div className="text mr-1  text-[var(#C1C1C4)] text-[12px]">
                    BY
                  </div>
                  <Link
                    href={'/'}
                    className="  text-black text-[12px] mr-4 font-bold"
                  >
                    ADMIN
                  </Link>
                  <div className="text-black flex">
                    <i className="bi bi-calendar mr-2"></i>
                    <div className="text-[var(#C1C1C4)]">January 21, 2022</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text relative mb-4">
                <Link
                  href={'/'}
                  className="px-[7px] py-[2px] z-10 top-4 left-4 bg-[var(--customTextColor)] text-white text-[12px] absolute"
                >
                  AMERICA
                </Link>
                <Image
                  src="/Feature1.jpg"
                  sizes="100vw"
                  className="h-[250px] w-full object-cover"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0"></div>
              </div>

              <div className="text">
                <Link
                  href={'/'}
                  className="z-10 text-black text-[20px] mb-3 block font-bold"
                >
                  Novak appeals in court against dear less Care cancellation of
                </Link>
                <div className="flex items-center ">
                  <div className="text mr-1  text-[var(#C1C1C4)] text-[12px]">
                    BY
                  </div>
                  <Link
                    href={'/'}
                    className="  text-black text-[12px] mr-4 font-bold"
                  >
                    ADMIN
                  </Link>
                  <div className="text-black flex">
                    <i className="bi bi-calendar mr-2"></i>
                    <div className="text-[var(#C1C1C4)]">January 21, 2022</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center bg-[url('/blogImage1.jpg')] bg-fixed bg-cover bg-no-repeat bg-center">
        <div className="flex w-full bg-black/50 justify-center">
          <div className="customContainer">
            <div className="flex flex-col min-h-[80vh]">
              <div className="flex flex-col items-center text-center my-auto">
                <div className="text mb-8">
                  <Link
                    href={'/'}
                    className="px-[7px] py-[2px] z-10 bg-[var(--customTextColor)] text-white text-[12px] absolute"
                  >
                    AMERICA
                  </Link>
                </div>

                <div className="text">
                  <Link
                    href={'/'}
                    className="z-10 text-white text-[30px] mb-3 block font-bold max-w-[600px]"
                  >
                    How to have fantastic trip without blowing your budget of
                  </Link>
                  <div className="flex items-center justify-center ">
                    <div className="text mr-1  text-white text-[12px] items-center">
                      <span>By</span>
                    </div>
                    <Link
                      href={'/'}
                      className="  text-white text-[12px] mr-4 font-bold"
                    >
                      ADMIN
                    </Link>

                    <div className="text-white flex items-center">
                      <i className="bi bi-calendar mr-2"></i>
                      <div className="text-white">January 21, 2022</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 mt-auto gap-[2px]">
                <div className="flex px-[25px] py-[21px] items-center w-full backdrop-blur-md border-t-[var(--customTextColor)] border-t-3 rounded">
                  <Image
                    src="/blogImage1.jpg"
                    sizes="100vw"
                    className="h-[90px] mr-3 object-cover rounded-full w-[90px]"
                    width={0}
                    height={0}
                    alt="real"
                  />
                  <div className="flex flex-col">
                    <div className="text-white mb-1">CANADA</div>
                    <div className="text-[18px] mb-4 font-bold text-white">
                      How to have fantastic trip without blowing your budget of
                    </div>
                    <div className="flex items-center">
                      <div className="text mr-1  text-white text-[12px]">
                        <span>By</span>
                      </div>
                      <Link
                        href={'/'}
                        className="  text-white text-[12px] mr-4 font-bold"
                      >
                        ADMIN
                      </Link>

                      <div className="text-white flex">
                        <i className="bi bi-calendar mr-2"></i>
                        <div className="text-white">January 21, 2022</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex px-[25px] py-[21px] items-center w-full backdrop-blur-md">
                  <Image
                    src="/blogImage1.jpg"
                    sizes="100vw"
                    className="h-[90px] mr-3 object-cover rounded-full w-[90px]"
                    width={0}
                    height={0}
                    alt="real"
                  />
                  <div className="flex flex-col">
                    <div className="text-white mb-1">CANADA</div>
                    <div className="text-[18px] mb-4 font-bold text-white">
                      How to have fantastic trip without blowing your budget of
                    </div>
                    <div className="flex items-center">
                      <div className="text mr-1  text-white text-[12px]">
                        <span>By</span>
                      </div>
                      <Link
                        href={'/'}
                        className="  text-white text-[12px] mr-4 font-bold"
                      >
                        ADMIN
                      </Link>

                      <div className="text-white flex">
                        <i className="bi bi-calendar mr-2"></i>
                        <div className="text-white">January 21, 2022</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex px-[25px] py-[21px] items-center w-full backdrop-blur-md">
                  <Image
                    src="/blogImage1.jpg"
                    sizes="100vw"
                    className="h-[90px] mr-3 object-cover rounded-full w-[90px]"
                    width={0}
                    height={0}
                    alt="real"
                  />
                  <div className="flex flex-col">
                    <div className="text-white mb-1">CANADA</div>
                    <div className="text-[18px] mb-4 font-bold text-white">
                      How to have fantastic trip without blowing your budget of
                    </div>
                    <div className="flex items-center">
                      <div className="text mr-1  text-white text-[12px]">
                        <span>By</span>
                      </div>
                      <Link
                        href={'/'}
                        className="  text-white text-[12px] mr-4 font-bold"
                      >
                        ADMIN
                      </Link>

                      <div className="text-white flex">
                        <i className="bi bi-calendar mr-2"></i>
                        <div className="text-white">January 21, 2022</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex py-[75px] justify-center bg-white">
        <div className="customContainer">
          <div className="grid grid-cols-4 w-full items-start">
            <div className="flex flex-col col-span-3 pr-10">
              <Image
                src="/blog4Image.jpg"
                sizes="100vw"
                className="h-full w-full object-cover mb-8"
                width={0}
                height={0}
                alt="real"
              />
              <div className="text-[var(--secondaryTextColor)] font-bold mb-9 text-[25px]">
                Latest Blog
              </div>
              <div className="grid grid-cols-2">
                <Image
                  src="/Feature1.jpg"
                  sizes="100vw"
                  className="h-[310px] w-full object-cover"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="flex flex-col items-center text-center pl-6">
                  <Link
                    href={'/'}
                    className="px-[7px] py-[2px] bg-[var(--customTextColor)] text-white text-[12px] mb-2"
                  >
                    TENNIS
                  </Link>
                  <Link
                    href={'/'}
                    className="text-black text-[25px] mb-3 font-bold leading hover:underline"
                  >
                    Novak appeals in court against dear less Care cancellation
                    of Australian
                  </Link>
                  <div className="text-[var(#AAABAD)] mb-3">
                    Ahen an unknown printer took a galley of type and their
                    scrambled imaketype specimen book
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="text mr-1  text-[var(#AAABAD)]  text-[12px]">
                      BY
                    </div>
                    <Link
                      href={'/'}
                      className="  text-black text-[12px] mr-4 font-bold"
                    >
                      ADMIN
                    </Link>
                    <div className="flex">
                      <i className="bi bi-calendar mr-2"></i>
                      <div className="text-[var(#AAABAD)]">January 21</div>
                    </div>
                  </div>
                  <div className="text-[12px] rounded hover:bg-[var(--customTextColor)] transition duration-500 text-black/60 items-center text-[var  (--widgetBackground)] font-bold border px-6 py-2 border-gray-300 hover:text-white">
                    READ MORE
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start leading-5">
              <div className="text-[22px] text-[var(--secondaryTextColor)] font-bold mb-[1px]">
                POPULAR NEWS
              </div>
              <div className="flex items-center w-full border-b py-[30px] border-b-gray-300">
                <Image
                  src="/blogImage1.jpg"
                  sizes="100vw"
                  className="h-[100px] mr-3 object-cover rounded-full w-[100px]"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="flex flex-col">
                  <div className="text-[var(#AAABAD)] mb-1 font-semibold text-[12px]">
                    FASHION
                  </div>
                  <div className="text-[18px] mb-3 font-bold text-[var(--primaryTextColor)] line-clamp-2 hover:underline">
                    <Link href={'/'} className="">
                      How to have fantastic trip without blowing your budget of
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <div className="flex text-[var(--secondaryTextColor)]">
                      <i className="bi bi-calendar mr-2"></i>
                      <div className="text-[var(--primaryTextColor)] font-semibold text-[12px]">
                        DECEMBER 9, 2021
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center w-full border-b py-[30px] border-b-gray-300">
                <Image
                  src="/blogImage1.jpg"
                  sizes="100vw"
                  className="h-[100px] mr-3 object-cover rounded-full w-[100px]"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="flex flex-col">
                  <div className="text-[var(#AAABAD)] mb-1 font-semibold text-[12px]">
                    FASHION
                  </div>
                  <div className="text-[18px] mb-3 font-bold text-[var(--primaryTextColor)] line-clamp-2 hover:underline">
                    <Link href={'/'} className="">
                      How to have fantastic trip without blowing your budget of
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <div className="flex text-[var(--secondaryTextColor)]">
                      <i className="bi bi-calendar mr-2"></i>
                      <div className="text-[var(--primaryTextColor)] font-semibold text-[12px]">
                        DECEMBER 9, 2021
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center w-full border-b py-[30px] border-b-gray-300">
                <Image
                  src="/blogImage1.jpg"
                  sizes="100vw"
                  className="h-[100px] mr-3 object-cover rounded-full w-[100px]"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="flex flex-col">
                  <div className="text-[var(#AAABAD)] mb-1 font-semibold text-[12px]">
                    FASHION
                  </div>
                  <div className="text-[18px] mb-3 font-bold text-[var(--primaryTextColor)] line-clamp-2 hover:underline">
                    <Link href={'/'} className="">
                      How to have fantastic trip without blowing your budget of
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <div className="flex text-[var(--secondaryTextColor)]">
                      <i className="bi bi-calendar mr-2"></i>
                      <div className="text-[var(--primaryTextColor)] font-semibold text-[12px]">
                        DECEMBER 9, 2021
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center w-full border-b py-[30px] border-b-gray-300">
                <Image
                  src="/blogImage1.jpg"
                  sizes="100vw"
                  className="h-[100px] mr-3 object-cover rounded-full w-[100px]"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="flex flex-col">
                  <div className="text-[var(#AAABAD)] mb-1 font-semibold text-[12px]">
                    FASHION
                  </div>
                  <div className="text-[18px] mb-3 font-bold text-[var(--primaryTextColor)] line-clamp-2 hover:underline">
                    <Link href={'/'} className="">
                      How to have fantastic trip without blowing your budget of
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <div className="flex text-[var(--secondaryTextColor)]">
                      <i className="bi bi-calendar mr-2"></i>
                      <div className="text-[var(--primaryTextColor)] font-semibold text-[12px]">
                        DECEMBER 9, 2021
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
