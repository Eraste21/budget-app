import { useEffect, useState } from "react"
import { TransactionForm } from "../../components/transactions/TransactionForm"
import { TransactionsList } from "../../components/transactions/TransactionsList"
import { ChartNoAxesCombined, Plus, RotateCcw, SlidersHorizontal, TrendingDown, TrendingUp } from "lucide-react"
import { Modal } from "../../components/ui/Modal"
import { useTransaction } from "../../hooks/transactions/useTransaction"

export const TransactionsPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const { incomes, expenses, refreshTransactions, refreshTransactionsFilter } = useTransaction()

  useEffect(() => {
    const applyFilter = async () => {
      if (filter === '') {
        await refreshTransactions()
      } else {
        await refreshTransactionsFilter(`type=${filter}`)
      }
    }

    applyFilter()
  }, [filter])
  return (
    <main className="min-h-full bg-slate-50 px-5 py-8 sm:px-8 lg:px-10">
      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-indigo-950">Transactions</h1>
        <p className="mt-2 text-sm text-slate-500">
          Consultez et gérez l'ensemble de vos opérations.
        </p>
      </section>

      <section className="mb-6 grid gap-6 xl:grid-cols-[45fr_55fr]">
        <div>
          <section className="mb-4 grid gap-4 sm:grid-cols-2">
            <div className="relative rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <div className="pr-16">
                <h1 className="text-sm font-semibold text-slate-500">Entrées :</h1>
                <span className="mt-3 block text-2xl font-bold text-emerald-600">{incomes} €</span>
              </div>
              <span className="absolute right-5 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <TrendingUp aria-hidden="true" className="size-6" />
              </span>
            </div>
            <div className="relative rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
              <div className="pr-16">
                <h1 className="text-sm font-semibold text-slate-500">Sorties :</h1>
                <span className="mt-3 block text-2xl font-bold text-red-600">-{expenses} €</span>
              </div>
              <span className="absolute right-5 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <TrendingDown aria-hidden="true" className="size-6" />
              </span>
            </div>
          </section>

          <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700" htmlFor="transaction-type-filter">
                <SlidersHorizontal aria-hidden="true" className="size-4 text-indigo-600" />
              </label>
              <select
                className="min-w-24 cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 outline-none transition hover:bg-slate-50 focus:border-slate-400 focus:ring-4 focus:ring-slate-500/10"
                id="transaction-type-filter"
                name="type"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">Toutes</option>
                <option value="Entrée">Entrées</option>
                <option value="Sortie">Sorties</option>
              </select>
            </div>

            <button
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
              type="button"
              onClick={() => setFilter('')}
            >
              <RotateCcw aria-hidden="true" className="size-4" />
            </button>
          </section>
        </div>

        <section className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-indigo-200 bg-linear-to-br from-white to-indigo-50 p-6 text-center shadow-sm">
          <span className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
            <ChartNoAxesCombined aria-hidden="true" className="size-7" />
          </span>
          <p className="font-semibold text-indigo-950">
            Fonctionnalité bientôt disponible
          </p>
        </section>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <button
          className="mb-6 flex cursor-pointer items-center gap-2 rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:border-indigo-400 hover:bg-indigo-100 focus:outline-none focus:ring-4 focus:ring-indigo-500/15"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Plus aria-hidden="true" className="size-5" />
          Ajouter une transaction
        </button>
        <TransactionsList />
      </section>
      <Modal isOpen={isOpen} title="Ajouter une transaction" onClose={() => setIsOpen(false)}>
        <TransactionForm onClose={() => setIsOpen(false)} />
      </Modal>
    </main>
  )
}
