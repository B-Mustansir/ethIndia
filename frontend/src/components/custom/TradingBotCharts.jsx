import { useState, useEffect } from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";
import { Card } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { ChartContainer } from "../ui/chart";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { useLocation } from "react-router-dom";


// Simulated market data for different time periods
const generateMarketData = (days, volatility, basePrice) => {
  const data = [];
  let price1 = basePrice;
  let price2 = basePrice * 0.995;
  for (let i = 0; i < days; i++) {
    const time = new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    price1 += (Math.random() - 0.5) * volatility;
    price2 += (Math.random() - 0.5) * volatility;
    data.push({
      time,
      price1: parseFloat(price1.toFixed(6)),
      price2: parseFloat(price2.toFixed(6)),
      order:
        Math.random() > 0.9
          ? {
              type: Math.random() > 0.5 ? "buy" : "sell",
              price: parseFloat(((price1 + price2) / 2).toFixed(6)),
            }
          : undefined,
    });
  }
  return data;
};

const coins = [
  { name: "Major", symbol: "MAJOR", basePrice: 1.11 },
  { name: "Ethereum", symbol: "ETH", basePrice: 2000 },
  { name: "Bitcoin", symbol: "BTC", basePrice: 30000 },
  { name: "Cardano", symbol: "ADA", basePrice: 0.5 },
  { name: "Dogecoin", symbol: "DOGE", basePrice: 0.07 },
];

const generateAllMarketData = () => {
  const allData = {};
  coins.forEach((coin) => {
    allData[coin.symbol] = {
      day: generateMarketData(24, coin.basePrice * 0.002, coin.basePrice),
      week: generateMarketData(7, coin.basePrice * 0.005, coin.basePrice),
      month: generateMarketData(30, coin.basePrice * 0.01, coin.basePrice),
      year: generateMarketData(365, coin.basePrice * 0.02, coin.basePrice),
    };
  });
  return allData;
};

const allMarketData = generateAllMarketData();

export default function TradingBotCharts() {
  const location = useLocation();
  const botData = location.state; // Access state passed from navigation

  if (!botData) {
    return <p className="text-white">No bot data provided.</p>;
  }

  const [timePeriod, setTimePeriod] = useState("day");

  const getMarketData = (symbol) => {
    return allMarketData[symbol][timePeriod];
  };

  const renderCoinChart = (coin) => {
    const data = getMarketData(coin.symbol);

    return (
      <Card
        key={coin.symbol}
        className="overflow-hidden rounded-xl border-gray-800 bg-[#121212]"
      >
        <div className="grid grid-cols-[350px,1fr]">
          {/* Left Panel */}
          <div className="border-r border-gray-800 p-6">
            {/* Token Info */}
            <div className="mb-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                  <img
                    src={`/placeholder.svg?height=24&width=24&text=${coin.symbol}`}
                    alt={coin.name}
                    className="h-6 w-6"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{coin.name}</h1>
                  <p className="text-sm text-gray-400">{coin.symbol}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-white">
                  ${data[data.length - 1].price1.toFixed(2)}
                </span>
                <span className="rounded bg-green-900/50 px-1.5 py-0.5 text-xs text-green-400">
                  +
                  {(
                    (data[data.length - 1].price1 / data[0].price1 - 1) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-900/50">
                  <TabsTrigger
                    value="details"
                    className="data-[state=active]:bg-gray-800"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="address"
                    className="data-[state=active]:bg-gray-800"
                  >
                    Address
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Token Details */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Market cap</span>
                <span className="text-sm text-white">
                  $ {(coin.basePrice * 1000000000).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Holders</span>
                <span className="text-sm text-blue-400">
                  {Math.floor(Math.random() * 1000000).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Total supply</span>
                <span className="text-sm text-white">
                  {(1000000000).toLocaleString()} {coin.symbol}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Mutable</span>
                <span className="text-sm text-white">No</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Trust score</span>
                <span className="text-sm text-white">
                  {Math.floor(Math.random() * 20) + 80}/100
                </span>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-white">MARKET DATA</h2>
            </div>

            <ChartContainer
              config={{
                price1: {
                  label: "Price 1",
                  color: "rgb(34, 197, 94)",
                },
                price2: {
                  label: "Price 2",
                  color: "rgb(239, 68, 68)",
                },
              }}
              className="h-[400px]"
            >
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  dataKey="time"
                  stroke="#666"
                  tick={{ fill: "#666" }}
                  axisLine={{ stroke: "#666" }}
                />
                <YAxis
                  stroke="#666"
                  tick={{ fill: "#666" }}
                  domain={["auto", "auto"]}
                  tickCount={5}
                  axisLine={{ stroke: "#666" }}
                  tickFormatter={(value) => value.toFixed(2)}
                />
                <Line
                  type="monotone"
                  dataKey="price1"
                  stroke="rgb(34, 197, 94)"
                  dot={false}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="price2"
                  stroke="rgb(239, 68, 68)"
                  dot={false}
                  strokeWidth={2}
                />
                {data.map((entry, index) => {
                  if (entry.order) {
                    return (
                      <ReferenceLine
                        key={`order-${index}`}
                        x={entry.time}
                        stroke={
                          entry.order.type === "buy"
                            ? "rgb(34, 197, 94)"
                            : "rgb(239, 68, 68)"
                        }
                        strokeDasharray="3 3"
                        label={
                          <g transform={`translate(0,-20)`}>
                            {entry.order.type === "buy" ? (
                              <ArrowUpCircle
                                size={20}
                                fill="rgb(34, 197, 94)"
                                stroke="black"
                              />
                            ) : (
                              <ArrowDownCircle
                                size={20}
                                fill="rgb(239, 68, 68)"
                                stroke="black"
                              />
                            )}
                          </g>
                        }
                      />
                    );
                  }
                  return null;
                })}
                {data.map((entry, index) => {
                  if (entry.order) {
                    return (
                      <ReferenceArea
                        key={`order-area-${index}`}
                        x1={entry.time}
                        x2={data[index + 1]?.time || entry.time}
                        y1={entry.order.price}
                        y2={entry.order.price}
                        stroke="none"
                        fill={
                          entry.order.type === "buy"
                            ? "rgba(34, 197, 94, 0.1)"
                            : "rgba(239, 68, 68, 0.1)"
                        }
                      />
                    );
                  }
                  return null;
                })}
              </LineChart>
            </ChartContainer>
          </div>
        </div>
      </Card>
    );
  };

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div className="min-h-screen bg-black p-6">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold text-white">Loading...</h1>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Trading Bot Dashboard</h2>
            <div className="flex gap-2">
              {["day", "week", "month", "year"].map((period) => (
                <button
                  key={period}
                  className={`rounded px-3 py-1 text-sm font-medium ${
                    timePeriod === period
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:bg-gray-800"
                  }`}
                  onClick={() => setTimePeriod(period)}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            {coins.map((coin) => renderCoinChart(coin))}
          </div>
        </>
      )}
    </div>
  );
}
