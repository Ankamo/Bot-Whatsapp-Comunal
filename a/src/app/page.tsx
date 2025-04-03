"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [qrSrc, setQrSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchQr = async () => {
      try {
        const res = await fetch("/api/getQr");
        if (!res.ok) throw new Error("QR no encontrado");

        const blob = await res.blob();
        setQrSrc(URL.createObjectURL(blob));
      } catch (err) {
        setError("Error al cargar el QR");
        console.error(err);
      }
    };

    const checkConnection = async () => {
      try {
        const res = await fetch("/api/status");
        const data = await res.json();
        if (data.connected) {
          setIsConnected(true);
          setTimeout(() => router.push("/panel"), 1500); // ✅ Redirigir tras 1.5s
        }
      } catch (err) {
        console.error("Error verificando conexión", err);
      }
    };

    fetchQr();
    const interval = setInterval(checkConnection, 3000); // ✅ Verifica cada 3s

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6 transition-opacity duration-500">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold mb-4">
          {isConnected ? "✅ Conectado, redirigiendo..." : "📲 Escanea el QR"}
        </h1>

        {isConnected ? (
          <p className="text-green-400 text-lg">Accediendo al panel...</p>
        ) : error ? (
          <p className="text-red-400 text-lg">{error}</p>
        ) : qrSrc ? (
          <img
            src={qrSrc}
            alt="Código QR"
            className="mt-4 border-4 border-gray-600 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
          />
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-400">Cargando QR...</p>
          </div>
        )}
      </div>
    </div>
  );
}
