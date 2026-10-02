import {type SubmitEvent, useState} from "react";
import {useNavigate} from "react-router";
import Loading from "../components/Loading.tsx";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 400));
        if (!email || !password || !password.startsWith("t")) {
            setIsSubmitting(false);
            setError(true);
            return;
        }
        navigate("/dashboard");
    }

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-slate-50 px-4">
            <h1 className="text-3xl font-semibold text-slate-900">
                MarketOne Login
            </h1>
            <form
                onSubmit={handleSubmit}
                className="mt-5 w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
            >
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => {
                            if (email === "" || event.target.value === "" && error) {
                                setError(false);
                            }
                            setEmail(event.target.value)
                        }}
                        className="border rounded-lg text-sm w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                        placeholder="email@infinitron.al"
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => {
                            if (password === "" || event.target.value === "" && error) {
                                setError(false);
                            }
                            setPassword(event.target.value)
                        }}
                        className="border rounded-lg text-sm w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        minLength={8}
                        required
                    />
                    {error && <p className="text-red-800 text-sm">Ju lutemi te kontrolloni kredencialet!</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg border bg-brand px-4 py-2.5 hover:bg-gray-200"
                >
                    {isSubmitting ? <Loading label="Signing in..." /> : "Login"}
                </button>
            </form>
        </div>
    )
}