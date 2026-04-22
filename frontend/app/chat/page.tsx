"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "bot";
  text: string;
};

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Load greeting from backend
  useEffect(() => {
    fetch("https://mathbuddy-ai.onrender.com/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": localStorage.getItem("userId") || "",
      },
      body: JSON.stringify({ message: "" }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages([{ role: "bot", text: data.message }]);
      });
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userId = localStorage.getItem("userId") || "";

    // Add user message
    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://mathbuddy-ai.onrender.com/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": userId,
          },
          body: JSON.stringify({ message: input }),
        }
      );

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.message || "🤖 Try again 😊",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ Error. Try again later.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-2xl mx-auto p-3">

      {/* 🔥 TITLE */}
      <h2 className="text-center mb-3 text-lg font-semibold text-white">
        🧠 Ask me a math question
      </h2>

      {/* ✅ CHAT BOX */}
      <div className="flex-1 overflow-y-auto p-4 rounded-xl shadow mb-3 bg-black/70 text-white space-y-3">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[80%] whitespace-pre-wrap break-words ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-white"
              }`}
            >
              {/* ✅ Markdown Support */}
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <p className="text-sm text-gray-300 animate-pulse">
            🤖 Thinking...
          </p>
        )}
      </div>

      {/* ✅ INPUT BOX */}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded border bg-gray-800 text-white outline-none"
          placeholder="Type a math question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg transition"
        >
          Send 🚀
        </button>
      </div>
    </div>
  );
}