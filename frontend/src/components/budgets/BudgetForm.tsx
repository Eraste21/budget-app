import { useState } from "react";
import { useBudget } from "../../hooks/budgets/useBudget";

type BudgetFormProps = {
  onClose: () => void;
}

export const BudgetForm = ({ onClose }: BudgetFormProps) => {
  const [amount, setAmount] = useState(0)
  const [error, setError] = useState('')
  const { createBudget } = useBudget()

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setError('')

    try {
      onClose()
      await createBudget({ amount })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création du budget')
    }
  }
  
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <p className="mb-4 text-sm text-red-600">{error}</p>
      )}
      <div className="rounded-xl border border-indigo-100 bg-indigo-50/70 px-4 py-3">
        <p className="text-sm leading-6 text-indigo-800">
          Définissez le montant que vous souhaitez consacrer à votre budget pour mieux suivre vos dépenses.
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700" htmlFor="amount">
          Montant du budget
        </label>
        <div className="relative">
          <input
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            type="number"
            name="amount"
            id="amount"
            min="0"
            step="0.01"
            placeholder="Ex. 1 500"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-semibold text-slate-400">
            €
          </span>
        </div>
        <p className="text-xs leading-5 text-slate-500">
          Vous pourrez ajuster ce montant plus tard selon vos besoins.
        </p>
      </div>

      <div className="flex justify-end border-t border-slate-100 pt-5">
        <button
          className="cursor-pointer rounded-xl bg-linear-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-blue-700 hover:to-violet-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
          type="submit"
        >
          Créer le budget
        </button>
      </div>
    </form>
  )
}
