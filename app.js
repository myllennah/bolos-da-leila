//impotando a porra toda nesse caralho

const express = require('express');
const app = express();
app.use(express.static('public'));
const conexao = require('./conexaobanco');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');


//acessando a rota
app.get('/', (req, res) => {

    //passando parâmetro head
    res.render('index');
});

//nova rota
app.get('/historia', (req, res) => {
    res.render('historia');
});

app.use('/sobre', (req, res) => {
    res.redirect('/historia');
});

//redirecionamento de página
app.get('/doces', (req, res) => {
    res.render('doces');
});


app.get('/cardapio', (req, res) => {
    res.render('cardapio');
});

app.get('/contato', (req, res) => {
    res.render('contato');
});
//GET E ROTA
app.get('/login', (req, res) => {
    res.render('Login');
});

//POST

app.post('/login', function (req, res) {
    var nome_cliente = req.body.nome;
    var email = req.body.email;
    var telefone = req.body.telefone;
    var senha = req.body.senha;

    conexao.connect(function (error) {
        if (error) throw error;


        var sql = "INSERT INTO cadastro (nome_cliente, email,telefone, senha) VALUES (?,?, ?, ?)";
        conexao.query(sql, [nome_cliente, email, telefone, senha], function (error, result) {
            if (error) throw error;
            res.send("Cliente cadastrado com sucesso! " + result.email);
        });

    });

});







app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(3007);
