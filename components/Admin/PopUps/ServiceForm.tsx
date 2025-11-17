'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { appendForm } from '@/lib/helpers'
import { AlartStore, MessageStore } from '@/src/zustand/notification/Message'
import { validateInputs } from '@/lib/validation'
import { AuthStore } from '@/src/zustand/user/AuthStore'
import ServiceStore from '@/src/zustand/Service'

const ServiceForm: React.FC = () => {
  const {
    serviceForm,
    loading,
    updateService,
    postService,
    setForm,
    setShowServiceForm,
    reshuffleResults,
  } = ServiceStore()
  const { setMessage } = MessageStore()
  const pathname = usePathname()
  const { setAlert } = AlartStore()
  const { user } = AuthStore()
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
  const [fromDate] = useState<Date>(defaultFrom)
  const [toDate] = useState<Date>(defaultTo)
  const url = `/services?dateFrom=${fromDate}&dateTo=${toDate}`

  useEffect(() => {
    reshuffleResults()
  }, [pathname])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm(name as keyof typeof serviceForm, value)
  }

  const handleFileChange =
    (key: keyof typeof serviceForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files ? e.target.files[0] : null
      setForm(key, file)
    }

  const handleSubmit = async () => {
    if (!user) {
      setMessage('Please login to continue', false)
      return
    }

    const inputsToValidate = [
      {
        name: 'staffName',
        value: user?.fullName,
        rules: { blank: true },
        field: 'Staff Name field',
      },
      {
        name: 'title',
        value: serviceForm.title,
        rules: { blank: true },
        field: 'Name field',
      },
      {
        name: 'video',
        value: serviceForm.video,
        rules: { blank: false },
        field: 'Video field',
      },
      {
        name: 'description',
        value: serviceForm.description,
        rules: { blank: true, minLength: 10 },
        field: 'Amount field',
      },
    ]
    const { messages } = validateInputs(inputsToValidate)
    const getFirstNonEmptyMessage = (
      messages: Record<string, string>
    ): string | null => {
      for (const key in messages) {
        if (messages[key].trim() !== '') {
          return messages[key]
        }
      }
      return null
    }

    const firstNonEmptyMessage = getFirstNonEmptyMessage(messages)
    if (firstNonEmptyMessage) {
      setMessage(firstNonEmptyMessage, false)
      return
    }

    const data = appendForm(inputsToValidate)
    alertAndSubmit(data)
  }

  const alertAndSubmit = (data: FormData) => {
    setAlert(
      'Warning',
      'Are you sure you want to submit this stock record',
      true,
      () =>
        serviceForm._id
          ? updateService(
              `/services/${serviceForm._id}/?ordering=-createdAt`,
              data,
              setMessage,
              () => setShowServiceForm(false)
            )
          : postService(`${url}&ordering=-createdAt`, data, setMessage, () =>
              setShowServiceForm(false)
            )
    )
  }

  return (
    <>
      <div
        onClick={() => setShowServiceForm(false)}
        className="fixed h-full w-full z-20 left-0 top-0 bg-black/50 items-center justify-center flex"
      >
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="card_body sharp w-full max-w-[600px]"
        >
          <div className="grid sm:grid-cols-2 gap-2">
            <div className="flex flex-col">
              <label className="label" htmlFor="">
                Title
              </label>
              <input
                className="form-input"
                name="title"
                value={serviceForm.title}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter service title"
              />
            </div>
            <div className="flex flex-col">
              <label className="label" htmlFor="">
                Staff
              </label>
              <div className="form-input">{user?.fullName}</div>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="label" htmlFor="">
              Service Description
            </label>
            <textarea
              placeholder="Write the description/observation of the service"
              className="form-input"
              name="description"
              value={serviceForm.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="table-action mt-3 flex flex-wrap">
            {loading ? (
              <button className="custom_btn">
                <i className="bi bi-opencollective loading"></i>
                Processing...
              </button>
            ) : (
              <>
                <button className="custom_btn mr-3" onClick={handleSubmit}>
                  Submit
                </button>
                <label htmlFor="video" className="custom_btn ">
                  <input
                    className="input-file"
                    type="file"
                    name="video"
                    id="video"
                    accept="video/*"
                    onChange={handleFileChange('video')}
                  />
                  <i className="bi bi-cloud-arrow-up text-2xl mr-2"></i>
                  Video
                </label>

                <button
                  className="custom_btn danger ml-auto"
                  onClick={() => setShowServiceForm(false)}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ServiceForm
