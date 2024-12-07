import { useState } from 'react'
import { Bot, Twitter, Youtube, Instagram, Hexagon, Network, Plus } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { useToast } from "../../hooks/use-toast"

// Dummy data for the graph
const dummyData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  value: Math.random() * 100 + 50,
}))

// Dummy bot data
const initialBots = [
  { id: 1, name: 'Alpha Trader', description: 'High frequency trading bot', profit: 1250.75 },
  { id: 2, name: 'Beta Bot', description: 'Long-term holding strategy', profit: -450.25 },
  { id: 3, name: 'Gamma Gains', description: 'Momentum-based trading', profit: 3750.50 },
]

export default function TradingBotDashboard() {
  const [bots, setBots] = useState(initialBots)
  const [newBot, setNewBot] = useState({
    twitter: false,
    youtube: false,
    instagram: false,
    oxppl: false,
    warpnet: false,
    name: '',
    amount: 0,
  })
  const [showGraph, setShowGraph] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleIntegrationToggle = (integration) => {
    setNewBot(prev => ({ ...prev, [integration]: !prev[integration] }))
  }

  const handleLaunch = () => {
    if (!newBot.name || newBot.amount <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please provide a bot name and a valid trading amount.",
        variant: "destructive",
      })
      return
    }

    const newBotEntry = {
      id: bots.length + 1,
      name: newBot.name,
      description: 'New trading bot',
      profit: 0,
    }

    setBots(prev => [...prev, newBotEntry])
    setIsDialogOpen(false)
    setShowGraph(true)
    toast({
      title: "Bot Launched",
      description: "Your new trading bot has been successfully launched!",
    })
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Trading Bot Dashboard</h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mb-8">
            <Plus className="mr-2 h-4 w-4" /> Add Bot
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-black border border-white">
          <DialogHeader>
            <DialogTitle>Add New Bot</DialogTitle>
            <DialogDescription>
              Configure your new trading bot here. Toggle integrations and set your bot's details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="twitter" className="flex items-center gap-2">
                <Twitter className="h-4 w-4" />
                Twitter Integration
              </Label>
              <Switch
                id="twitter"
                checked={newBot.twitter}
                onCheckedChange={() => handleIntegrationToggle('twitter')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="youtube" className="flex items-center gap-2">
                <Youtube className="h-4 w-4" />
                YouTube Integration
              </Label>
              <Switch
                id="youtube"
                checked={newBot.youtube}
                onCheckedChange={() => handleIntegrationToggle('youtube')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="instagram" className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                Instagram Integration
              </Label>
              <Switch
                id="instagram"
                checked={newBot.instagram}
                onCheckedChange={() => handleIntegrationToggle('instagram')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="oxppl" className="flex items-center gap-2">
                <Hexagon className="h-4 w-4" />
                0xPPL Integration
              </Label>
              <Switch
                id="oxppl"
                checked={newBot.oxppl}
                onCheckedChange={() => handleIntegrationToggle('oxppl')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="warpnet" className="flex items-center gap-2">
                <Network className="h-4 w-4" />
                Warpnet Integration
              </Label>
              <Switch
                id="warpnet"
                checked={newBot.warpnet}
                onCheckedChange={() => handleIntegrationToggle('warpnet')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="botname">Bot Name</Label>
              <Input
                id="botname"
                value={newBot.name}
                onChange={(e) => setNewBot(prev => ({ ...prev, name: e.target.value }))}
                className="bg-black text-white border-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Trading Amount</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                value={newBot.amount}
                onChange={(e) => setNewBot(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                className="bg-black text-white border-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleLaunch}>Launch</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4">
        {bots.map(bot => (
          <Card key={bot.id} className="bg-black border-white">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Bot className="h-6 w-6" />
                  <div>
                    <h3 className="font-bold">{bot.name}</h3>
                    <p className="text-sm text-gray-400">{bot.description}</p>
                  </div>
                </div>
                <p className={`font-bold ${bot.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {bot.profit >= 0 ? '+' : '-'}${Math.abs(bot.profit).toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showGraph && (
        <Card className="mt-8 bg-black border-white">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-4">Coin Performance (Last 30 Days)</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dummyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="day" stroke="white" />
                  <YAxis stroke="white" />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'black', borderColor: 'white' }}
                    labelStyle={{ color: 'white' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

