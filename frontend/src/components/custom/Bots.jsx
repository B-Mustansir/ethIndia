import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Bot, Zap, Repeat, ArrowRightLeft, RefreshCw, TrendingUp, Rocket, Cpu, Sword } from 'lucide-react'

const bots = [
  {
    name: "Yield Maximizer Bot",
    description: "Automates yield farming by identifying and investing in high-yield opportunities across DeFi platforms.",
    example: "BotSwap",
    icon: Zap,
    tags: ["DeFi", "Yield Farming"]
  },
  {
    name: "Sniper Bot",
    description: "Executes trades instantly upon new token listings, securing early positions before significant price movements.",
    example: "Mizar",
    icon: Rocket,
    tags: ["Token Acquisition", "DEX"]
  },
  {
    name: "Cross-Chain Swap Bot",
    description: "Facilitates seamless asset swaps across different blockchain networks for arbitrage and portfolio diversification.",
    example: "DeFiMate",
    icon: ArrowRightLeft,
    tags: ["Cross-Chain", "DEX Aggregator"]
  },
  {
    name: "Restaking Bot",
    description: "Automatically reinvests staking rewards, compounding returns over time without manual intervention.",
    example: "Mizar",
    icon: RefreshCw,
    tags: ["Staking", "Compound Interest"]
  },
  {
    name: "Arbitrage Bot",
    description: "Exploits price discrepancies of the same asset across different exchanges for profit.",
    example: "Mizar",
    icon: TrendingUp,
    tags: ["Arbitrage", "Multi-Exchange"]
  },
  {
    name: "GoodCryptoX Base Trading Bot",
    description: "Comprehensive suite for Base blockchain with advanced trading strategies and security features.",
    example: "GoodCrypto",
    icon: Bot,
    tags: ["Base Chain", "Advanced Strategies"]
  },
  {
    name: "Maestro Bot",
    description: "Versatile tool supporting multiple chains, including Base, for automated trading strategies in DeFi.",
    example: "Crypto Trade Bots",
    icon: Cpu,
    tags: ["Multi-Chain", "DeFi"]
  },
  {
    name: "AlphaSight Bots",
    description: "Automated signal trading bots using proprietary algorithms to identify profitable opportunities.",
    example: "Base Degen Tools",
    icon: Zap,
    tags: ["Signal Trading", "Multi-Chain"]
  },
  {
    name: "SigmaBot",
    description: "Fast, multi-chain bot with private transaction protection and planned copy trading features.",
    example: "Gregg Brown",
    icon: Repeat,
    tags: ["Multi-Chain", "Privacy"]
  },
  {
    name: "Shuriken Trade Bot",
    description: "Robust web application for automated trading across multiple chains with referral and competition features.",
    example: "Gregg Brown",
    icon: Sword,
    tags: ["Multi-Chain", "Web App"]
  }
]

export default function TradingBotsShowcase() {
  return (
    <div className="container mx-auto p-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Trading Bots Showcase</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bots.map((bot, index) => (
          <Card key={index} className="bg-black border-white hover:border-gray-300 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">{bot.name}</CardTitle>
                <bot.icon className="h-6 w-6 text-white" />
              </div>
              <CardDescription className="text-gray-400">{bot.example}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{bot.description}</p>
              <div className="flex flex-wrap gap-2">
                {bot.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="outline" className="bg-black text-white border-white">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

