/* JavaScript - Objetos */
// Objetos são uma das estruturas de dados mais importantes em JavaScript. Eles são usados para armazenar coleções de dados e funcionalidades relacionadas em pares de chave-valor. Em JavaScript, quase tudo é um objeto, desde arrays até funções.

/* ---------- Características dos Objetos ---------- */
"Chave-Valor:";
// Um objeto é uma coleção de propriedades, onde cada propriedade tem uma chave (ou nome) e um valor associado.

"Dinâmico:";
// Objetos em JavaScript são dinâmicos, ou seja, você pode adicionar, modificar ou remover propriedades após a criação do objeto.

"Referência:";
// Objetos são armazenados por referência, o que significa que duas variáveis podem apontar para o mesmo objeto.

"Métodos:";
// Propriedades de objetos podem ser funções, chamadas de métodos.

/* ---------- Sintaxe Básica ---------- */
// Um objeto pode ser criado usando chaves {} e definindo propriedades dentro delas.

// Formas de Criar Objetos:

"Literal:";
const objeto = {
  chave1: "valor1",
  chave2: "valor2",
};

("Construtor new Object():");
const objeto1 = new Object();
objeto1.chave1 = valor1;
objeto1.chave2 = valor2;

("Função Construtora:");
function Objeto(chave1, chave2) {
  this.chave1 = chave1;
  this.chave2 = chave2;
}
const objeto2 = new Objeto(valor1, valor2);

/* ---------- Exemplos ---------- */

("1. Objeto Simples");
const pessoa = {
  nome: "Diego",
  idade: 38,
  cidade: "Belém",
};
console.log(pessoa.nome);
console.log(pessoa.idade);

("2. Objeto com Métodos");
const carro = {
  marca: "Ford",
  modelo: "Mustang",
  ano: 1969,
  ligar: function () {
    return "Carro ligado!";
  },
};
console.log(carro.ligar());

("3. Adicionando Propriedades Dinamicamente");
const livro = {
  titulo: "JavaScript: O guia definitivo.",
};
livro.autor = "David Flanagan";
console.log(livro.autor);

/* ---------- Acessando Propriedades ---------- */
// Propriedades de objetos podem ser acessadas de duas maneiras:

("Notação de Ponto:");
// eslint-disable-next-line no-unused-expressions
objeto.chave;

("Notação de Colchetes:");
objeto["chave"];

// Exemplo:
const pessoa1 = {
  nome: "Diego",
  idade: 38,
};
console.log(pessoa1.nome);
console.log(pessoa1["idade"]);

/* ---------- Métodos de Objetos ---------- */
// Métodos são funções associadas a objetos. Eles podem ser definidos diretamente no objeto ou adicionados posteriormente.

// Exemplo:
const calculadora = {
  somar: function (a, b) {
    return a + b;
  },
  subtrair(a, b) {
    return a - b;
  },
};
console.log(calculadora.somar(4, 5));
console.log(calculadora.subtrair(5, 4));

// Objeto dentro de objeto dentro de objeto
const user = {
  id: 99,
  email: "diegoserafim1@gmail.com",
  info: {
    name: "Jake",
    lastName: "Peralta",
    address: "Rua Dalvo Trombeta, 357 - Fundos",
    district: "xererê",
    city: "Santana do Livramento",
    state: "Rio Grande do Norte",
  },
};
console.log(user["id"]); // 99
console.log(user.email); // diegoserafim1@gmail.com
console.log(user.info.address.street); // Rua Dalvo Trombeta, 357 - Fundos
console.log(user["info"]["address"]["city"]); // Santana do Livramento

// Objeto dentro de um array
const residents = [
  {
    name: "Luíza",
    lastName: "Guimarães",
    floor: 10,
    apartment: 1005,
  },
  {
    name: "William",
    lastName: "Albuquerque",
    floor: 5,
    apartment: 502,
  },
  {
    name: "Murilo",
    lastName: "Ferraz",
    floor: 8,
    apartment: 804,
  },
  {
    name: "Zoey",
    lastName: "Brooks",
    floor: 1,
    apartment: 101,
  },
];
console.log(residents[0]); // { name: 'Luíza', lastName: 'Guimarães', floor: 10, apartment: 1005 }
const firstResident = residents[0];
console.log(firstResident); // { name: 'Luíza', lastName: 'Guimarães', floor: 10, apartment: 1005 }
console.log(firstResident.floor); // 10

