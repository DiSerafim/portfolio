/* ---------- Variáveis ---------- */

let age = 20; // number
let fullname = "Diego"; // string
let isValid = true; // boolean
let xablau; // undefined
let value = null; //

console.log(age); // 20
console.log(fullname); // Diego
console.log(isValid); // true
console.log(xablau); // undefined
console.log(value); // null

console.log("......"); // ......

// tipos de variáveis
console.log(typeof age); // number
console.log(typeof fullname); // string
console.log(typeof isValid); // boolean
console.log(typeof xablau); // undefined
console.log(typeof value); // object

// Tipos de variáveis
var userEmail = "diegoserafim1@gmail.com";

let userId = 12345;

const useLocation = "Belém-Pa";

// Variável dentro e fora do bloco

if (true) {
  // Início do escopo do if
  var userAge = "20";
  console.log("Var - dentro ", userAge);
  // Fim do escopo do if
}
// Tem acesso à variável userAge tanto dentro quanto fora do bloco de código.
console.log("Var - fora ", userAge);

if (true) {
  // Início do escopo do if
  let userAgeLet = "20";
  console.log("Let - dentro ", userAgeLet);
  // Fim do escopo do if
}

// Não tem acesso à variável userAgeLet fora do bloco de código.
console.log("Let - fora", userAgeLet);

if (true) {
  // Início do escopo do if
  const userAgeConst = "20";
  console.log("Const - dentro ", userAgeConst);
  // Fim do escopo do if
}

// Não tem acesso à variável userAgeConst fora do bloco de código.
console.log("Const - fora", userAgeConst);

// Exemplo de escopo
function exemploEscopo() {
  if (true) {
      let variavelLocal = "Eu sou local";
      const constanteLocal = "Eu também sou local";
      console.log(variavelLocal); // Funciona
      console.log(constanteLocal); // Funciona
  }
  console.log(variavelLocal); // Erro: variavelLocal is not defined
  console.log(constanteLocal); // Erro: constanteLocal is not defined
}

exemploEscopo();

// Variável = seu valor pode ser alterado
let favoriteTechnology = "Machine learning";
favoriteTechnology = "Python";
console.log(favoriteTechnology); // Python

// Constante = seu valor não pode ser alterado
const technologyFavorite = "Machine learning";
technologyFavorite = "Python";
console.log(technologyFavorite); // error

/* ---------- Operações Aritméticas ---------- */

let salary = 3501;
let bonus = 2000;
let vacations = 1000;
let taxes = 782;

console.log("Salário anual =", salary * 12); // Salário anual = 42012
console.log(
  "Salário + bonus + férias - impostos =",
  salary * 12 + bonus + vacations - taxes
); // Salário + bonus + férias - impostos = 44230
console.log("Salário dividido por 4 =", salary / 4); // Salário dividido por 4 = 875.25
console.log("Salário resto da divisão por 2 = ", salary % 2); // Salário resto da divisão por 2 =  1
console.log("Salário + 10 =", (salary += 10)); // Salário + 10 = 3511
console.log("Salário - 1", (salary -= 1)); // Salário - 1 3510

/* ---------- Operadores de Comparação ---------- */

// ==	Igual
// ===	Estritamente igual
// !=	Diferente de
// >	Maior que
// >=	Maior ou igual que
// <	Menor que
// <=	Menor ou igual que

/* ---------- Condições if, else ---------- */

const age = 87;

if (age >= 18) {
  console.log("Maior de idade");
} else {
  console.log("Menor de idade");
}

// ------------

const beenPrice = 10;
const totalMoney = 8;
let message = "";

if (totalMoney < beenPrice) {
  message = "Você não possui saldo suficiente :/";
} else if (totalMoney === beenPrice) {
  message = "Você vai gastar todo o seu dinheiro.";
} else {
  message = "Pode comprar!";
}

console.log(message);

/* ---------- Operador Ternário ---------- */

"condição" ? "retorno caso seja verdadeira" : "retorno caso seja falsa";

const personAge = 15;
const canVote = personAge >= 16 ? "Pode votar" : "Não pode votar";
console.log(canVote);

/* ---------- Operador Ternário ---------- */

&&	E
||	Ou
!	  Negação

/* ---------- && → (E) ---------- */
const food = "pão";
const drink = "café";

if (drink === "café" && food ==="pão") {
  console.log("Obrigado!");
} else {
  console.log("Erraram meu pedido.");
}

console.log(10 + 5 * 5); // 10 + 25

/* ---------- && → (E) ---------- */
let currentHour = 21;
let message = "";

if (currentHour >= 22) {
  message = "Não deveríamos comer nada, é hora de dormir";
} else if (currentHour >= 18 && currentHour < 22) {
  message = "Rango da noite, vamos jantar :D";
} else if (currentHour >= 14 && currentHour < 18 ) {
  message = "Vamos fazer um bolo pro café da tarde?";
} else if (currentHour >= 11 && currentHour < 14) {
  message = "Hora do almoço!!!";
} else {
  message = "Hmmm, cheiro de café recém-passado";
}

