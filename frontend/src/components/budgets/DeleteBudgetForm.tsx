import { Trash2, TriangleAlert } from "lucide-react"
import { useBudget } from "../../hooks/budgets/useBudget";

type DeleteBudgetFormProps = {
    id: number;
    onClose: () => void;
}

export const DeleteBudgetForm = ({ id, onClose }: DeleteBudgetFormProps) => {
    const { deleteCurrentBudget } = useBudget()
    const onDelete = async () => {
        onClose()
        await deleteCurrentBudget(id)
    }
    return (
        <section>
            <div className="flex flex-col items-center text-center">
                <span className="mb-5 flex size-16 items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-red-600">
                    <TriangleAlert aria-hidden="true" className="size-8" />
                </span>

                <h3 className="text-lg font-bold text-slate-900">
                    Voulez-vous supprimer ce budget ?
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Cette action est définitive. Le budget sera supprimé de votre historique et ne pourra pas être récupéré.
                </p>
            </div>

            <div className="mt-6 rounded-xl border border-red-100 bg-red-50/60 px-4 py-3">
                <p className="text-sm font-medium text-red-700">
                    Vérifiez les informations du budget avant de confirmer sa suppression.
                </p>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                    className="cursor-pointer rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-500/10"
                    type="button"
                >
                    Annuler
                </button>
                <button
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-600 bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-red-200 transition hover:border-red-700 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/20"
                    type="button"
                    onClick={onDelete}
                >
                    <Trash2 aria-hidden="true" className="size-4" />
                    Supprimer
                </button>
            </div>
        </section>
    )
}
