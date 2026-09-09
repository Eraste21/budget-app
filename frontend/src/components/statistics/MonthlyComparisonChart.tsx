import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { Transaction } from "../../types"
import { calculateTotalsByMonth } from "../../utils/calculations"

export const MonthlyComparisonChart = ({transactions}: {transactions: Transaction[]}) => {
    const data = calculateTotalsByMonth(transactions)
  return (
    <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{fontSize: 12}} />
            <YAxis tick={{fontSize: 12}} />
            <Tooltip />
            <Legend />
            <Bar dataKey="entrees" name="Entrées" fill="#10b981" />
            <Bar dataKey="sorties" name="Sorties" fill="#ef4444" />
        </BarChart>
    </ResponsiveContainer>
  )
}
