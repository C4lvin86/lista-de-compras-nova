let itens = [];
let editIndex = -1;

function adicionarOuEditarItem() {
    const nome = document.getElementById('itemNome').value;
    const qtd = parseFloat(document.getElementById('itemQtd').value) || 1;
    const peso = parseFloat(document.getElementById('itemPeso').value) || 0;
    const valor = parseFloat(document.getElementById('itemValor').value) || 0;

    if (nome) {
        const totalItem = peso > 0 ? (qtd * peso * valor).toFixed(2) : (qtd * valor).toFixed(2);
        if (editIndex === -1) {
            itens.push({ nome, qtd, peso, valor, totalItem });
        } else {
            itens[editIndex] = { nome, qtd, peso, valor, totalItem };
            editIndex = -1;
            document.getElementById('btnAcao').textContent = 'Adicionar';
        }
        atualizarTabela();
        limparCampos();
    } else {
        alert('O nome do item é obrigatório!');
    }
}

function adicionarItemPreDefinido(nome) {
    const qtd = 1;
    const peso = 0;
    const valor = 0;
    const totalItem = (qtd * valor).toFixed(2);
    itens.push({ nome, qtd, peso, valor, totalItem });
    atualizarTabela();
}

function removerItem(index) {
    itens.splice(index, 1);
    atualizarTabela();
}

function editarItem(index) {
    const item = itens[index];
    document.getElementById('itemNome').value = item.nome;
    document.getElementById('itemQtd').value = item.qtd;
    document.getElementById('itemPeso').value = item.peso;
    document.getElementById('itemValor').value = item.valor;
    document.getElementById('btnAcao').textContent = 'Salvar Edição';
    editIndex = index;
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
            <td>
                <button onclick="editarItem(${index})">Editar</button>
                <button onclick="removerItem(${index})">X</button>
            </td>
        `;
        listaItens.appendChild(row);
        totalGeral += parseFloat(item.totalItem);
    });

    document.getElementById('totalGeral').textContent = totalGeral.toFixed(2);
    document.getElementById('totalItens').textContent = itens.length;
}

function limparCampos() {
    document.getElementById('itemNome').value = '';
    document.getElementById('itemQtd').value = '';
    document.getElementById('itemPeso').value = '';
    document.getElementById('itemValor').value = '';
    editIndex = -1;
    document.getElementById('btnAcao').textContent = 'Adicionar';
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

function limparLista() {
    if (confirm('Tem certeza que deseja limpar a lista?')) {
        itens = [];
        atualizarTabela();
    }
}