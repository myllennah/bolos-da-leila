-- Cria o banco de dados (se ele não existir)
CREATE DATABASE cardapio_leilabolos;


-- Cria a tabela "produtos"
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    imagem VARCHAR(255),
    categoria VARCHAR(50) 
);

CREATE TABLE `cadastro` (
  `nome_cliente` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefone` varchar(15) NOT NULL,
  `senha` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE pedido (
    id_pedido INT(12) primary key AUTO_INCREMENT,
    itens_pedido VARCHAR(1000) NOT NULL,
    data_pedido DATE NOT NULL,
    valor_total FLOAT(5,2) NOT NULL,
    pagamento VARCHAR(12) NOT NULL,
    status_pedido VARCHAR(12) NOT NULL
);

-- Insere alguns exemplos de produtos
INSERT INTO produtos (nome, descricao, preco, imagem, categoria) VALUES
    ('Bolo Margherita', 'Bolo de baunilha com cobertura de cream cheese e morangos frescos, decorado com manjericão fresco. Uma explosão de frescor em cada fatia!', 35.00, 'imagens/bolo-margherita.jpg', 'bolos'),
    ('Bolo Floresta Negra', 'Bolo de chocolate com camadas de cerejas frescas, chantilly e raspas de chocolate. Um clássico irresistível com um toque de magia.', 38.00, 'imagens/bolo-floresta-negra.jpg', 'bolos'),
    ('Bolo de Queijo c/ Chocolate', 'Bolo de queijo cremoso com gotas de chocolate meio amargo. Simplesmente irresistível!', 34.00, 'imagens/bolo-queijo-chocolate.jpg', 'bolos'),
    ('Brigadeiro', 'O clássico brigadeiro, feito com chocolate em pó, leite condensado e manteiga. Irresistível!', 2.00, 'imagens/brigadeiro.jpg', 'doces'),
    ('Coxinha', 'Coxinha de frango com massa crocante e recheio saboroso. Um clássico brasileiro irresistível!', 5.00, 'imagens/coxinha.jpg', 'salgados');

-- Inserir clientes

INSERT INTO `cadastro` ( `nome_cliente`, `email`, `telefone`, `senha`) VALUES
( 'Julia Melo Alves', 'julinhamelo@dayrep.com', '11960452493', 'LaeCh7sap'),
( 'Vitor Cavalcanti Martins', 'vitormartins77@jourrapide.com', '11998651084', 'ooSho1ah'),
( 'Kaua Ribeiro dos Santos', 'kaua.rsantos@resource.com.br', '11949392382','Star1945');