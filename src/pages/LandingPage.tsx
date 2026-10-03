import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <span className="text-base font-semibold text-slate-900">MarketOne</span>
        <Link to="/login">
          <Button variant="secondary">Akses</Button>
        </Link>
      </header>

      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Biznesi juaj ne nje platforme te vetmje
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
          MarketOne eshte nje platforme qe lidh klientin me marketet duke ofruar mundesine e
          blerjeve dhe menaxhimit te porosite.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link to="/login">
            <Button>Akseso MarketOne</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
