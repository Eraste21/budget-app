import { useEffect } from "react"
import { CircleDollarSign, PiggyBank, ReceiptText, TrendingDown, TrendingUp, TrendingUpDown } from "lucide-react"
import { format } from "../../utils/format"
import { useBudget } from "../../hooks/budgets/useBudget"
import { useTransaction } from "../../hooks/transactions/useTransaction"

export const DashboardPage = () => {
  const { transactions, refreshTransactionsFilter, incomes, expenses } = useTransaction()
  const {currentBudget, totalSpent} = useBudget()

  useEffect(() => {
    refreshTransactionsFilter('limit=5')
  }, [])

  return (
    <main className="min-h-full bg-slate-50 px-5 py-8 sm:px-8 lg:px-10">
      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-indigo-950">Dashboard</h1>
        <span className="mt-2 block text-sm text-slate-500">
          Consultez en temps réel votre solde et l'évolution de vos transactions
        </span>
      </section>

      <section className="mb-5">
        <h2 className="text-lg font-semibold text-slate-800">Solde :</h2>
      </section>

      <section className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <div>
            <span className="block text-sm font-medium text-slate-500">Entrées</span>
            <span className="mt-3 block text-2xl font-bold text-emerald-600">{incomes} €</span>
          </div>
          <span className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <TrendingUp aria-hidden="true" className="size-6" />
          </span>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
          <div>
            <span className="block text-sm font-medium text-slate-500">Sorties</span>
            <span className="mt-3 block text-2xl font-bold text-red-600">-{expenses} €</span>
          </div>
          <span className="flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <TrendingDown aria-hidden="true" className="size-6" />
          </span>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-slate-700/80 bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 p-5 shadow-md shadow-slate-300/40">
          <div>
            <span className="block text-sm font-medium text-slate-300">Total dépense</span>
            <span className="mt-3 block text-2xl font-bold text-white">{totalSpent} €</span>
          </div>
          <span className="flex size-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
            <CircleDollarSign aria-hidden="true" className="size-6" />
          </span>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-indigo-100 bg-linear-to-br from-blue-600 to-violet-600 p-5 text-white shadow-md shadow-indigo-200">
          <div>
            <span className="block text-sm font-medium text-indigo-100">Budget</span>
            <span className="mt-3 block text-2xl font-bold">{currentBudget?.amount} €</span>
          </div>
          <span className="flex size-12 items-center justify-center rounded-xl bg-white/15 text-white">
            <PiggyBank aria-hidden="true" className="size-6" />
          </span>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-800">Dernières opérations</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-160 table-fixed border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="w-16 px-6 py-4 font-semibold" scope="col">
                  <TrendingUpDown aria-label="Variation" className="size-5" />
                </th>
                <th className="px-6 py-4 font-semibold" scope="col">Catégorie</th>
                <th className="px-6 py-4 font-semibold" scope="col">Montant</th>
                <th className="px-6 py-4 font-semibold" scope="col">Type</th>
                <th className="px-6 py-4 font-semibold" scope="col">Fréquence</th>
                <th className="px-6 py-4 font-semibold" scope="col">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {
                transactions ?
                  transactions.map((transaction) =>
                    <tr className="transition hover:bg-indigo-50/40">
                      <td className={`w-16 px-6 py-4 ${transaction.type === 'Entrée' ? 'text-emerald-600' : 'text-red-600'}`}>
                        <span className={`mx-auto flex size-9 items-center justify-center rounded-lg ${transaction.type === 'Entrée' ? 'bg-emerald-50' : 'bg-red-50'}`}>
                          {transaction.type === 'Entrée' ? (
                            <TrendingUp aria-hidden="true" className="size-5" />
                          ) : (
                            <TrendingDown aria-hidden="true" className="size-5" />
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-700">{transaction.category}</td>
                      <td className={`px-6 py-4 font-semibold ${transaction.type === 'Entrée' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {transaction.type === 'Entrée' ? '+' : '-'}{transaction.amount} €
                      </td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${transaction.type === 'Entrée' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-red-50 text-red-700 ring-red-200'}`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">{transaction.frequency}</td>
                      <td className="whitespace-nowrap px-6 py-4">{format(transaction.date)}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td className="px-6 py-12 text-center" colSpan={7}>
                        <div className="mx-auto flex max-w-sm flex-col items-center">
                          <span className="mb-3 flex size-12 items-center justify-center rounded-xl border border-dashed border-indigo-300 bg-indigo-50 text-indigo-600">
                            <ReceiptText aria-hidden="true" className="size-6" />
                          </span>
                          <p className="font-semibold text-slate-800">Aucune transaction enregistrée à ce jour</p>
                        </div>
                      </td>
                    </tr>
                  )
              }
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
