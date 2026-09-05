import type { ReactNode } from "react"
import { X } from "lucide-react"

type ModalProps = {
  isOpen: boolean
  title: string
  children: ReactNode
  onClose: () => void
}

export const Modal = ({ isOpen, title, children, onClose }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl border border-indigo-100 bg-white shadow-2xl shadow-indigo-950/20"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold tracking-tight text-indigo-950">
            {title}
          </h2>

          <button
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/15"
            type="button"
            aria-label="Fermer la fenêtre"
            onClick={onClose}
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </header>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
