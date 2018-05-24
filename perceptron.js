// document.getElementById("demo").innerHTML = 11 + 11;
// perceptron();

const fileInput = document.getElementById('my-file-uploader');
const fileNameSpan = document.getElementById('filename');

/*fileInput.addEventListener('change', (e) => {
  fileNameSpan.innerHTML = e.target.files[0].name;
});*/

function perceptron() {
    // console.log(fileInput);
    let entrada = document.getElementById('text-area-content').value;
    let numArestas = parseInt(document.getElementById('num-arestas').value);
    let bias = parseFloat(document.getElementById('bias').value);
    let taxaAprendizado = parseFloat(document.getElementById('taxa-aprendizado').value);
    let ciclos = parseInt(document.getElementById('ciclos').value);

    let entradaSplit = entrada.split("\n");
    //console.log("ENTRADA: " + entradaSplit);
    console.log("Número de Arestas: " + numArestas);
    console.log("BIAS: " + bias);
    console.log("TAXA DE APRENDIZADO: " + taxaAprendizado);
    console.log("CICLO: " + ciclos);

    let saida = "NÚMERO DE ARESTAS: " + numArestas + "\n";
    saida += "BIAS: " + bias + "\n";
    saida += "TAXA DE APRENDIZADO: " + taxaAprendizado + "\n";
    saida += "CICLO: " + ciclos + "\n";

    printConsole(saida);

    let pesos = new Array(numArestas);

    for(let i = 0; i < numArestas; i++) {
        pesos[i] = (Math.random() * 2-1).toFixed(2);
        console.log(pesos[i]);
    }
    // console.log(entradaSplit[0].split(" "));
    calculaPerceptron(entradaSplit, numArestas, bias, taxaAprendizado, pesos, ciclos, saida);

    return 0;
}

function calculaPerceptron(entradaSplit, numArestas, bias, taxaAprendizado, pesos, ciclos, saida) {
    let i=0;
    let acerto;
    let terminou = false;

    while(i < ciclos && !terminou){
        acerto = 0;
        for (let j=0; j<entradaSplit.length; j++){
            let entradaLinha = entradaSplit[j].split(" ");
            let resultado = funcaoCalculoPerceptron(pesos, entradaLinha, bias);
            if(entradaLinha[numArestas] == resultado){
                acerto++;
            }else{
                for(let k=0; k<numArestas; k++){
                    pesos[k] = (entradaLinha[numArestas] - resultado) * taxaAprendizado * entradaLinha[k];
                }
                acerto--;
            }

            bias += taxaAprendizado * (entradaLinha[numArestas] - resultado) * -1;
            saida += "ENTRADA: " + j + " VALOR ESPERADO: " + entradaLinha[numArestas] + " VALOR ENCONTRADO: " + resultado + "\n";
            printConsole(saida);
        }
        if(acerto == entradaSplit.length){
            terminou = true;
        }
        i+=1;
    }
    
}

function funcaoCalculoPerceptron (pesos, linha, bias) {

    let resultado = 0;
    
    pesos.forEach((peso, posicao) => {
        resultado += (linha[posicao] * peso);
    });

    resultado += bias * -1;

    return (resultado >= 0) ? 1 : 0;
}

function printConsole(saida){
    document.getElementById('text-area-content-saida').innerHTML = saida;
}