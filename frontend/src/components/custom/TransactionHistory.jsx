import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"

// This would typically come from your backend
const transactions = [
  { id: 1, bot: "BotSwap", amount: 100, status: "Completed", timestamp: "2023-04-01 10:30:00" },
  { id: 2, bot: "Mizar Sniper Bot", amount: 50, status: "Pending", timestamp: "2023-04-01 11:15:00" },
  { id: 3, bot: "DeFiMate", amount: 200, status: "Completed", timestamp: "2023-04-01 12:00:00" },
]

export default function TransactionHistory() {
  const navigate = useNavigate()

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Transaction History</h1>
        <Button onClick={() => navigate('/')}>Back to Bot Selection</Button>
      </div>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bot</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.bot}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.status}</TableCell>
                  <TableCell>{transaction.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

