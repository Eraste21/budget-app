import { useTransaction } from "../../hooks/transactions/useTransaction"
import { ReceiptText } from "lucide-react"

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
        <table className="w-full min-w-160 border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="w-16 px-5 py-4 font-semibold" scope="col">#</th>
              <th className="px-5 py-4 font-semibold" scope="col">Catégorie</th>
              <th className="px-5 py-4 font-semibold" scope="col">Montant</th>
              <th className="px-5 py-4 font-semibold" scope="col">Type</th>
              <th className="px-5 py-4 font-semibold" scope="col">Fréquence</th>
              <th className="px-5 py-4 font-semibold" scope="col">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-600">
            {transactions ? 
              transactions?.map((transaction) => (
                <tr className="transition hover:bg-indigo-50/40">
                  <td className="px-5 py-4 font-medium text-slate-400">{transaction.id}</td>
                  <td className="px-5 py-4 font-semibold text-slate-700">{transaction.category}</td>
                  <td className={`px-5 py-4 font-semibold ${transaction.type === 'Entrée' ? 'text-emerald-600' : 'text-red-600'}`}>{transaction.type === 'Entrée' ? '+' : '-'}{transaction.amount} €</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ${transaction.type === 'Entrée' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-5 py-4">{transaction.frequency}</td>
                  <td className="whitespace-nowrap px-5 py-4">{transaction.date}</td>
                </tr>
              ))
              : (
                <tr>
                  <td className="px-6 py-14 text-center" colSpan={6}>
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
              )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
