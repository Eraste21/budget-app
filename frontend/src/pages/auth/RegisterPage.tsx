import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/auth/useAuth"

export const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const { register } = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) return setError('Les mots de passe ne correspondent pas')

        try {
            await register({ username, email, password })
            navigate('/login')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue')
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-violet-100 px-4 py-10">
            <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-indigo-200/50">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-indigo-950">Créer un compte</h1>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Inscrivez-vous pour commencer à gérer votre budget.
                    </p>
                </header>

                {error && (
                    <p className="mb-4 text-sm text-red-600">{error}</p>
                )}

                <form
                    className="space-y-5"
                    onSubmit={handleSubmit}
                >
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700" htmlFor="username">
                            Nom d'utilisateur
                        </label>
                        <input
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Ex. Dupont"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700" htmlFor="email">
                            Adresse e-mail
                        </label>
                        <input
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ex. dupont@gmail.com"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700" htmlFor="password">
                            Mot de passe
                        </label>
                        <input
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="new-password"
                            placeholder="Créez un mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700" htmlFor="confirmPassword">
                            Confirmer le mot de passe
                        </label>
                        <input
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            autoComplete="new-password"
                            placeholder="Confirmer"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="w-full rounded-lg bg-linear-to-r from-blue-600 to-violet-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:from-blue-700 hover:to-violet-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/25"
                        type="submit"
                    >
                        Créer mon compte
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-500">
                    Vous avez déjà un compte ?{' '}
                    <a className="font-semibold text-indigo-600 transition hover:text-violet-700" href="/login">
                        Se connecter
                    </a>
                </p>
            </section>
        </main>
    )
}
