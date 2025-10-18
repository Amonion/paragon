import { generateMetadata } from '@/lib/seo'
import SignUp from '@/components/Public/Auth/SignUp'

export const metadata = generateMetadata({
  title: 'Sign Up | Paragon',
  description: 'Create your Paragon account now.',
  twitter: {
    card: 'summary',
    site: '@paragon',
  },
})

export default function SignUpClient() {
  return (
    <>
      <SignUp />
    </>
  )
}
