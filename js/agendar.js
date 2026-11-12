const nome = document.getElementById("nome");
const data = document.getElementById("data");
const horario = document.getElementById("horario");
const btnSalvar = document.getElementById("btnSalvar");

const agendaEditar = JSON.parse(localStorage.getItem("agendaEditar"));


btnSalvar.addEventListener('click', (event) => {

    event.preventDefault();

    if (!nome.value.trim() || !data.value || !horario.value) {
        alert('Preencha todos os campos!');
        return;
    }

    const agenda = {
        nome: nome.value.trim(),
        data: data.value,
        horario: horario.value
    };

    let agendas = JSON.parse(localStorage.getItem('agendas')) || [];

  

    if (agendaEditar) {

        
        const indice = agendas.findIndex((item) => {
            return item.nome === agendaEditar.nome &&
                   item.data === agendaEditar.data &&
                   item.horario === agendaEditar.horario;
        });

        if (indice !== -1) {
            agendas[indice] = agenda;
        }

        localStorage.removeItem('agendaEditar');

        alert('Agendamento atualizado com sucesso!');

    } else {

        
        agendas.push(agenda);

        alert('Agendamento adicionado com sucesso!');
    }

    localStorage.setItem('agendas', JSON.stringify(agendas));

    nome.value = '';
    data.value = '';
    horario.value = '';

});


if (agendaEditar) {

    nome.value = agendaEditar.nome;
    data.value = agendaEditar.data;
    horario.value = agendaEditar.horario;

    document.getElementById("btnSalvar").textContent = "Salvar alterações";
}