console.log(message);

/* ---------- || → (Ou) ---------- */
const principalDrink = "café";
const alternativeDrink = "suco de laranja";

if (principalDrink === "café" || alternativeDrink === "suco de laranja") {
  console.log("Agradeço por me atender :D");
} else {
  console.log("Ei, não foi isso que eu pedi!");
}

/* ---------- || → (Ou) ---------- */
const goToSp = true;
const goToGo = false;

if ((goToSp === true && goToGo === false) || (goToSp === false && goToGo === true)) {
  console.log("Eu fui apenas para um dos lugares.");
} else {
  console.log("Eu fui para os dois, ou para nenhum.");
}

/* ---------- ! → (Negação) ---------- */
console.log((2 + 2) === 4);
console.log(!(3 + 4) === 4);

/* ---------- ! → (Negação) ---------- */
let charmander = "Melhor Pokémon inicial.";
console.log(!charmander);

/* ---------- ! → (Negação) ---------- */
console.log(!42);
console.log(!0);

/* ---------- ! → (Negação) ---------- */
console.log(!null);

/* ---------- ! → (Negação) ---------- */
console.log(!undefined);


/* ---------- Exercício ---------- */

// 1 - Operações aritméticas
let num1 = 4;
let num2 = 7;
console.log("Adição →", num1 + num2);
console.log("Subtração →", num1 - num2);
console.log("Multiplicação →", num1 * num2);
console.log("Divisão", num1 / num2);
console.log("Resto ou Módulo", num1 % num2);

// 2 - Maior de dois números
let num1 = 4;
let num2 = 7;

if (num1 > num2) {
  console.log("num1", num1);
} else {
  console.log("num2", num2);
}


// 3 - Maior de três números
let num1 = 4;
let num2 = 7;
let num3 = 21;
let maior;

if (num1 >= num2 && num1 >= num3) {
  maior = num1;
} else if (num2 >= num1 && num2 >= num3) {
  maior = num2;
} else {
  maior = num3;
}
console.log("O maior número é: ", maior);

// 4 - Verificação de triângulo
let ang1 = 60;
let ang2 = 60;
let ang3 = 60;

if (ang1 <= 0 || ang2 <= 0 || ang3 <= 0) {
  console.log("Erro: Um dos ângulos é inválido.");
} else if (ang1 + ang2 + ang3 === 180) {
  console.log(true);
} else {
  console.log(false);
}

// 5 - Movimentos das peças de xadrez
let peca = "Bispo9";

switch (peca.toLowerCase()) {
  case "rei":
    console.log("O Rei pode se mover uma casa em qualquer direção.");    
    break;

  case "rainha":
    console.log("A Rainha pode se mover em qualquer direção (vertical, horizontal e diagonal).");    
    break;

  case "torre":
    console.log("A Torre se move na vertical ou horizontal.");    
    break;

  case "bispo":
    console.log("O Bispo se move na diagonal.");    
    break;

  case "cavalo":
    console.log("O Cavalo se move em formato de 'L' (duas casas em uma direção e uma perpendicular).");    
    break;

  case "peão":
    console.log("O Peão move-se para frente uma casa (ou duas no primeiro movimento) e captura na diagonal.");    
    break;

  default:
    console.log("Erro: Peça inválida.");
    break;
}

// 6 - Verifica se o número é par
let num1 = 23;
let num2 = 652;
let num3 = 45;

let ePar = num1 % 2 === 0 || num2 % 2 === 0 || num3 % 2 === 0 ?  console.log(true) :  console.log(false);

// 7 - Salário a receber
let salarioBruto = 3000;
let inss, ir;

// Cálculo INSS
if (salarioBruto <= 1556.94) {
  inss = salarioBruto * 0.08;
} else if (salarioBruto <= 2594.92) {
  inss = salarioBruto * 0.09;
} else if (salarioBruto <= 5189.82) {
  inss = salarioBruto * 0.11;
} else {
  inss = 570.88;
}

let salarioBase = salarioBruto - inss;

// Cálculo IR
if (salarioBase <= 1903.98) {
  ir = 0;
} else if (salarioBase <= 2826.65) {
  ir = (salarioBase * 0.075) - 142.80;
} else if (salarioBase <= 3751.05) {
  ir = (salarioBase * 0.15) - 354.80;
} else if (salarioBase <= 4664.68) {
  ir = (salarioBase * 0.225) - 636.13;
} else {
  ir = (salarioBase * 0.275) - 869.36;
}

let salarioLiquido = salarioBase - ir;

console.log("Salário líquido: R$", salarioLiquido.toFixed(2));