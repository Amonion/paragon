'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { AlartStore, MessageStore } from '@/src/zustand/notification/Message'
import LinkedPagination from '@/components/Admin/LinkedPagination'
import { formatDateToDDMMYY, formatTimeTo12Hour } from '@/lib/helpers'
import StatDuration from '@/components/Admin/StatDuration'
import ServiceStore, { Service } from '@/src/zustand/Service'
import ServiceForm from './PopUps/ServiceForm'

const ServicesTable: React.FC = () => {
  const [page_size] = useState(20)
  const [sort] = useState('-createdAt')
  const { setMessage } = MessageStore()
  const { setAlert } = AlartStore()
  const {
    loading,
    count,
    services,
    isAllChecked,
    showServiceForm,
    setShowServiceForm,
    deleteItem,
    getServices,
    toggleActive,
    toggleAllSelected,
    reshuffleResults,
  } = ServiceStore()
  const pathname = usePathname()
  const { page, username } = useParams()
  const defaultFrom = () => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }

  const defaultTo = () => {
    const d = new Date()
    d.setHours(23, 59, 59, 999)
    return d
  }
  const [fromDate, setFromDate] = useState<Date>(defaultFrom)
  const [toDate, setToDate] = useState<Date>(defaultTo)
  const url = `/services?dateFrom=${fromDate}&dateTo=${toDate}`

  useEffect(() => {
    if (fromDate && toDate) {
      const params = `&page_size=${page_size}&page=${
        page ? page : 1
      }&ordering=${sort}`
      getServices(`${url}${params}`, setMessage)
    }
  }, [page, pathname, username, toDate, fromDate])

  const startEdit = (service: Service) => {
    ServiceStore.setState({ serviceForm: service })
    displayServiceForm()
  }
  const startDelete = (id: string) => {
    setAlert(
      'Warning',
      'Are you sure you want to delete this Service?',
      true,
      () => deleteItem(`/services/${id}`, setMessage)
    )
  }

  const displayServiceForm = () => {
    setShowServiceForm(!showServiceForm)
    reshuffleResults()
  }

  return (
    <>
      <StatDuration
        title={`Daily Services`}
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
      />

      <div className="overflow-auto mb-5">
        {services.length > 0 ? (
          <table>
            <thead>
              <tr className="bg-[var(--primary)] p-2">
                <th>S/N</th>
                <th>Staff</th>
                <th>Title</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {services.map((item, index) => (
                <tr
                  key={index}
                  className={` ${index % 2 === 1 ? 'bg-[var(--primary)]' : ''}`}
                >
                  <td className="relative">
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
                          onClick={() => startEdit(item)}
                        >
                          Edit Services
                        </div>
                        <div
                          className="card_list_item"
                          onClick={() => startDelete(item._id)}
                        >
                          Delete Services
                        </div>
                      </div>
                    )}
                  </td>
                  <td>{item.staffName}</td>
                  <td>{item.title}</td>
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
            <div className="not_found_text">No Services Found</div>
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
          <div className="grid mr-auto grid-cols-4 gap-2 w-[160px]">
            <div onClick={toggleAllSelected} className="tableActions">
              <i
                className={`bi bi-check2-all ${
                  isAllChecked ? 'text-[var(--custom)]' : ''
                }`}
              ></i>
            </div>
            <div
              onClick={() => setShowServiceForm(!showServiceForm)}
              className="tableActions"
            >
              <i className="bi bi-plus-circle"></i>
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
      {showServiceForm && <ServiceForm />}
    </>
  )
}

export default ServicesTable