// Acessando produtos dentro de um Array
const products = [
  {
    product: "Leite",
    price: 3.49,
    available: true,
    categories: ["Laticínios", "Bebidas"],
    stock: {
      quantity: 100,
      location: "Corredor 2, Prateleira C",
    },
    supplier: {
      name: "Laticínios Delícia",
      contact: {
        phone: "987654321",
        email: "contato@laticiniosdelicia.com",
      },
    },
    reviews: [
      { user: "Clientel", rating: 4 },
      { user: "Cliente2", rating: 5 },
      { user: "Cliente3", rating: 4 },
    ],
  },
  {
    product: "Café",
    price: 9.49,
    available: true,
    categories: ["Laticínios", "Bebidas"],
    stock: {
      quantity: 34,
      location: "Corredor 2, Prateleira D",
    },
    supplier: {
      name: "Café Delícia",
      contact: {
        phone: "987655321",
        email: "contato@cafedelicia.com",
      },
    },
    reviews: [
      { user: "Clientel", rating: 4 },
      { user: "Cliente2", rating: 5 },
      { user: "Cliente3", rating: 4 },
    ],
  },
];
// Verificando a quantidade de produtos em 'products'
const countProducts = (array) => {
  let count = 0;
  for (let i = 0; i < array.length; i += 1) {
    count += array[i].stock.quantity;
  }
  return count;
};
console.log(`Quantidades de produtos: ${countProducts(products)}`);

// Adicionando propriedades a 'products';
const addProperty = (array, name) => {
  for (let i = 0; i < array.length; i += 1) {
    array[i][name].push({ user: "Cliente4", rating: 5 });
  }
};
addProperty(products, "reviews");
console.log(products[0][1]);

/* ---------- Características dos Objetos ---------- */
// Métodos Úteis para Manipulação de Objetos

("1. Object.keys()");
// Retorna um array com as CHAVES de um objeto.
// Exemplo:
const pessoa2 = {
  nome: "Diego",
  idade: 38,
};
console.log(Object.keys(pessoa2));

("2. Object.values()");
// Retorna um array com os VALORES de um objeto.
// Exemplo:
const pessoa3 = {
  nome: "Diego",
  idade: 38,
};
console.log(Object.values(pessoa3));

("3. Object.entries()");
// Retorna um array de ARRAY, onde cada subarray é um par [chave, valor].
// Exemplo:
const pessoa4 = {
  nome: "Diego",
  idade: 38,
};
console.log(Object.entries(pessoa4));
console.log(Object.entries(pessoa4));

("4. Object.assign()");
// Copia as propriedades de um ou mais objetos para um objeto destino.
// Exemplo:
const destino = {};
const origem = { a: 1, b: 3 };

Object.assign(destino, origem);
console.log(destino);

("5. Object.freeze()");
// Impede que um objeto seja modificado.
// Exemplo:
const objeto3 = { a: 1 };
Object.freeze(objeto3);
objeto3.a = 2;
console.log(objeto3.a);

/* ---------- Protótipos e Herança ---------- */
// Em JavaScript, objetos podem herdar propriedades e métodos de outros objetos através de protótipos. Isso é a base da herança em JavaScript.

// Exemplo:
const animal = {
  fazerBarulho: function () {
    return "Barulho genérico";
  },
};

const cachorro = Object.create(animal);
cachorro.fazerBarulho = function () {
  return "Au au!";
};
console.log(cachorro.fazerBarulho());

/* ---------- Desestruturação de Objetos ---------- */
// A desestruturação permite extrair propriedades de objetos em variáveis separadas.

// Exemplo:
const pessoa5 = {
  nome: "Diego",
  idade: 38,
  cidade: "Belém",
};

const { nome, idade } = pessoa5;
console.log(nome);
console.log(idade);

/* ---------- Exercício ---------- */

// 1
// Crie uma variável chamada player e atribua a ela um objeto que reúna todas as informações das variáveis listadas.
const name = "Marta";
const lastName = "Silva";
const age = 34;
const medals = { golden: 2, silver: 3 };
const bestInTheWorld = [2006, 2007, 2008, 2009, 2010, 2018];
// Acesse as chaves name, lastName e age por meio da sintaxe meuObjeto.chave, concatene as informações e armazene na variável message no seguinte formato: “A jogadora Marta Silva tem 34 anos de idade”.
// Acesse a chave bestInTheWorld por meio da sintaxe meuObjeto['chave'] e armazene na variável achievements a quantidade de títulos no seguinte formato: “A jogadora Marta Silva foi eleita a melhor do mundo por 6 vezes”.

let player = {
  name: "Marta",
  lastName: "Silva",
  age: 34,
  medals: { golden: 2, silver: 3 },
  bestInTheWorld: [2006, 2007, 2008, 2009, 2010, 2018],
};

let message = `A jogadora ${player.name} ${player.lastName} tem ${player.age} anos de idade`;
console.log(message);
let achievements = `A jogadora ${player.name} ${player.lastName} foi eleita a melhor do mundo por ${player.bestInTheWorld.length} vezes`;
console.log(achievements);

