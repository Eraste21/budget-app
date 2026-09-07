import { useTransaction } from "../../hooks/transactions/useTransaction"
import { ReceiptText, Trash2, TrendingDown, TrendingUp, TrendingUpDown } from "lucide-react"
import { format } from "../../utils/format"

export const TransactionsList = () => {
  const { transactions } = useTransaction()

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
        <h2 className="text-lg font-semibold text-slate-800">Liste des transactions</h2>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
          {transactions ? transactions.length : 0} transaction(s)
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-160 table-fixed border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="w-16 px-6 py-4 font-semibold" scope="col"><TrendingUpDown /></th>
              <th className="px-6 py-4 font-semibold" scope="col">Catégorie</th>
              <th className="px-6 py-4 font-semibold" scope="col">Montant</th>
              <th className="px-6 py-4 font-semibold" scope="col">Type</th>
              <th className="px-6 py-4 font-semibold" scope="col">Fréquence</th>
              <th className="px-6 py-4 font-semibold" scope="col">Date</th>
              <th className="w-20 px-6 py-4 text-center font-semibold" scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-600">
            {transactions ?
              transactions?.map((transaction) => (
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
                  <td className={`px-6 py-4 font-semibold ${transaction.type === 'Entrée' ? 'text-emerald-600' : 'text-red-600'}`}>{transaction.type === 'Entrée' ? '+' : '-'}{transaction.amount} €</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${transaction.type === 'Entrée' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-red-50 text-red-700 ring-red-200'}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">{transaction.frequency}</td>
                  <td className="whitespace-nowrap px-6 py-4">{format(transaction.date)}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      aria-label="Supprimer la transaction"
                      className="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:border-red-300 hover:bg-red-100"
                      type="button"
                    >
                      <Trash2 aria-hidden="true" className="size-4" />
                    </button>
                  </td>
                </tr>
              ))
              : (
                <tr>
                  <td className="px-6 py-14 text-center" colSpan={7}>
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <span className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-dashed border-indigo-300 bg-indigo-50 text-indigo-600">
                        <ReceiptText aria-hidden="true" className="size-7" />
                      </span>
                      <p className="font-semibold text-slate-800">
                        Aucune transaction renseignée pour le moment
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        Ajoutez votre première transaction pour commencer à suivre vos entrées et vos sorties.
                      </p>
                    </div>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
