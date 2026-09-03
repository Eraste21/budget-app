import { Code2, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/auth/useAuth"

export const Topbar = () => {
    const { user } = useAuth()
    const { logout } = useAuth()
    const navigate = useNavigate()

    return (
        <div className="flex h-18 w-full shrink-0 items-center justify-between border-b border-indigo-100 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
            <div className="flex shrink-0 cursor-pointer items-center gap-3" onClick={() => navigate('/dashboard')}>
                <span className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-violet-600 text-lg font-bold text-white shadow-sm shadow-indigo-200">
                    <Code2 />
                </span>
                <h1 className="whitespace-nowrap text-xl font-bold tracking-tight text-indigo-950">
                    By deveraste21
                </h1>
            </div>

            <div className="flex shrink-0 items-center gap-3">
                <div className="hidden text-right sm:block">
                    <p className="text-xs text-slate-500">Mon compte</p>
                    <p className="text-sm font-semibold text-slate-800">{user?.username}</p>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} className="flex size-10 cursor-pointer list-none items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 ring-2 ring-white transition hover:bg-indigo-200 focus:outline-none focus:ring-indigo-300 [&::-webkit-details-marker]:hidden">
                        {user?.username?.[0]?.toUpperCase()}
                    </div>
                    <ul tabIndex={-1} className="menu dropdown-content z-10 mt-3 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/70">
                        <li>
                            <button
                                className="flex w-full items-center gap-3 rounded-lg border border-dashed border-red-300 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700 transition hover:border-red-400 hover:bg-red-100"
                                type="button"
                                onClick={logout}
                            >
                                <LogOut aria-hidden="true" className="size-4" />
                                Déconnexion
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
