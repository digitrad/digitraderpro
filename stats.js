import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.resolve("./transactions.json");
  let stats = {};

  try {
    const data = fs.readFileSync(filePath, "utf8");
    stats = JSON.parse(data);
  } catch (err) {
    return res.status(500).json({ error: "Failed to load stats" });
  }

  res.status(200).json(stats);
}
