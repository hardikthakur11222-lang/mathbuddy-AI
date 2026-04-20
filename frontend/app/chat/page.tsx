"use client";

import { useEffect, useState } from "react";

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
    fetch("http://localhost:5000/api/chat", {
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

    const updated = [...messages, { role: "user", text: input }];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://mathbuddy-ai.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages([
        ...updated,
        {
          role: "bot",
          text: data.message || "🤖 Try again 😊",
        },
      ]);
    } catch {
      setMessages([
        ...updated,
        {
          role: "bot",
          text: "⚠️ Error. Try again later.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-2xl">

      {/* 🔥 TITLE */}
      <h2 className="text-center mb-3 text-lg font-semibold text-white">
        🧠 Ask me a math question
      </h2>

      {/* Chat Box */}
      <div className="flex-1 overflow-y-auto p-4 rounded-xl shadow mb-3 bg-black/70 text-white">
        
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-xs whitespace-pre-line ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && <p>🤖 Thinking...</p>}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded border bg-gray-800 text-white"
          placeholder="Type a math question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Send 🚀
        </button>
      </div>
    </div>
  );
}