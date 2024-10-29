import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path"
import { getTranslate } from "./utils";
import { LanDB } from "./utils"; // Ensure correct path
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(cors({origin: 'http://localhost:5173'}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/app" ,express.static(path.join(__dirname, '../app')));
app.use("/form" ,express.static(path.join(__dirname, '../userForm/dist')));

app.get('/', (req, res) => {
  const language = req.cookies.language; 
  let targetPath = language ? '/app/' : '/form/';
  res.redirect(targetPath);
});

app.post("/form/submit", (req, res) => {
  const { targetLan } = req.body;
    res.cookie('targetLan', targetLan, {maxAge: 24 * 60 * 60 * 1000})
    res.redirect("localhost/app")
})

app.post("/app/translate", (req: Request, res: Response) => {
  const { words, targetLan } = req.body;

  if (!targetLan || !LanDB[targetLan.toUpperCase()]) {
    res.status(400).json({ error: "Invalid language" });
    return;
  }

  getTranslate(words, targetLan)
    .then((translation) => res.json(translation))
    .catch((error) => {
      console.error("Translation error:", error);
      res.status(500).json({ error: "Failed to translate" });
    });
});

const server = app.listen(8081, () => {
  console.log(`Server started on port ${8081}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server has stopped listening");
    process.exit(0); // Exit the process
  });
});
