'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { AlartStore, MessageStore } from '@/src/zustand/notification/Message'
import LinkedPagination from '@/components/Admin/LinkedPagination'
import StockingStore from '@/src/zustand/Stocking'
import {
  formatDateToDDMMYY,
  formatMoney,
  formatTimeTo12Hour,
} from '@/lib/helpers'
import StatDuration from '@/components/Admin/StatDuration'
import TransactionStore from '@/src/zustand/Transaction'
import StockingForm from '@/components/Admin/Products/StockingForm'

const ProductStocking: React.FC = () => {
  const [page_size] = useState(20)
  const [sort] = useState('-createdAt')
  const { setMessage } = MessageStore()
  const { showStocking, deleteItem, reshuffleResults, toggleActive } =
    StockingStore()

  const {
    period,
    fromDate,
    summary,
    loading,
    count,
    toDate,
    transactions,
    updateTransaction,
    getTransactions,
  } = TransactionStore()
  const pathname = usePathname()
  const { page } = useParams()
  const { setAlert } = AlartStore()
  const url = `/transactions?period=${period}&dateFrom=${fromDate}&dateTo=${toDate}`

  useEffect(() => {
    reshuffleResults()
  }, [pathname])

  useEffect(() => {
    const params = `&page_size=${page_size}&page=${
      page ? page : 1
    }&ordering=${sort}`
    getTransactions(`${url}${params}`, setMessage)
  }, [page, toDate, fromDate])

  const updateTrnx = (e: boolean, id: string) => {
    updateTransaction(
      `/transactions/${id}?ordering=-createdAt`,
      { status: e ? false : true },
      setMessage
    )
  }

  const deleteProductStock = async (id: string, index: number) => {
    toggleActive(index)
    const params = `?page_size=${page_size}&page=${
      page ? page : 1
    }&ordering=${sort}`
    await deleteItem(`/products/stocking/${id}/${params}`, setMessage)
  }

  const startDelete = (id: string, index: number) => {
    setAlert(
      'Warning',
      'Are you sure you want to delete this Product Stocking?',
      true,
      () => deleteProductStock(id, index)
    )
  }

  return (
    <>
      <StatDuration title="Daily Transactions" url="" />

      <div className="overflow-auto mb-5">
        {transactions.length > 0 ? (
          <table>
            <thead>
              <tr className="bg-[var(--primary)] p-2">
                <th>S/N</th>
                <th>Picture</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item, index) => (
                <tr
                  key={index}
                  className={` ${index % 2 === 1 ? 'bg-[var(--primary)]' : ''}`}
                >
                  <td>
                    <div className="flex items-center">
                      {(page ? Number(page) - 1 : 1 - 1) * page_size +
                        index +
                        1}
                      <i
                        onClick={() => toggleActive(index)}
                        className="bi bi-three-dots-vertical text-lg cursor-pointer"
                      ></i>
                    </div>
                    {item.isActive && (
                      <div className="card_list">
                        <span
                          onClick={() => toggleActive(index)}
                          className="more_close "
                        >
                          X
                        </span>

                        <div
                          className="card_list_item"
                          onClick={() => startDelete(item._id, index)}
                        >
                          Delete Record
                        </div>
                      </div>
                    )}
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
                  <td>{item.fullName}</td>
                  <td
                    className={`${
                      item.isProfit
                        ? 'text-[var(--success)]'
                        : 'text-[var(--customRedColor)]'
                    }`}
                  >
                    ₦{formatMoney(item.totalAmount)}
                  </td>
                  <td>
                    <div className="flex">
                      <div
                        onClick={() => updateTrnx(item.status, item._id)}
                        className={`${
                          item.status
                            ? 'bg-[var(--success)]'
                            : 'bg-[var(--customRedColor)]'
                        } px-2 cursor-pointer py-1  text-white`}
                      >
                        {item.status ? 'Paid' : 'Pending'}
                      </div>
                    </div>
                  </td>

                  <td>
                    {formatTimeTo12Hour(item.createdAt)} <br />
                    {formatDateToDDMMYY(item.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="relative flex justify-center">
            <div className="not_found_text">No Transactions Found</div>
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
      <div className="card_body sharp mb-3">
        <div className="flex flex-wrap items-center">
          <div className="ml-auto flex items-center">
            <div className="text-[var(--success)] mr-3">
              ₦{formatMoney(summary.totalProfit)}
            </div>
            <div className="text-[var(--customRedColor)]">
              ₦{formatMoney(summary.totalLoss)}
            </div>
          </div>
        </div>
      </div>

      <div className="card_body sharp">
        <LinkedPagination
          url="/admin/transactions"
          count={count}
          page_size={20}
        />
      </div>

      {showStocking && <StockingForm />}
    </>
  )
}

export default ProductStocking
