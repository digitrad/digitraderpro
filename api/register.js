import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ success: false, message: "Missing username or password" });
    return;
  }

  const filePath = path.resolve("./users.json");
  let users = [];

  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    users = JSON.parse(fileData);
  } catch {
    // file does not exist or is empty - start with empty array
    users = [];
  }

  // Check if username already exists
  if (users.find((u) => u.username === username)) {
    res.status(409).json({ success: false, message: "Username already taken" });
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Add new user
  users.push({ username, password: hashedPassword });

  // Save users back to file
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  res.status(201).json({ success: true, message: "User registered successfully" });
}
