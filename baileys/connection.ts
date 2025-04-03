import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";

let sock: any = null;

export async function getWASocket() {
    if (sock) return sock; // ✅ Usa la misma instancia si ya está conectada

    const { state, saveCreds } = await useMultiFileAuthState("./baileys_auth"); 
    sock = makeWASocket({ auth: state });

    sock.ev.on("creds.update", saveCreds); // 📌 Guarda credenciales

    return sock;
}
