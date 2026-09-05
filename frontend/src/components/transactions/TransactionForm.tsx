import { useState } from "react"
import { useTransaction } from "../../hooks/transactions/useTransaction"

export const TransactionForm = () => {
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState<'entrée' | 'sortie' | ''>('')
  const [frequency, setFrequency] = useState<'mensuelle' | 'ponctuelle' | ''>('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const { createTransaction } = useTransaction()

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setError('')

    if (!type || !frequency) {
        setError('Merci de sélectionner un type et une fréquence')
        return
    }
    
    try {
      await createTransaction({ date, category, amount, type, frequency, description })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'ajout de la transaction')
    }
  }

  return (
    <main>
      {error && (
        <p className="mb-4 text-sm text-red-600">{error}</p>
      )}
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700" htmlFor="category">
            Catégorie
          </label>
          <input
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            type="text"
            id="category"
            name="category"
            placeholder="Ex. Alimentation"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700" htmlFor="amount">
              Montant
            </label>
            <div className="relative">
              <input
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                type="number"
                id="amount"
                name="amount"
                placeholder="0,00"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-semibold text-slate-400">
                €
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700" htmlFor="date">
              Date
            </label>
            <input
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700" htmlFor="type">
              Type
            </label>
            <select
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value as 'entrée' | 'sortie' | '')}
            >
              <option value="">Sélectionner</option>
              <option value="entrée">Entrée</option>
              <option value="sortie">Sortie</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700" htmlFor="frequency">
              Fréquence
            </label>
            <select
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              id="frequency"
              name="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as 'mensuelle' | 'ponctuelle' | '')}
            >
              <option value="">Sélectionner</option>
              <option value="mensuelle">Mensuelle</option>
              <option value="ponctuelle">Ponctuelle</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700" htmlFor="description">
            Description
          </label>
          <textarea
            className="min-h-24 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            id="description"
            name="description"
            placeholder="Ajoutez une description facultative"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-end border-t border-slate-100 pt-5">
          <button
            className="cursor-pointer rounded-xl bg-linear-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-blue-700 hover:to-violet-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
            type="submit"
          >
            Ajouter
          </button>
        </div>
      </form>
    </main>
  )
}
