import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Bold, Italic, Underline, Link2, ImageIcon, Smile, Smartphone, Monitor, Copy, Calendar, Send } from "lucide-react";

export function Draft() {
  const [text, setText] = useState("Hello World");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

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
    <div className="container mx-auto p-6 max-w-5xl bg-black text-white min-h-screen">
      <Tabs defaultValue="twitter" className="w-full text-white">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger
            value="twitter"
            className="transition-all duration-300 text-white data-[state=active]:bg-white data-[state=active]:text-black px-4 py-2 rounded-full hover:bg-gray-800"
          >
            Twitter
          </TabsTrigger>
          <TabsTrigger
            value="youtube"
            className="transition-all duration-300 text-white data-[state=active]:bg-white data-[state=active]:text-black px-4 py-2 rounded-full hover:bg-gray-800"
          >
            YouTube
          </TabsTrigger>
        </TabsList>

        <TabsContent value="twitter">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Editor Section */}
            <div className="space-y-4">
              <Card className="bg-black border border-white shadow-md rounded-lg">
                <CardContent className="p-4">
                  {/* Formatting Controls */}
                  <div className="flex flex-wrap gap-3 pb-4 border-b border-white">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white hover:text-black transition-all rounded-full"
                      onClick={() => applyStyle("bold")}
                    >
                      <Bold className="w-5 h-5 transition-transform hover:scale-110" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white hover:text-black transition-all rounded-full"
                      onClick={() => applyStyle("italic")}
                    >
                      <Italic className="w-5 h-5 transition-transform hover:scale-110" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white hover:text-black transition-all rounded-full"
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
                    className="w-full h-32 mt-4 p-3 bg-black text-white border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-500"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What's happening?"
                  />
                </CardContent>
              </Card>

              {/* Styled Preview */}
              <Card className="bg-black border border-white shadow-md rounded-lg">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-white">Styled Preview</h3>
                  <p>{renderStyledText(text)}</p>
                </CardContent>
              </Card>
            </div>

            {/* Preview Section */}
            <div className="space-y-4">
              <Card className="bg-black border border-white shadow-md rounded-lg">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-white">Post Preview</h2>
                    <div className="flex gap-3">
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
                  <div className="border border-white rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black font-bold">
                        U
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white">User</h3>
                        <p className="text-sm text-white mt-2">{renderStyledText(text)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button className="flex-1 border border-white text-white hover:bg-white hover:text-black transition-all">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy text
                </Button>
                <Button className="flex-1 border border-white text-white hover:bg-white hover:text-black transition-all">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
                <Button className="flex-1 bg-white text-black hover:bg-black hover:text-white border border-white transition-all">
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
