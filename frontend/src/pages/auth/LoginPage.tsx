import { useState } from "react"
import { useAuth } from "../../hooks/auth/useAuth"
import { useNavigate } from "react-router-dom"

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setError('')

    try {
      await login({ email, password })
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion')
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-violet-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-indigo-200/50">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-indigo-950">Se connecter</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">Accédez à votre compte pour gérer votre budget.</p>
        </header>

        {error && (
          <p className="mb-4 text-sm text-red-600">{error}</p>
        )}

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700" htmlFor="email">
              Adresse e-mail
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              type="email"
              id="email"
              name="email"
              placeholder="Adresse e-mail"
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
              placeholder="Mot de passe"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-end gap-4 text-sm">
            <a
              className="font-semibold text-indigo-600 transition hover:text-violet-700"
              href="/forgot-password"
            >
              Mot de passe oublié ?
            </a>
          </div>

          <button
            className="w-full rounded-lg bg-linear-to-r from-blue-600 to-violet-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:from-blue-700 hover:to-violet-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/25 cursor-pointer"
            type="submit"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Vous n'avez pas encore de compte ?{' '}
          <a className="font-semibold text-indigo-600 transition hover:text-violet-700" href="/register">
            Créer un compte
          </a>
        </p>
      </section>
    </main>
  )
}
