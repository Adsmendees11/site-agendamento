/* OPÇÃO PARA DEIXAR APP ONLINE

const mysql = require("mysql2/promise");

// Configuração da conexão com o MySQL usando variáveis de ambiente
const pool = mysql.createPool({
  host: process.env.DB_HOST,       // endereço do servidor MySQL (Railway/PlanetScale)
  user: process.env.DB_USER,       // usuário do banco
  password: process.env.DB_PASS,   // senha do banco
  database: process.env.DB_NAME,   // nome do banco
  port: process.env.DB_PORT || 3306 // porta padrão do MySQL
});

module.exports = pool; */

const mysql = require("mysql2/promise");

// Conexão direta com o banco de dados local
const pool = mysql.createPool({
  host: "localhost",      // endereço do servidor MySQL
  user: "root",           // usuário do MySQL
  password: "GarethBalee@711",  // senha do MySQL
  database: "site_agendamento", // nome do banco
  port: 3306              // porta padrão do MySQL
});

module.exports = pool;

