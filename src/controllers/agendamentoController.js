const pool = require("../db");

// CRIAR AGENDAMENTO (cliente agenda em um estabelecimento)
exports.criarAgendamento = async (req, res) => {
  const { data, hora, descricao, estabelecimento_id } = req.body;

  try {
    // Salva o agendamento com vínculo ao cliente (usuario_id) e ao estabelecimento
    await pool.query(
      "INSERT INTO agendamentos (usuario_id, estabelecimento_id, data, hora, descricao) VALUES (?, ?, ?, ?, ?)",
      [req.usuario.id, estabelecimento_id, data, hora, descricao]
    );

    res.json({ mensagem: "Agendamento criado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro no servidor" });
  }
};

// LISTAR AGENDAMENTOS DO PROFISSIONAL (ver quem marcou com ele)
exports.meusAgendamentos = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT a.*, u.nome AS cliente_nome 
       FROM agendamentos a
       JOIN usuarios u ON a.usuario_id = u.id
       WHERE a.estabelecimento_id IN (
         SELECT id FROM estabelecimentos WHERE usuario_id = ?
       )`,
      [req.usuario.id]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro no servidor" });
  }
};