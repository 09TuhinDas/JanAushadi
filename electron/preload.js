const { contextBridge, ipcRenderer } = require("electron");

console.log("✅ Preload.js is executing!");  // Debugging log

contextBridge.exposeInMainWorld("electron", {
    getBackendUrl: async () => {
        console.log("✅ `getBackendUrl` called!");  // Debugging log
        try {
            const port = await ipcRenderer.invoke("get-backend-port");
            console.log("✅ Backend Port Fetched:", port);
            return `http://localhost:${port}`;
        } catch (error) {
            console.error("❌ Failed to get backend port:", error);
            return "http://localhost:3000"; // Default fallback
        }
    },
    send: (channel, data) => ipcRenderer.send(channel, data),
    receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
});
