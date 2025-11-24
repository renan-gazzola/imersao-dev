let cardContainer = document.querySelector(".card-container");
let dados = [];
const searchInput = document.getElementById("barra-pesquisa");

async function carregarDados() {
    let resposta = await fetch("data.json");
    dados = await resposta.json()
    renderizarCards(dados);    
}

function realizarBusca() {
    const termoBusca = searchInput.value.toLowerCase();
    const dadosFiltrados = dados.filter(time => {
        return time.nome.toLowerCase().includes(termoBusca);
    });
    renderizarCards(dadosFiltrados);
}


function renderizarCards(dados) {
    cardContainer.innerHTML = "";
    for (let dado of dados){
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
       <a href="${dado.link}" target="_blank"> <img src="${dado.escudo}" alt="Escudo do ${dado.nome} "> </a>
        <H2>${dado.nome}</H2>
        <p>${dado.descrição}</p>
        <p>${dado.ano}</p>
        `
        cardContainer.appendChild(article);
    }
}


// Adiciona um "ouvinte" para o evento de pressionar uma tecla no campo de busca
searchInput.addEventListener("keydown", function(event) {
    // Verifica se a tecla pressionada foi "Enter"
    if (event.key === "Enter") {
        realizarBusca();
    }
});

carregarDados();