const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const log = require("electron-log");
const net = require("net");

// ✅ Logging setup
log.transports.file.level = "info";

let win;
let backendServer; // ✅ Store the backend server instance
let connectDB, backendApp;
const PORT_FILE = path.join(app.getPath("userData"), "backend-port.txt");

// ✅ Check if in development mode
const isDev = !app.isPackaged;

// ✅ Find an Available Port
function findAvailablePort(startPort) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(startPort, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
    server.on("error", () => resolve(findAvailablePort(startPort + 1)));
  });
}

// ✅ Load Backend (`server/index.js`)
async function loadBackend() {
  const backendPath = isDev
    ? path.resolve(__dirname, "..", "server", "index.js")
    : path.join(process.resourcesPath, "server", "index.js");

  console.log("🔍 Looking for backend at:", backendPath);

  if (fs.existsSync(backendPath)) {
    try {
      const backend = require(backendPath);
      backendApp = backend.app; // ✅ Store Express app
      connectDB = backend.connectDB; // ✅ Store DB connection function
      console.log("✅ Backend loaded from:", backendPath);
    } catch (err) {
      console.error("❌ Failed to load backend:", err);
    }
  } else {
    console.error("❌ Backend file missing:", backendPath);
  }
}

// ✅ Start Backend
async function startBackend() {
  try {
    const port = await findAvailablePort(3000);
    if (!connectDB || !backendApp) {
      console.error("❌ Backend app or DB connection is not initialized.");
      return;
    }
    await connectDB();
    backendServer = backendApp.listen(port, () => { // ✅ Store server instance
      console.log(`✅ Backend running at http://localhost:${port}`);
      fs.writeFileSync(PORT_FILE, port.toString().trim(), { encoding: "utf8" });
    });
  } catch (err) {
    console.error("❌ Backend startup error:", err);
  }
}

// ✅ IPC Handlers
ipcMain.handle("get-backend-url", () => {
  if (fs.existsSync(PORT_FILE)) {
    const port = fs.readFileSync(PORT_FILE, "utf8").trim();
    return `http://localhost:${port}`;
  } else {
    console.warn("⚠️ Warning: backend-port.txt not found. Using default port 3000.");
    return "http://localhost:3000";
  }
});

ipcMain.handle("get-backend-port", async () => {
  if (fs.existsSync(PORT_FILE)) {
    return fs.readFileSync(PORT_FILE, "utf8").trim();
  } else {
    console.warn("⚠️ Warning: backend-port.txt not found. Using default port 3000.");
    return "3000";
  }
});

// ✅ Create Electron Window
async function createWindow() {
  const preloadPath = isDev
    ? path.join(__dirname, "preload.js")
    : path.join(process.resourcesPath, "preload.js");

  console.log("🔍 Preload script path:", preloadPath);

  if (!fs.existsSync(preloadPath)) {
    console.error("❌ Preload script missing:", preloadPath);
  }

  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: preloadPath,
      sandbox: false,
      experimentalFeatures: false,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
  } else {
    const indexPath = path.join(__dirname, "..", "dist", "index.html");
    console.log("🔍 Loading index file from:", indexPath);
    if (!fs.existsSync(indexPath)) {
      console.error("❌ index.html file missing:", indexPath);
      return;
    }
    win.loadFile(indexPath).catch((err) => console.error("❌ Failed to load index.html:", err));
  }

  win.on("closed", () => {
    win = null;
  });
}

// ✅ Start Electron App
app.whenReady().then(async () => {
  await loadBackend();
  await startBackend();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (!win) createWindow();
});

// ✅ Graceful Shutdown - Fixes backendApp.close issue
app.on("before-quit", () => {
  if (backendServer) { // ✅ Ensure backend server instance exists
    backendServer.close(() => { 
      console.log("✅ Backend server closed.");
    });
  }
});
