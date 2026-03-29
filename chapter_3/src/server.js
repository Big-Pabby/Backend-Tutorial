import express from "express";
import path, {dirname} from "path";
import {fileURLToPath} from "url";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Get the file path from the url of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Middleware to parse JSON bodies
app.use(express.json());
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Routes
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});