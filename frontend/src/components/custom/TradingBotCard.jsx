import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { useLocation } from "react-router-dom";

export function TradingBotCard({ bot, onLaunch }) {
  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl  text-slate-100 font-bold flex items-center justify-between">
          {bot.name}
          <Badge variant="secondary" className="ml-2">{bot.description}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-100 mb-4 h-24 overflow-auto">{bot.functionality}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onLaunch(bot)} className="w-full bg-blue-600 hover:bg-blue-700 transition-colors">
          Launch Bot
        </Button>
      </CardFooter>
    </Card>
  )
}

