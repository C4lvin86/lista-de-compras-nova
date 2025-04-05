let itens = [];
let editIndex = -1;
const { jsPDF } = window.jspdf;

// Lista de itens pré-definidos com categorias (mantida como na última versão)
const itensPreDefinidos = {
    "arroz": "Alimentos básicos",
    "feijão": "Alimentos básicos",
    "macarrão": "Alimentos básicos",
    "farinha de trigo": "Alimentos básicos",
    "farinha de mandioca": "Alimentos básicos",
    "farinha de milho": "Alimentos básicos",
    "aveia": "Alimentos básicos",
    "fubá": "Alimentos básicos",
    "lentilha": "Alimentos básicos",
    "grão-de-bico": "Alimentos básicos",
    "milho de pipoca": "Alimentos básicos",
    "pão francês": "Pães e massas",
    "pão de forma": "Pães e massas",
    "pão de hambúrguer": "Pães e massas",
    "pão de hot dog": "Pães e massas",
    "pão de queijo": "Pães e massas",
    "torradas": "Pães e massas",
    "wraps": "Pães e massas",
    "massa de pizza": "Pães e massas",
    "massa de lasanha": "Pães e massas",
    "carne bovina": "Proteínas",
    "frango": "Proteínas",
    "carne suína": "Proteínas",
    "peixes": "Proteínas",
    "frutos do mar": "Proteínas",
    "linguiça": "Proteínas",
    "salsicha": "Proteínas",
    "hambúrguer congelado": "Proteínas",
    "bacon": "Proteínas",
    "ovos": "Ovos e laticínios",
    "leite": "Ovos e laticínios",
    "leite em pó": "Ovos e laticínios",
    "leite condensado": "Ovos e laticínios",
    "creme de leite": "Ovos e laticínios",
    "queijos": "Ovos e laticínios",
    "requeijão": "Ovos e laticínios",
    "manteiga": "Ovos e laticínios",
    "margarina": "Ovos e laticínios",
    "iogurte": "Ovos e laticínios",
    "leite fermentado": "Ovos e laticínios",
    "alface": "Legumes e verduras",
    "rúcula": "Legumes e verduras",
    "agrião": "Legumes e verduras",
    "espinafre": "Legumes e verduras",
    "couve": "Legumes e verduras",
    "brócolis": "Legumes e verduras",
    "couve-flor": "Legumes e verduras",
    "tomate": "Legumes e verduras",
    "cenoura": "Legumes e verduras",
    "beterraba": "Legumes e verduras",
    "pepino": "Legumes e verduras",
    "abobrinha": "Legumes e verduras",
    "berinjela": "Legumes e verduras",
    "pimentão": "Legumes e verduras",
    "chuchu": "Legumes e verduras",
    "batata": "Legumes e verduras",
    "mandioca": "Legumes e verduras",
    "inhame": "Legumes e verduras",
    "rabanete": "Legumes e verduras",
    "cebola": "Legumes e verduras",
    "alho": "Legumes e verduras",
    "banana": "Frutas",
    "maçã": "Frutas",
    "laranja": "Frutas",
    "mamão": "Frutas",
    "abacaxi": "Frutas",
    "melancia": "Frutas",
    "melão": "Frutas",
    "morango": "Frutas",
    "uva": "Frutas",
    "pera": "Frutas",
    "kiwi": "Frutas",
    "manga": "Frutas",
    "abacate": "Frutas",
    "maracujá": "Frutas",
    "limão": "Frutas",
    "nuggets": "Congelados e processados",
    "lasanha congelada": "Congelados e processados",
    "pizzas congeladas": "Congelados e processados",
    "batata frita congelada": "Congelados e processados",
    "polpa de fruta": "Congelados e processados",
    "sal": "Temperos e condimentos",
    "açúcar": "Temperos e condimentos",
    "pimenta-do-reino": "Temperos e condimentos",
    "páprica": "Temperos e condimentos",
    "curry": "Temperos e condimentos",
    "orégano": "Temperos e condimentos",
    "manjericão": "Temperos e condimentos",
    "noz-moscada": "Temperos e condimentos",
    "alecrim": "Temperos e condimentos",
    "cominho": "Temperos e condimentos",
    "molho de tomate": "Temperos e condimentos",
    "extrato de tomate": "Temperos e condimentos",
    "molho inglês": "Temperos e condimentos",
    "mostarda": "Temperos e condimentos",
    "ketchup": "Temperos e condimentos",
    "maionese": "Temperos e condimentos",
    "vinagre": "Temperos e condimentos",
    "azeite de oliva": "Temperos e condimentos",
    "óleo de soja": "Temperos e condimentos",
    "óleo de girassol": "Temperos e condimentos",
    "óleo de coco": "Temperos e condimentos",
    "água mineral": "Bebidas",
    "refrigerante": "Bebidas",
    "suco": "Bebidas",
    "café": "Bebidas",
    "chá": "Bebidas",
    "achocolatado": "Bebidas",
    "energético": "Bebidas",
    "cerveja": "Bebidas",
    "vinho": "Bebidas",
    "leite vegetal": "Bebidas",
    "biscoitos": "Doces e snacks",
    "chocolate": "Doces e snacks",
    "balas": "Doces e snacks",
    "amendoim": "Doces e snacks",
    "pipoca de micro-ondas": "Doces e snacks",
    "barra de cereais": "Doces e snacks",
    "fermento biológico": "Produtos de padaria",
    "fermento químico": "Produtos de padaria",
    "coco ralado": "Produtos de padaria",
    "sabonete": "Higiene pessoal",
    "shampoo": "Higiene pessoal",
    "condicionador": "Higiene pessoal",
    "creme dental": "Higiene pessoal",
    "escova de dentes": "Higiene pessoal",
    "fio dental": "Higiene pessoal",
    "desodorante": "Higiene pessoal",
    "perfume": "Higiene pessoal",
    "papel higiênico": "Higiene pessoal",
    "absorvente": "Higiene pessoal",
    "aparelho de barbear": "Higiene pessoal",
    "detergente": "Limpeza doméstica",
    "sabão em pó": "Limpeza doméstica",
    "amaciante": "Limpeza doméstica",
    "água sanitária": "Limpeza doméstica",
    "desinfetante": "Limpeza doméstica",
    "esponjas": "Limpeza doméstica",
    "sacos de lixo": "Limpeza doméstica",
    "papel toalha": "Limpeza doméstica"
};

