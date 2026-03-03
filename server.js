import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();

app.use(cors());
app.use(express.json());

const SECRET = "supersecretkey";

let users = [];

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(400).json({ message: "Пользователь уже существует" });
  }

  const hashed = await bcrypt.hash(password, 10);

  users.push({
    name,
    email,
    password: hashed,
    role: "user"
  });

  res.json({ message: "Регистрация успешна" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Неверные данные" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: "Неверные данные" });
  }

  const token = jwt.sign(
    { email: user.email, role: user.role },
    SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

app.get("/profile", (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "Нет токена" });

  try {
    const decoded = jwt.verify(token, SECRET);
    res.json(decoded);
  } catch {
    res.status(401).json({ message: "Неверный токен" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server started"));
