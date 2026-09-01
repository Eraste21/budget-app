import { Landmark, LogOut } from "lucide-react"
import { SidebarLink } from "./SidebarLink"
import { useLocation } from "react-router-dom"

export const Sidebar = () => {
    const location = useLocation()
    const links = [
        {name: 'Dashboard', page: '/dashboard'},
        {name: 'Transactions', page: '/transactions'},
        {name: 'Statistiques', page: '/statistics'}
    ]
    return (
        <aside className="flex min-h-screen flex-col border-r border-indigo-100 bg-white px-5 py-4">
            <div className="flex items-center gap-3 pl-4">
                <span className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-violet-600 text-white shadow-sm shadow-indigo-200">
                    <Landmark aria-hidden="true" className="size-5" />
                </span>
                <h1 className="text-xl font-bold tracking-tight text-indigo-950">
                    Budget App
                </h1>
            </div>
            <div className="mt-8 flex-1">
                {links.map((link) => (
                    <SidebarLink name={link.name} isActive={location.pathname === link.page} page={link.page} />
                ))}
            </div>

            <button
                className="mt-6 flex w-full items-center gap-3 rounded-lg border border-dashed border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:border-red-400 hover:bg-red-100 cursor-pointer"
                type="button"
            >
                <LogOut aria-hidden="true" className="size-5" />
                Déconnexion
            </button>
        </aside>
    )
}
