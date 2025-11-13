'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { formatMoney } from '@/lib/helpers'
import { MessageStore } from '@/src/zustand/notification/Message'
import LinkedPagination from '@/components/Admin/LinkedPagination'
import ProductStore from '@/src/zustand/Product'
import { AuthStore } from '@/src/zustand/user/AuthStore'

const BuyingProductTable: React.FC = () => {
  const {
    getBuyingProducts,
    setToBuyCart,
    createTransaction,
    updateBuyingCartUnits,
    totalAmount,
    buyingCartProducts,
    count,
    buyingProducts,
  } = ProductStore()
  const [page_size] = useState(20)
  const [sort] = useState('-createdAt')
  const { setMessage } = MessageStore()
  const { user } = AuthStore()
  const [showCart, setShowCart] = useState(false)
  const pathname = usePathname()
  const { page } = useParams()
  const url = '/products'

  useEffect(() => {
    if (buyingCartProducts.length === 0) {
      const params = `?page_size=${page_size}&page=${
        page ? page : 1
      }&ordering=${sort}&isBuyable=${true}`
      getBuyingProducts(`${url}${params}`, setMessage)
    }
  }, [page, pathname])

  const handleSubmit = async (e: string) => {
    if (!user) {
      setMessage('Please select a customer to continue.', false)
      return
    }
    const data = {
      buyingCartProducts: buyingCartProducts,
      username: user.username,
      fullName: user.fullName,
      picture: user.picture,
      totalAmount: totalAmount,
      payment: e,
      isProfit: false,
      status: true,
    }

    createTransaction(
      `/transactions/purchase?isBuyable=false&ordering=name`,
      data,
      setMessage,
      () => {
        setShowCart(false)
      }
    )
  }

  return (
    <>
      <div className="card_body sharp mb-3 flex items-center flex-wrap">
        <div className="px-2 py-1 bg-[var(--secondary)] text-[var(--text-secondary)] mr-3">
          {user?.fullName}
        </div>

        <div
          onClick={() => {
            if (buyingCartProducts.length > 0) {
              setShowCart(true)
            }
          }}
          className="flex justify-center ml-auto items-center relative text-white cursor-pointer md:w-15 md:h-15 w-10 h-10"
        >
          <i className="bi bi-cart3 text-[20px] text-[var(--text-secondary)]"></i>
          <div className="w-[20px] h-[20px] text-sm flex justify-center items-center rounded-full top-0 right-0 absolute bg-[var(--customRedColor)]">
            {buyingCartProducts.length > 9
              ? '9+'
              : buyingCartProducts.length || 0}
          </div>
        </div>
      </div>

      {buyingProducts.map((item, index) => (
        <div key={index} className="card_body sharp mb-1">
          <div className="">
            <div className="flex flex-wrap sm:flex-nowrap relative items-start mb-3 sm:mb-1">
              <div className="flex items-center mr-3">
                {(page ? Number(page) - 1 : 1 - 1) * page_size + index + 1}
              </div>
              <div className="relative w-[150px] h-[100px] sm:h-[50] sm:w-[100] mb-3 sm:mb-0 overflow-hidden rounded-[5px] sm:mr-3">
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
              <div className="flex flex-col items-start w-full sm:w-auto">
                <div className="flex text-lg mb-2 sm:mb-3 items-center">
                  <div className="text-[var(--text-secondary)]">
                    {item.name}
                  </div>{' '}
                  <span className="block mx-1">|</span>
                  <div className="line-clamp-2 overflow-ellipsis">
                    {item.seoTitle}
                  </div>
                </div>
                <div className="flex mb-2">
                  <div className="flex mr-5">
                    Cost Price:{' '}
                    <span className="text-[var(--text-secondary)] ml-1">
                      ₦{formatMoney(item.costPrice)}
                    </span>
                  </div>
                  <div className="flex">
                    Selling Price:{' '}
                    <span className="text-[var(--text-secondary)] ml-1">
                      ₦{formatMoney(item.price)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div
                    onClick={() => setToBuyCart(item, false)}
                    className="flex justify-center h-[30px] w-[30px] cursor-pointer items-center bg-[var(--secondary)]"
                  >
                    <i className="bi bi-dash text-[var(--text-secondary)]"></i>
                  </div>
                  <div className="text-[var(--customRedColor)] font-bold mx-2">
                    {item.cartUnits}
                  </div>
                  <div
                    onClick={() => setToBuyCart(item, true)}
                    className="flex justify-center h-[30px] w-[30px] cursor-pointer items-center bg-[var(--secondary)]"
                  >
                    <i className="bi bi-plus text-[var(--customRedColor)]"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="card_body sharp">
        <LinkedPagination
          url="/admin/activites/purchase"
          count={count}
          page_size={20}
        />
      </div>

      {showCart && buyingCartProducts.length > 0 && (
        <div
          onClick={() => setShowCart(false)}
          className="fixed h-full w-full z-30 left-0 top-0 bg-black/50 items-center justify-center flex"
        >
          <div
            onClick={(e) => {
              e.stopPropagation()
            }}
            className="card_body sharp w-full max-w-[600px]"
          >
            <div className="overflow-auto max-h-[80vh]">
              {buyingCartProducts.map((item, index) => (
                <div key={index} className="card_body sharp mb-1">
                  <div className="">
                    <div className="flex flex-wrap sm:flex-nowrap relative items-start mb-3">
                      <div className="flex items-center mr-3">{index + 1}</div>
                      <div className="relative w-[70px] h-[50px] mb-3 sm:mb-0 overflow-hidden rounded-[5px] sm:mr-3">
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
                      <div className="flex flex-col items-start w-full sm:w-auto">
                        <div className="text-[var(--text-secondary)] mb-1">
                          {item.name}
                        </div>{' '}
                        <div className="flex text-sm">
                          <div className="flex mr-3">
                            Qty:
                            <span className="text-[var(--text-secondary)] ml-1">
                              {item.cartUnits}
                            </span>
                          </div>
                          <div className="flex">
                            Price:
                            <span className="text-[var(--text-secondary)] ml-1">
                              ₦{formatMoney(item.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex mr-3">
                        Price:
                        <span className="text-[var(--text-secondary)] ml-1">
                          ₦{formatMoney(item.price * item.cartUnits)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div
                          onClick={() => setToBuyCart(item, false)}
                          className="flex justify-center h-[25px] w-[25px] cursor-pointer items-center bg-[var(--secondary)]"
                        >
                          <i className="bi bi-dash text-[var(--text-secondary)]"></i>
                        </div>
                        <input
                          value={item.cartUnits}
                          onChange={(e) => {
                            const value = Number(e.target.value)
                            if (isNaN(value) || value < 0) return
                            updateBuyingCartUnits(item._id, value)
                          }}
                          placeholder="Units"
                          className="bg-[var(--secondary)] mx-2 max-w-[80px] p-1 outline-none border border-[var(--border)]"
                          type="number"
                        />
                        <div
                          onClick={() => setToBuyCart(item, true)}
                          className="flex justify-center h-[25px] w-[25px] cursor-pointer items-center bg-[var(--secondary)]"
                        >
                          <i className="bi bi-plus text-[var(--customRedColor)]"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[var(--secondary)] p-3 flex items-center flex-wrap">
              <div className="mr-auto text-[var(--customRedColor)]">
                ₦{formatMoney(totalAmount)}
              </div>
              <div
                onClick={() => handleSubmit('Transfer')}
                className="px-2 cursor-pointer py-1 bg-[var(--success)] text-[var(--text-secondary)] mr-3"
              >
                Transfer
              </div>
              <div
                onClick={() => handleSubmit('Cash')}
                className="px-3 cursor-pointer py-1 bg-[var(--customRedColor)] text-[var(--text-secondary)] mr-3"
              >
                Cash
              </div>
              <div
                onClick={() => handleSubmit('POS')}
                className="px-3 cursor-pointer py-1 bg-[var(--customColor)] text-[var(--text-secondary)] mr-3"
              >
                POS
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BuyingProductTable
