const pool = require("../db");

// CADASTRAR ESTABELECIMENTO
exports.cadastrar = async (req, res) => {
  const { nome, endereco, whatsapp, servicos } = req.body;

  try {
    // Validação básica dos campos obrigatórios
    if (!nome || !endereco || !whatsapp) {
      return res.status(400).json({ erro: "Nome, endereço e WhatsApp são obrigatórios." });
    }

    // Verifica se o usuário já tem um estabelecimento
    const [existe] = await pool.query(
      "SELECT id FROM estabelecimentos WHERE usuario_id = ?",
      [req.usuario.id]
    );

    if (existe.length > 0) {
      return res.status(400).json({ erro: "Você já cadastrou um estabelecimento." });
    }

    // Se não tiver, cadastra
    await pool.query(
      "INSERT INTO estabelecimentos (usuario_id, nome, endereco, whatsapp, servicos) VALUES (?, ?, ?, ?, ?)",
      [req.usuario.id, nome, endereco, whatsapp, servicos]
    );

    res.json({ mensagem: "Estabelecimento cadastrado com sucesso!" });
  } catch (err) {
    console.error("Erro ao cadastrar estabelecimento:", err);
    res.status(500).json({ erro: "Erro no servidor ao cadastrar estabelecimento." });
  }
};

// LISTAR ESTABELECIMENTOS (sem duplicar)
exports.listar = async (req, res) => {
  const { servico } = req.query;
  try {
    let query = `
      SELECT DISTINCT id, nome, endereco, whatsapp, servicos
      FROM estabelecimentos
    `;
    let params = [];

    if (servico) {
      query += " WHERE servicos LIKE ?";
      params.push("%" + servico + "%");
    }

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error("Erro ao listar estabelecimentos:", err);
    res.status(500).json({ erro: "Erro no servidor ao listar estabelecimentos." });
  }
};

// MOSTRAR ESTABELECIMENTO DO USUÁRIO LOGADO
exports.meuEstabelecimento = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM estabelecimentos WHERE usuario_id = ? LIMIT 1",
      [req.usuario.id]
    );

    if (rows.length === 0) {
      return res.json({});
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Erro ao buscar estabelecimento do usuário:", err);
    res.status(500).json({ erro: "Erro no servidor ao buscar estabelecimento." });
  }
};

// ATUALIZAR ESTABELECIMENTO DO USUÁRIO LOGADO
exports.atualizar = async (req, res) => {
  const { nome, endereco, whatsapp, servicos } = req.body;

  try {
    // Validação básica dos campos obrigatórios
    if (!nome || !endereco || !whatsapp) {
      return res.status(400).json({ erro: "Nome, endereço e WhatsApp são obrigatórios." });
    }

    const [result] = await pool.query(
      "UPDATE estabelecimentos SET nome = ?, endereco = ?, whatsapp = ?, servicos = ? WHERE usuario_id = ?",
      [nome, endereco, whatsapp, servicos, req.usuario.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Nenhum estabelecimento encontrado para atualizar." });
    }

    res.json({ mensagem: "Estabelecimento atualizado com sucesso!" });
  } catch (err) {
    console.error("Erro ao atualizar estabelecimento:", err);
    res.status(500).json({ erro: "Erro no servidor ao atualizar estabelecimento." });
  }
};