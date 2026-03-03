const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Простая база в памяти
let users = [];

// Проверка сервера
app.get("/", (req, res) => {
  res.send("Admin Begins Backend Работает");
});

// Регистрация
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: "Пользователь уже существует" });
  }

  users.push({ email, password });

  res.json({ message: "Регистрация успешна" });
});

// Логин
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(400).json({ message: "Неверный email или пароль" });
  }

  res.json({ message: "Вход выполнен успешно" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Сервер запущен на порту " + PORT);
});const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Admin Begins Backend Работает");;
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

