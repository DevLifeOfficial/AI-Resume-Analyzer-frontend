import { connection } from 'next/server'
import PaymentPage from './components/PaymentPage'

export default async function DemoPaymentPage() {
  await connection();
  return (
    <div className="min-h-screen bg-[var(--navy-mid)] py-16 px-4 sm:px-6 lg:px-8">
      <PaymentPage/>
    </div>
  )
}