function adicionarOuEditarItem() {
    const nome = document.getElementById('itemNome').value.trim();
    const qtd = parseFloat(document.getElementById('itemQtd').value) || 1;
    const peso = parseFloat(document.getElementById('itemPeso').value) || 0;
    const valor = parseFloat(document.getElementById('itemValor').value) || 0;
    let categoria = document.getElementById('itemCategoria').value;

    if (nome) {
        const totalItem = peso > 0 ? (qtd * peso * valor).toFixed(2) : (qtd * valor).toFixed(2);
        const item = { nome, qtd, peso, valor, totalItem, categoria, comprado: false };
        if (editIndex === -1) {
            itens.push(item);
            showToast(`Item "${nome}" adicionado!`);
        } else {
            itens[editIndex] = item;
            editIndex = -1;
            document.getElementById('btnAcao').textContent = 'Adicionar';
            showToast(`Item "${nome}" editado!`);
        }
        atualizarTabela();
        limparCampos();
    } else {
        alert('O nome do item é obrigatório!');
    }
}

function removerItem(index) {
    const nome = itens[index].nome;
    itens.splice(index, 1);
    atualizarTabela();
    showToast(`Item "${nome}" removido!`);
}

function editarItem(index) {
    const item = itens[index];
    document.getElementById('itemNome').value = item.nome;
    document.getElementById('itemQtd').value = item.qtd;
    document.getElementById('itemPeso').value = item.peso;
    document.getElementById('itemValor').value = item.valor;
    document.getElementById('itemCategoria').value = item.categoria;
    document.getElementById('btnAcao').textContent = 'Salvar Edição';
    editIndex = index;
}

function atualizarTabela(filtro = 'all') {
    const listaItens = document.getElementById('listaItens');
    listaItens.innerHTML = '';
    let totalGeral = 0;

    itens
        .filter(item => item && (filtro === 'all' || item.categoria === filtro))
        .forEach((item, index) => {
            const row = document.createElement('tr');
            row.classList.add('fade-in');
            row.innerHTML = `
                <td><input type="checkbox" ${item.comprado ? 'checked' : ''} onchange="toggleComprado(${index})"></td>
                <td style="text-decoration: ${item.comprado ? 'line-through' : 'none'}">${item.nome} (${item.categoria})</td>
                <td>${item.qtd}</td>
                <td>${item.peso}</td>
                <td>${item.valor.toFixed(2)}</td>
                <td>${item.totalItem}</td>
                <td>
                    <button onclick="editarItem(${index})">✏️</button>
                    <button onclick="removerItem(${index})">🗑️</button>
                </td>
            `;
            listaItens.appendChild(row);
            totalGeral += parseFloat(item.totalItem);
        });

    document.getElementById('totalGeral').textContent = totalGeral.toFixed(2);
    document.getElementById('totalItens').textContent = itens.length;
}

function toggleComprado(index) {
    if (itens[index]) {
        itens[index].comprado = !itens[index].comprado;
        atualizarTabela(document.getElementById('filterCategoria').value);
    }
}

function limparCampos() {
    document.getElementById('itemNome').value = '';
    document.getElementById('itemQtd').value = '';
    document.getElementById('itemPeso').value = '';
    document.getElementById('itemValor').value = '';
    document.getElementById('itemCategoria').value = 'Alimentos básicos';
    editIndex = -1;
    document.getElementById('btnAcao').textContent = 'Adicionar';
}

