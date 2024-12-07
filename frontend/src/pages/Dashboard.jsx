import React from "react";
import { motion } from "framer-motion";
import { Sidebar } from "../components/custom/Sidebar";
import { UploadPage } from "../components/custom/UploadPage";
import { Draft } from "../components/custom/Draft";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Youtube, Twitter, Instagram, Edit } from "lucide-react";

export default function Dashboard() {
  const [activePage, setActivePage] = React.useState("dashboard");

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar setActivePage={setActivePage} />

      <main className="flex-1 p-6 overflow-auto">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="rounded-lg bg-gray-900 p-6 shadow-lg"
        >
          {activePage === "dashboard" && <DashboardContent />}
          {activePage === "content-creation" && <UploadPage />}
          {activePage === "content-draft" && <Draft />}
        </motion.div>
      </main>
    </div>
  );
}

function DashboardContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Web3PersonaOverview />
      <IndividualPlatformPersonas />
      <PersonaCreationEditWizard />
    </div>
  );
}

function Web3PersonaOverview() {
  return (
    <Card className="bg-black border border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Web3 Persona Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20 border-2 border-white">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Web3 Persona" />
            <AvatarFallback>W3P</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold text-white">CryptoExplorer</h3>
            <p className="text-gray-400">Blockchain enthusiast & educator</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-white">
            <span>Reputation Score</span>
            <span>78/100</span>
          </div>
          <Progress
            value={78}
            className="h-2 bg-white/20"
            indicatorClassName="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
          />
          <div className="flex justify-between text-white">
            <span>Total Followers</span>
            <span>24.5K</span>
          </div>
          <div className="flex justify-between text-white">
            <span>Engagement Rate</span>
            <span>5.2%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function IndividualPlatformPersonas() {
  const platforms = [
    {
      name: "Youtube",
      icon: Youtube,
      followers: "15.2K",
      description:
        "Shares in-depth blockchain tutorials and cryptocurrency market analysis. Known for clear explanations of complex topics.",
      color: "text-red-500",
    },
    {
      name: "Twitter",
      icon: Twitter,
      followers: "8.7K",
      description:
        "Provides real-time updates on crypto trends, engages in Web3 discussions, and shares quick tips for blockchain beginners.",
      color: "text-blue-400",
    },
    {
      name: "Instagram",
      icon: Instagram,
      followers: "5.6K",
      description:
        "Posts visually appealing infographics about blockchain technology and behind-the-scenes glimpses of the crypto world.",
      color: "text-pink-500",
    },
  ];

  return (
    <Card className="bg-black border border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Individual Platform Personas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {platforms.map((platform) => (
            <Card key={platform.name} className="bg-white/5 border border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">{platform.name}</CardTitle>
                <platform.icon className={`h-4 w-4 ${platform.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{platform.followers}</div>
                <p className="text-xs text-gray-400 mt-2 line-clamp-3">
                  {platform.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PersonaCreationEditWizard() {
  return (
    <Card className="bg-black border border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Persona Creation/Edit Wizard</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-gray-400">Create or edit your Web3 persona across multiple platforms.</p>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button className="w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 hover:from-red-600 hover:via-yellow-600 hover:to-green-600 text-white font-bold">
            <Edit className="mr-2 h-4 w-4" /> Start Wizard
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}
