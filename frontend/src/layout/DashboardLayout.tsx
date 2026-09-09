import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/ui/Sidebar"
import { Topbar } from "../components/ui/Topbar"

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-dvh overflow-hidden bg-slate-50">
      <aside className="hidden h-dvh w-64 shrink-0 overflow-hidden lg:block">
        <Sidebar />
      </aside>

      {isSidebarOpen && (
        <>
          <button
            aria-label="Fermer le menu de navigation"
            className="fixed inset-0 z-40 cursor-default bg-slate-950/45 backdrop-blur-sm lg:hidden"
            type="button"
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside
            className="fixed inset-y-0 left-0 z-50 w-72 overflow-hidden shadow-2xl lg:hidden"
            id="mobile-sidebar"
          >
            <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
          </aside>
        </>
      )}

      <main className="flex h-dvh min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar
          isSidebarOpen={isSidebarOpen}
          onMenuClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
        />
        <div className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
