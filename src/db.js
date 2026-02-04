const mysql = require("mysql2/promise");

// Configuração da conexão com o MySQL usando variáveis de ambiente
const pool = mysql.createPool({
  host: process.env.DB_HOST,       // endereço do servidor MySQL (Railway)
  user: process.env.DB_USER,       // usuário do banco
  password: process.env.DB_PASSWORD, // senha do banco (ajuste aqui: antes estava DB_PASS)
  database: process.env.DB_NAME,   // nome do banco
  port: process.env.DB_PORT || 3306 // porta padrão do MySQL
});

module.exports = pool;