import { useChat } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { Bot, GlobeIcon, MicIcon, Minus, PlusIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import userLogo from "@/assets/2-Ph.png";
import botLogo from "@/assets/logo.png";
import {
  AIInput,
  AIInputButton,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from "@/components/ui/kibo-ui/ai/input";
import { AIMessage, AIMessageAvatar, AIMessageContent } from "@/components/ui/kibo-ui/ai/message";
import { cn } from "@/lib/utils";

import { AIResponse } from "../ui/kibo-ui/ai/response";

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayLogo, setDisplayLogo] = useState(true);

  return (
    <div className="fixed right-5 bottom-20 z-20">
      <motion.div
        layout
        animate={{ borderRadius: isOpen ? 10 : 50 }}
        initial={{ borderRadius: 50 }}
        className={cn("bg-background border-primary h-12 w-12 cursor-pointer border-2 shadow-lg", {
          "h-[25rem] w-96 cursor-default": isOpen,
        })}
        onClick={() => {
          if (!isOpen) {
            setIsOpen(!isOpen);
            setDisplayLogo(false);
          }
        }}
        onAnimationComplete={() => {
          if (!isOpen) {
            setDisplayLogo(true);
          }
        }}
      >
        {displayLogo && (
          <div className="text-primary flex h-full w-full items-center justify-center p-3 text-2xl font-bold">
            <Bot className="text-primary" />
          </div>
        )}
        {isOpen && (
          <div className="flex h-full w-full flex-col gap-2">
            <div className="flex items-center justify-between border-b p-3">
              <div className="flex items-center">
                <Bot className="text-primary" />
                <svg
                  width="129.00000000000006"
                  height="26.21764852589558"
                  viewBox="100 0 369.89473684210526 74.33905457489806"
                >
                  <defs id="SvgjsDefs6025"></defs>

                  <g
                    id="SvgjsG6027"
                    transform="matrix(2.6532381166578745,0,0,2.6532381166578745,109.61208544197541,4.211393087413061)"
                    fill="#af3e3e"
                  >
                    <path d="M14.94 9.74 l-5.1 6.1 l-5.06 -6.1 l0 10.26 l-2.14 0 l0 -12.82 l-1.74 -2.1 l2.82 0 l6.1 7.32 l6.18 -7.32 l2.82 0 l-1.74 2.1 l0 12.82 l-2.14 0 l0 -10.26 z M24.099999999999998 14.02 l0 3.8 l9.2 0 l0 2.18 l-11.38 0 l0 -14.92 l10.5 0 l0 2.2 l-8.32 0 l0 4.52 q0.62 -0.36 1.38 -0.48 q0.56 -0.1 1.44 -0.1 l3.26 0 l0 2.22 l-3.26 0 q-0.82 0 -1.44 0.1 q-0.76 0.14 -1.38 0.48 z M41.46 6.66 l-0.82 -1.84 l2.4 0 l7.18 15.18 l-2.44 0 l-0.98 -2.18 l-4.54 0 q-1.28 0 -2.3 0.24 q-0.9 0.22 -1.5 0.58 q-0.54 0.32 -0.72 0.66 l-0.38 0.7 l-2.36 0 z M43.06 15.620000000000001 l2.76 0 l-3.26 -6.3 l-3.3 7.14 q0.44 -0.38 1.34 -0.6 q1.02 -0.24 2.46 -0.24 z M63.480000000000004 20 l-10.46 0 l0 -14.92 l2.18 0 l0 12.74 l8.28 0 l0 2.18 z M68.22 20 l-2.14 0 l0 -14.92 l2.14 0 l0 14.92 z M74.8 14.02 l0 5.98 l-2.18 0 l0 -14.92 l10.5 0 l0 2.2 l-8.32 0 l0 4.52 q0.62 -0.36 1.38 -0.48 q0.56 -0.1 1.44 -0.1 l3.26 0 l0 2.22 l-3.26 0 q-0.82 0 -1.44 0.1 q-0.76 0.14 -1.38 0.48 z M91.46000000000001 11.64 q1.34 -1.4 2.42 -3.12 t1.72 -3.44 l2.5 0 q-1.02 2.38 -2.48 4.56 q-1.32 1.98 -3.08 3.9 l0 6.46 l-2.16 0 l0 -6.46 q-1.76 -1.92 -3.08 -3.9 q-1.46 -2.18 -2.48 -4.56 l2.5 0 q0.64 1.72 1.72 3.44 t2.42 3.12 z"></path>
                  </g>
                </svg>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                <Minus className="text-primary" />
              </div>
            </div>
            <BotInput />
          </div>
        )}
      </motion.div>
    </div>
  );
}

function BotInput() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "http://localhost:3000/api/chat",
    onError: (error) => {
      console.error("Chat error:", error?.message || error);
    },
  });
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <>
      <div className="flex h-[85%] w-[100%] flex-col items-center justify-between rounded-lg ">
        {messages.length === 0 && (
          <>
            <div className="text-primary flex justify-center">
              <h3>Ready when you are.</h3>
            </div>
          </>
        )}
        <div
          ref={bottomRef}
          className={messages.length > 0 ? "custom-scrollbar overflow-auto rounded-lg p-2" : "w-[100%] flex-1 p-2"}
        >
          {messages.map((message) => (
            <AIMessage key={message.id} from={message.role === "user" ? "user" : "assistant"}>
              <AIMessageContent>
                <AIResponse>{message.content}</AIResponse>
              </AIMessageContent>
              <AIMessageAvatar src={message.role === "user" ? userLogo : botLogo} name={message.role} />
            </AIMessage>
          ))}
        </div>
        <div className="flex w-full items-center justify-between rounded-lg p-2">
          <AIInput onSubmit={handleSubmit}>
            <AIInputTextarea onChange={handleInputChange} value={input} />
            <AIInputToolbar>
              <AIInputTools>
                <AIInputButton>
                  <PlusIcon size={16} />
                </AIInputButton>
                <AIInputButton>
                  <MicIcon size={16} />
                </AIInputButton>
                <AIInputButton>
                  <GlobeIcon size={16} />
                  <span>Search</span>
                </AIInputButton>
              </AIInputTools>
              <AIInputSubmit />
            </AIInputToolbar>
          </AIInput>
        </div>
      </div>
    </>
  );
}
