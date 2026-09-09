import { CategoryChart } from "../../components/statistics/CategoryChart"
import { MonthlyComparisonChart } from "../../components/statistics/MonthlyComparisonChart"
import { ProjectionChart } from "../../components/statistics/ProjectionChart"
import { useTransaction } from "../../hooks/transactions/useTransaction"
import { CalendarRange, ChartColumnBig, TrendingUp } from "lucide-react"

export const StatisticsPage = () => {
  const { transactions } = useTransaction()
  return (
    <main className="min-h-full bg-slate-50 px-5 py-8 sm:px-8 lg:px-10">
      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-indigo-950">Statistiques</h1>
        <span className="mt-2 block text-sm text-slate-500">
          Analysez la répartition et l’évolution de vos opérations financières.
        </span>
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_3fr]">
        <article className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="flex items-start gap-4 border-b border-slate-200 px-6 py-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
              <ChartColumnBig aria-hidden="true" className="size-5" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Dépenses par catégorie
              </h2>
              <p className="mt-1 text-sm leading-5 text-slate-500">
                Identifiez les catégories qui représentent la plus grande part de vos dépenses.
              </p>
            </div>
          </header>

          <div className="flex min-h-96 items-center px-4 py-6">
            <CategoryChart transactions={transactions ?? []} />
          </div>
        </article>

        <article className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="flex items-start gap-4 border-b border-slate-200 px-6 py-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
              <CalendarRange aria-hidden="true" className="size-5" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Comparaison mensuelle
              </h2>
              <p className="mt-1 text-sm leading-5 text-slate-500">
                Comparez vos entrées et vos sorties pour chaque mois.
              </p>
            </div>
          </header>

          <div className="flex min-h-96 items-center px-4 py-6">
            <MonthlyComparisonChart transactions={transactions ?? []} />
          </div>
        </article>
      </section>

      <section className="mt-6 min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <header className="flex items-start gap-4 border-b border-slate-200 px-6 py-5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
            <TrendingUp aria-hidden="true" className="size-5" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Projection du solde
            </h2>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              Découvrez une estimation de l’évolution de votre solde pour les prochains mois.
            </p>
          </div>
        </header>

        <div className="flex min-h-80 items-center px-4 py-6">
          <ProjectionChart transactions={transactions ?? []} />
        </div>
      </section>
    </main>
  )
}
