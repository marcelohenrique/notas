function calcular() {
	var geraisQuestoes = $('#geraisQuestoes').val();
	var geraisPeso = $('#geraisPeso').val();
	var geraisMedia = $('#geraisMedia').val();
	var geraisDesvio = $('#geraisDesvio').val();
	geraisQuestoes = 20;
	geraisPeso = 1;
	geraisMedia = 13.01;
	geraisDesvio = 3.52;

	var espQuestoes = $('#espQuestoes').val();
	var espPeso = $('#espPeso').val();
	var espMedia = $('#espMedia').val();
	var espDesvio = $('#espDesvio').val();
	espQuestoes = 40;
	espPeso = 3;
	espMedia = 18.77;
	espDesvio = 5.42;

	var notaCorte = $('#notaCorte').val();
	notaCorte = 200;

	// var acertoGer = $( '#acertoGer' ).val();
	// var acertoEsp = $( '#acertoEsp' ).val();
	var notasConcurso = $('#notas').val().split('\n');
	// var acertoGerIndividual = $('#acertoGerIndividual');
	// var acertoEspIndividual = $('#acertoEspIndividual');
	// notaIndividual = 309.55;

	$('#resultado > tbody').remove();
	$('#resultado').append('<tbody>');

	var notasGeradas = [];
	for (i = geraisQuestoes; i > 0; i--) {
		for (j = espQuestoes; j > 0; j--) {

			notasGeradas.push(new Nota(i, geraisPeso, geraisMedia,
					geraisDesvio, j, espPeso, espMedia, espDesvio));

			// notaGerais = nota(geraisMedia, geraisDesvio, i, geraisPeso);
			// notaEsp = nota(espMedia, espDesvio, j, espPeso);
			// notaTotal = (parseFloat(notaGerais) + parseFloat(notaEsp))
			// .toFixed(2);

		}
	}

	notasGeradas.sort(function(n1, n2) {
		return n1.notaTotal - n2.notaTotal;
	});
	notasGeradas.reverse();

	var cont = 0;
	for (i = 0; i < notasGeradas.length; i++) {
		var notaGerada = notasGeradas[i];
		// if (nota.notaTotal == notaIndividual) {
		// acertoGerIndividual.val(i);
		// acertoEspIndividual.val(j);
		// }

		var linha = $('<tr>');
		// linha = $('#resultado > tr:last-child')
		// #
		if ((cont < notasConcurso.length)
				&& (parseFloat(notasGeradas[i + 1].notaTotal).toFixed(2) < parseFloat(
						notasConcurso[cont]).toFixed(2))) {
			var classificacao = '' + ++cont;
			var mais = false;
			while ((cont < notasConcurso.length)
					&& (parseFloat(notasGeradas[i + 1].notaTotal).toFixed(2) < parseFloat(
							notasConcurso[cont]).toFixed(2))) {
				cont++;
				mais = true;
				console.log(cont + ' - '
						+ parseFloat(notasGeradas[i + 1].notaTotal).toFixed(2)
						+ ' - '
						+ parseFloat(notasConcurso[cont - 1]).toFixed(2));
			}
			if (mais) {
				classificacao += ' - ' + cont;
			}
			linha.append(coluna(classificacao));
			linha.addClass('success');
		} else {
			linha.append(coluna(''));
		}
		if (notaGerada.notaTotal < notaCorte) {
			linha.addClass('danger');
		}
		linha.append(coluna(notaGerada.questaoGeral)); // Acertos Gerais
		linha.append(coluna(notaGerada.questaoEspecifica)); // Acertos
		// Específica
		linha.append(coluna(notaGerada.questaoGeral
				+ notaGerada.questaoEspecifica)); // Acertos
		// Total
		linha.append(coluna(notaGerada.questaoGeral * geraisPeso)); // Pontos
		// Gerais
		linha.append(coluna(notaGerada.questaoEspecifica * espPeso)); // Pontos
		// Específica
		linha.append(coluna((notaGerada.questaoGeral * geraisPeso)
				+ (notaGerada.questaoEspecifica * espPeso))); // Pontos
		// Total
		linha.append(coluna(notaGerada.notaGeral)); // Nota
		// Gerais
		linha.append(coluna(notaGerada.notaEspecifica)); // Nota
		// Específicas
		linha.append(coluna(notaGerada.notaTotal)); // Nota
		// Total

		$('#resultado > tbody:last-child').append(linha);
	}
}

function coluna(valor) {
	return $('<td>').text(valor);
}