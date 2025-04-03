"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Home, Settings, MessageSquare } from "lucide-react";
import Dashboard from "./Dashboard";
import Messages from "./Messages";
import SettingsPanel from "./Settings";

export default function Panel() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6">📌 Panel de Control</h2>
        <nav className="flex flex-col gap-3">
          <button 
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              activeTab === "dashboard" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <Home size={20} /> Inicio
          </button>
          <button 
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              activeTab === "messages" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("messages")}
          >
            <MessageSquare size={20} /> Mensajes
          </button>
          <button 
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              activeTab === "settings" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={20} /> Configuración
          </button>
        </nav>
        <button
          className="mt-auto flex items-center gap-3 p-3 bg-red-600 hover:bg-red-700 rounded-lg transition"
          onClick={handleLogout}
        >
          <LogOut size={20} /> Salir
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6">
        <header className="bg-gray-800 p-4 rounded-lg text-center">
          <h1 className="text-xl font-bold">Bienvenido al Panel</h1>
          <p className="text-green-400">✅ Conectado</p>
        </header>

        <section className="mt-6">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "messages" && <Messages />}
          {activeTab === "settings" && <SettingsPanel />}
        </section>
      </main>
    </div>
  );
}
