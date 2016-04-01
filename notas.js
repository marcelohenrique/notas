function calcular() {
   var geraisQuestoes = $( '#geraisQuestoes' ).val();
   var geraisPeso = $( '#geraisPeso' ).val();
   var geraisMedia = $( '#geraisMedia' ).val();
   var geraisDesvio = $( '#geraisDesvio' ).val();

   var espQuestoes = $( '#espQuestoes' ).val();
   var espPeso = $( '#espPeso' ).val();
   var espMedia = $( '#espMedia' ).val();
   var espDesvio = $( '#espDesvio' ).val();

   // var acertoGer = $( '#acertoGer' ).val();
   // var acertoEsp = $( '#acertoEsp' ).val();
   var nota = $( '#nota' ).val();

   $( '#resultado > tbody' ).remove();
   $( '#resultado' ).append( '<tbody>' );

   cont = 1;
   for ( i = 0; i <= geraisQuestoes; i++ ) {
      for ( j = 0; j <= espQuestoes; j++ ) {
         linha = $( '<tr>' );
         $( '#resultado > tbody:last-child' ).append( linha );
         // linha = $('#resultado > tr:last-child')
         linha.append( coluna( cont++ ) ); // #
         linha.append( coluna( i ) ); // Acertos Gerais
         linha.append( coluna( j ) ); // Acertos Específica
         linha.append( coluna( i + j ) ); // Acertos Total
         linha.append( coluna( i * geraisPeso ) ); // Pontos Gerais
         linha.append( coluna( j * espPeso ) ); // Pontos Específica
         linha.append( coluna( ( i * geraisPeso ) + ( j * espPeso ) ) ); // Pontos
         // Total
         notaGerais = nota( geraisMedia, geraisDesvio, i, geraisPeso );
         notaEsp = nota( espMedia, espDesvio, j, espPeso );
         notaTotal = ( parseFloat( notaGerais ) + parseFloat( notaEsp ) )
               .toFixed( 2 );
         linha.append( coluna( notaGerais ) ); // Nota
         // Gerais
         linha.append( coluna( notaEsp ) ); // Nota
         // Específicas
         linha.append( coluna( notaTotal ) ); // Nota
         // Total
      }
   }
}

function coluna( valor ) {
   return $( '<td>' ).text( valor );
}

function nota( media, desvio, acertos, peso ) {
   return ( ( ( ( ( acertos - media ) * 10 ) / desvio ) + 50 ) * peso )
         .toFixed( 2 );
}