import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const bots = [
  {
    name: "BotSwap",
    functionality: "Yield Maximizer Bot",
    description: "Automates yield farming by identifying and investing in high-yield opportunities across various DeFi platforms."
  },
  {
    name: "Mizar Sniper Bot",
    functionality: "Sniper Bot",
    description: "Executes trades instantly upon the listing of new tokens on decentralized exchanges like Uniswap, PancakeSwap, and SushiSwap."
  },
  {
    name: "DeFiMate",
    functionality: "Cross-Chain Swap Bot",
    description: "Facilitates seamless asset swaps across different blockchain networks, enabling users to take advantage of arbitrage opportunities."
  },
  {
    name: "Mizar Restaking Bot",
    functionality: "Restaking Bot",
    description: "Automatically reinvests rewards earned from staking activities, compounding returns over time without requiring manual action."
  },
  {
    name: "GoodCryptoX",
    functionality: "Base Trading Bot",
    description: "Offers a comprehensive suite of automated trading tools tailored for the Base blockchain, including Limit and Trailing Orders, DCA, and Grid trading."
  }
]

export default function BotSelection() {
  const [selectedBot, setSelectedBot] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const navigate = useNavigate()

  const handleBotSelect = (botName) => {
    setSelectedBot(botName)
    setIsDialogOpen(true)
  }

  const handleAmountSubmit = () => {
    // Here you would typically send the transaction to your backend
    console.log(`Submitted amount ${amount} for bot ${selectedBot}`)
    setIsDialogOpen(false)
    setAmount('')
    // Navigate to transaction history page
    navigate('/transactions')
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Select a Trading Bot</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {bots.map((bot, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>{bot.name}</CardTitle>
              <CardDescription>{bot.functionality}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{bot.description}</p>
              <Button onClick={() => handleBotSelect(bot.name)}>Select Bot</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Enter Trading Amount</DialogTitle>
            <DialogDescription>
              Please enter the amount you want to trade with {selectedBot}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-3 bg-gray-700 text-white border-gray-600"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAmountSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

