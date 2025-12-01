'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { AlartStore, MessageStore } from '@/src/zustand/notification/Message'
import LinkedPagination from '@/components/Admin/LinkedPagination'
import { formatDateToDDMMYY, formatTimeTo12Hour } from '@/lib/helpers'
import RatingStore from '@/src/zustand/Rating'
import { Star } from 'lucide-react'

const Ratings: React.FC = () => {
  const [page_size] = useState(20)
  const [sort] = useState('-createdAt')
  const { setMessage } = MessageStore()
  const {
    ratings,
    isAllChecked,
    loading,
    count,
    selectedRatings,
    massDelete,
    deleteRating,
    toggleAllSelected,
    toggleChecked,
    reshuffleResults,
    toggleActive,
    getRatings,
  } = RatingStore()
  const pathname = usePathname()
  const { page } = useParams()
  const { setAlert } = AlartStore()
  const url = '/reviews/'

  useEffect(() => {
    reshuffleResults()
  }, [pathname])

  useEffect(() => {
    const params = `?page_size=${page_size}&page=${
      page ? page : 1
    }&ordering=${sort}`
    getRatings(`${url}${params}`, setMessage)
  }, [page])

  const deleteProductStock = async (id: string, index: number) => {
    toggleActive(index)
    const params = `?page_size=${page_size}&page=${
      page ? page : 1
    }&ordering=${sort}`
    await deleteRating(`${url}/${id}/${params}`, setMessage)
  }

  const startDelete = (id: string, index: number) => {
    setAlert(
      'Warning',
      'Are you sure you want to delete this Product Stocking?',
      true,
      () => deleteProductStock(id, index)
    )
  }

  // const handlesearchFaq = _debounce(
  //   async (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const value = e.target.value
  //     if (value.trim().length > 0) {
  //       searchFaq(
  //         `${url}/search?author=${value}&content=${value}&title=${value}&subtitle=${value}&page_size=${page_size}`
  //       )
  //     } else {
  //       FaqStore.setState({ searchedFaqs: [] })
  //     }
  //   },
  //   1000
  // )

  const deleteFaqs = async () => {
    if (selectedRatings.length === 0) {
      setMessage('Please select at least one item to delete', false)
      return
    }
    const ids = selectedRatings.map((item) => item._id)
    await massDelete(`${url}/mass-delete`, { ids: ids }, setMessage)
  }

  return (
    <>
      <div className="overflow-auto mb-5">
        {ratings.length > 0 ? (
          <table>
            <thead>
              <tr className="bg-[var(--primary)] p-2">
                <th>S/N</th>
                <th>Picture</th>
                <th>Name</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((item, index) => (
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
                          Delete Stock
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
                  <td>
                    <div className="flex items-center">
                      {item.rating}{' '}
                      <Star
                        size={16}
                        className="text-[var(--customColor)] ml-1"
                      />{' '}
                    </div>
                  </td>
                  <td>
                    <div
                      className="line-clamp-5 overflow-ellipsis leading-[25px]"
                      dangerouslySetInnerHTML={{
                        __html: item.review,
                      }}
                    />
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
            <div className="not_found_text">No Product Stockings Found</div>
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
            <div onClick={deleteFaqs} className="tableActions">
              <i className="bi bi-trash"></i>
            </div>
            {/* <div onClick={() => showForm(true)} className="tableActions">
              <i className="bi bi-plus-circle"></i>
            </div> */}
            {/* <div onClick={updateExam} className="tableActions">
              <i className="bi bi-table"></i>
            </div> */}
          </div>
        </div>
      </div>

      <div className="card_body sharp">
        <LinkedPagination url="/admin/pages/faq" count={count} page_size={20} />
      </div>
    </>
  )
}

export default Ratings