// 2
// Adicione as propriedades email, fone, userGithub e linkedIn ao objeto customer (do exemplo anterior), chamando a função addProperty.
const customer = {
  firstName: "Roberto",
  age: 22,
  job: "Software Engineer",
};

const addPropertyUm = (object, key, value) => {
  if (typeof object[key] === "undefined") {
    object[key] = value;
  }
};

addPropertyUm(customer, "email", "diegoserafim1@gmail.com");
addPropertyUm(customer, "fone", 91980654180);
addPropertyUm(customer, "userGithub", "diegoserafim1@gmail.com");
addPropertyUm(customer, "linkedIn", "diegoserafim1@gmail.com");
console.log(customer);

// 3
// 3.1 Acesse as chaves name, lastName e title e exiba informações em um console.log() no seguinte formato: “O livro favorito de Julia Pessoa se chama ‘O Senhor dos Anéis - a Sociedade do Anel’.”.
const reader = {
  name: "Julia",
  lastName: "Pessoa",
  age: 21,
  favoriteBooks: [
    {
      title: "O senhor dos anéis - a sociedade do anel",
      author: "J. R. R. Tolkien",
      publisher: "Matins Fontes",
    },
  ],
};
console.log(
  `O livro favorito de ${Object.values(reader)[0]} ${
    Object.values(reader)[1]
  } se chama ‘${Object.values(reader.favoriteBooks[0])[0]}’`
);

// 3.2 Adicione um novo livro favorito na chave favoriteBooks, que é um array de objetos. Atribua a essa chave um objeto que contenha as seguintes informações:
reader.favoriteBooks.push({
  title: "Harry Potter e o Prisioneiro de Azkaban",
  author: "JK Rowling",
  publisher: "Rocco",
});
console.log(reader.favoriteBooks);

// 3.3 - Acesse as chaves name e favoriteBooks e faça um console.log() no seguinte formato:
// “Julia tem {quantidade} livros favoritos.”
// {quantidade} corresponde à quantidade de livros favoritos, sendo um número gerado automaticamente pelo seu código. Caso a quantidade seja igual a 1, a frase deve ser:
// “Julia tem 1 livro favorito.”
if (reader.favoriteBooks.length === 1) {
  console.log(
    `${Object.values(reader)[0]} tem ${
      Object.values(reader.favoriteBooks).length
    } livro favorito.`
  );
} else {
  console.log(
    `${Object.values(reader)[0]} tem ${
      Object.values(reader.favoriteBooks).length
    } livros favoritos.`
  );
}

// 4
// Sistema de entrega de um restaurante e que precise enviar mensagens com as informações da compra.
const order = {
  name: "Rafael Andrade",
  phoneNumber: "11-98763-1416",
  address: {
    street: "Rua das Flores",
    number: "389",
    apartment: "701",
  },
  order: {
    pizza: {
      marguerita: {
        amount: 1,
        price: 25,
      },
      pepperoni: {
        amount: 1,
        price: 20,
      },
    },
    drinks: {
      coke: {
        type: "Coca-Cola Zero",
        price: 10,
        amount: 1,
      },
    },
    delivery: {
      deliveryPerson: "Ana Silveira",
      price: 5,
    },
  },
  payment: {
    total: 60,
  },
};

// 4.1 Complete a função customerInfo() para que seu retorno seja: 'Olá, Ana Silveira, entrega para: Rafael Andrade, Telefone: 11-98763-1416, Rua das Flores, Número: 389, AP: 701.'.
const customerInfo = (fullOrder) => {
  console.log(
    `Olá, ${fullOrder.order.delivery.deliveryPerson}, entrega para: ${
      Object.values(order)[0]
    } Telefone: ${Object.values(order)[1]}, ${
      Object.values(order.address)[0]
    }, Número: ${Object.values(order.address)[1]}, AP: ${
      Object.values(order.address)[2]
    }`
  );
};
customerInfo(order);

// 4.2 Complete a função orderModifier() para que seu retorno seja: 'Olá, Luiz Silva, o valor total de seu pedido de marguerita, pepperoni e Coca-Cola Zero é R$ 50,00.'.
const orderModifier = (fullOrder) => {
  // Altera o nome
  fullOrder.name = "Luiz Silva";

  // Valor do pedido
  fullOrder.payment.total = 50;

  // Pedidos
  const pizzas = Object.keys(fullOrder.order.pizza).join(", ");
  const drink = fullOrder.order.drinks.coke.type;

  console.log(
    `Olá, ${fullOrder.name}, o valor total de seu pedido de ${pizzas} e ${drink} é ${fullOrder.payment.total},00`
  );
};
orderModifier(order);

// 5
const school = {
  lessons: [
    {
      course: "Python",
      students: 20,
      professor: "Carlos Patrício",
      shift: "Manhã",
    },
    {
      course: "Kotlin",
      students: 10,
      professor: "Gabriel Oliva",
      shift: "Noite",
    },
    {
      course: "JavaScript",
      students: 738,
      professor: "Gustavo Caetano",
      shift: "Tarde",
    },
    {
      course: "MongoDB",
      students: 50,
      shift: "Noite",
    },
  ],
};

