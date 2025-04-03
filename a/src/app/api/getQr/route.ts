import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
    try {
        // 🔹 Ruta absoluta al QR en el proyecto de Baileys
        const qrPath = path.join(process.cwd(), "../baileys/bot.qr.png");

        // 🔹 Leer el archivo QR
        const qrImage = await fs.readFile(qrPath);

        // 🔹 Devolver la imagen como respuesta
        return new NextResponse(qrImage, {
            status: 200,
            headers: {
                "Content-Type": "image/png",
            },
        });
    } catch (error) {
        console.error("Error al cargar el QR:", error);
        return new NextResponse("QR no encontrado", { status: 404 });
    }
}

