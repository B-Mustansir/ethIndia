import { useState } from "react"
import { TradingBotCard } from "../custom/TradingBotCard"
import { LaunchBotModal } from "../custom/LaunchBotModal"

const tradingBots = [
  { id: 1, name: "BotSwap", description: "Yield Maximizer Bot", functionality: "Automates yield farming by identifying and investing in high-yield opportunities across various DeFi platforms." },
  { id: 2, name: "Mizar", description: "Sniper Bot", functionality: "Executes trades instantly upon the listing of new tokens on decentralized exchanges like Uniswap, PancakeSwap, and SushiSwap." },
  { id: 3, name: "DeFiMate", description: "Cross-Chain Swap Bot", functionality: "Facilitates seamless asset swaps across different blockchain networks, enabling arbitrage and portfolio diversification." },
  { id: 4, name: "Mizar Restaking", description: "Restaking Bot", functionality: "Automatically reinvests rewards earned from staking activities, compounding returns over time." },
  { id: 5, name: "Mizar Arbitrage", description: "Arbitrage Bot", functionality: "Exploits price discrepancies of the same asset across different exchanges or platforms for profit." },
  { id: 6, name: "GoodCryptoX", description: "Base Trading Bot", functionality: "Offers advanced strategies like Limit and Trailing Orders, DCA, and Grid trading on the Base blockchain." },
  { id: 7, name: "Maestro Bot", description: "Multi-Chain Bot", functionality: "Supports multiple chains including Base, facilitating automated trading strategies in DeFi environments." },
  { id: 8, name: "AlphaSight", description: "Signal Trading Bot", functionality: "Provides automated signal trading bots across multiple chains, using proprietary algorithms to identify profitable opportunities." },
  { id: 9, name: "SigmaBot", description: "Multi-Chain Speed Bot", functionality: "Recognized for its speed and multi-chain capabilities, including support for the Base chain." },
  { id: 10, name: "Shuriken", description: "Web-Based Trade Bot", functionality: "Provides a robust web application supporting automated trading across multiple chains, including Base." },
]

export function TradingBotList() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBot, setSelectedBot] = useState(null)

  const handleLaunchBot = (bot) => {
    setSelectedBot(bot)
    setIsModalOpen(true)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tradingBots.map((bot) => (
        <TradingBotCard key={bot.id} bot={bot} onLaunch={() => handleLaunchBot(bot)} />
      ))}
      {selectedBot && (
        <LaunchBotModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          bot={selectedBot}
        />
      )}
    </div>
  )
}

export default TradingBotList;