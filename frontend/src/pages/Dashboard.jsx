import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "../components/custom/Sidebar";
import { UploadPage } from "../components/custom/UploadPage";
import { Draft }  from "../components/custom/Draft";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Youtube, Twitter, Instagram, Linkedin, ArrowRight, ArrowRightIcon } from 'lucide-react';
import { TradingBotList } from "../components/custom/TradingBotList";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  const [activePage, setActivePage] = React.useState("dashboard");
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar setActivePage={setActivePage} />

      <main className="flex-1 p-6 overflow-y-auto">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="rounded-lg bg-black p-6 shadow-lg"
        >
          {activePage === "dashboard" && <DashboardContent />}
          {activePage === "content-creation" && <UploadPage />}
          {activePage === "content-draft" && <Draft />}
          {activePage === "trading-bot" && <TradingBotList />}
        </motion.div>
      </main>
    </div>
  );
}

function DashboardContent() {
  const [isNewUser, setIsNewUser] = useState(true);
  const [socialProfiles, setSocialProfiles] = useState({
    twitter: '',
    youtube: '',
    instagram: '',
    linkedin: '',
    oxppl: '',
    warpcast: '',
    ourPlatform: '',
  });

  useEffect(() => {
    const storedProfiles = localStorage.getItem('socialProfiles');
    if (storedProfiles) {
      setSocialProfiles(JSON.parse(storedProfiles));
      setIsNewUser(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialProfiles(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('socialProfiles', JSON.stringify(socialProfiles));
    setIsNewUser(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      {isNewUser ? (
        <NewUserForm 
          socialProfiles={socialProfiles} 
          handleInputChange={handleInputChange} 
          handleSubmit={handleSubmit} 
        />
      ) : (
        <>
          <Web3PersonaOverview socialProfiles={socialProfiles} />
          <IndividualPlatformPersonas socialProfiles={socialProfiles} />
        </>
      )}
    </div>
  );
}

function NewUserForm({ socialProfiles, handleInputChange, handleSubmit }) {
  return (
    <Card className="bg-black border border-white/10">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Welcome! Please enter your social media usernames</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(socialProfiles).map((platform) => (
            <div key={platform} className="flex flex-col space-y-2">
              <label htmlFor={platform} className="text-white text-lg capitalize">{platform}</label>
              <Input
                type="text"
                id={platform}
                name={platform}
                value={socialProfiles[platform]}
                onChange={handleInputChange}
                className="bg-white/10 text-white text-lg"
                placeholder={`Enter your ${platform} username`}
              />
            </div>
          ))}
          <Button type="submit" className="w-full text-lg">Save Profiles</Button>
        </form>
      </CardContent>
    </Card>
  );
}

function Web3PersonaOverview({ socialProfiles }) {
  return (
    <Card className="bg-black border border-white/10">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Web3 Persona Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20 border-2 border-white">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Web3 Persona" />
            <AvatarFallback>W3P</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-2xl font-semibold text-white">{socialProfiles.ourPlatform}</h3>
            <p className="text-gray-400 text-lg">Blockchain enthusiast & educator</p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex justify-between text-white text-lg">
            <span>Reputation Score</span>
            <span>78/100</span>
          </div>
          <Progress value={78} className="h-3 bg-white/20" />
          <div className="flex justify-between text-white text-lg">
            <span>Total Followers</span>
            <span>24.5K</span>
          </div>
          <div className="flex justify-between text-white text-lg">
            <span>Engagement Rate</span>
            <span>5.2%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function IndividualPlatformPersonas({ socialProfiles }) {
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
    {
      name: "LinkedIn",
      icon: Linkedin,
      followers: "3.2K",
      description:
        "Shares professional insights, networking opportunities, and career advice in the blockchain and cryptocurrency industry.",
      color: "text-blue-700",
    },
  ];

  return (
    <Card className="bg-black border border-white/10">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Individual Platform Personas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {platforms.map((platform) => (
            <Card key={platform.name} className="bg-white/5 border border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium text-white">{platform.name}</CardTitle>
                <platform.icon className={`h-5 w-5 ${platform.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{platform.followers}</div>
                <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                  {platform.description}
                </p>
                {socialProfiles[platform.name.toLowerCase()] && (
                  <p className="text-white text-lg mt-2">
                    <ArrowRightIcon /> {socialProfiles[platform.name.toLowerCase()]}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

