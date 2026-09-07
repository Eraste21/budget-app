import { Trash2 } from "lucide-react"

type DeleteButtonProps = {
    id: number;
    onClick: (id: number) => void;
}

export const DeleteButton = ({id, onClick}: DeleteButtonProps) => {
    return (
        <button
            aria-label="Supprimer la transaction"
            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:border-red-300 hover:bg-red-100"
            type="button"
            onClick={() => onClick(id)}
        >
            <Trash2 aria-hidden="true" className="size-4" />
        </button>
    )
}
