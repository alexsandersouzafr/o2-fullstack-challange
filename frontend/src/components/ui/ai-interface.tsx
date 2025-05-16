"use client";

import type React from "react";

import { Send, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { promptAi } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import type { Content } from "@google/genai";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function AiInterface() {
  const [chat, setChat] = useState<Content[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Use mutation instead of query for better control
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: promptAi,
    onSuccess: (data) => {
      if (data?.candidates?.[0]?.content) {
        setChat((prev) => [...prev, data.candidates[0].content]);
      }
    },
  });

  // Scroll to bottom whenever chat updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  // Reset chat when dialog closes
  useEffect(() => {
    if (!open) {
      setChat([]);
    }
  }, [open]);

  function handleSendMessage() {
    // Don't send empty messages
    if (!inputValue.trim()) return;

    // Add user message to chat
    const userMessage = { parts: [{ text: inputValue }], role: "user" };
    setChat((prev) => [...prev, userMessage]);

    // Send to AI
    mutate(inputValue);

    // Clear input
    setInputValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Sparkles className="h-4 w-4" />
          <span>Ajuda da IA</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Ajuda da IA
          </DialogTitle>
          <DialogDescription>
            Consulte total de vendas por período e movimentações de um produto.
          </DialogDescription>
        </DialogHeader>

        {/* Chat container with auto-scroll */}
        <div
          ref={chatContainerRef}
          className="h-[350px] border rounded-lg flex flex-col gap-3 p-4 bg-secondary/30 overflow-y-auto text-sm mb-4 scroll-smooth"
        >
          {chat.length === 0 ? (
            <div className="text-muted-foreground text-center flex flex-col items-center justify-center h-full">
              <Sparkles className="h-8 w-8 mb-2 opacity-50" />
              <p>Faça uma pergunta para começar a conversa.</p>
            </div>
          ) : (
            chat.map((content, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-full",
                  content.role === "model" ? "justify-start" : "justify-end"
                )}
              >
                <div
                  className={cn(
                    "rounded-lg max-w-[80%] px-4 py-2 shadow-sm",
                    content.role === "model"
                      ? "bg-background text-foreground"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  {content.parts?.map((part, idx) => (
                    <p key={idx} className="whitespace-pre-wrap">
                      {part.text}
                    </p>
                  ))}
                </div>
              </div>
            ))
          )}

          {isPending && (
            <div className="flex justify-start">
              <div className="flex gap-2 items-center bg-background rounded-lg px-4 py-2 max-w-[80%]">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-16 rounded-md" />
                <Skeleton className="h-4 w-12 rounded-md" />
              </div>
            </div>
          )}

          {isError && (
            <div className="bg-destructive/10 text-destructive rounded-lg p-3 text-sm">
              Ocorreu um erro:{" "}
              {error instanceof Error
                ? error.message
                : "Falha na comunicação com a IA"}
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="flex gap-2 items-center">
          <Input
            disabled={isPending}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pergunte algo à IA..."
            className="flex-1"
          />
          <Button
            disabled={isPending || !inputValue.trim()}
            onClick={handleSendMessage}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
