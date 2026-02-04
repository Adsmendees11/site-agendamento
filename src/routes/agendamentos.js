const express = require("express");
const router = express.Router();
const autenticarToken = require("../middlewares/authMiddleware");
const agendamentoController = require("../controllers/agendamentoController");

router.post("/", autenticarToken, agendamentoController.criarAgendamento);
router.get("/me", autenticarToken, agendamentoController.meusAgendamentos);

module.exports = router;