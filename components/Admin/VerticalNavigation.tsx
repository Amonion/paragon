import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import { NavStore } from '@/src/zustand/notification/Navigation'
import { AuthStore } from '@/src/zustand/user/AuthStore'
import ThemeToggle from './ThemeToggle'
import {
  Gauge,
  Users,
  FileArchive,
  CreditCard,
  ArrowLeftRight,
  Boxes,
  Settings,
  Wrench,
  HeartHandshake,
} from 'lucide-react'

export default function VerticalNavigation() {
  const router = useRouter()
  const [isSocial, toggleSocial] = useState(false)
  const [isTransaction, toggleTransaction] = useState(false)
  const [isMsgActive, toggleMessages] = useState(false)
  const [isPagesActive, togglePages] = useState(false)
  const [isService, toggleService] = useState(false)
  const [isUser, toggleUser] = useState(false)
  const [isSettingsActive, toggleSettings] = useState(false)
  const pathname = usePathname()
  const { toggleVNav, vNav, clearNav } = NavStore()
  const { user } = AuthStore()

  const offStates = () => {
    toggleSettings(false)
    toggleMessages(false)
    togglePages(false)
    toggleService(false)
    toggleUser(false)
    toggleTransaction(false)
    toggleSocial(false)
    clearNav()
  }

  useEffect(() => {
    // loadUserFromStorage();
    offStates()
  }, [router, pathname])

  const handlers = useSwipeable({
    onSwipedLeft: toggleVNav,
  })

  return (
    <div
      onClick={toggleVNav}
      className={` ${
        vNav ? 'left-0' : 'left-[-100%]'
      } md:border-r-0 md:w-[270px] overflow-auto fixed  h-[100vh] top-0 md:z-30 z-50 w-full flex transition-all  md:left-0 justify-start md:sticky`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        {...handlers}
        className="v_nav_card nav"
      >
        <div className="flex items-start pt-2">
          {user && user.picture ? (
            <Image
              className="object-cover rounded-full mr-2"
              src={String(user.picture)}
              loading="lazy"
              alt="username"
              sizes="100vw"
              height={0}
              width={0}
              style={{ height: '50px', width: '50px' }}
            />
          ) : (
            <Image
              className="object-cover rounded-full mr-2"
              src={'/images/avatar.jpg'}
              loading="lazy"
              alt="username"
              sizes="100vw"
              height={0}
              width={0}
              style={{ height: '50px', width: '50px' }}
            />
          )}
          <div>
            <div className="text-lg mb-1">Welcome back</div>
            <div className="text-[var(--customRedColor)]">
              {' '}
              {`@${user?.username}`}
            </div>
          </div>
        </div>

        {/* <div className="flex py-1">{user?.staffPositions}</div> */}

        <div className="mt-4">
          <Link
            className={`${
              pathname === '/admin' ? 'text-[var(--customRedColor)]' : ''
            } v_nav_items hover:text-[var(--customRedColor)] flex items-center`}
            href="/admin"
          >
            <Gauge className="mr-3 w-5 h-5" />
            Dashboard
          </Link>
          <Link
            className={`${
              pathname === '/admin/activities'
                ? 'text-[var(--customRedColor)]'
                : ''
            } v_nav_items hover:text-[var(--customRedColor)] flex items-center`}
            href="/admin/activities"
          >
            <ArrowLeftRight className="mr-3 w-5 h-5" />
            Sell Products
          </Link>
          <Link
            className={`${
              pathname === '/admin/activities/purchase'
                ? 'text-[var(--customRedColor)]'
                : ''
            } v_nav_items hover:text-[var(--customRedColor)] flex items-center`}
            href="/admin/activities/purchase"
          >
            <CreditCard className="mr-3 w-5 h-5" />
            Purchase Products
          </Link>

          <div className={`v_nav_items ${isUser ? 'active trip' : ''}`}>
            <div
              className={`${
                pathname.includes('/admin/customers')
                  ? 'text-[var(--customRedColor)]'
                  : ''
              }  hover:text-[var(--customRedColor)] flex cursor-pointer items-center py-3`}
            >
              <Link
                className="flex flex-1 items-center"
                href="/admin/customers"
              >
                <Users className="mr-3 w-5 h-5" />
                Customers
              </Link>
              <i
                onClick={() => toggleUser((e) => !e)}
                className={`bi bi-caret-down-fill ml-auto ${
                  isUser ? 'active' : ''
                }`}
              ></i>
            </div>
            <div className="nav_dropdown">
              <Link className="inner_nav_items" href="/admin/customers/reviews">
                Customer Reviews
              </Link>
              <Link
                className="inner_nav_items"
                href="/admin/customers/equipments"
              >
                Equipment Report
              </Link>
              <Link
                className="inner_nav_items"
                href="/admin/customers/visitors"
              >
                Visitors
              </Link>
            </div>
          </div>
          <div className={`v_nav_items ${isSocial ? 'active two' : ''}`}>
            <div
              className={`hover:text-[var(--customRedColor)] flex cursor-pointer items-center py-3`}
            >
              <Link
                className="flex flex-1 items-center"
                href="/admin/socials/strategies"
              >
                <HeartHandshake className="mr-3 w-5 h-5" />
                Monthly Strategy
              </Link>
              <i
                onClick={() => toggleSocial((e) => !e)}
                className={`bi bi-caret-down-fill ml-auto ${
                  isSocial ? 'active' : ''
                }`}
              ></i>
            </div>
            <div className="nav_dropdown">
              <Link className="inner_nav_items" href="/admin/socials">
                Social Reports
              </Link>
              <Link className="inner_nav_items" href="/admin/socials/marketing">
                Marketing Reports
              </Link>
            </div>
          </div>
          <div className={`v_nav_items ${isPagesActive ? 'active trip' : ''}`}>
            <div
              onClick={() => togglePages((e) => !e)}
              className={`flex cursor-pointer ${
                pathname.includes('pages') ? 'text-[var(--customRedColor)]' : ''
              } hover:text-[var(--customRedColor)] items-center py-3`}
            >
              <FileArchive className="mr-3 w-5 h-5" />
              Pages
              <i
                className={`bi bi-caret-down-fill ml-auto ${
                  isPagesActive ? 'active' : ''
                }`}
              ></i>
            </div>
            <div className="nav_dropdown">
              <Link
                className="inner_nav_items hover:text-[var(--customColor)]"
                href="/admin/pages/blog"
              >
                Blog
              </Link>

              <Link
                className="inner_nav_items hover:text-[var(--customColor)]"
                href="/admin/pages/faq"
              >
                FAQ
              </Link>
              <Link
                className="inner_nav_items hover:text-[var(--customColor)]"
                href="/admin/pages/terms"
              >
                Terms
              </Link>
            </div>
          </div>

          <div className={`v_nav_items ${isService ? 'active two' : ''}`}>
            <div
              className={`hover:text-[var(--customRedColor)] flex cursor-pointer items-center py-3`}
            >
              <Link
                className="flex flex-1 items-center"
                href="/admin/operations"
              >
                <Wrench className="mr-3 w-5 h-5" />
                Production
              </Link>
              <i
                onClick={() => toggleService((e) => !e)}
                className={`bi bi-caret-down-fill ml-auto ${
                  isService ? 'active' : ''
                }`}
              ></i>
            </div>
            <div className="nav_dropdown">
              <Link
                className="inner_nav_items"
                href="/admin/operations/consumptions"
              >
                Consumption
              </Link>
              <Link
                className="inner_nav_items"
                href="/admin/operations/services"
              >
                Services
              </Link>
            </div>
          </div>

          <div className={`v_nav_items ${isTransaction ? 'active trip' : ''}`}>
            <div
              className={`hover:text-[var(--customRedColor)] flex cursor-pointer items-center py-3`}
            >
              <Link
                className="flex flex-1 items-center"
                href="/admin/transactions"
              >
                <CreditCard className="mr-3 w-5 h-5" />
                Transactions
              </Link>
              <i
                onClick={() => toggleTransaction((e) => !e)}
                className={`bi bi-caret-down-fill ml-auto ${
                  isTransaction ? 'active' : ''
                }`}
              ></i>
            </div>
            <div className="nav_dropdown">
              <Link
                className="inner_nav_items"
                href="/admin/transactions/status"
              >
                Transaction Status
              </Link>
              <Link
                className="inner_nav_items"
                href="/admin/transactions/purchases"
              >
                Purchase Transactions
              </Link>
              <Link
                className="inner_nav_items"
                href="/admin/operations/expenses"
              >
                Expenses
              </Link>
            </div>
          </div>

          <div className={`v_nav_items ${isMsgActive ? 'active two' : ''}`}>
            <div
              className={`flex hover:text-[var(--customRedColor)] cursor-pointer items-center py-3 ${
                pathname.includes('products')
                  ? 'text-[var(--customRedColor)]'
                  : ''
              }`}
              onClick={() => toggleMessages((e) => !e)}
            >
              <Boxes className="mr-3 w-5 h-5" />
              Products
              <i
                className={`bi bi-caret-down-fill ml-auto ${
                  isMsgActive ? 'active' : ''
                }`}
              ></i>
            </div>
            <div className="nav_dropdown">
              <Link className="inner_nav_items" href="/admin/products">
                Product Settings
              </Link>
              <Link className="inner_nav_items" href="/admin/products/stocks">
                Stocks
              </Link>
            </div>
          </div>

          <div className={`v_nav_items ${isSettingsActive ? 'active' : ''}`}>
            <div
              onClick={() => toggleSettings((e) => !e)}
              className={`hover:text-[var(--customRedColor)] flex cursor-pointer items-center py-3 ${
                pathname.includes('company')
                  ? 'text-[var(--customRedColor)]'
                  : ''
              }`}
            >
              <Settings className="mr-3 w-5 h-5" />
              Company
              <i
                className={`bi bi-caret-down-fill ml-auto ${
                  isSettingsActive ? 'active' : ''
                }`}
              ></i>
            </div>
            <div className="nav_dropdown">
              <Link className="inner_nav_items" href="/admin/company">
                Set Company
              </Link>
              <Link className="inner_nav_items" href="/admin/company/staffs">
                Staffs
              </Link>

              <Link className="inner_nav_items" href="/admin/company/emails">
                Emails
              </Link>
              <Link
                className="inner_nav_items"
                href="/admin/company/notification-templates"
              >
                Notifications
              </Link>
            </div>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </div>
  )
}
