"use client";

import { useEffect, useState } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);

    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 🔥 Gradient Overlay */}
      <div
        className={`absolute inset-0 ${
          theme === "dark"
            ? "bg-gradient-to-b from-black/80 via-black/60 to-black/80"
            : "bg-gradient-to-b from-white/80 via-white/60 to-white/80"
        }`}
      ></div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Header */}
        <div
          className={`flex justify-between items-center p-3 shadow ${
            theme === "dark"
              ? "bg-black/80 text-white"
              : "bg-white/80 text-black"
          }`}
        >
          <h1 className="font-bold">🤖 MathBuddy</h1>

          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded bg-blue-500 text-white"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex items-center justify-center px-4">
          {children}
        </div>
      </div>
    </div>
  );
}