"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [theme, setTheme] = useState("light");

  const router = useRouter();

  // 🔥 Detect theme
  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handleLogin = () => {
    if (!name || !studentClass) {
      alert("Enter details 😊");
      return;
    }

    localStorage.setItem("name", name);
    localStorage.setItem("class", studentClass);
    localStorage.setItem("userId", Date.now().toString());

    router.push("/dashboard");
  };

  return (
    <div
      className={`p-8 rounded-xl shadow w-80 text-center ${
        theme === "dark"
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >
      <h1 className="text-xl font-bold mb-4">🤖 MathBuddy</h1>

      <input
        className={`border p-2 mb-3 w-full rounded ${
          theme === "dark"
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black border-gray-300"
        }`}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className={`border p-2 mb-4 w-full rounded ${
          theme === "dark"
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black border-gray-300"
        }`}
        placeholder="Class"
        onChange={(e) => setStudentClass(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 w-full rounded"
      >
        Start 🚀
      </button>
    </div>
  );
}