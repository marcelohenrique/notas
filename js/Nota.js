var Nota = function(qGer, pesoGer, mediaGer, desvioPadGer, qEsp, pesoEsp,
		mediaEsp, desvioPadEsp) {
	// Gerais
	this.questaoGeral = qGer;
	this.pesoGeral = pesoGer;
	this.mediaGeral = mediaGer;
	this.desvioPadraoGeral = desvioPadGer;
	// Específicas
	this.questaoEspecifica = qEsp;
	this.pesoEspecifica = pesoEsp;
	this.mediaEspecifica = mediaEsp;
	this.desvioPadraoEspecifica = desvioPadEsp;
	// Notas
	this.notaGeral = this.calcularNota(this.mediaGeral, this.desvioPadraoGeral,
			this.questaoGeral, this.pesoGeral);
	this.notaEspecifica = this.calcularNota(this.mediaEspecifica,
			this.desvioPadraoEspecifica, this.questaoEspecifica,
			this.pesoEspecifica);
	this.notaTotal = (parseFloat(this.notaGeral) + parseFloat(this.notaEspecifica))
			.toFixed(2);
};

Nota.prototype.calcularNota = function(media, desvio, acertos, peso) {
	return (((((acertos - media) * 10) / desvio) + 50) * peso).toFixed(2);
};