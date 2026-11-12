
const tabela = document.getElementById("tabelaAgendamentos");
const filtroData = document.getElementById("filtroData");
const botaoEditar = document.getElementById("botaoEditar");
const botaoExcluir = document.getElementById("botaoExcluir");


let agendas = JSON.parse(localStorage.getItem("agendas")) || [];


if (!Array.isArray(agendas)) {
    agendas = [agendas];
}


function mostrarAgendamentos(lista) {

    
    tabela.innerHTML = "";

    
    if (lista.length === 0) {
        const linha = document.createElement("tr");
        const coluna = document.createElement("td");

        coluna.colSpan = 3;
        coluna.textContent = "Nenhum agendamento encontrado.";

        linha.appendChild(coluna);
        tabela.appendChild(linha);

        return;
    }

    
    lista.forEach((agenda) => {

        const linha = document.createElement("tr");

        const colunaNome = document.createElement("td");
        const colunaData = document.createElement("td");
        const colunaHorario = document.createElement("td");

        colunaNome.textContent = agenda.nome;

        
        const partesData = agenda.data.split("-");
        colunaData.textContent = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;

        colunaHorario.textContent = agenda.horario;

        
        linha.appendChild(colunaNome);
        linha.appendChild(colunaData);
        linha.appendChild(colunaHorario);

        linha.addEventListener("click", () => {
    linha.classList.toggle("selecionado");
});
        
        tabela.appendChild(linha);

    });

}


mostrarAgendamentos(agendas);


filtroData.addEventListener("change", () => {

    const dataSelecionada = filtroData.value;

    if (!dataSelecionada) {
        mostrarAgendamentos(agendas);
        return;
    }

    
    const agendamentosFiltrados = agendas.filter((agenda) => {
        return agenda.data === dataSelecionada;
    });

    mostrarAgendamentos(agendamentosFiltrados);

});


botaoEditar.addEventListener("click", () => {

    const linhasSelecionadas = Array.from(
        tabela.querySelectorAll("tr.selecionado")
    );

    if (linhasSelecionadas.length === 0) {
        alert("Selecione um agendamento para editar!");
        return;
    }

    if (linhasSelecionadas.length > 1) {
        alert("Selecione apenas um agendamento!");
        return;
    }

    const linha = linhasSelecionadas[0];

    const nome = linha.cells[0].textContent;
    const data = linha.cells[1].textContent.split("/").reverse().join("-");
    const horario = linha.cells[2].textContent;

    const agendaSelecionada = agendas.find((agenda) => {
        return agenda.nome === nome &&
               agenda.data === data &&
               agenda.horario === horario;
    });

    localStorage.setItem(
        "agendaEditar",
        JSON.stringify(agendaSelecionada)
    );

    window.location.href = "agendar.html";
});



botaoExcluir.addEventListener("click", () => {

    const linhasSelecionadas = Array.from(
        tabela.querySelectorAll("tr.selecionado")
    );

    if (linhasSelecionadas.length === 0) {
        alert("Selecione pelo menos um registro para excluir!");
        return;
    }

    const confirmar = confirm("Deseja realmente excluir os registros selecionados?");

    if (confirmar) {

        linhasSelecionadas.forEach((linha) => {

            const nome = linha.cells[0].textContent;
            const dataFormatada = linha.cells[1].textContent;
            const horario = linha.cells[2].textContent;

            const data = dataFormatada.split("/").reverse().join("-");

            agendas = agendas.filter((agenda) => {
                return !(
                    agenda.nome === nome &&
                    agenda.data === data &&
                    agenda.horario === horario
                );
            });

        });

        localStorage.setItem("agendas", JSON.stringify(agendas));

        mostrarAgendamentos(agendas);

        alert("Agendamento(s) excluído(s) com sucesso!");
    }
});