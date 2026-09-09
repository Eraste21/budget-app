import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { Transaction } from "../../types"
import { calculateProjection } from "../../utils/calculations"

export const ProjectionChart = ({ transactions }: { transactions: Transaction[] }) => {
    const data = calculateProjection(transactions, 12)
    return (
        <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="projectedBalance" stroke="#4f46e5" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
        </ResponsiveContainer>
    )
}
