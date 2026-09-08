import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { Transaction } from "../../types"
import { calculateBalanceOverTime } from "../../utils/calculations"

export const BalanceChart = ({ transactions }: { transactions: Transaction[] }) => {
    const data = calculateBalanceOverTime(transactions)
    return (
        <ResponsiveContainer width="100%" height={200} >
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip />
                <Line type="monotone" dataKey="balance" stroke="#4f46e5" strokeWidth={2} dot={{r: 2}} activeDot={{r: 6}} />
            </LineChart>
        </ResponsiveContainer>
    )
}