function salvarLista() {
    const timestamp = new Date().toISOString();
    const listaAtual = { timestamp, itens: [...itens] };
    let historico = JSON.parse(localStorage.getItem('historicoListas')) || [];
    historico.push(listaAtual);
    localStorage.setItem('historicoListas', JSON.stringify(historico));
    localStorage.setItem('listaCompras', JSON.stringify(itens));
    showToast('Lista salva com sucesso!');
}

function carregarLista() {
    const listaSalva = localStorage.getItem('listaCompras');
    if (listaSalva) {
        itens = JSON.parse(listaSalva);
        atualizarTabela();
        showToast('Lista carregada com sucesso!');
    } else {
        alert('Nenhuma lista salva encontrada!');
    }
}

function limparLista() {
    if (confirm('Tem certeza que deseja limpar a lista?')) {
        itens = [];
        atualizarTabela();
        showToast('Lista limpa!');
    }
}

function filtrarLista() {
    const filtro = document.getElementById('filterCategoria').value;
    atualizarTabela(filtro);
}

function exportarPDF() {
    const doc = new jsPDF();
    doc.text("Lista de Compras", 10, 10);
    let y = 20;
    itens
        .filter(item => item)
        .forEach((item) => {
            const texto = `${item.comprado ? '[X]' : '[ ]'} ${item.nome} (${item.categoria}) - Qtd: ${item.qtd}, Total: R$${item.totalItem}`;
            doc.text(texto, 10, y);
            y += 10;
        });
    doc.text(`Total Geral: R$${document.getElementById('totalGeral').textContent}`, 10, y + 10);
    doc.save("lista-de-compras.pdf");
    toggleMenu();
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.style.opacity = '1';
        setTimeout(() => { toast.style.opacity = '0'; }, 2000);
    }
}

function atualizarAutocompletarECategoria() {
    const input = document.getElementById('itemNome');
    const datalist = document.getElementById('suggestions');
    const selectCategoria = document.getElementById('itemCategoria');
    const valorInput = input.value.trim().toLowerCase();

    const nomesPreDefinidos = Object.keys(itensPreDefinidos);
    datalist.innerHTML = nomesPreDefinidos
        .filter(nome => nome.toLowerCase().startsWith(valorInput))
        .map(nome => `<option value="${nome}">`)
        .join('');

    const categoria = itensPreDefinidos[valorInput] || 'Outros';
    selectCategoria.value = categoria;
}

function toggleMenu() {
    const menuDropdown = document.getElementById('menu-dropdown');
    menuDropdown.style.display = menuDropdown.style.display === 'block' ? 'none' : 'block';
}

function mostrarHistorico() {
    const historico = JSON.parse(localStorage.getItem('historicoListas')) || [];
    const historicoLista = document.getElementById('historico-lista');
    historicoLista.innerHTML = '';

    if (historico.length === 0) {
        historicoLista.innerHTML = '<p>Nenhum histórico disponível.</p>';
    } else {
        historico.forEach((lista, index) => {
            const data = new Date(lista.timestamp).toLocaleString('pt-BR');
            const div = document.createElement('div');
            div.innerHTML = `
                <p>Lista salva em: ${data}</p>
                <button onclick="carregarListaHistorico(${index})">Carregar</button>
            `;
            historicoLista.appendChild(div);
        });
    }

    document.getElementById('historico-modal').style.display = 'flex';
    toggleMenu();
}

function carregarListaHistorico(index) {
    const historico = JSON.parse(localStorage.getItem('historicoListas')) || [];
    if (historico[index]) {
        itens = historico[index].itens;
        atualizarTabela();
        localStorage.setItem('listaCompras', JSON.stringify(itens));
        showToast(`Lista de ${new Date(historico[index].timestamp).toLocaleString('pt-BR')} carregada!`);
        fecharHistorico();
    }
}

function fecharHistorico() {
    document.getElementById('historico-modal').style.display = 'none';
}

// Listeners padrão
document.getElementById('itemNome').addEventListener('input', atualizarAutocompletarECategoria);
document.getElementById('menu-btn').addEventListener('click', toggleMenu);
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', document.body.dataset.theme);
    document.getElementById('theme-toggle').textContent = document.body.dataset.theme === 'dark' ? '☀️' : '🌙';
});

// Suporte a eventos de toque para mobile
window.onload = () => {
    document.body.dataset.theme = localStorage.getItem('theme') || 'light';
    document.getElementById('theme-toggle').textContent = document.body.dataset.theme === 'dark' ? '☀️' : '🌙';
    carregarLista();

    // Adiciona eventos de toque para os botões Carregar e Limpar
    const btnCarregar = document.querySelector('.botoes button:nth-child(2)');
    const btnLimpar = document.querySelector('.botoes button:nth-child(3)');

    btnCarregar.addEventListener('touchstart', (e) => {
        e.preventDefault();
        carregarLista();
    });

    btnLimpar.addEventListener('touchstart', (e) => {
        e.preventDefault();
        limparLista();
    });
};