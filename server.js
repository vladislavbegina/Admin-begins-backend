const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Admin Begins Backend Работает 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

