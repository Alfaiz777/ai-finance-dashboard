import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [isTyping, setIsTyping] = useState(false);

  const getFakeAIResponse = (question: string) => {
    const text = question.toLowerCase();

    if (text.includes("food")) {
      return "You spent around ₹4,500 on food this month.";
    }

    if (text.includes("highest")) {
      return "Your highest expense was ₹12,000 on travel.";
    }

    if (text.includes("savings")) {
      return "You saved approximately ₹18,000 this month.";
    }

    return "I’m still learning! Try asking about food spending, savings, or expenses.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getFakeAIResponse(userMessage.content),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="flex flex-col h-[80vh]">
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}

              <div
                className={`max-w-xs rounded-xl px-4 py-2 text-sm ${
                  msg.role === "user" ? "bg-primary text-white" : "bg-muted"
                }`}
              >
                {msg.content}
              </div>

              {msg.role === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-xl px-4 py-2 text-sm">
              AI is typing...
            </div>
          </div>
        )}
        <div className="border-t p-4 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your finances..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />

          <Button onClick={handleSend} className="cursor-pointer">
            Send
          </Button>
        </div>
      </div>
    </>
  );
};

export default AIChat;
