//importando banco de dados 
var mysql = require("mysql");

var conexaoBanco = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bololeila"
});

module.exports = conexaoBanco;