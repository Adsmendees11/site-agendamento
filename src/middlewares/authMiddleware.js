const jwt = require("jsonwebtoken");

function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET não configurado!");
    return res.status(500).json({ erro: "Configuração inválida do servidor" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ erro: "Token inválido ou expirado" });
    }
    req.usuario = decoded;
    next();
  });
}

module.exports = autenticarToken;