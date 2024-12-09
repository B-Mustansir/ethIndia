import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Bold, Italic, Underline, Link2, ImageIcon, Smile, Smartphone, Monitor, Copy, Calendar, Send } from 'lucide-react';

export function Draft() {

  const yt_demo={
    title:"The $40 Million Dilemma: MrBeast's Next Big Move!",
    description:"Creating YouTube videos is one thing, but what happens when you want to take it to the next level with a streaming series? MrBeast dives into the staggering costs, creative challenges, and whether he'd fund a $40M+ project himself. 🚀💸 Would you make the leap? Let us know in the comments! #MrBeast #ContentCreation #StreamingSeries"
    
  }

  const tweet_demo={
    tweet:"Ever wondered what it takes to level up from YouTube to a full-blown streaming series? 💰🎥 Here's @MrBeast talking about the insane costs and decisions behind creating next-level content. Would you take the $40M+ leap? 🤔 #ContentCreation #MrBeast"
  }
  const [text, setText] = useState(tweet_demo.tweet);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [youtubeTitle, setYoutubeTitle] = useState("My Awesome Video");
  const [youtubeDescription, setYoutubeDescription] = useState("This is a great video about...");
  const [activeTab, setActiveTab] = useState("twitter");
  const [yt_data,setyt_data] = useState(yt_demo);
  const [twitter_data,settwitter_data] = useState(tweet_demo);
  const [video_link,setvideo_link]=useState('https://res.cloudinary.com/dwgdjgeor/video/upload/v1733730746/gegjm6umgifkb4pqfbvv.mp4');
  useEffect(()=>{
  
  //   let yt_data_cp=JSON.parse(localStorage.getItem("yt_data"));
  // let twitter_data_cp=JSON.parse(localStorage.getItem("twitter_data"));
  // let video_link_cp=localStorage.getItem("video_link");
  // setyt_data(yt_data_cp);
  // settwitter_data(twitter_data_cp);
  // setvideo_link(video_link_cp);
  },[])
  // console.log(yt_data);
  // console.log(twitter_data);


  const applyStyle = (style) => {
    let newText = text;
    if (style === "bold") {
      newText = isBold ? newText.replace(/\*\*(.*?)\*\*/g, "$1") : `**${newText}**`;
      setIsBold(!isBold);
    } else if (style === "italic") {
      newText = isItalic ? newText.replace(/\*(.*?)\*/g, "$1") : `*${newText}*`;
      setIsItalic(!isItalic);
    } else if (style === "underline") {
      newText = isUnderline ? newText.replace(/__(.*?)__/g, "$1") : `__${newText}__`;
      setIsUnderline(!isUnderline);
    }
    setText(newText);
  };

  const renderStyledText = (text) => {
    let styledText = text;
    if (isBold) styledText = styledText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    if (isItalic) styledText = styledText.replace(/\*(.*?)\*/g, "<em>$1</em>");
    if (isUnderline) styledText = styledText.replace(/__(.*?)__/g, "<u>$1</u>");
    return <div dangerouslySetInnerHTML={{ __html: styledText }} />;
  };

  return (
    <div className="container mx-auto p-8 max-w-7xl bg-black text-white min-h-screen">
      <Tabs defaultValue="twitter" className="w-full text-white" onValueChange={setActiveTab}>
        <TabsList className=" flex flex-row justify-around w-full h-[3rem] grid-cols-2 mb-8 bg-black p-1 rounded-full border border-white">
          <TabsTrigger
            value="twitter"
            className="transition-all duration-300 text-white data-[state=active]:bg-white data-[state=active]:text-black px-6 py-2 rounded-full hover:bg-white hover:text-black w-fit border"
          >
            Twitter
          </TabsTrigger>
          <TabsTrigger
            value="youtube"
            className="transition-all duration-300 text-white data-[state=active]:bg-white data-[state=active]:text-black px-6 py-2 rounded-full hover:bg-white hover:text-black w-fit border"
          >
            YouTube
          </TabsTrigger>
        </TabsList>

        <TabsContent value="twitter">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Editor Section */}
            <div className="space-y-6">
              <Card className="bg-black border border-white shadow-lg rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  {/* Formatting Controls */}
                  <div className="flex flex-wrap gap-4 pb-6 border-b border-white">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`text-white hover:bg-white hover:text-black transition-all rounded-full ${isBold ? 'bg-white text-black' : ''}`}
                      onClick={() => applyStyle("bold")}
                    >
                      <Bold className="w-5 h-5 transition-transform hover:scale-110" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`text-white hover:bg-white hover:text-black transition-all rounded-full ${isItalic ? 'bg-white text-black' : ''}`}
                      onClick={() => applyStyle("italic")}
                    >
                      <Italic className="w-5 h-5 transition-transform hover:scale-110" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`text-white hover:bg-white hover:text-black transition-all rounded-full ${isUnderline ? 'bg-white text-black' : ''}`}
                      onClick={() => applyStyle("underline")}
                    >
                      <Underline className="w-5 h-5 transition-transform hover:scale-110" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white hover:text-black transition-all rounded-full"
                    >
                      <Link2 className="w-5 h-5 transition-transform hover:scale-110" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white hover:text-black transition-all rounded-full"
                    >
                      <ImageIcon className="w-5 h-5 transition-transform hover:scale-110" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white hover:text-black transition-all rounded-full"
                    >
                      <Smile className="w-5 h-5 transition-transform hover:scale-110" />
                    </Button>
                  </div>

                  {/* Text Input */}
                  <textarea
                    className="w-full h-40 mt-6 p-4 bg-black text-white border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white placeholder-white placeholder-opacity-50 resize-none"
                    value={twitter_data && twitter_data.tweet}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What's happening?"
                  />
                </CardContent>
              </Card>

              {/* Styled Preview */}
              <Card className="bg-black border border-white shadow-lg rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-white text-lg">Styled Preview</h3>
                  <p className="text-white">{renderStyledText(text)}</p>
                </CardContent>
              </Card>
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
              <Card className="bg-black border border-white shadow-lg rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-semibold text-white text-lg">Post Preview</h2>
                    <div className="flex gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white hover:text-black transition-all rounded-full"
                      >
                        <Smartphone className="w-5 h-5 transition-transform hover:scale-110" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white hover:text-black transition-all rounded-full"
                      >
                        <Monitor className="w-5 h-5 transition-transform hover:scale-110" />
                      </Button>
                    </div>
                  </div>
                  <div className="border border-white rounded-xl p-6 bg-black">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black font-bold text-lg">
                        B
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg">MrBeast</h3>
                        <p className="text-white mt-2">{twitter_data && twitter_data.tweet}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button className="flex-1 bg-black text-white hover:bg-white hover:text-black transition-all border border-white">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy text
                </Button>
                <Button className="flex-1 bg-black text-white hover:bg-white hover:text-black transition-all border border-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
                <Button className="flex-1 bg-white text-black hover:bg-black hover:text-white transition-all border border-white">
                  <Send className="w-4 h-4 mr-2" />
                  Post now
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="youtube">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Editor Section */}
            <div className="space-y-6">
              <Card className="bg-black border border-white shadow-lg rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  {/* Formatting Controls */}
                  <div className="flex flex-wrap gap-4 pb-6 border-b border-white">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`text-white hover:bg-white hover:text-black transition-all rounded-full ${isBold ? 'bg-white text-black' : ''}`}
                      onClick={() => applyStyle("bold")}
                    >
                      <Bold className="w-5 h-5 transition-transform hover:scale-110" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`text-white hover:bg-white hover:text-black transition-all rounded-full ${isItalic ? 'bg-white text-black' : ''}`}
                      onClick={() => applyStyle("italic")}
                    >
                      <Italic className="w-5 h-5 transition-transform hover:scale-110" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`text-white hover:bg-white hover:text-black transition-all rounded-full ${isUnderline ? 'bg-white text-black' : ''}`}
                      onClick={() => applyStyle("underline")}
                    >
                      <Underline className="w-5 h-5 transition-transform hover:scale-110" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white hover:text-black transition-all rounded-full"
                    >
                      <Link2 className="w-5 h-5 transition-transform hover:scale-110" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white hover:text-black transition-all rounded-full"
                    >
                      <ImageIcon className="w-5 h-5 transition-transform hover:scale-110" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white hover:text-black transition-all rounded-full"
                    >
                      <Smile className="w-5 h-5 transition-transform hover:scale-110" />
                    </Button>
                  </div>

                  {/* YouTube Title Input */}
                  <input
                    className="w-full mt-6 p-4 bg-black text-white border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white placeholder-white placeholder-opacity-50"
                    value={yt_data && yt_data.title}
                    onChange={(e) => setYoutubeTitle(e.target.value)}
                    placeholder="Enter video title..."
                  />

                  {/* YouTube Description Input */}
                  <textarea
                    className="w-full h-40 mt-6 p-4 bg-black text-white border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white placeholder-white placeholder-opacity-50 resize-none"
                    value={yt_data && yt_data.description}
                    onChange={(e) => setYoutubeDescription(e.target.value)}
                    placeholder="Enter video description..."
                  />
                </CardContent>
              </Card>

              {/* Styled Preview */}
              <Card className="bg-black border border-white shadow-lg rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-white text-lg">Styled Preview</h3>
                  <h4 className="font-bold text-white mb-2">Title:</h4>
                  <p className="text-white mb-4">{renderStyledText(yt_data && yt_data.title)}</p>
                  <h4 className="font-bold text-white mb-2">Description:</h4>
                  <p className="text-white">{renderStyledText(yt_data && yt_data.description)}</p>
                </CardContent>
              </Card>
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
              <Card className="bg-black border border-white shadow-lg rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-semibold text-white text-lg">Video Preview</h2>
                    <div className="flex gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white hover:text-black transition-all rounded-full"
                      >
                        <Smartphone className="w-5 h-5 transition-transform hover:scale-110" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white hover:text-black transition-all rounded-full"
                      >
                        <Monitor className="w-5 h-5 transition-transform hover:scale-110" />
                      </Button>
                    </div>
                  </div>
                  <div className="border border-white rounded-xl p-6 bg-black">
                    <div className="aspect-video bg-white rounded-lg mb-4"><video src={video_link}></video></div>
                    <h3 className="font-bold text-white text-lg mb-2">{renderStyledText(yt_data && yt_data.title)}</h3>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-bold text-sm">
                        B
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">MrBeast</h4>
                        <p className="text-white mt-2">{renderStyledText(yt_data && yt_data.description)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button className="flex-1 bg-black text-white hover:bg-white hover:text-black transition-all border border-white">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy text
                </Button>
                <Button className="flex-1 bg-black text-white hover:bg-white hover:text-black transition-all border border-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
                <Button className="flex-1 bg-white text-black hover:bg-black hover:text-white transition-all border border-white">
                  <Send className="w-4 h-4 mr-2" />
                  Post now
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Draft;

