-- Cria o banco de dados (se ele não existir)
CREATE DATABASE cardapio_leilabolos;



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


INSERT INTO `produtos` (`id`, `nome`, `descricao`, `preco`, `imagem`, `categoria`) VALUES
(1, 'Bolo com tema de futebol', 'Tenha um bolo com o seu time do coração!', 50.00, '../img/time1.jpeg', 'bolos'),
(2, 'Bolo com decoração simples', 'Elegância e sabor se encontram em nossos bolos clássicos com frutas e flores. Decorados com flores delicadas e frutas frescas, esses bolos são perfeitos para qualquer ocasião especial. Escolha o tamanho, o sabor da massa e o recheio, e encante seus convidados com a beleza e o frescor dessa combinação clássica!', 50.00, '../img/chocolate.jpeg', 'bolos'),
(3, 'Bolo Infantil', 'Transforme a festa em um mundo de fantasia! Com decorações encantadoras, cores pastéis e detalhes mágicos, esses bolos são feitos para encantar e surpreender. Personalize o tamanho, o sabor da massa e o recheio, e adicione um toque de magia ao seu evento!', 50.00, '../img/crianca1.jpeg', 'bolos'),
<<<<<<< HEAD
(4, 'Brigadeiro', 'O clássico brigadeiro, feito com chocolate em pó, leite condensado e manteiga. Irresistível!', 2.00, 'imagens/brigadeiro.jpg', 'doces'),
(5, 'Coxinha', 'Coxinha de frango com massa crocante e recheio saboroso. Um clássico brasileiro irresistível!', 5.00, 'imagens/coxinha.jpg', 'salgados');
=======
(4, 'Brigadeiro', 'O clássico brigadeiro, feito com chocolate em pó, leite condensado e manteiga. Irresistível!', 2.00, '../img/brigtrad.jpg', 'doces'),
(5, 'Coxinha', 'Coxinha de frango com massa crocante e recheio saboroso. Um clássico brasileiro irresistível!', 5.00, '../img/coxinha.png', 'salgados');
>>>>>>> 253653575045d60376afbb09018080ad0faef33e


INSERT INTO `cadastro` ( `nome_cliente`, `email`, `telefone`, `senha`) VALUES
( 'Julia Melo Alves', 'julinhamelo@dayrep.com', '11960452493', 'LaeCh7sap'),
( 'Vitor Cavalcanti Martins', 'vitormartins77@jourrapide.com', '11998651084', 'ooSho1ah'),
( 'Kaua Ribeiro dos Santos', 'kaua.rsantos@resource.com.br', '11949392382','Star1945');