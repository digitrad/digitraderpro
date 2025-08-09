import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { username, password } = req.body;

  const filePath = path.resolve("./users.json");
  let users = [];

  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    users = JSON.parse(fileData);
  } catch {
    users = [];
  }

  const user = users.find((u) => u.username === username);
  if (!user) {
    res.status(401).json({ success: false, message: "Invalid username or password" });
    return;
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    res.status(401).json({ success: false, message: "Invalid username or password" });
    return;
  }

  res.status(200).json({ success: true, message: "Login successful" });
}
