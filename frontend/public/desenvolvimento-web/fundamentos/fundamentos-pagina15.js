/* Arrow functions ( ) => { } */
// São uma sintaxe mais curta e moderna para escrever funções em JavaScript, introduzida no ECMAScript 6 (ES6). Elas são especialmente úteis para funções curtas e para situações onde o contexto de this precisa ser preservado.

// 1 - Arrow functions não possuem nome e são armazenadas em variáveis
// 2 - Arrow function não utiliza a palavra-chave function e não tem nome.
// 3 - Atribuímos ela a uma constante.
// 4 - Colocando a seta na arrow function =>


/* ---------- function para arrow function ---------- */


// Function
function subtraction(num1, num2) {
  return num1 - num2;
}
console.log(subtraction(3, 7));

// Arrow function
const subtraction1 = (num1, num2) => {
  return num1 - num2;
};
console.log(subtraction1(6, 4));

// Function 2 
function sumArray(array) {
  let sum = 0;
  
  for (let i = 0; i < array.length; i += 1) {
    sum += array[i];
  }

  return sum;
}
console.log(sumArray([3, 7, 32, 43]));

// Arrow function 2
const sumArray1 = (array) => {
  let sum = 0;
  
  for (let i = 0; i < array.length; i += 1) {
    sum += array[i];
  }

  return sum;
}
console.log(sumArray1([3, 7, 32, 43]));


/* ---------- Simplificando arrow functions que possuem apenas 1 linha ---------- */


const subtraction2 = (num1, num2) => num1 - num2;
console.log(subtraction2(29, 34));


/* ---------- Características das Arrow Functions ---------- */


"Sintaxe Concisa:"
// Permitem escrever funções de forma mais compacta, especialmente quando o corpo da função é uma única expressão.

"this Léxico:"
// Diferente das funções tradicionais, o valor de this em uma arrow function é herdado do escopo onde ela foi definida, e não onde é chamada.

"Não Possuem arguments:"
// Arrow functions não têm o objeto arguments, que está disponível em funções tradicionais.

"Não Podem Ser Usadas como Construtoras:"
// Arrow functions não podem ser chamadas com new, ou seja, não podem ser usadas como construtoras.


/* ---------- Sintaxe Básica ---------- */


"A sintaxe de uma arrow function é composta por:"
// Parâmetros: Dentro de parênteses ().
// Corpo da Função: Após a seta =>. Se o corpo for uma única expressão, o return é implícito.

"Formas de Escrever:"
// Com um único parâmetro:
const funcao = parametro => expressao;

// Com múltiplos parâmetros:
const funcao1 = (parametro1, parametro2) => expressao;

// Com corpo de múltiplas linhas:
const funcao2 = (parametro1, parametro2) => {
    // Código aqui
    return resultado;
};


/* ---------- Exemplos ---------- */


// Função simples (sem parâmetros)
const saudacao = () => "Olá, mundo!";
console.log(saudacao());

// Função com um parâmetro
const dobrar = numero => numero * 2;
console.log(dobrar(6));

// Função com múltiplos parâmetros
const somar = (a, b) => a + b;
console.log(somar(23, 32));

// Função com corpo de múltiplas linhas 
const calcularArea = (largura, altura) => {
  const area = largura * altura;
  return area;
}

console.log(calcularArea(6.48, 8));


/* ---------- this Léxico ---------- */


// Uma das principais vantagens das arrow functions é que o valor de this é herdado do escopo onde a função foi definida, e não onde é chamada. Isso evita problemas comuns em funções tradicionais, onde o valor de this pode mudar dependendo do contexto de execução.

// Exemplo com Função Tradicional:
const objeto = {
  valor: 38,
  metodo: function () {
    setTimeout(function() {
      console.log(this.valor);
    }, 1000);
  }
};

objeto.metodo(); // undefined

// Exemplo com Arrow Function
const objeto1 = {
  valor: 38,
  metodo: function() {
    setTimeout(() => {
      console.log(this.valor);
    }, 2000);
  }
};
objeto1.metodo(); // 38


/* ---------- Arrow Functions em Callbacks ---------- */
// Arrow functions são frequentemente usadas em callbacks, especialmente em métodos como map, filter, e reduce, devido à sua sintaxe concisa.

// Exemplo com map:
const numeros = [1, 2, 3, 4];
const dobrados = numeros.map(num => num * 2);
console.log(dobrados); // [ 2, 4, 6, 8 ]


// Exemplo com filter:
const numeros1 = [1, 2, 3, 4];
const pares = numeros1.filter(num => num % 2 === 0);
console.log(pares); // [ 2, 4 ]


/* ---------- Quando Não Usar Arrow Functions ---------- */


// 1 - Métodos de Objetos:
// Arrow functions não são ideais para métodos de objetos, pois o this não se refere ao objeto.
const objeto2 = {
  valor: 38,
  metodo: () => {
    console.log(this.valor);
  }
};
objeto2.metodo(); // undefined

// 2 - Funções Construtoras:
// Arrow functions não podem ser usadas como construtoras.
const pessoa = (nome) => {
  this.nome = nome;
  console.log(this.nome = nome);
};
const joao = new pessoa("João"); // pessoa is not a constructor

// 3 - Funções com arguments:
// Arrow functions não possuem o objeto arguments.
const funcao3 = () => {
  console.log(arguments);
};

funcao3(1, 3, 2);