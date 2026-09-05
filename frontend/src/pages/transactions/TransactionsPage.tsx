import { useState } from "react"
import { TransactionForm } from "../../components/transactions/TransactionForm"
import { TransactionsList } from "../../components/transactions/TransactionsList"
import { Plus, RotateCcw, SlidersHorizontal } from "lucide-react"
import { Modal } from "../../components/ui/Modal"

export const TransactionsPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <main className="min-h-full bg-slate-50 px-5 py-8 sm:px-8 lg:px-10">
      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-indigo-950">Transactions</h1>
        <p className="mt-2 text-sm text-slate-500">
          Consultez et gérez l'ensemble de vos opérations.
        </p>
      </section>

      <section className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="card rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <h1 className="text-sm font-semibold text-slate-500">Entrées :</h1>
          <span className="mt-3 text-2xl font-bold text-emerald-600">X €</span>
        </div>
        <div className="card rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
          <h1 className="text-sm font-semibold text-slate-500">Sorties :</h1>
          <span className="mt-3 text-2xl font-bold text-red-600">-X €</span>
        </div>
      </section>

      <section className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <SlidersHorizontal aria-hidden="true" className="size-4 text-indigo-600" />
            Filtrer :
          </span>
          <button
            className="cursor-pointer rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100"
            type="button"
          >
            Toutes
          </button>
          <button
            className="cursor-pointer rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
            type="button"
          >
            Entrées
          </button>
          <button
            className="cursor-pointer rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
            type="button"
          >
            Sorties
          </button>
        </div>

        <button
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
          type="button"
        >
          <RotateCcw aria-hidden="true" className="size-4" />
          Réinitialiser
        </button>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <button
          className="mb-6 flex items-center gap-2 rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:border-indigo-400 hover:bg-indigo-100 focus:outline-none focus:ring-4 focus:ring-indigo-500/15  cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Plus aria-hidden="true" className="size-5" />
          Ajouter une transaction
        </button>
        <TransactionsList />
      </section>
      <Modal isOpen={isOpen} title="Ajouter une transaction" onClose={() => setIsOpen(false)}>
        <TransactionForm />
      </Modal>
    </main>
  )
}
