'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProductStore from '@/src/zustand/Product'
import { formatMoney } from '@/lib/helpers'
import { AuthStore } from '@/src/zustand/user/AuthStore'
import { PageHeader } from '@/components/Public/PageBanner'

function CheckOut() {
  const { cartProducts, totalAmount, setToCart } = ProductStore()
  const { user } = AuthStore()

  return (
    <div>
      {/*//// CheckOut Section 1 ////*/}
      <PageHeader page="Check Out" title="Check Out Cart Products" />

      {/*//// Check-Out Section 2////*/}
      <div className="flex py-[100px] justify-center bg-[var(--backgroundColor)]">
        <div className="customContainer">
          <div className="flex flex-col items-center ">
            <div className="mb-4 max-w-[800px]">
              {cartProducts.map((item, i) => (
                <div
                  key={i}
                  className={`${
                    i % 2 === 0 ? 'bg-[var(--secondaryCustomColor)]' : ''
                  } flex px-3 sm:px-7 py-3 sm:py-8 flex-col shadow-sm mb-6`}
                >
                  <div className="flex items-center flex-wrap ">
                    <div className="flex md:flex-col items-center mb-3 md:mb-0">
                      <div className="mb-3">
                        <Image
                          src={String(item.picture)}
                          sizes="100vw"
                          className="md:h-[70px] object-contain h-[85px] md:w-[70px] w-[85px] md:mr-0 mr-4"
                          width={0}
                          height={0}
                          alt="real"
                        />
                      </div>
                      <div className="text-[20px] text-[var(--primaryTextColor)]">
                        {item.name}
                      </div>
                    </div>
                    <div className="grid font-semibold grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                      <div className="flex sm:text-[20px] mr-4 pr-[16px]">
                        <span className="mr-2 ">Price</span>
                        <span>₦{formatMoney(item.price)}</span>
                      </div>
                      <div className="flex sm:text-[20px] mr-4">
                        <span className="mr-2">Total</span>
                        <span className="mr-2">
                          ₦{formatMoney(item.price * item.cartUnits)}
                        </span>
                      </div>

                      <div className="flex w-full text-[20px]">
                        <div
                          onClick={() => setToCart(item, false)}
                          className="flex justify-center h-[30px] w-[35px] cursor-pointer items-center border border-gray-200 rounded-[5px]"
                        >
                          <i className="bi bi-dash text-[var(--primaryTextColor)]"></i>
                        </div>
                        <div className="text-[var(--customRedColor)] px-3">
                          <span className="mr-2">Qty</span>
                          <span>{item.cartUnits}</span>
                        </div>
                        <div
                          onClick={() => setToCart(item, true)}
                          className="flex justify-center h-[30px] w-[35px] cursor-pointer items-center border border-gray-200 rounded-[5px]"
                        >
                          <i className="bi bi-plus text-[var(--primaryTextColor)]"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex px-7 py-8 flex-col shadow-sm mb-6">
                <div className="flex">
                  <div className="text-[20px] text-[var(--primaryTextColor)] mr-4">
                    Total
                  </div>
                  <div className="text-[20px] text-[var(--primaryTextColor)]">
                    ₦{formatMoney(totalAmount)}
                  </div>
                </div>
              </div>
            </div>
            {user ? (
              <Link
                className="text-[20px] text-white bg-[var(--customColor)] rounded py-[10px] px-[30px]"
                href={'/'}
              >
                Make Payment
              </Link>
            ) : (
              <Link
                className="text-[20px] text-white bg-[var(--customColor)] rounded py-[10px] px-[30px]"
                href={'/sign-in'}
              >
                Create Account
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOut
