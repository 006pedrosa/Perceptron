// document.getElementById("demo").innerHTML = 11 + 11;
// perceptron();

const fileInput = document.getElementById('my-file-uploader');
const fileNameSpan = document.getElementById('filename');
const matrizAnd = [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 1]];
const matrizOr = [[1, 1, 1], [1, 0, 1], [0, 1, 1], [0, 0, 0]];
const matrizXor = [[1, 1, 0], [1, 0, 1], [0, 1, 1], [0, 0, 0]];

/*fileInput.addEventListener('change', (e) => {
  fileNameSpan.innerHTML = e.target.files[0].name;
});*/

function perceptron() {
    // console.log(fileInput);

    let entrada = document.getElementById('text-area-content').value;
    // let numArestas = parseInt(document.getElementById('num-arestas').value);
    
    let numArestas = 2;
    var bias = parseFloat(document.getElementById('bias').value);
    var taxaAprendizado = parseFloat(document.getElementById('taxa-aprendizado').value);
    var ciclos = parseInt(document.getElementById('ciclos').value);
    var select = parseInt(document.getElementById('select').value);

    console.log(select);

    let entradaSplit = entrada.split("\n");
    console.log("Número de Arestas: " + numArestas);
    console.log("BIAS: " + bias);
    console.log("TAXA DE APRENDIZADO: " + taxaAprendizado);
    console.log("CICLO: " + ciclos);
    
    var pesos = new Array(numArestas);

    var perceptron = new Perceptron();
    perceptron.bias = bias;
    if(select == 1){
        perceptron.matrizTreinamento = matrizAnd;
        perceptron.saida = "METODO: AND\n";
    }else if(select == 2){
        perceptron.matrizTreinamento = matrizOr;
        perceptron.saida = "METODO: OR\n";
    }else if(select == 3){
        perceptron.matrizTreinamento = matrizXor;
        perceptron.saida = "METODO: XOR\n";
    }else{
        alert("SELECIONE UM MÉTODO VÁLIDO");
        return ;
    }
    perceptron.pesos = new Array();
    perceptron.saida += "BIAS: " + bias + "\n";
    perceptron.saida += "TAXA DE APRENDIZADO: " + taxaAprendizado + "\n";
    perceptron.saida += "CICLO: " + ciclos + "\n";
    printConsole(perceptron.saida);

    for(let k = 0; k < numArestas; k++) {
        perceptron.pesos[k] = parseFloat((Math.random() * 2-1).toFixed(2));
    }

    perceptron.contadorCiclos = 0;

    treinar(perceptron, ciclos, taxaAprendizado);

    var resultado;
    for(let i = 0; i < entradaSplit.length; i++){
        let entradaLinha = entradaSplit[i].split(" ");
        resultado = entradaLinha[0];
        for(let j = 1; j < entradaLinha.length; j++) {
            resultado = calcularPeso(resultado, entradaLinha[j], perceptron);
        }
        perceptron.saida += "RESULTADO DA LINHA " + i + " DE AMOSTRAS: "+ resultado + "\n";
    }

    printConsole(perceptron.saida);

    return 0;
}

function treinar(perceptron, ciclos, taxaAprendizado) {

    var treinado = true;
    var resultado;

    for (let i = 0; i < perceptron.matrizTreinamento.length; i++) {
        resultado = calcularPeso(perceptron.matrizTreinamento[i][0], perceptron.matrizTreinamento[i][1], perceptron);
        perceptron.saida += "CICLO: " + perceptron.contadorCiclos + " ENTRADA: " + i + " VALOR ESPERADO: " + perceptron.matrizTreinamento[i][2] + " VALOR ENCONTRADO: " + resultado + " BIAS: " + perceptron.bias +"\n";
        printConsole(perceptron.saida);

        if (resultado != perceptron.matrizTreinamento[i][2]) {
            corrigirPesos(i, resultado, perceptron, taxaAprendizado);
            treinado = false;
        }
    }
    perceptron.contadorCiclos++;

    if((!treinado) && (perceptron.contadorCiclos < ciclos)) {
        treinar(perceptron, ciclos, taxaAprendizado);
    }
}

function calcularPeso(entrada1, entrada2, perceptron) {

    var soma = (entrada1 * perceptron.pesos[0]) + (entrada2 * perceptron.pesos[1]) + ((-1) * perceptron.bias);

    return soma >= 0 ? 1 : 0;
}

function corrigirPesos(i, saida, perceptron, taxaAprendizado) {

    perceptron.pesos[0] = parseFloat(perceptron.pesos[0] + taxaAprendizado * (perceptron.matrizTreinamento[i][2] - saida) * perceptron.matrizTreinamento[i][0]);
    perceptron.pesos[1] = parseFloat(perceptron.pesos[1] + taxaAprendizado * (perceptron.matrizTreinamento[i][2] - saida) * perceptron.matrizTreinamento[i][1]);
    perceptron.bias = parseFloat(perceptron.bias + taxaAprendizado * (perceptron.matrizTreinamento[i][2] - saida) * (-1));
}

function classificarEntradas(perceptron, entradalinha){

    let classificacao = 0;
    for(let i=0; i<entradalinha.length; i++){
        classificacao += perceptron.pesos[i] * entradalinha[i];
    }

    return (classificacao >= 0) ? 1 : 0;      
}

function Perceptron(){
    var bias = 0;
    var matrizTreinamento;
    var pesos = new Array();
    var contadorCiclos;
    var saida;
}

function printConsole(saida){
    document.getElementById('text-area-content-saida').innerHTML = saida;
}