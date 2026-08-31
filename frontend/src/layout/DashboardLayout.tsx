import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/ui/Sidebar"
import { Topbar } from "../components/ui/Topbar"

export const DashboardLayout = () => {
  return (
    <div className="flex flex-col">
      <header>
        <Topbar />
      </header>
      <main className="flex flex-row">
        <Sidebar />
        <Outlet />
      </main>
    </div>
  )
}
