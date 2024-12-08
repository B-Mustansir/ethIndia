import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Bold, Italic, Underline, Link2, ImageIcon, Smile, Smartphone, Monitor, Copy, Calendar, Send } from 'lucide-react';

export function Draft() {
  const [text, setText] = useState("Hello World");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [youtubeTitle, setYoutubeTitle] = useState("My Awesome Video");
  const [youtubeDescription, setYoutubeDescription] = useState("This is a great video about...");
  const [activeTab, setActiveTab] = useState("twitter");
  

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
                    value={text}
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
                        U
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg">User</h3>
                        <p className="text-white mt-2">{renderStyledText(text)}</p>
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
                    value={youtubeTitle}
                    onChange={(e) => setYoutubeTitle(e.target.value)}
                    placeholder="Enter video title..."
                  />

                  {/* YouTube Description Input */}
                  <textarea
                    className="w-full h-40 mt-6 p-4 bg-black text-white border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white placeholder-white placeholder-opacity-50 resize-none"
                    value={youtubeDescription}
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
                  <p className="text-white mb-4">{renderStyledText(youtubeTitle)}</p>
                  <h4 className="font-bold text-white mb-2">Description:</h4>
                  <p className="text-white">{renderStyledText(youtubeDescription)}</p>
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
                    <div className="aspect-video bg-white rounded-lg mb-4">
                      <video src=""></video>
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2">{renderStyledText(youtubeTitle)}</h3>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-bold text-sm">
                        C
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">Channel Name</h4>
                        <p className="text-white mt-2">{renderStyledText(youtubeDescription)}</p>
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

