
///<reference types="cypress"/> 

import { format, prepareLocalStorage, randomNumber } from '../support/utils'
//import { format, prepareLocalStorage } from "../support/utils";


//cy.viewport >> pesqueisar
//arquivos de config
//configs por linha de comadado
//dev.finances:transactions
//[{"description":"mesada","amount":1000000,"date":"01/12/1997"},{"description":"kinderOvo","amount":15000,"date":"03/03/2023"},{"description":"bel","amount":-15000,"date":"06/02/2023"}]


//npx cypress open --config viewportwith=412,viewportwith=914
// tem que criar atalho para esse comando
// npx cypress run --config viewportwith=412,viewportwith=914   >>> ainda grava o video 
//cypress:run:mobile >> 

context('Dev Finances Agilizei', () => {

  // hooks
  // techos de codigos que executam antes e depois do teste
  // before -> antes de todos os testes
  // beforeEach -> antes de cada teste
  // after -> depois de todos os testes
  // afterEach -> depois de cada teste
   

// antes de cada teste
beforeEach(() => {

  cy.visit('https://devfinance-agilizei.netlify.app/#', {
    onBeforeLoad:(win) =>{
      prepareLocalStorage(win)
      

    }
  
  
  }) // entrar no site
  //cy.get('#data-table tbody tr').should('have.length',0) // acerssão
});




  //cadastrar entradas
  it('Cadastrar entradas', () => {
      // - entender fluxo manualmente
      // - mapear os elementos que vamos interagir
      // - descrever as interações com o cypress
      // - adicionar as asserções que a gente precisa

      
      cy.get('#transaction .button').click() //id + classe
      cy.get('#description').type('Testecypress') //id
      cy.get('[name=amount]').type(12) // atributo
      cy.get('[type="date"]').type('2021-03-21') // atributo
      cy.get('button').contains('Salvar').click()// Tipo e valor
      cy.get('#data-table tbody tr').should('have.length',3) // acerssão 
      
    });

  //Cadastrar saida   [veja que tem que desativar o only]
  // saída: com o valor de menos 12

    it('Cadastrar saídas', () => {
      cy.visit('https://devfinance-agilizei.netlify.app/#')

      cy.get('#transaction .button').click() //id + classe
      cy.get('#description').type('Testecypress') //id
      cy.get('[name=amount]').type(-12) // atributo
      cy.get('[type="date"]').type('2021-03-21') // atributo
      cy.get('button').contains('Salvar').click()// Tipo e valor     
      cy.get('#data-table tbody tr').should('have.length',3) // acerssão 
      
    });


  //Remover entradas e saida

    it('Remover entradas e saída', () => {
      /*
      const entraga = 'emanoel' 
      const saida = 'kinderOvo'


      cy.get('#transaction .button').click() //id + classe
      cy.get('#description').type(entraga) //id
      cy.get('[name=amount]').type(100) // atributo
      cy.get('[type="date"]').type('2021-03-21') // atributo
      cy.get('button').contains('Salvar').click()// Tipo e valor
      
      cy.get('#transaction .button').click() //id + classe
      cy.get('#description').type(saida) //id
      cy.get('[name=amount]').type(-35) // atributo
      cy.get('[type="date"]').type('2021-03-21') // atributo
      cy.get('button').contains('Salvar').click()// Tipo e valor*/
      
      //estratégia: voltar para o elemento pai, e avançar para um td img att


      cy.get('td.description')// para filtrar mais a informa a ser buscada
        .contains('Mesada')//busca o texto dentro da variaver mesada
        .parent() //parente pai
        .find('img[onclick*=remove]') //busca 
        .click()
      
        //estratégia 2: buscar todos os irmão, e buscar o que tem a img + attr desejado

      cy.get('td.description')
        .contains('Emanoel') // 
        .siblings() // buscar elementos irmão
        .children('img[onclick*=remove]') // pra ver qual deles tem filho
        .click() //dar um click
        cy.get('#data-table tbody tr').should('have.length',0) // acerssão

    });

    it('Validar saldo com diversas transações', () => {/*
      const entraga = 'emanoel' 
      const saida = 'kinderOvo'


      cy.get('#transaction .button').click() //id + classe
      cy.get('#description').type(entraga) //id
      cy.get('[name=amount]').type(100) // atributo
      cy.get('[type="date"]').type('2021-03-21') // atributo
      cy.get('button').contains('Salvar').click()// Tipo e valor
      
      cy.get('#transaction .button').click() //id + classe
      cy.get('#description').type(saida) //id
      cy.get('[name=amount]').type(-35) // atributo
      cy.get('[type="date"]').type('2021-03-21') // atributo
      cy.get('button').contains('Salvar').click()// Tipo e valor*/
            
        // capiturar as linha com as transações
        //capturar o texto dessas colunas
        // formatar os valores da linhas
        // soma os valores de entrada e saida
        
        // Capturar o texto do total
        // comparar o somatorio de entradas e despesas com o total 

        let incomes = 0
        let expenses = 0
        


        cy.get('#data-table tbody tr') // para ter acesso as linhas da tabela (encontrou a quantidade de linha)
          .each(($el, index,$list) => { //. each >> serve para navegar em cada iteem e executar deter,imada ação (é tipo um for)
            //cy.log(index)


            cy.get($el).find('td.income,td.expense')
            // o then passa a variave text que vai ter o conteudo que pegou do invoke e trata ele. 
              .invoke('text').then(text => { //invoca uma funçao do javaScript: a função é >> text / para obter o texto / return o texto

                //cy.log(text) // texto não formatado
                //cy.log(format(text)) // texto formatado

                if (text.includes('-')) {
                  expenses = expenses + format(text)
                }else{
                  incomes = incomes + format(text)
                }
                cy.log('entradas', incomes)
                cy.log('saidas', expenses)
                


              })

          })
          cy.get('.card.total p#totalDisplay')
            .invoke('text').then(text => {
              //cy.log('Valor Total', format(text))

              let formattedTotalDisplay = format(text)
              let expectedTotal = incomes + expenses
              //espero que o total fomartted. seja igual a expectedTotal
              expect(formattedTotalDisplay).to.eq(expectedTotal)
              
              
            })
    
    
      });


  });

      // - entender fluxo manualmente
      // - mapear os elementos que vamos interagir
      // - descrever as interações com o cypress
      // - adicionar as asserções que a gente precisa