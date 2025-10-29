import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import { NavStore } from '@/src/zustand/notification/Navigation'
import { AuthStore } from '@/src/zustand/user/AuthStore'
import ThemeToggle from './ThemeToggle'
import {
  Gauge, // Dashboard
  User, // Profile
  Users,
  MessageCircle,
  FileArchive,
  CreditCard,
  ArrowLeftRight,
  Boxes,
  Settings,
  Wrench, // Comments
} from 'lucide-react'

export default function VerticalNavigation() {
  const router = useRouter()
  const [isPlace, togglePlace] = useState(false)
  const [isMsgActive, toggleMessages] = useState(false)
  const [isCompetition, toggleCompetition] = useState(false)
  const [isPagesActive, togglePages] = useState(false)
  const [isSettingsActive, toggleSettings] = useState(false)
  const pathname = usePathname()
  const { toggleVNav, vNav, clearNav } = NavStore()
  const { user } = AuthStore()

  const offStates = () => {
    toggleSettings(false)
    toggleMessages(false)
    toggleCompetition(false)
    togglePages(false)
    togglePlace(false)
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

        <div className="flex py-1">{user?.staffPositions}</div>

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
              pathname === '/admin/profile'
                ? 'text-[var(--customRedColor)]'
                : ''
            } v_nav_items hover:text-[var(--customRedColor)] flex items-center`}
            href="/admin/profile"
          >
            <User className="mr-3 w-5 h-5" />
            Profile
          </Link>
          <Link
            className={`${
              pathname === '/admin/users' ? 'text-[var(--customRedColor)]' : ''
            } v_nav_items hover:text-[var(--customRedColor)] flex items-center`}
            href="/admin/users"
          >
            <Users className="mr-3 w-5 h-5" />
            Customers
          </Link>
          <Link
            className={`${
              pathname === '/admin/reviews'
                ? 'text-[var(--customRedColor)]'
                : ''
            } v_nav_items hover:text-[var(--customRedColor)] flex items-center`}
            href="/admin/reviews"
          >
            <MessageCircle className="mr-3 w-5 h-5" />
            Reviews
          </Link>
          <Link
            className="v_nav_items hover:text-[var(--customRedColor)] flex items-center"
            href="/admin/services"
          >
            <Wrench className="mr-3 w-5 h-5" />
            Services
          </Link>

          <div className={`v_nav_items ${isPagesActive ? 'active trip' : ''}`}>
            <div
              onClick={() => togglePages((e) => !e)}
              className={`flex cursor-pointer ${
                pathname.includes('pages') ? 'text-[var(--customRedColor)]' : ''
              } items-center py-3`}
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

          <div className={`v_nav_items ${isPlace ? 'active two' : ''}`}>
            <div
              className="flex cursor-pointer items-center py-3"
              onClick={() => togglePlace((e) => !e)}
            >
              <Link className="flex flex-1 items-center" href="/team/places/1">
                <CreditCard className="mr-3 w-5 h-5" />
                Transactions
              </Link>
              <i
                className={`bi bi-caret-down-fill ml-auto ${
                  isPlace ? 'active' : ''
                }`}
              ></i>
            </div>
            <div className="nav_dropdown">
              <Link className="inner_nav_items" href="/team/places/ads">
                Pending Order
              </Link>
              <Link className="inner_nav_items" href="/team/schools/table">
                Transaction History
              </Link>
            </div>
          </div>

          <div className={`v_nav_items ${isCompetition ? 'active trip' : ''}`}>
            <div
              className="flex cursor-pointer items-center py-3"
              onClick={() => toggleCompetition((e) => !e)}
            >
              <ArrowLeftRight className="mr-3 w-5 h-5" />
              Sell Product
              <i
                className={`bi bi-caret-down-fill ml-auto ${
                  isCompetition ? 'active' : ''
                }`}
              ></i>
            </div>
            <div className="nav_dropdown">
              <Link
                className="inner_nav_items"
                href="/team/competitions/weekends"
              >
                Purchase Product
              </Link>
              <Link
                className="inner_nav_items"
                href="/team/competitions/leagues"
              >
                Expenses
              </Link>
              <Link className="inner_nav_items" href="/team/competitions/exams">
                Stocks
              </Link>
            </div>
          </div>

          <div className={`v_nav_items ${isMsgActive ? 'active trip' : ''}`}>
            <div
              className={`flex cursor-pointer items-center py-3 ${
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
              <Link className="inner_nav_items" href="/admin/products/stocking">
                Product Stocking
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
                href="/admin/company/notifications"
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
