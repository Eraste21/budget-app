export const DashboardPage = () => {
  return (
    <main className="min-h-full bg-slate-50 px-5 py-8 sm:px-8 lg:px-10">
      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-indigo-950">Dashboard</h1>
        <span className="mt-2 block text-sm text-slate-500">
          Consultez en temps réel votre solde et l'évolution de vos transactions
        </span>
      </section>

      <section className="mb-5">
        <h2 className="text-lg font-semibold text-slate-800">Budget :</h2>
      </section>

      <section className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <span className="block text-sm font-medium text-slate-500">Entrées</span>
          <span className="mt-3 block text-2xl font-bold text-emerald-600">X €</span>
        </div>
        <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
          <span className="block text-sm font-medium text-slate-500">Sorties</span>
          <span className="mt-3 block text-2xl font-bold text-red-600">X €</span>
        </div>
        <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <span className="block text-sm font-medium text-slate-500">Total dépense</span>
          <span className="mt-3 block text-2xl font-bold text-blue-600">X €</span>
        </div>
        <div className="rounded-2xl border border-indigo-100 bg-linear-to-br from-blue-600 to-violet-600 p-5 text-white shadow-md shadow-indigo-200">
          <span className="block text-sm font-medium text-indigo-100">Solde</span>
          <span className="mt-3 block text-2xl font-bold">X €</span>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-800">Dernières opérations</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-160 border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="w-16 px-6 py-4 font-semibold" scope="col">#</th>
                <th className="px-6 py-4 font-semibold" scope="col">Catégorie</th>
                <th className="px-6 py-4 font-semibold" scope="col">Montant</th>
                <th className="px-6 py-4 font-semibold" scope="col">Type</th>
                <th className="px-6 py-4 font-semibold" scope="col">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr className="transition hover:bg-indigo-50/40">
                <td className="px-6 py-4 font-medium text-slate-400">1</td>
                <td className="px-6 py-4">—</td>
                <td className="px-6 py-4">—</td>
                <td className="px-6 py-4">—</td>
                <td className="px-6 py-4">—</td>
              </tr>
              <tr className="transition hover:bg-indigo-50/40">
                <td className="px-6 py-4 font-medium text-slate-400">2</td>
                <td className="px-6 py-4">—</td>
                <td className="px-6 py-4">—</td>
                <td className="px-6 py-4">—</td>
                <td className="px-6 py-4">—</td>
              </tr>
              <tr className="transition hover:bg-indigo-50/40">
                <td className="px-6 py-4 font-medium text-slate-400">3</td>
                <td className="px-6 py-4">—</td>
                <td className="px-6 py-4">—</td>
                <td className="px-6 py-4">—</td>
                <td className="px-6 py-4">—</td>
              </tr>
              <tr className="transition hover:bg-indigo-50/40">
                <td className="px-6 py-4 font-medium text-slate-400">4</td>
                <td className="px-6 py-4">—</td>
                <td className="px-6 py-4">—</td>
                <td className="px-6 py-4">—</td>
                <td className="px-6 py-4">—</td>
              </tr>
              <tr className="transition hover:bg-indigo-50/40">
                <td className="px-6 py-4 font-medium text-slate-400">5</td>
                <td className="px-6 py-4">—</td>
                <td className="px-6 py-4">—</td>
                <td className="px-6 py-4">—</td>
                <td className="px-6 py-4">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