// 5.1 Crie uma função que obtenha o valor da chave de acordo com sua posição no array. Essa função deve possuir dois parâmetros: o objeto e a posição no array.
const valueIndex = (key, index) => {
  if (index >= 0 && index < key.lessons.length) {
    return key.lessons[index];
  }
  return null;
};
console.log(valueIndex(school, 0));

// 5.2 Crie uma função que retorne a soma do número total de estudantes em todos os cursos.
const totalStudents = (school) => {
  return school.lessons.reduce((total, lessons) => total + lessons.students, 0);
};
console.log(totalStudents(school));

// 5.3 Crie uma função que verifica se uma determinada chave existe em todos os elementos do array lessons. O retorno deve ser um booleano (true ou false). Essa função deve possuir dois parâmetros: o objeto e o nome da chave.
const checkExist = (school, key) => {
  return school.lessons.every((lessons) => key in lessons);
};
console.log(checkExist(school, "professor"));
console.log(checkExist(school, "turno"));

// 5.4 Crie uma função para alterar o turno para noite no curso de Python. Essa função deve ter três parâmetros: a base de dados a ser modificada, o nome do curso e o novo valor da chave.
const changeToNight = (school, name, turn) => {
  const course = school.lessons.find((lesson) => lesson.course === name);
  if (course) {
    course.shift = turn;
  }
};
changeToNight(school, "Python", "Noite");
console.log(school.lessons[0]);

// 6
// Por meio do array de frutas chamado basket, crie um objeto que contenha o nome da fruta como chave e a quantidade de vezes que ela aparece no array como valor.
// Em seguida, imprima esse resultado na tela com uma mensagem no seguinte formato: Sua cesta possui: x Melancias, x Abacates....
const basket = [
  "Melancia",
  "Abacate",
  "Melancia",
  "Melancia",
  "Uva",
  "Laranja",
  "Jaca",
  "Pera",
  "Melancia",
  "Uva",
  "Laranja",
  "Melancia",
  "Banana",
  "Uva",
  "Pera",
  "Abacate",
  "Laranja",
  "Abacate",
  "Banana",
  "Melancia",
  "Laranja",
  "Laranja",
  "Jaca",
  "Uva",
  "Banana",
  "Uva",
  "Laranja",
  "Pera",
  "Melancia",
  "Uva",
  "Jaca",
  "Banana",
  "Pera",
  "Abacate",
  "Melancia",
  "Melancia",
  "Laranja",
  "Pera",
  "Banana",
  "Jaca",
  "Laranja",
  "Melancia",
  "Abacate",
  "Abacate",
  "Pera",
  "Melancia",
  "Banana",
  "Banana",
  "Abacate",
  "Uva",
  "Laranja",
  "Banana",
  "Abacate",
  "Uva",
  "Uva",
  "Abacate",
  "Abacate",
  "Melancia",
  "Uva",
  "Jaca",
  "Uva",
  "Banana",
  "Abacate",
  "Banana",
  "Uva",
  "Banana",
  "Laranja",
  "Laranja",
  "Jaca",
  "Jaca",
  "Abacate",
  "Jaca",
  "Laranja",
  "Melancia",
  "Pera",
  "Jaca",
  "Melancia",
  "Uva",
  "Abacate",
  "Jaca",
  "Jaca",
  "Abacate",
  "Uva",
  "Laranja",
  "Pera",
  "Melancia",
  "Jaca",
  "Pera",
  "Laranja",
  "Jaca",
  "Pera",
  "Melancia",
  "Jaca",
  "Banana",
  "Laranja",
  "Jaca",
  "Banana",
  "Pera",
  "Abacate",
  "Uva",
];

// Cria um objeto com a contagem de frutas
const fruitCount = {};

basket.forEach((element) => {
  fruitCount[element] = (fruitCount[element] || 0) + 1;
});

// Cria a mensagem
const fruitMessage = Object.entries(fruitCount)
  .map(([element, count]) => `${count} ${element}${count > 1 ? "s" : ""}`)
  .join(", ");

console.log(`Sua cesta possui: ${fruitMessage}`);

/* ---------- Em resumo ---------- */

// Objetos são coleções de pares chave-valor.
// Podem ser criados com literais {}, construtores new Object() ou funções construtoras.
// Propriedades podem ser acessadas com notação de ponto . ou colchetes [].
// Métodos são funções associadas a objetos.
// Métodos como Object.keys(), Object.values(), e Object.entries() são úteis para manipulação.
// Protótipos permitem herança entre objetos.
// Desestruturação facilita a extração de propriedades.
