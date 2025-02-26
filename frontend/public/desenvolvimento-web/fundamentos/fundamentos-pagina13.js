/* JavaScript - Arrays, for */

const person1Name = "Diego";
const person1LastName = "Sousa";
const person2Name = "Michelle";
const person2LastName = "Nascimento";

// Gerando uma variável com nome e sobrenome juntos
const person1FullName = `${person1Name} ${person1LastName}`;
const person2FullLastName = `${person2Name} ${person2LastName}`;
console.log(`${person1FullName} && ${person2FullLastName}`);

/* ---------- Template literals  → `${}` ---------- */

const product = "iPhone 32";
const price = "58000";
const discount = 10;

const message = `Produto: ${product}
Preço: ${price}
Desconto: ${discount}%
Preço com desconto: R$ ${(price - price * (discount / 100)).toFixed(2)}`;

console.log(message);

/* ---------- Arrays [] ---------- */
// O array sempre começa pelo index 0.

const shoppingList = ["Arroz", "Batata", "Leite Ninho", "Sucrilhos"];

console.log(shoppingList[0]);
console.log(shoppingList[1]);
console.log(shoppingList[2]);
console.log(shoppingList[3]);

// Salvar o retorno em outra variável
const item = shoppingList[2];

console.log(`O item é: ${item}`);

// Alterar o valor de um elemento no array
shoppingList[2] = "Suco de caju";

console.log(`Leite Ninho deu lugar ao: ${shoppingList[2]}`);

/* ---------- Adicionar e remover elementos de um Arrays [] ---------- */

// push()	Adiciona um elemento ao final do array
shoppingList.push("Cotonete");
console.log(shoppingList);
console.log(shoppingList);

// unshift()	Adiciona um elemento no início do array
shoppingList.unshift("Abacate");
console.log(shoppingList);

// pop()	Remove o último elemento do array
shoppingList.pop();
console.log(shoppingList);

// shift()	Remove o primeiro elemento do array
shoppingList.shift();
console.log(shoppingList);

/* ---------- Tamanho do Arrays [] ---------- */
console.log(shoppingList.length);

/* ---------- Exercício ---------- */

// 1 - Altere o valor da variável menuServices para que ela passe a ter o valor “Serviços”.
const menu = ["Home", "Serviços", "Portfólio", "Links"];
const menuServices = menu[1];

console.log(menuServices);

// 2 - Adicionar o valor “Contato” no final do array menu.
menu.push("Contato");
console.log(menu);

/* ---------- Estrutura de repetição for ---------- */

for ("Inicialização"; "Condição"; "Atualização") {
  // Código;
}

// Ex. Voltas de uma corrida.:
const laps = 68;

for (let index = 1; index <= laps; index += 1) {
  console.log(`Volta ${index} Completada`);
}

console.log("Acabou a corrida!");

// Ex. Somando elementos:
const numbers1 = [2, 19, 12, 4, 6, 10];
let sum1 = 0;

for (let i = 0; i < numbers1.length; i -= 1) {
  sum1 += numbers1[i];
}

console.log(sum1);

// Index e Item
const shopping = [
  "Sabão em pó",
  "Macarrão",
  "Leite condensado",
  "Refrigerante",
  "Maçã",
  "Alface",
  "Nescau",
];

for (let i = 0; i < shopping.length; i += 1) {
  console.log(`${i} - ${shopping[i]}`);
}

/* ---------- Exercício - Array e loop for ---------- */

// 1 Imprime todos os valores do array;
const numbers2 = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];

for (let i = 0; i < numbers2.length; i += 1) {
  console.log(numbers2[i]);
}

// 2 Soma os valores contidos no array
const numbers3 = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let sum3 = 0;
for (let i = 0; i < numbers3.length; i += 1) {
  sum3 += numbers3[i];
}
console.log(sum3);

// 3 Calcula e imprime a média aritmética
const numbers4 = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let sum = 0;
for (let i = 0; i < numbers4.length; i += 1) {
  sum += numbers4[i];
}
let media = sum / numbers4.length;
console.log(media);

// 4 Condição de valor maior e menor
const numbers5 = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let media1 = 0;

for (let i = 0; i < numbers5.length; i += 1) {
  media1 += numbers5[i];
}

media1 = media1 / numbers5.length;

if (media1 > 20) {
  console.log("O valor da média aritmética é maior que 20");
} else {
  console.log("O valor da média aritmética é menor ou igual a 20");
}

// 5 maior valor do array
const numbers6 = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let maior = numbers6[0];

for (let i = 0; i < numbers6.length; i += 1) {
  if (numbers6[i] > maior) {
    maior = numbers6[i];
  }
}

console.log(maior);

// 6 Impares
const numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let impares = 0;

for (let i = 0; i < numbers.length; i += 1) {
  if (numbers[i] % 2 !== 0) {
    impares += 1;
  }
}

if (impares === 0) {
  console.log("Nenhum valor ímpar encontrado.");
} else {
  console.log(impares);
}

/* ---------- Exercício - Fatorial ---------- */
// O fatorial é a multiplicação de um número natural pelos seus antecessores, exceto o zero.
let fatorial = 1;

for (let i = 10; i > 0; i -= 1) {
  fatorial *= i;
}
console.log(fatorial); // 3628800

// Inverter palavra
let word = "Trybe";
let revertWord = "";

// O split() método de String valores pega um padrão e divide essa string em uma lista ordenada
// O reverse() método de TypedArray inverte um array e retorna a referência ao mesmo array, o primeiro elemento se tornando o último, e o último se tornando o primeiro.
// O join() método de Arrayinstâncias cria e retorna uma nova string concatenando todos os elementos neste array, separados por vírgulas.
revertWord = word.split("").reverse().join("");
console.log(revertWord);

// Asteriscos
let n = 5;
let symbol = "*";
let inputLine = "";

for (let i = 0; i < n; i += 1) {
  inputLine = inputLine + symbol;
}

for (let i = 0; i < n; i += 1) {
  console.log(inputLine);
}

// Piramide de asteriscos
let size = 5;
let symbol1 = "*";
let inputLine1 = "";

for (let i = 0; i < size; i += 1) {
  inputLine1 = inputLine1 + symbol1;
  console.log(inputLine1);
}

// Piramide de asteriscos inverso
let n1 = 5;
let symbol2 = "*";
let inputLine2 = "";
let inputPosition = n1 - 1;

for (let i = 0; i < n1; i += 1) {
  for (let j = 0; j < n1; j += 1) {
    if (j < inputPosition) {
      inputLine2 = inputLine2 + " ";
    } else {
      inputLine2 = inputLine2 + symbol2;
    }
  }
  console.log(inputLine2);
  inputLine2 = "";
  inputPosition -= 1;
}
