import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let users = [];

app.get("/", (req, res) => {
  res.send("Admin Begins Backend Работает");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Заполните все поля" });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Пользователь уже существует" });
  }

  users.push({ name, email, password });

  res.json({ message: "Регистрация успешна" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Неверные данные" });
  }

  res.json({ message: "Вход успешен", token: "123456789" });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
