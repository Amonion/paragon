'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { formatCount } from '@/lib/helpers'
import { MessageStore } from '@/src/zustand/notification/Message'
import LinkedPagination from '@/components/Admin/LinkedPagination'
import StockingStore from '@/src/zustand/Stocking'

const Stocks: React.FC = () => {
  const {
    getStocks,
    toggleChecked,
    toggleActive,
    reshuffleResults,
    loading,
    count,
    stocks,
  } = StockingStore()
  const [page_size] = useState(20)
  const [sort] = useState('-createdAt')
  const { setMessage } = MessageStore()
  const pathname = usePathname()
  const { page } = useParams()
  const url = '/products'

  useEffect(() => {
    reshuffleResults()
  }, [pathname])

  useEffect(() => {
    const params = `?page_size=${page_size}&page=${
      page ? page : 1
    }&ordering=${sort}`
    getStocks(`${url}${params}`, setMessage)
  }, [page])

  return (
    <>
      {/* <div className="card_body sharp mb-5">
        <div className="text-lg text-[var(--text-secondary)]">
          Table of Frequently Asked Questions
        </div>
        <div className="relative mb-2">
          <div className={`input_wrap ml-auto active `}>
            <input
              ref={inputRef}
              type="search"
              onChange={handlesearchFaq}
              className={`transparent-input flex-1 `}
              placeholder="Search Faqs"
            />
            {loading ? (
              <i className="bi bi-opencollective common-icon loading"></i>
            ) : (
              <i className="bi bi-search common-icon cursor-pointer"></i>
            )}
          </div>

          {searchedFaqs.length > 0 && (
            <div
              className={`dropdownList ${
                searchedFaqs.length > 0
                  ? 'overflow-auto'
                  : 'overflow-hidden h-0'
              }`}
            >
              {searchedFaqs.map((item, index) => (
                <div key={index} className="input_drop_list">
                  <Link
                    href={`/school/students/student/${item._id}`}
                    className="flex-1"
                  >
                    {item.question}, {item.category}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div> */}

      <div className="overflow-auto mb-5">
        {stocks.length > 0 ? (
          <table>
            <thead>
              <tr className="bg-[var(--primary)] p-2">
                <th>S/N</th>
                <th>Picture</th>
                <th>Product</th>
                <th>Units</th>
                <th>Purchase Units</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((item, index) => (
                <tr
                  key={index}
                  className={` ${index % 2 === 1 ? 'bg-[var(--primary)]' : ''}`}
                >
                  <td>
                    <div className="flex items-center">
                      <div
                        className={`checkbox ${item.isChecked ? 'active' : ''}`}
                        onClick={() => toggleChecked(index)}
                      >
                        {item.isChecked && (
                          <i className="bi bi-check text-white text-lg"></i>
                        )}
                      </div>
                      {(page ? Number(page) - 1 : 1 - 1) * page_size +
                        index +
                        1}
                      <i
                        onClick={() => toggleActive(index)}
                        className="bi bi-three-dots-vertical text-lg cursor-pointer"
                      ></i>
                    </div>
                  </td>
                  <td>
                    <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full">
                      <Image
                        alt={`email of ${item.picture}`}
                        src={
                          item.picture
                            ? String(item.picture)
                            : '/images/avatar.jpg'
                        }
                        width={0}
                        sizes="100vw"
                        height={0}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{formatCount(item.units)}</td>
                  <td>
                    {Math.floor(item.units / item.unitPerPurchase)}{' '}
                    {item.purchaseUnit}
                  </td>
                  <td>{item.units}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="relative flex justify-center">
            <div className="not_found_text">No Stocks Found</div>
            <Image
              className="max-w-[300px]"
              alt={`no record`}
              src="/images/not-found.png"
              width={0}
              sizes="100vw"
              height={0}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        )}
      </div>
      {loading && (
        <div className="flex w-full justify-center py-5">
          <i className="bi bi-opencollective loading"></i>
        </div>
      )}

      <div className="card_body sharp">
        <LinkedPagination url="/admin/pages/faq" count={count} page_size={20} />
      </div>
    </>
  )
}

export default Stocks
