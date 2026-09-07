import { PiggyBank, WalletCards } from "lucide-react"
import { useBudget } from "../../hooks/budgets/useBudget"
import { format } from "../../utils/format"
import { DeleteButton } from "../ui/DeleteButton"
import { useState } from "react"
import { Modal } from "../ui/Modal"
import { DeleteBudgetForm } from "./DeleteBudgetForm"

export const BudgetList = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const { budgets, currentBudget } = useBudget()

  const openDeleteModal = (id: number) => {
    setSelectedId(id)
    setIsOpen(true)
  }

  const closeDeleteModal = () => {
    setIsOpen(false)
    setSelectedId(null)
  }

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <header className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Historique des budgets</h2>
          <p className="mt-1 text-sm text-slate-500">Consultez les budgets créés précédemment.</p>
        </div>
        <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
          {budgets?.length} budget(s)
        </span>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-130 border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="w-16 px-5 py-4 font-semibold" scope="col">
                <WalletCards aria-label="Budget" className="size-5" />
              </th>
              <th className="px-5 py-4 font-semibold" scope="col">Montant</th>
              <th className="px-5 py-4 font-semibold" scope="col">Date de création</th>
              <th className="px-5 py-4 font-semibold" scope="col">Statut</th>
              <th className="w-20 px-5 py-4 text-center font-semibold" scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {
              budgets && budgets.length > 0 ? budgets.map((budget) => {
                const isCurrent = budget?.id === currentBudget?.id
                return (
                  <tr key={budget.id} className="transition hover:bg-indigo-50/40">
                    <td className="px-5 py-4">
                      <span className={`flex size-9 items-center justify-center rounded-lg ring-1 ${isCurrent ? 'bg-linear-to-b from-blue-50 to-violet-100 text-indigo-600 ring-indigo-100' : 'bg-slate-50 text-slate-400 ring-slate-200'}`}>
                        <PiggyBank aria-hidden="true" className="size-5" />
                      </span>
                    </td>
                    <td className="px-5 py-4 text-base font-semibold text-slate-700">{budget.amount} €</td>
                    <td className="whitespace-nowrap px-5 py-4">{format(budget.created_at).split(' ', 1)}</td>
                    <td className="px-5 py-4">
                      {
                        isCurrent ?
                          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                            Actif
                          </span> :
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                            Archivé
                          </span>
                      }
                    </td>
                    {
                      isCurrent ?
                        <td className="px-5 py-4 text-center">
                          <DeleteButton id={budget.id} onClick={openDeleteModal} />
                        </td> : <></>
                    }
                  </tr>
                )
              }) : (
                <tr>
                  <td className="px-6 py-14 text-center" colSpan={5}>
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <span className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-dashed border-indigo-300 bg-indigo-50 text-indigo-600">
                        <PiggyBank aria-hidden="true" className="size-7" />
                      </span>
                      <p className="font-semibold text-slate-800">
                        Aucun budget renseigné pour le moment
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        Ajoutez votre premier budget pour commencer à suivre et organiser vos dépenses.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isOpen} title="Supprimer" onClose={() => setIsOpen(false)}>
        {selectedId !== null &&(
          <DeleteBudgetForm id={selectedId} onClose={closeDeleteModal} />
        )}
      </Modal>
    </section>
  )
}
