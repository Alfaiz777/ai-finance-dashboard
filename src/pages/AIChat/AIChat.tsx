import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { askAI } from "@/services/aiService";
import { getChatHistory } from "@/services/chatService";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

// Starter message shown when chat is empty
const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm your AI financial advisor. I can see your expenses, assets, and debts. Ask me anything about your finances — like 'How much did I spend on food?' or 'What's my net worth?'",
};

const AIChat = () => {
  // Start with welcome message already shown
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await getChatHistory();

        if (data.length > 0) {
          setMessages(data);
        } else {
          setMessages([WELCOME_MESSAGE]);
        }
      } catch (err) {
        console.error("Failed to load chat history", err);
      }
    };

    loadChats();
  }, []);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    // Don't send empty messages or while AI is responding
    if (!input.trim() || isTyping) return;

    // ── Step 1: Add user's message to chat immediately ────────
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input.trim(); //save before clearing
    setInput(""); // clear input field
    setIsTyping(true); // show 'AI is typing....'

    // ── Step 2: Call real backend API ─────────────────────────
    try {
      const data = await askAI(userInput);

      //data.reply is the string from OpenAI
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      // If API fails, show error message in chat
      // Don't show a JavaScript alert — keep it in the chat UI
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Sorry, I couldn't connect to the AI service. Please check your connection and try again.",
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div className="flex flex-col h-[80vh]">
        {/* Message list */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    AI
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={`max-w-xs rounded-xl px-4 py-2 text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {/* Preserve line breaks in AI responses */}
                {msg.content.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < msg.content.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </div>

              {msg.role === "user" && (
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="text-xs">U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start gap-2 justify-start">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  AI
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-xl px-4 py-3 text-sm text-muted-foreground">
                <span className="flex gap-1 items-center">
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  >
                    ●
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  >
                    ●
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  >
                    ●
                  </span>
                </span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="border-t p-4 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your finances..."
            className="flex-1"
            disabled={isTyping} // disable while AI is responding
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          <Button
            onClick={handleSend}
            className="cursor-pointer"
            disabled={isTyping || !input.trim()}
          >
            {isTyping ? "..." : "Send"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AIChat;
