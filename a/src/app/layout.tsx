import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "WhatsApp Bot",
  description: "Interfaz para escanear QR y conectar el bot de WhatsApp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
