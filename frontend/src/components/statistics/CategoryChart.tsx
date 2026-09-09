import { BarChart, Bar, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { Transaction } from "../../types"
import { calculateTotalsByCategory } from "../../utils/calculations"

export const CategoryChart = ({transactions}: {transactions: Transaction[]}) => {
  const data = calculateTotalsByCategory(transactions)
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="category" tick={{fontSize: 12}} />
        <YAxis tick={{fontSize: 12}} />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" name="Dépenses" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  )
}
