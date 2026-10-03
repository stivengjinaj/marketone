import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 px-4 text-center">
      <p className="text-sm font-medium text-slate-400">404</p>
      <h1 className="text-xl font-semibold text-slate-900">Page not found</h1>
      <Link to="/">
        <Button variant="secondary" className="mt-2">
          Back to home
        </Button>
      </Link>
    </div>
  )
}
