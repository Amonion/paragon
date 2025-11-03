'use client'
import React, { useEffect, useState } from 'react'
import { PageHeader } from '@/components/Public/PageBanner'
import FaqStore, { Faq } from '@/src/zustand/faq'

function Faqs() {
  const { faqs } = FaqStore()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [newFaqs, setNewFaqs] = useState<Faq[]>([])

  useEffect(() => {
    setNewFaqs(faqs.filter((item) => item.category === activeCategory))
  }, [activeCategory])

  useEffect(() => {
    if (faqs.length > 0 && !activeCategory) {
      setActiveCategory(faqs[0].category)
    }
  }, [faqs, activeCategory])

  return (
    <div>
      {/*//// Faq Section 1 ////*/}
      <PageHeader page="FAQ" title="Frequently Asked Questions" />

      {/*//// Faq Section 2////*/}
      <div className="flex py-[100px] justify-center bg-[var(--backgroundColor)]">
        <div className="customContainer">
          <div className="grid items-start md:grid-cols-3 md:gap-7 gap-4 cursor-pointer w-full">
            <div className="flex flex-col md:col-span-1 shadow-lg py-5 sm:py-[45px] px-[35px] w-full mb-7">
              <div className="text-[25px] text-[var(--primaryTextColor)] font-bold mb-5">
                Quick Navigation
              </div>
              {[...new Set(faqs.map((item) => item.category))].map(
                (category, index) => (
                  <div
                    onClick={() => setActiveCategory(category)}
                    key={index}
                    className={`${
                      activeCategory === category
                        ? 'text-[var(--customRedColor)]'
                        : ''
                    } text-[var(--secondaryTextColor)] hover:text-[var(--customRedColor)] underline mb-3`}
                  >
                    {category}
                  </div>
                )
              )}
            </div>
            <div className="flex flex-col md:col-span-2 w-full">
              <div className="text-[var(--customColor)] text-[27px] underline mb-5 font-bold">
                Customer Support
              </div>
              {newFaqs.map((item, i) => (
                <div key={i} className="flex px-7 py-8 flex-col shadow-sm mb-6">
                  <div className="flex">
                    <div className="text-[20px] text-[var(--primaryTextColor)]">
                      {item.question}
                    </div>
                    <i className="bi bi-plus-lg text-[28px] text-[var(--primaryTextColor)] ml-auto"></i>
                  </div>

                  <div
                    className="text-[var(--secondaryTextColor)]"
                    dangerouslySetInnerHTML={{
                      __html: item.answer,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Faqs
