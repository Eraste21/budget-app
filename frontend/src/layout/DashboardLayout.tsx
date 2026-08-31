import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/ui/Sidebar"
import { Topbar } from "../components/ui/Topbar"

export const DashboardLayout = () => {
  return (
    <div className="flex flex-row">
      <header className="w-72">
        <Sidebar />
      </header>
      <main className="flex flex-col w-full">
        <Topbar />
        <Outlet />
      </main>
    </div>
  )
}
