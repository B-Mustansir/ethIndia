import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const coinData = [
    {
        "Coin": "USDC",
        "Price": "$0.9999",
        "1h": "0.0%",
        "24h": "0.1%",
        "7d": "0.1%",
        "24h Volume": "$8,166,308,486",
        "Market Cap": "$41,201,498,363"
    },
    {
        "Coin": "Wrapped stETH",
        "Price": "$4,740.23",
        "1h": "0.2%",
        "24h": "3.2%",
        "7d": "9.3%",
        "24h Volume": "$188,185,349",
        "Market Cap": "$16,906,252,498"
    },
    {
        "Coin": "WETH",
        "Price": "$4,002.23",
        "1h": "0.1%",
        "24h": "3.4%",
        "7d": "9.3%",
        "24h Volume": "$1,043,908,251",
        "Market Cap": "$11,147,016,392"
    },
    {
        "Coin": "MANTRA",
        "Price": "$3.91",
        "1h": "0.6%",
        "24h": "3.7%",
        "7d": "9.9%",
        "24h Volume": "$76,792,121",
        "Market Cap": "$3,682,584,283"
    },
    {
        "Coin": "Dai",
        "Price": "$0.9999",
        "1h": "0.0%",
        "24h": "0.1%",
        "7d": "0.0%",
        "24h Volume": "$131,488,563",
        "Market Cap": "$3,476,202,934"
    },
    {
        "Coin": "Coinbase Wrapped BTC",
        "Price": "$99,632.81",
        "1h": "0.0%",
        "24h": "1.6%",
        "7d": "3.4%",
        "24h Volume": "$539,115,028",
        "Market Cap": "$2,156,041,040"
    },
    {
        "Coin": "Brett",
        "Price": "$0.2130",
        "1h": "0.2%",
        "24h": "7.6%",
        "7d": "20.0%",
        "24h Volume": "$135,081,684",
        "Market Cap": "$2,114,817,306"
    },
    {
        "Coin": "Rocket Pool ETH",
        "Price": "$4,481.72",
        "1h": "0.1%",
        "24h": "3.3%",
        "7d": "9.9%",
        "24h Volume": "$9,781,919",
        "Market Cap": "$2,048,242,869"
    },
    {
        "Coin": "Virtuals Protocol",
        "Price": "$1.76",
        "1h": "0.3%",
        "24h": "1.1%",
        "7d": "13.9%",
        "24h Volume": "$179,564,625",
        "Market Cap": "$1,753,723,080"
    }
];

const bots = [
  {
    name: "BotSwap",
    description: "Automates yield farming by identifying and investing in high-yield opportunities across various DeFi platforms.",
  },
  {
    name: "Mizar Sniper Bot",
    description: "Executes trades instantly upon the listing of new tokens on decentralized exchanges.",
  },
  {
    name: "DeFiMate",
    description: "Facilitates seamless asset swaps across different blockchain networks.",
  },
];

const transactions = [
  { bot: "BotSwap", amount: "100 USDT", status: "Completed" },
  { bot: "Mizar Sniper Bot", amount: "200 USDT", status: "Failed" },
  { bot: "DeFiMate", amount: "300 USDT", status: "Completed" },
];

export default function TradingBotPage() {
  const [selectedBot, setSelectedBot] = useState(null);
  const [tradingAmount, setTradingAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBotClick = (bot) => {
    setSelectedBot(bot);
    setIsModalOpen(true);
  };

  const handleTradeSubmit = () => {
    setIsModalOpen(false);
    alert(`Trade for ${tradingAmount} with ${selectedBot.name} submitted!`);
    setSelectedBot(null);
    setTradingAmount("");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Trading Bots Dashboard</h1>

      {/* Bots Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Available Trading Bots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bots.map((bot, index) => (
            <Card
              key={index}
              className="bg-gray-800 border-gray-700 text-white cursor-pointer"
              onClick={() => handleBotClick(bot)}
            >
              <CardHeader>
                <CardTitle>{bot.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{bot.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Transactions Section */}
     <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Trading Results</h1>

      {/* Trading Results Table */}
      <Card className="bg-gray-800 border-gray-700 text-white">
        <CardHeader>
          <CardTitle>Market Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="text-white">
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Coin</TableHead>
                <TableHead className="text-white">Price</TableHead>
                <TableHead className="text-white">24h Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coinData.map((coin, index) => (
                <TableRow key={index}>
                  <TableCell className="text-white">{coin.Coin}</TableCell>
                  <TableCell className="text-white">{coin.Price}</TableCell>
                  <TableCell className="text-white">{coin["24h Volume"]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>

      {/* Modal for Trading Amount */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg text-white w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Enter Trade Amount for {selectedBot?.name}
            </h2>
            <Input
              type="number"
              placeholder="Enter amount"
              value={tradingAmount}
              onChange={(e) => setTradingAmount(e.target.value)}
              className="bg-gray-700 text-white border-gray-600 mb-4 w-full"
            />
            <div className="flex justify-end space-x-4">
              <Button
                className="bg-red-600 text-white py-2 px-4 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 text-white py-2 px-4 rounded-md"
                onClick={handleTradeSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
