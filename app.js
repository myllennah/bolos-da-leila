const express = require('express');
const app = express();
const mysql = require('mysql2');
const session = require('express-session');
const bodyParser = require('body-parser');

// Configuração do banco de dados MySQL
const conexao = require('./conexaobanco'); 

// Configuração do Express
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do middleware de sessões
app.use(session({
  secret: 'sua_chave_secreta', 
  resave: false,
  saveUninitialized: true
}));

// Rota para a página inicial (index)
app.get('/', (req, res) => {
  res.render('index');
});

// Rota para a página "História"
app.get('/historia', (req, res) => {
  res.render('historia');
});

// Redirecionamento de '/sobre' para '/historia'
app.use('/sobre', (req, res) => {
  res.redirect('/historia');
});

// Rota para a página "Doces" (se necessário)
app.get('/doces', (req, res) => {
  res.render('doces'); 
});

// Rota para a página do cardápio
app.get('/cardapio', (req, res) => {
  conexao.query('SELECT * FROM produtos', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao buscar produtos');
      return;
    }

    results.forEach(produto => {
      produto.preco = parseFloat(produto.preco);
    });

    res.render('cardapio', { produtos: results });
  });
});

// Rota para a página de contato
app.get('/contato', (req, res) => {
  res.render('contato');
});

// Rota para a página de login (GET)
app.get('/login', (req, res) => {
  res.render('Login');
});

// Rota para processar o cadastro de cliente (POST)
app.post('/login', function (req, res) {
  var nome_cliente = req.body.nome;
  var email = req.body.email;
  var telefone = req.body.telefone;
  var senha = req.body.senha;

  conexao.connect(function (error) {
    if (error) throw error;

    var sql = "INSERT INTO cadastro (nome_cliente, email,telefone, senha) VALUES (?, ?, ?, ?)";
    conexao.query(sql, [nome_cliente, email, telefone, senha], function (error, result) {
      if (error) throw error;
      res.send("Cliente cadastrado com sucesso! " + result.email); 
    });
  });
});

// Rota para adicionar ao carrinho
app.post('/add-to-cart', (req, res) => {
  const productId = req.body.produtoId;

  if (!req.session.cart) {
    req.session.cart = [];
  }

  let existingProduct = req.session.cart.find(item => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity++;
    res.send({ message: 'Produto adicionado ao carrinho com sucesso!' }); 
  } else {
    conexao.query('SELECT * FROM produtos WHERE id = ?', [productId], (err, product) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erro ao adicionar ao carrinho');
        return;
      }

      if (product.length > 0) {
        req.session.cart.push({ 
          id: productId, 
          name: product[0].nome, 
          price: parseFloat(product[0].preco), 
          quantity: 1,
          image: product[0].imagem 
        });
        res.send({ message: 'Produto adicionado ao carrinho com sucesso!' }); 
      } else {
        res.status(404).send('Produto não encontrado');
      }
    });
  }
});

// Rota para remover do carrinho
app.post('/remove-from-cart', (req, res) => {
  const productId = req.body.produtoId;

  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(item => item.id !== productId);
  }

  res.send({ message: 'Produto removido do carrinho com sucesso!' }); 
});

// Rota para atualizar o carrinho
app.post('/atualizar-carrinho', (req, res) => {
  req.session.cart = req.body.cart;
  res.json({ message: 'Carrinho atualizado com sucesso!' }); 
});

// Rota para a página de checkout
app.get('/checkout', (req, res) => {
    // Renderiza a view 'checkout' com os itens do carrinho da session
    res.render('checkout', { cartItems: req.session.cart || [] }); 
  });
  

// Rota para página de erro 404
app.use((req, res) => {
  res.status(404).render('404');
});

// Inicia o servidor na porta 3007
app.listen(3007, () => {
  console.log('Servidor iniciado na porta 3007');
});