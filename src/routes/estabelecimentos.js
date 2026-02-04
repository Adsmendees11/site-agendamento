const express = require("express");
const router = express.Router();
const autenticarToken = require("../middlewares/authMiddleware");
const estabelecimentoController = require("../controllers/estabelecimentoController");

// Criar novo estabelecimento (usuário logado)
router.post("/", autenticarToken, estabelecimentoController.cadastrar);

// Listar todos os estabelecimentos (com filtro opcional por serviço)
router.get("/", estabelecimentoController.listar);

// Mostrar estabelecimento do usuário logado
router.get("/me", autenticarToken, estabelecimentoController.meuEstabelecimento);

// Atualizar estabelecimento do usuário logado
router.put("/", autenticarToken, estabelecimentoController.atualizar);

module.exports = router;