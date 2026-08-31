import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/ui/Sidebar"

export const DashboardLayout = () => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <Outlet />
    </div>
  )
}
