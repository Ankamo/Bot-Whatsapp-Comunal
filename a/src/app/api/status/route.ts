import { NextResponse } from "next/server";

// Simula el estado de conexión del bot
let isConnected = false;

// 🔹 API para verificar estado de conexión
export async function GET() {
    return NextResponse.json({ connected: isConnected });
}

// 🔹 Simulación de conexión (Cambia esto según tu lógica real)
setTimeout(() => {
    console.log("✅ Bot conectado!");
    isConnected = true;
}, 10000); // Se conecta después de 10s (simulado)
