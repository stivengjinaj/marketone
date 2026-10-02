import {useNavigate} from "react-router";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <main className="grid min-h-screen place-items-center bg-sky-950 px-6 text-gray-100">
            <section className="-translate-y-6 text-center">
                <div className="grid gap-3">
                    <h1 className="font-serif text-5xl font-semibold tracking-wide sm:text-6xl">
                        MarketOne
                    </h1>
                    <p className="text-lg text-sky-100/80">
                        Mire se vini ne MarketOne
                    </p>
                </div>
                <div className="mt-10">
                    <button
                        type="button"
                        onClick={() => {navigate("/login")}}
                        className="rounded-lg bg-white px-8 py-3 font-semibold text-sky-950 shadow-lg transition-colors hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                        Login
                    </button>
                </div>
            </section>
        </main>
    )
}