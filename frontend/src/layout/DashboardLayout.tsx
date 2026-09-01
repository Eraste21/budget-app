import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/ui/Sidebar"
import { Topbar } from "../components/ui/Topbar"

export const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <header className="h-screen w-64 shrink-0 overflow-hidden">
        <Sidebar />
      </header>
      <main className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar />
        <div className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
