import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { getTranslate } from "./utils";
import { LanDB } from "./utils"; // Ensure correct path
import cookieParser from "cookie-parser";

const app: Express = express();
const port = 8081;

// Middleware configuration
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Define the path to 'app' in the new directory structure
const appPath = path.join(__dirname, "app");

// Serve static files from the 'app' directory, including nested static folders
app.use(express.static(appPath));

// Root route serves the main `index.html`
app.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.join(appPath, "index.html"));
});

// Serve individual root files directly, if necessary
app.get("/manifest.json", (_req, res) => {
  res.sendFile(path.join(appPath, "manifest.json"));
});

app.get("/favicon.ico", (_req, res) => {
  res.sendFile(path.join(appPath, "favicon.ico"));
});

app.get("/robots.txt", (_req, res) => {
  res.sendFile(path.join(appPath, "robots.txt"));
});

// Wildcard route for SPA to handle client-side routing
app.get("*", (_req, res) => {
  res.sendFile(path.join(appPath, "index.html"));
});

// Translation endpoint
app.post("/app/translate", (req: Request, res: Response) => {
  const { words, targetLan } = req.body;
  if (!targetLan || !LanDB[targetLan.toUpperCase()]) {
    res.status(400).json({ error: "Invalid language" });
    return;
  }

  getTranslate(words, targetLan)
    .then((translation) => {
      res.status(200).json(translation);
    })
    .catch((error) => {
      console.error("Translation error:", error);
      res.status(500).json({ error: "Failed to translate" });
    });
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Handle server shutdown
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server has stopped listening");
    process.exit(0);
  });
});
