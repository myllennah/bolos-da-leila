var conexao = require("./app");

//POST

app.post('/login', function (req, res) {
    var nomecompleto = req.body.nome;
    var email = req.body.email;
    var telefone = req.body.telefone;
    var senha = req.body.senha;

    conexao.connect(function (error) {
        if (error) throw error;


        var sql = "INSERT INTO estudante (nome_cliente, email,telefone, senha) VALUES (?,?, ?, ?)";
        conexao.query(sql, [nome_cliente, email, telefone, senha], function (error, result) {
            if (error) throw error;
            res.send("Cliente cadastrado com sucesso!" + result.nome_cliente);
        });

    });

});