//importando banco de dados 

var mysql = require("mysql");

const conexaoBanco = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Se você tiver uma senha, coloque-a aqui
    database: 'bolosdaleila'
});

module.exports = conexaoBanco;