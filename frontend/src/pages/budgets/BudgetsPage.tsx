import { BudgetForm } from "../../components/budgets/BudgetForm"
import { BudgetList } from "../../components/budgets/BudgetList"
import { ChartNoAxesCombined, CircleDollarSign, Plus, WalletCards } from "lucide-react"
import { Modal } from "../../components/ui/Modal"
import { useEffect, useState } from "react"
import { useBudget } from "../../hooks/budgets/useBudget"

export const BudgetsPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { currentBudget, totalSpent } = useBudget()

  useEffect(() => {
    const initBudget = async () => {
       
    }

    initBudget()
  }, [])

  return (
    <main className="min-h-full bg-slate-50 px-5 py-8 sm:px-8 lg:px-10">
      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-indigo-950">Budgets</h1>
        <span className="mt-2 block text-sm text-slate-500">
          Définissez votre budget et suivez son évolution au fil du mois.
        </span>
      </section>

      <section className="mb-6 grid gap-4 sm:grid-cols-[3fr_1fr]">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-indigo-100 bg-linear-to-r from-blue-600 to-violet-600 p-6 text-white shadow-lg shadow-indigo-200/60">
          <div>
            <p className="text-sm font-medium text-indigo-100">Budget actif</p>
            <h2 className="mt-2 text-3xl font-bold">{currentBudget ? currentBudget.amount : 0} €</h2>
          </div>
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
            <WalletCards aria-hidden="true" className="size-6" />
          </span>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-700/80 bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 p-6 shadow-md shadow-slate-300/40">
          <div>
            <p className="text-sm font-medium text-slate-300">Total dépense</p>
            <h2 className="mt-2 text-3xl font-bold text-white">{totalSpent} €</h2>
          </div>
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300 ring-1 ring-blue-400/20">
            <CircleDollarSign aria-hidden="true" className="size-6" />
          </span>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-3">
          <button
            className="mb-6 flex cursor-pointer items-center gap-2 rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:border-indigo-400 hover:bg-indigo-100 focus:outline-none focus:ring-4 focus:ring-indigo-500/15"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Plus aria-hidden="true" className="size-5" />
            Ajouter un budget
          </button>
          <BudgetList />
        </section>

        <section className="flex h-72 self-start flex-col items-center justify-center rounded-2xl border border-dashed border-indigo-200 bg-linear-to-br from-white to-indigo-50 p-6 text-center shadow-sm xl:col-span-2">
          <span className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
            <ChartNoAxesCombined aria-hidden="true" className="size-7" />
          </span>
          <p className="font-semibold text-indigo-950">
            Fonctionnalité bientôt disponible
          </p>
        </section>
      </section>
      <Modal isOpen={isOpen} title="Créer un budget" onClose={() => setIsOpen(false)} >
        <BudgetForm onClose={() => setIsOpen(false)} />
      </Modal>
    </main>
  )
}
