'use client'
import Link from 'next/link'
import Image from 'next/image'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa'
import { NavStore } from '@/src/zustand/notification/Navigation'
export default function PublicNavbar() {
  const pathName = usePathname()
  const { vNav, clearNav } = NavStore()

  useEffect(() => {
    clearNav()
  }, [pathName])

  const closeNave = (e: React.MouseEvent) => {
    e.stopPropagation()
    clearNav()
  }

  return (
    <nav className="bg-[var(--customColor)] text-white flex justify-center">
      <div className="custom-container">
        <div
          onClick={closeNave}
          className={`${
            vNav ? 'left-0' : 'left-[-1000px] md:left-0'
          } md:relative fixed  top-0 h-full bg-black/65 md:bg-transparent w-full z-50`}
        >
          <ul className="md:flex md:w-full  w-[300px]  h-full">
            <li className="md:hidden pt-4 px-3 mb-5">
              <Link href="/" className="sm:w-40 w-32 max-w-40">
                <Image
                  style={{ height: 'auto' }}
                  src="/paragonLogo.png"
                  loading="lazy"
                  sizes="100vw"
                  className="sm:w-40 w-32"
                  width={0}
                  height={0}
                  alt="Paragon Logo"
                />
              </Link>
            </li>
            <li>
              <Link
                className={`navLinks ${
                  pathName === '/' ? 'bg-[var(--customRedColor)]' : ''
                }`}
                href={`/`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`navLinks ${
                  pathName === '/designs'
                    ? 'bg-[var(--custom-light-color)]'
                    : ''
                }`}
                href={`/designs`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className={`navLinks ${
                  pathName === '/pages' ? 'bg-[var(--custom-light-color)]' : ''
                }`}
                href={`/pages`}
              >
                Pages
              </Link>
            </li>
            <li>
              <Link
                className={`navLinks ${
                  pathName === '/services'
                    ? 'bg-[var(--custom-light-color)]'
                    : ''
                }`}
                href={`/services`}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                className={`navLinks ${
                  pathName === '/contact' ? 'bg-[var(--customRedColor)]' : ''
                }`}
                href={`/contact`}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                className={`navLinks ${
                  pathName === '/blog' ? 'bg-[var(--custom-light-color)]' : ''
                }`}
                href={`/blog`}
              >
                Blog
              </Link>
            </li>
            <li className="ml-auto">
              <Link
                className={`navLinks ${
                  pathName === '/sign-up' ? 'bg-[var(--customRedColor)]' : ''
                }`}
                href={`/sign-up`}
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                className={`navLinks ${
                  pathName === '/sign-in'
                    ? 'bg-[var(--customRedColor)]'
                    : 'bg-[var(--customDarkColor)]'
                }`}
                href={`/sign-in`}
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
        <ul className="flex md:hidden items-center w-full">
          <li className="sm:flex justify-start gap-4 text-white hidden">
            <FaFacebookF />
            <FaTwitter />
            <FaYoutube />
            <FaLinkedinIn />
          </li>
          <li className="ml-auto">
            <Link
              className={`navLinks ${
                pathName === '/sign-up' ? 'bg-[var(--custom-light-color)]' : ''
              }`}
              href={`/sign-up`}
            >
              Create Account
            </Link>
          </li>
          <li>
            <Link
              className={`navLinks bg-[var(--custom-light-color)]`}
              href={`/sign-in`}
            >
              Sign In
            </Link>
          </li>
        </ul>
        {/* </div> */}
      </div>
    </nav>
  )
}
