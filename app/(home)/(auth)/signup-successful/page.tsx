import { generateMetadata } from '@/lib/seo'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export const metadata = generateMetadata({
  title: 'Sign Up Successful | Archination',
  description: 'Congratulations, your account has been created successfully.',
  twitter: {
    card: 'summary',
    site: '@archination',
  },
})

export default function SignInClient() {
  const router = useRouter()

  return (
    <>
      <form className="flex flex-col items-center py-5 px-3">
        <h2 className="text-2xl mb-3 uppercase text-center font-semibold text-[var(--custom-text-color)]">
          Congratulations!!!
        </h2>
        <Image
          style={{ height: 'auto', width: '70%' }}
          src="/images/congratulations.png"
          loading="lazy"
          sizes="100vw"
          className="my-2"
          width={0}
          height={0}
          alt="Archination Logo"
        />
        <h2 className="text-xl text-center font-semibold mb-2">
          Your account has been created successfully
        </h2>
        <button
          onClick={() => router.replace(`/sign-in`)}
          className="homeButton block w-full"
        >
          Go To Dashboard
        </button>
      </form>
    </>
  )
}
