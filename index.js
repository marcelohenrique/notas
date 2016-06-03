function calcular() {
   var geraisQuestoes = parseInt( $( '#geraisQuestoes' ).val() );
   var geraisPeso = parseInt( $( '#geraisPeso' ).val() );
   var geraisMedia = parseFloat( $( '#geraisMedia' ).val() );
   var geraisDesvio = parseFloat( $( '#geraisDesvio' ).val() );
   // geraisQuestoes = 30;
   // geraisPeso = 1;
   // geraisMedia = 15.94;
   // geraisDesvio = 4.48;

   var espQuestoes = parseInt( $( '#espQuestoes' ).val() );
   var espPeso = parseInt( $( '#espPeso' ).val() );
   var espMedia = parseFloat( $( '#espMedia' ).val() );
   var espDesvio = parseFloat( $( '#espDesvio' ).val() );
   // espQuestoes = 50;
   // espPeso = 2;
   // espMedia = 19.33;
   // espDesvio = 6.55;

   var notaCorte = parseInt( $( '#notaCorte' ).val() );
   // notaCorte = 180;

   // var acertoGer = $( '#acertoGer' ).val();
   // var acertoEsp = $( '#acertoEsp' ).val();
   var notasConcurso = $( '#notas' ).val().split( '\n' );
   // var acertoGerIndividual = $('#acertoGerIndividual');
   // var acertoEspIndividual = $('#acertoEspIndividual');
   // notaIndividual = 309.55;
   // notasConcurso =
   // '236.38\n228.65\n224.18\n219.49\n208.10\n206.90\n207.50\n206.67'
   // .split( '\n' );

   $( '#resultado > tbody' ).remove();
   $( '#resultado' ).append( '<tbody>' );

   var notasGeradas = [];
   for ( i = geraisQuestoes; i > 0; i-- ) {
      for ( j = espQuestoes; j > 0; j-- ) {

         notasGeradas.push( new Nota( i, geraisPeso, geraisMedia, geraisDesvio,
               j, espPeso, espMedia, espDesvio ) );

         // notaGerais = nota(geraisMedia, geraisDesvio, i, geraisPeso);
         // notaEsp = nota(espMedia, espDesvio, j, espPeso);
         // notaTotal = (parseFloat(notaGerais) + parseFloat(notaEsp))
         // .toFixed(2);

      }
   }

   notasGeradas.sort( function( n1, n2 ) {
      return n1.notaTotal - n2.notaTotal;
   } );
   notasGeradas.reverse();

   var cont = 0;
   for ( i = 0; i < notasGeradas.length; i++ ) {
      var notaGerada = notasGeradas[ i ];
      // if (nota.notaTotal == notaIndividual) {
      // acertoGerIndividual.val(i);
      // acertoEspIndividual.val(j);
      // }

      var linha = $( '<tr>' );
      // linha = $('#resultado > tr:last-child')
      // #
      if ( ( cont < notasConcurso.length )
            && ( notaMaisProxima( parseFloat( notasConcurso[ cont ] ).toFixed(
                  2 ), notasGeradas, i ) ) ) {

         var classificacao = '' + ++cont;
         var mais = false;
         while ( ( cont < notasConcurso.length )
               && ( notaMaisProxima( parseFloat( notasConcurso[ cont ] )
                     .toFixed( 2 ), notasGeradas, i ) ) ) {
            cont++;
            mais = true;
            // console.log(cont + ' - '
            // + parseFloat(notasGeradas[i + 1].notaTotal).toFixed(2)
            // + ' - '
            // + parseFloat(notasConcurso[cont - 1]).toFixed(2));
         }
         if ( mais ) {
            classificacao += ' - ' + cont;
         }
         linha.append( coluna( classificacao ) );
         linha.addClass( 'success' );
      } else {
         linha.append( coluna( '' ) );
      }
      if ( notaGerada.notaTotal < notaCorte ) {
         linha.addClass( 'danger' );
      }
      linha.append( coluna( notaGerada.questaoGeral ) ); // Acertos Gerais
      linha.append( coluna( notaGerada.questaoEspecifica ) ); // Acertos
      // Específica
      linha.append( coluna( ( 1 * notaGerada.questaoGeral )
            + ( 1 * notaGerada.questaoEspecifica ) ) ); // Acertos
      // Total
      linha.append( coluna( notaGerada.questaoGeral * geraisPeso ) ); // Pontos
      // Gerais
      linha.append( coluna( notaGerada.questaoEspecifica * espPeso ) ); // Pontos
      // Específica
      linha.append( coluna( ( notaGerada.questaoGeral * geraisPeso )
            + ( notaGerada.questaoEspecifica * espPeso ) ) ); // Pontos
      // Total
      linha.append( coluna( notaGerada.notaGeral ) ); // Nota
      // Gerais
      linha.append( coluna( notaGerada.notaEspecifica ) ); // Nota
      // Específicas
      linha.append( coluna( notaGerada.notaTotal ) ); // Nota
      // Total

      $( '#resultado > tbody:last-child' ).append( linha );
   }
   mostrar();
}

function mostrar() {
   var mostrarTudo = $( '#mostrarTudo:checked' ).val() == undefined ? false
         : true;
   if ( mostrarTudo ) {
      $( '#resultado > tbody > tr[class!=success]' ).show();
   } else {
      $( '#resultado > tbody > tr[class!=success]' ).hide();
   }
}

function coluna( valor ) {
   return $( '<td>' ).text( valor );
}

function notaMaisProxima( nota, notasGeradas, i ) {
   var proximaNota = parseFloat( notasGeradas[ i + 1 ].notaTotal ).toFixed( 2 );

   if ( proximaNota < nota ) {

      var notaMaior = parseFloat( notasGeradas[ i ].notaTotal ).toFixed( 2 );
      var distanciaNotaMaior = notaMaior - nota;
      var distanciaNotaMenor = nota - proximaNota;

      if ( distanciaNotaMaior < distanciaNotaMenor ) {
         return true;
      }
   }
   return false;
}