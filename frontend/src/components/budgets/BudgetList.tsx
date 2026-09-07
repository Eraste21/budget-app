import { PiggyBank, Trash2, WalletCards } from "lucide-react"
import { useBudget } from "../../hooks/budgets/useBudget"
import { format } from "../../utils/format"

export const BudgetList = () => {
  const { budgets, currentBudget } = useBudget()

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
              budgets ? budgets.map((budget) => {
                const isCurrent = budget?.id === currentBudget?.id
                return (
                  <tr className="transition hover:bg-indigo-50/40">
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
                    <td className="px-5 py-4 text-center">
                      <button
                        aria-label="Supprimer le budget"
                        className="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:border-red-300 hover:bg-red-100"
                        type="button"
                      >
                        <Trash2 aria-hidden="true" className="size-4" />
                      </button>
                    </td>
                  </tr>
                )
              }) : (
                <p className="font-semibold text-slate-800">
                  Aucun budget renseigné pour le moment
                </p>
              )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
