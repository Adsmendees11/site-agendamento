
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// Se não tiver JWT_SECRET definido, usa um padrão
process.env.JWT_SECRET = process.env.JWT_SECRET || "umasecretaqualquer";

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta public (HTML, CSS, JS, imagens)
app.use(express.static(path.join(__dirname, "../public")));

// Rotas da API
const authRoutes = require("./routes/auth");
const estabelecimentoRoutes = require("./routes/estabelecimentos");
const agendamentoRoutes = require("./routes/agendamentos");

app.use("/auth", authRoutes);
app.use("/estabelecimentos", estabelecimentoRoutes);
app.use("/agendamentos", agendamentoRoutes);

// Rota raiz -> abre index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});