import SignInClient from '@/components/Public/Auth/SignInClient'
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'Sign In | Paragon',
  description: 'Sign in to your Paragon account to continue.',
  twitter: {
    card: 'summary',
    site: '@paragon',
  },
})

export default function SignIn() {
  return (
    <>
      <SignInClient />
    </>
  )
}
