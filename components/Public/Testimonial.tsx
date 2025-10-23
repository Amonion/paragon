import React from 'react'
import Image from 'next/image'

function Testimonial() {
  return (
    <div className="flex justify-center py-[90px] bg-[var(--backgroundColor)]">
      <div className="customContainer">
        <div className="flex flex-col items-center">
          <div className="flex flex-col text-center max-w-[500px]">
            <div className="text-[30px] text-[var(--primaryTextColor)] mb-2 font-bold">
              What Client Say Our Poultry Farm
            </div>
            <div className="text-[16px] text-[var(--secondaryTextColor)] mb-18">
              Conveniently customize proactive web services for leveraged
              interfaces without Globally
            </div>
          </div>
          <div className="grid md:grid-cols-3 w-full gap-7">
            <div className="flex flex-col items-start shadow py-7 px-6 bg-[var(--backgroundColor)]">
              <div className="flex mb-7">
                <Image
                  src="/poultryImage20.jpg"
                  sizes="100vw"
                  className="h-auto w-[90px] object-contain mr-5"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="flex flex-col">
                  <div className="text-[var(--primaryTextColor)] hover:text-[var(--customColor)] font-bold text-[20px]">
                    Jason Smith
                  </div>
                  <div className="text-[15px] text-[var(--secondaryTextColor)] font-semibold">
                    Founder & CEO
                  </div>
                  <div className="flex text-[15px] font-bold">
                    <i className="bi bi-star text-[var(--customColor)] mr-1"></i>
                    <i className="bi bi-star text-[var(--customColor)]  mr-1"></i>
                    <i className="bi bi-star text-[var(--customColor)]  mr-1"></i>
                    <i className="bi bi-star text-[var(--customColor)]  mr-1"></i>
                    <i className="bi bi-star text-[var(--customColor)]  mr-1"></i>
                  </div>
                </div>
              </div>
              <i className="bi bi-quote mb-2 text-[var(--secondaryTextColor)]/50"></i>
              <div className="text-[var(--secondaryTextColor)] mb-1">
                Continually Onceptualizef Technically invs Professionally
                monetizeturkeyf Testingdu Frofessionally
                oe-enablfunctaizede-come rce Onceptualize Technically
                initiatives.
              </div>
              <i className="bi bi-quote"></i>
            </div>
            <div className="flex flex-col items-start shadow py-7 px-6 bg-[var(--backgroundColor)]">
              <div className="flex mb-7">
                <Image
                  src="/poultryImage21.jpg"
                  sizes="100vw"
                  className="h-auto w-[90px] object-contain mr-5"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="flex flex-col">
                  <div className="text-[var(--primaryTextColor)] hover:text-[var(--customColor)] font-bold text-[20px]">
                    Jason Smith
                  </div>
                  <div className="text-[15px] text-[var(--secondaryTextColor)] font-semibold">
                    Founder & CEO
                  </div>
                  <div className="flex text-[15px] font-bold">
                    <i className="bi bi-star text-[var(--customColor)] mr-1"></i>
                    <i className="bi bi-star text-[var(--customColor)]  mr-1"></i>
                    <i className="bi bi-star text-[var(--customColor)]  mr-1"></i>
                    <i className="bi bi-star text-[var(--customColor)]  mr-1"></i>
                    <i className="bi bi-star text-[var(--customColor)]  mr-1"></i>
                  </div>
                </div>
              </div>
              <i className="bi bi-quote mb-2 text-[var(--secondaryTextColor)]/50"></i>
              <div className="text-[var(--secondaryTextColor)] mb-1">
                Continually Onceptualizef Technically invs Professionally
                monetizeturkeyf Testingdu Frofessionally
                oe-enablfunctaizede-come rce Onceptualize Technically
                initiatives.
              </div>
              <i className="bi bi-quote"></i>
            </div>
            <div className="flex flex-col items-start shadow py-7 px-6 bg-[var(--backgroundColor)]">
              <div className="flex mb-7">
                <Image
                  src="/poultryImage22.jpg"
                  sizes="100vw"
                  className="h-auto w-[90px] object-contain mr-5"
                  width={0}
                  height={0}
                  alt="real"
                />
                <div className="flex flex-col">
                  <div className="text-[var(--primaryTextColor)] hover:text-[var(--customColor)] font-bold text-[20px]">
                    Jason Smith
                  </div>
                  <div className="text-[15px] text-[var(--secondaryTextColor)] font-semibold">
                    Founder & CEO
                  </div>
                  <div className="flex text-[15px] font-bold">
                    <i className="bi bi-star text-[var(--customColor)] mr-1"></i>
                    <i className="bi bi-star text-[var(--customColor)]  mr-1"></i>
                    <i className="bi bi-star text-[var(--customColor)]  mr-1"></i>
                    <i className="bi bi-star text-[var(--customColor)]  mr-1"></i>
                    <i className="bi bi-star text-[var(--customColor)]  mr-1"></i>
                  </div>
                </div>
              </div>
              <i className="bi bi-quote mb-2 text-[var(--secondaryTextColor)]/50"></i>
              <div className="text-[var(--secondaryTextColor)] mb-1">
                Continually Onceptualizef Technically invs Professionally
                monetizeturkeyf Testingdu Frofessionally
                oe-enablfunctaizede-come rce Onceptualize Technically
                initiatives.
              </div>
              <i className="bi bi-quote"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial
