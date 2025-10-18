import SignupSuccess from '@/components/Public/Auth/SignupSuccess'
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'Sign Up Successful | Paragon',
  description:
    'Congratulations, your Paragon account has been created successfully.',
  twitter: {
    card: 'summary',
    site: '@paragon',
  },
})

export default function SignInClient() {
  return (
    <>
      <SignupSuccess />
    </>
  )
}
