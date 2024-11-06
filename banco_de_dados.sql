-- Cria o banco de dados (se ele não existir)
CREATE DATABASE dbLeila;

-- Cria a tabela "produtos"
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco_base DECIMAL(10, 2) NOT NULL,
    imagem VARCHAR(255),
    categoria VARCHAR(50),
    tipo VARCHAR(50)  -- Adiciona a coluna "tipo" 
);

CREATE TABLE `cadastro` (
  `nome_cliente` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefone` varchar(15) NOT NULL,
  `senha` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `coberturas` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `nome` varchar(50) NOT NULL,
  `preco` decimal(10,2) NOT NULL
);

CREATE TABLE `recheios` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `nome` varchar(50) NOT NULL,
  `preco` decimal(10,2) NOT NULL
);

CREATE TABLE `tamanhos` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `nome` varchar(50) NOT NULL,
  `preco` decimal(10,2) NOT NULL
);

CREATE TABLE pedido (
    id_pedido INT(12) primary key AUTO_INCREMENT,
    itens_pedido VARCHAR(1000) NOT NULL,
    data_pedido DATE NOT NULL,
    valor_total FLOAT(5,2) NOT NULL,
    pagamento VARCHAR(12) NOT NULL,
    status_pedido VARCHAR(12) NOT NULL,
    id_bolo INT,
    cobertura INT,
    recheio INT,
    tamanho INT,
    FOREIGN KEY (id_bolo) REFERENCES produtos(id),
    FOREIGN KEY (cobertura) REFERENCES coberturas(id),
    FOREIGN KEY (recheio) REFERENCES recheios(id),
    FOREIGN KEY (tamanho) REFERENCES tamanhos(id)
);


-- Insere alguns exemplos de produtos
INSERT INTO produtos (nome, descricao, preco_base, imagem, categoria, tipo) VALUES
    ('Bolo Margherita', 'Bolo de baunilha com cobertura de cream cheese e morangos frescos, decorado com manjericão fresco. Uma explosão de frescor em cada fatia!', 35.00, 'imagens/bolo-margherita.jpg', 'bolos', 'bolo'),
    ('Bolo Floresta Negra', 'Bolo de chocolate com camadas de cerejas frescas, chantilly e raspas de chocolate. Um clássico irresistível com um toque de magia.', 38.00, 'imagens/bolo-floresta-negra.jpg', 'bolos', 'bolo'),
    ('Bolo de Queijo c/ Chocolate', 'Bolo de queijo cremoso com gotas de chocolate meio amargo. Simplesmente irresistível!', 34.00, 'imagens/bolo-queijo-chocolate.jpg', 'bolos', 'bolo'),
    ('Brigadeiro', 'O clássico brigadeiro, feito com chocolate em pó, leite condensado e manteiga. Irresistível!', 2.00, 'imagens/brigadeiro.jpg', 'doces', 'doce'),
    ('Coxinha', 'Coxinha de frango com massa crocante e recheio saboroso. Um clássico brasileiro irresistível!', 5.00, 'imagens/coxinha.jpg', 'salgados', 'salgado');

-- Inserir clientes

INSERT INTO `cadastro` ( `nome_cliente`, `email`, `telefone`, `senha`) VALUES
( 'Julia Melo Alves', 'julinhamelo@dayrep.com', '11960452493', 'LaeCh7sap'),
( 'Vitor Cavalcanti Martins', 'vitormartins77@jourrapide.com', '11998651084', 'ooSho1ah'),
( 'Kaua Ribeiro dos Santos', 'kaua.rsantos@resource.com.br', '11949392382','Star1945');

-- Inserir coberturas
INSERT INTO `coberturas` (`nome`, `preco`) VALUES
('Chocolate', 5.00),
('Morango', 6.00),
('Chantilly', 4.00);

-- Inserir recheios
INSERT INTO `recheios` (`nome`, `preco`) VALUES
('Brigadeiro', 7.00),
('Doce de Leite', 8.00),
('Frutas Vermelhas', 9.00);

-- Inserir tamanhos
INSERT INTO `tamanhos` (`nome`, `preco`) VALUES
('Pequeno', 10.00),
('Médio', 15.00),
('Grande', 20.00);