/* JavaScript - JSON (JavaScript Object Notation) */
// JSON (JavaScript Object Notation) é um formato leve de troca de dados que é fácil para humanos lerem e escreverem, e para máquinas parcearem e gerarem. Ele é amplamente utilizado para transmitir dados entre servidores e aplicações web, especialmente em APIs.


/* ---------- Características do JSON ---------- */

"Formato Textual:"
// JSON é um formato baseado em texto, o que o torna independente de linguagem de programação.

"Estrutura de Dados:"
// JSON suporta estruturas como objetos ({}) e arrays ([]), além de tipos primitivos como strings, números, booleanos e null.

"Leve e Eficiente:"
// Por ser textual e simples, JSON é mais leve e rápido de transmitir em comparação com formatos como XML.

"Facilidade de Uso:"
// JSON é nativamente suportado em JavaScript, mas bibliotecas estão disponíveis para quase todas as linguagens de programação.


/* ---------- Sintaxe Básica do JSON ---------- */
// Um objeto JSON é uma coleção de pares chave-valor, semelhante a um objeto JavaScript. No entanto, existem algumas diferenças importantes:

// As chaves devem ser strings (entre aspas duplas ").
// Os valores podem ser strings, números, booleanos, arrays, objetos ou null.
// Não suporta funções, datas ou tipos complexos.

// Exemplo de Objeto JSON:
const object = {
    "nome": "João",
    "idade": 30,
    "cidade": "São Paulo",
    "hobbies": ["ler", "correr", "viajar"],
    "casado": false
}
console.log(JSON.stringify(object));

// Exemplo de Array JSON:
const array = [
    {
        "nome": "Maria",
        "idade": 25
    },
    {
        "nome": "Pedro",
        "idade": 28
    }
]
console.log(JSON.stringify(array));


/* ---------- Métodos para Trabalhar com JSON em JavaScript ---------- */
// JavaScript fornece dois métodos principais para trabalhar com JSON:

JSON.stringify(); // Converte um objeto JavaScript em uma string JSON.
JSON.parse(); // Converte uma string JSON em um objeto JavaScript.

"JSON.stringify()"
JSON.stringify(objeto, replacer, espaçamento);
// objeto: O objeto JavaScript a ser convertido.
// replacer (opcional): Uma função ou array para filtrar ou transformar propriedades.
// espaçamento (opcional): Define o espaçamento na string JSON para formatação.
// Exemplo:
const pessoa = {
  nome: "Ana",
  idade: 22,
  cidade: "Rio de Janeiro",
};
const jsonString = JSON.stringify(pessoa);
console.log(jsonString);


"JSON.parse()"
JSON.parse(stringJSON, reviver);
// stringJSON: A string JSON a ser convertida.
// reviver (opcional): Uma função para transformar os valores durante a conversão.
// Exemplo:
const jsonStringCopy = '{"nome":"Ana","idade":22,"cidade":"Rio de Janeiro"}';
const objeto = JSON.parse(jsonStringCopy);
console.log(objeto.nome);
console.log(objeto.idade);
console.log(objeto);


/* ---------- Casos de Uso Comuns ---------- */

"Comunicação com APIs"
// JSON é o formato padrão para enviar e receber dados em APIs RESTful.
// Exemplo:
// Simulando uma requisição a uma API
fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => console.log("Testamento", data))
    .catch(error => console.error(error));

"Armazenamento de Dados"
// JSON é frequentemente usado para armazenar dados em bancos de dados NoSQL (como MongoDB) ou em arquivos de configuração.
// Exemplo:
// Salvando dados no localStorage
const saveDadosLocaStorage = { nome: "Carlos", idade: 28 };
localStorage.setItem("Usuário: ", JSON.stringify(saveDadosLocaStorage));

// Recuperando dados do localStorage
const dadosSalvos = JSON.parse(localStorage.getItem("Usuário"));
console.log(dadosSalvos);


"Troca de Dados entre Servidores"
// JSON é usado para trocar dados entre servidores e aplicações web ou móveis.
// Exemplo:
// Enviando dados para um servidor
const envDados = { nome: "Maria", idade: 25 };
fetch("https://random-d.uk/add", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(envDados),
})
.then(response => response.json())
.then(data => console.log("Testamento", data))
.catch(error => console.error(error));



/* ---------- Diferenças Entre JSON e Objetos JavaScript ---------- */

// Característica	|  JSON	                                              |  Objeto JavaScript
// Chaves	        |  Devem ser strings com aspas	                      |  Podem ser identificadores
// Valores	        |  Strings, números, booleanos, arrays, objetos, null |	Qualquer tipo (incluindo funções, datas, etc.)
// Comentários	    |  Não suporta	                                      |  Suporta
// Funções	        |  Não suporta	                                      |  Suporta
// Uso	            |  Troca de dados	                                  |  Estrutura de dados em código


/* ---------- Boas Práticas com JSON ---------- */

"Valide o JSON:"
// Use ferramentas como JSONLint para validar a sintaxe do JSON.

"Trate Erros ao Parsear:"
// Sempre use try...catch ao usar JSON.parse() para evitar erros de sintaxe.
// Exemplo:
try {
    const objetoTeste = JSON.parse(jsonInvalido);
} catch (error) {
    console.error("Erro ao parsear JSON: ", error);
}

"Evite Dados Sensíveis:"
// Nunca inclua senhas ou informações sensíveis em JSON, especialmente em APIs públicas.

"Use Formatação Legível:"
// Ao debugar, use JSON.stringify(objeto, null, 2) para gerar JSON formatado com indentação.
// Exemplo:
const pessoaInfo = { nome: "João", idade: 30 };
console.log(JSON.stringify(pessoaInfo, null, 2));


/* ---------- Resumo ---------- */
// JSON é um formato de texto para troca de dados, baseado em objetos e arrays.
// JSON.stringify() converte objetos JavaScript em strings JSON.
// JSON.parse() converte strings JSON em objetos JavaScript.
// É amplamente usado em APIs, armazenamento de dados e comunicação entre sistemas.
// Difere de objetos JavaScript em aspectos como chaves entre aspas e suporte a tipos.
