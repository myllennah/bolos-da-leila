CREATE database bolosdaleila

CREATE TABLE `cadastro` (
  `nome_cliente` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefone` varchar(15) NOT NULL,
  `senha` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE produto (
    id_produto INT(4) primary key AUTO_INCREMENT,
    nome_produto VARCHAR(20) NOT NULL UNIQUE,
    descricao VARCHAR(1000) NOT NULL,
    categoria VARCHAR(12) NOT NULL,
    preco FLOAT(5,2) NOT NULL
);

CREATE TABLE pedido (
    id_pedido INT(12) primary key AUTO_INCREMENT,
    itens_pedido VARCHAR(1000) NOT NULL,
    data_pedido DATE NOT NULL,
    valor_total FLOAT(5,2) NOT NULL,
    pagamento VARCHAR(12) NOT NULL,
    status_pedido VARCHAR(12) NOT NULL
);

INSERT INTO `cadastro` ( `nome_cliente`, `email`, `telefone`, `senha`) VALUES
( 'Julia Melo Alves', 'julinhamelo@dayrep.com', '11960452493', 'LaeCh7sap'),
( 'Vitor Cavalcanti Martins', 'vitormartins77@jourrapide.com', '11998651084', 'ooSho1ah'),
( 'Kaua Ribeiro dos Santos', 'kaua.rsantos@resource.com.br', '11949392382','Star1945');