'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { formatMoney } from '@/lib/helpers'
import _debounce from 'lodash/debounce'
import { MessageStore } from '@/src/zustand/notification/Message'
import LinkedPagination from '@/components/Admin/LinkedPagination'
import ProductStore from '@/src/zustand/Product'

const Products: React.FC = () => {
  const {
    getProducts,
    reshuffleResults,
    searchProducts,
    searchedProducts,

    loading,
    count,
    products,
  } = ProductStore()
  const [page_size] = useState(20)
  const [sort] = useState('-createdAt')
  const { setMessage } = MessageStore()
  const pathname = usePathname()
  const { page } = useParams()
  const inputRef = useRef<HTMLInputElement>(null)
  const url = '/products'

  useEffect(() => {
    reshuffleResults()
  }, [pathname])

  useEffect(() => {
    const params = `?page_size=${page_size}&page=${
      page ? page : 1
    }&ordering=${sort}`
    getProducts(`${url}${params}`, setMessage)
  }, [page])

  const handlesearchProducts = _debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      if (value.trim().length > 0) {
        searchProducts(
          `${url}/search?author=${value}&content=${value}&title=${value}&subtitle=${value}&page_size=${page_size}`
        )
      } else {
        ProductStore.setState({ searchedProducts: [] })
      }
    },
    1000
  )

  return (
    <>
      <div className="card_body sharp mb-5">
        <div className="text-lg text-[var(--text-secondary)]">
          Table of Products
        </div>
        <div className="relative mb-2">
          <div className={`input_wrap ml-auto active `}>
            <input
              ref={inputRef}
              type="search"
              onChange={handlesearchProducts}
              className={`transparent-input flex-1 `}
              placeholder="Search products"
            />
            {loading ? (
              <i className="bi bi-opencollective common-icon loading"></i>
            ) : (
              <i className="bi bi-search common-icon cursor-pointer"></i>
            )}
          </div>

          {searchedProducts.length > 0 && (
            <div
              className={`dropdownList ${
                searchedProducts.length > 0
                  ? 'overflow-auto'
                  : 'overflow-hidden h-0'
              }`}
            >
              {searchedProducts.map((item, index) => (
                <div key={index} className="input_drop_list">
                  <Link
                    href={`/school/students/student/${item._id}`}
                    className="flex-1"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3 mb-5">
        {products.map((item, index) => (
          <div key={index} className="card_body sharp">
            <div className="">
              <div className="flex flex-wrap sm:flex-nowrap relative items-start mb-3 sm:mb-5">
                <div className="flex items-center mr-3">
                  {(page ? Number(page) - 1 : 1 - 1) * page_size + index + 1}
                </div>
                <div className="relative w-[100px] h-[70px] sm:h-[50] sm:w-[100] mb-3 sm:mb-0 overflow-hidden rounded-[5px] sm:mr-3">
                  {item.picture ? (
                    <Image
                      alt={`email of ${item.picture}`}
                      src={String(item.picture)}
                      width={0}
                      sizes="100vw"
                      height={0}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
                <div className="t w-full sm:w-auto">
                  <div className="flex text-lg mb-2 sm:mb-3 items-center">
                    <div className="text-[var(--text-secondary)]">
                      {item.name}
                    </div>{' '}
                  </div>
                  <div className="flex">
                    <div className="flex">
                      Price:
                      <span className="text-[var(--text-secondary)] ml-1">
                        ₦{formatMoney(item.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid w-full gap-2 grid-cols-3 items-center">
                <div className="flex">
                  Qty:
                  <span className="text-[var(--text-secondary)] ml-1">3</span>
                </div>
                <div className="flex">
                  Total:
                  <span className="text-[var(--text-secondary)] ml-1">
                    ₦{formatMoney(item.price)}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-7 h-7 flex justify-center bg-[var(--secondary)] text-[var(--customColor)] items-center cursor-pointer">
                    <i className="bi bi-dash-lg"></i>
                  </div>
                  <span className="mx-2">10</span>
                  <div className="w-7 h-7 flex justify-center bg-[var(--secondary)] text-[var(--customColor)] items-center cursor-pointer">
                    <i className="bi bi-plus-lg"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card_body sharp">
        <LinkedPagination url="/admin/products" count={count} page_size={20} />
      </div>
    </>
  )
}

export default Products
