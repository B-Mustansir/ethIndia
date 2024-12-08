import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export function LaunchBotModal({ isOpen, onClose, bot }) {
  const navigate = useNavigate(); // React Router hook for navigation
  const [twitterIntegration, setTwitterIntegration] = useState(false);
  const [youtubeIntegration, setYoutubeIntegration] = useState(false);
  const [PPLIntegration, setPPLIntegration] = useState(false);
  const [tradeAmount, setTradeAmount] = useState("");
  const [botName, setBotName] = useState(bot.name);

  const handleLaunch = () => {
    // Pass the bot data to the TradingBotCharts route
    navigate("/bot-charts", {
      state: {
        name: botName,
        description: bot.description,
        twitterIntegration,
        youtubeIntegration,
        PPLIntegration,
        tradeAmount,
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-gray-100 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center justify-between">
            Launch {bot.name}
            <Badge variant="secondary" className="ml-2">
              {bot.description}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <Label htmlFor="bot-name" className="text-gray-300">
              Bot Name
            </Label>
            <Input
              id="bot-name"
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
              className="bg-gray-700 text-gray-100 border-gray-600 mt-1"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label
              htmlFor="twitter-integration"
              className="text-gray-300"
            >
              Twitter Integration
            </Label>
            <Switch
              id="twitter-integration"
              checked={twitterIntegration}
              onCheckedChange={setTwitterIntegration}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label
              htmlFor="youtube-integration"
              className="text-gray-300"
            >
              YouTube Integration
            </Label>
            <Switch
              id="youtube-integration"
              checked={youtubeIntegration}
              onCheckedChange={setYoutubeIntegration}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label
              htmlFor="0xPPL-integration"
              className="text-gray-300"
            >
              0xPPL Integration
            </Label>
            <Switch
              id="0xPPL-integration"
              checked={PPLIntegration}
              onCheckedChange={setPPLIntegration}
            />
          </div>
          <div>
            <Label htmlFor="trade-amount" className="text-gray-300">
              Amount to Trade
            </Label>
            <Input
              id="trade-amount"
              type="number"
              value={tradeAmount}
              onChange={(e) => setTradeAmount(e.target.value)}
              className="bg-gray-700 text-gray-100 border-gray-600 mt-1"
            />
          </div>
          <Button
            onClick={handleLaunch}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Launch Bot
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
