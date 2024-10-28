//importando banco de dados 

var mysql = require("mysql");

const conexaoBanco = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '000000', // Se você tiver uma senha, coloque-a aqui
    database: 'cardapio_leilabolos'
});

module.exports = conexaoBanco;