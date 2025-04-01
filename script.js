let itens = [];

function adicionarItem() {
    const nome = document.getElementById('itemNome').value;
    const qtd = parseFloat(document.getElementById('itemQtd').value) || 0;
    const peso = parseFloat(document.getElementById('itemPeso').value) || 0;
    const valor = parseFloat(document.getElementById('itemValor').value) || 0;

    if (nome && qtd > 0 && peso > 0 && valor > 0) {
        const totalItem = (qtd * peso * valor).toFixed(2);
        itens.push({ nome, qtd, peso, valor, totalItem });
        atualizarTabela();
        limparCampos();
    } else {
        alert('Preencha todos os campos corretamente!');
    }
}

function removerItem(index) {
    itens.splice(index, 1);
    atualizarTabela();
}

function atualizarTabela() {
    const listaItens = document.getElementById('listaItens');
    listaItens.innerHTML = '';
    let totalGeral = 0;

    itens.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.qtd}</td>
            <td>${item.peso}</td>
            <td>${item.valor.toFixed(2)}</td>
            <td>${item.totalItem}</td>
            <td><button onclick="removerItem(${index})">X</button></td>
        `;
        listaItens.appendChild(row);
        totalGeral += parseFloat(item.totalItem);
    });

    document.getElementById('totalGeral').textContent = totalGeral.toFixed(2);
}

function limparCampos() {
    document.getElementById('itemNome').value = '';
    document.getElementById('itemQtd').value = '';
    document.getElementById('itemPeso').value = '';
    document.getElementById('itemValor').value = '';
}

function salvarLista() {
    localStorage.setItem('listaCompras', JSON.stringify(itens));
    alert('Lista salva com sucesso!');
}

function carregarLista() {
    const listaSalva = localStorage.getItem('listaCompras');
    if (listaSalva) {
        itens = JSON.parse(listaSalva);
        atualizarTabela();
    } else {
        alert('Nenhuma lista salva encontrada!');
    }
}