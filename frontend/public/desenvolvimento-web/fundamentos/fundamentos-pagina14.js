/* JavaScript - Funções */

// Funções são blocos de código reutilizáveis que realizam uma tarefa específica. Elas são fundamentais em JavaScript (e na programação em geral) porque permitem organizar o código, evitar repetições e encapsular lógicas complexas em unidades menores e mais gerenciáveis.


/* ---------- Características das Funções ---------- */


"Reutilização";
// Uma função pode ser chamada várias vezes em diferentes partes do código, evitando a repetição de lógica.

"Modularidade";
//Funções permitem dividir um programa grande em partes menores e mais fáceis de entender.

"Escopo";
// Variáveis declaradas dentro de uma função são locais a ela, ou seja, não podem ser acessadas fora da função.

"Parâmetros e Argumentos";
// Funções podem receber dados de entrada (parâmetros) e retornar resultados.
// Ex.:
function saudacao(nome) {
  // 'nome' é um parâmetro
  return `Olá, ${nome}!`;
}
console.log(saudacao("Serafim")); // 'Serafim' é um argumento

("Retorno de Funções");
// Funções podem retornar um valor usando a palavra-chave return. Se não houver return, a função retorna undefined.
// Ex.:
function verificarPar(num) {
  if (num % 2 === 0) {
    return "É par";
  } else {
    return "É ímpar";
  }
}
console.log(verificarPar(9));


/* ---------- Tipos de Funções em JavaScript ---------- */


("1. Funções Declaradas");
// São funções definidas com a palavra-chave "function". Elas são "içadas", o que significa que podem ser chamadas antes da sua declaração no código.
function nomeDaFuncao(parametro1, parametro2) {
  // Corpo da função
  return resultado;
}

// Ex.:
function somar(a, b) {
  return a + b;
}
console.log(somar(32, 3));

("2. Funções Expressas");
// São funções atribuídas a variáveis. Elas não são içadas, ou seja, só podem ser chamadas após a sua declaração.
const nomeDaFuncao1 = function (parametro1, parametro2) {
  // Corpo da função
  return resultado;
};

// Ex.:
const subtrair = function (a, b) {
  return a - b;
};
console.log(subtrair(32, 8));

("3. Arrow Functions");
// São uma sintaxe mais curta para escrever funções, introduzida no ES6. Elas não possuem seu próprio this, o que as torna ideais para funções curtas e callbacks.
const nomeDaFuncao = (parametro1, parametro2) => {
  // Corpo da função
  return resultado;
};

// Ex.:
const multiplicar = (a, b) => {
  return a * b;
};
console.log(multiplicar(8, 8));

("Funções como Cidadãos de Primeira Classe");
// Em JavaScript, funções são tratadas como valores. Isso significa que você pode:
// 1 - Atribuir funções a variáveis.
// 2 - Passar funções como argumentos para outras funções.
// 3 - Retornar funções de outras funções.

// Ex.:
function executarFuncao(funcao, valor) {
  return funcao(valor);
}
const dobrar = (x) => {
  return x * 2;
};

console.log(executarFuncao(dobrar, 7));

("Funções Anônimas");
// São funções sem nome, geralmente usadas como callbacks ou em funções de alta ordem.
// Ex.:
setTimeout(function () {
  console.log("Isso é uma função anônima!");
}, 2000);

("Callbacks");
// Callbacks são funções passadas como argumentos para outras funções e executadas em um momento posterior.
// Ex.:
function processarDados(dados, callback) {
  const resultado = dados.toUpperCase();
  callback(resultado);
}

processarDados("javascript", function (resultado) {
  console.log(resultado);
});

("Funções de Alta Ordem");
// São funções que recebem outras funções como argumentos ou retornam funções.
function criarMultiplicador(multiplicador) {
  return function (numero) {
    return numero * multiplicador;
  };
}

const dobrar1 = criarMultiplicador(3);
console.log(dobrar1(3));


/* ---------- Funções com parâmetros ---------- */


("1 - Adiciona valores");
// Considere a variável balance, que representa a quantia em conta da pessoa cliente do TrybeBank e escreva quatro funções que:

// Adiciona um valor ao balance;
// Subtraia um valor do balance;
// Multiplique o valor do balance por uma taxa;
// Divida o valor do balance.
let balance = 100;

function sumBalance(value) {
  return balance + value;
}
console.log(sumBalance(20));

function subBalance(value) {
  return balance - value;
}
console.log(subBalance(20));

function multBalance(value) {
  return balance * value;
}
console.log(multBalance(20));

function divBalance(value) {
  return balance / value;
}
console.log(divBalance(20));

("2 - Saúda um cliente");
const trybeBankCustomers = ["Oliva", "Nat", "Gus"];

function greetCustomer(customer) {
  for (let i = 0; i < customer.length; i += 1) {
    console.log(`Olá, ${customer[i]}. Essa é sua conta do TrybeBank.`);
  }
}

greetCustomer(trybeBankCustomers);

// 3 - Faça um programa para adicionar pessoas clientes ao array do TrybeBank. A função deve se chamar addCustomer e receber um parâmetro do tipo string e, caso o parâmetro não seja do tipo string, retorne a mensagem: “O parâmetro passado deve ser do tipo string”.
const trybeBankCustomers1 = ["Oliva", "Nat", "Gus"];

function addCustomer(name) {
  if (typeof name !== "string") {
    return "O parâmetro passado deve ser do tipo string";
  }
  trybeBankCustomers1.push(name);
  return `Cliente ${name} adicionado com sucesso.`;
}

console.log(addCustomer("Seraffim"));
console.log(addCustomer(123));
console.log(trybeBankCustomers1);

// 4 - Escrever uma função chamada addCustomers que irá adicionar um array de novas pessoas clientes ao nosso array trybeBankCustomers. Essa função deve receber dois parâmetros: o array trybeBankCustomers e um novo array de pessoas que devem ser adicionadas. Certifique-se de que somente sejam adicionados ao array trybeBankCustomers valores do tipo string. Caso algum elemento contido no segundo parâmetro não seja do tipo string, retorne a mensagem: “Todos os valores precisam ser strings.”.
const trybeBankCustomers = ["Oliva", "Nat", "Gus"];

function addCustomers(customer, newCustomer) {
  if (!Array.isArray(newCustomer)) {
    return "O segundo parâmetro deve ser um array.";
  }

  for (let customer of newCustomer) {
    if (typeof customer !== "string") {
      return "Todos os valores precisam ser strings.";
    }
  }

  trybeBankCustomers.push(...newCustomer);
  return "Pessoa adicionada com sucesso!";
}

console.log(addCustomers(trybeBankCustomers, ["Joaquim", "serafim"]));
console.log(addCustomers(trybeBankCustomers, ["Diego", 123]));
console.log(trybeBankCustomers);
