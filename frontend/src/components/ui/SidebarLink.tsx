import { useNavigate } from "react-router-dom";

type SidebarLinkProps = {
  name: string;
  isActive: boolean;
  page: string;
}

export const SidebarLink = ({ name, isActive, page }: SidebarLinkProps) => {
  const navigate = useNavigate()
  return (
    <div
      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
        isActive
          ? 'border-indigo-200 bg-linear-to-r from-blue-50 to-violet-50 text-indigo-700 shadow-sm'
          : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-indigo-700'
      }`}
      onClick={() => navigate(page)}
      aria-current={isActive ? 'page' : undefined}
    >
      <span
        className={`size-2 rounded-full ${
          isActive ? 'bg-indigo-600 ring-4 ring-indigo-100' : 'bg-slate-300'
        }`}
        aria-hidden="true"
      />
      <span>{name}</span>
    </div>
  )
}
