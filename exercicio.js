/*
705.484.450-52 070.987.720-03

 7x 0x 5x 4x 8x 4x 4x 5x 0x 
10  9  8  7  6  5  4  3  2
77  0  40 28 48 20 16 15 0

7x 0x 5x 4x 8x 4x 4x 5x 0x 5x
11 10 9  8  7  6  5  4  3  2
77 0  45 32 56 24 20 20 0  10 

11 - (237 % 11) = 5 (Primeiro dígito)
11 - (284 % 11) = 2 (Primeiro dígito)

se o número for maior que 9, será considerado 0

concatenar os digitos com o resultado e comparar os dois cpfs resultantes
#cpf precisa ser uma string
#na hora de fazer a conta converter string para number
#expressão regulares:

*/



function ValidaCpf(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', {
        get: function() {
            return cpfEnviado.replace(/\D+/g, '');
        }
    });
}

ValidaCpf.prototype.valida = function() {
    if(typeof this.cpfLimpo === 'undefined') return false;
    if(this.cpfLimpo.length !== 11) return false;
    if(this.isSequencial()) return false;
    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.digito(cpfParcial);
    const digito2 = this.digito(cpfParcial + digito1);
    const novoCpf = cpfParcial + digito1 + digito2;
    return novoCpf === this.cpfLimpo;
};

ValidaCpf.prototype.digito = function(cpfParcial) {
    const cpfArray = Array.from(cpfParcial);
    let contagem = cpfArray.length + 1;
    const total = cpfArray.reduce((acumulador, valorAtual) => {
        acumulador += (contagem * Number(valorAtual));
        contagem--;
        return acumulador;
    }, 0);

    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito);
};

ValidaCpf.prototype.isSequencial = function() {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
};
const cpf = new ValidaCpf('705.484.450-52');

if(cpf.valida()) {
    console.log('CPF VÀLIDO');
} else {
    console.log('CPF INVÁLIDO');
}


