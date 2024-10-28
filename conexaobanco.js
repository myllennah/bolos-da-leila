//importando banco de dados 

var mysql = require("mysql");

const conexaoBanco = mysql.createConnection({
    host: 'localhost',
    user: 'yuri',
    password: '', // Se você tiver uma senha, coloque-a aqui
    database: 'cardapio_leilabolos'
});

module.exports = conexaoBanco;