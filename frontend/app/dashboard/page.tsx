"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name") || "";
    setName(storedName);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Welcome {name} 👋
      </h1>

      <div className="mt-6 space-y-3">
        <button
          onClick={() => router.push("/chat")}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          💬 Chat Mode
        </button>
      </div>
    </div>
  );
}