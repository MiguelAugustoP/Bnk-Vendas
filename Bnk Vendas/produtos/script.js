let carrinho = [];

/* 🔥 CARREGAR CARRINHO SALVO */
const carrinhoSalvo = localStorage.getItem("carrinhoBNK");

if (carrinhoSalvo) {
  carrinho = JSON.parse(carrinhoSalvo);
}

/* ADICIONAR */
function addCarrinho(nome, preco) {
  const itemExistente = carrinho.find(item => item.nome === nome);

  if (itemExistente) {
    itemExistente.qtd++;
  } else {
    carrinho.push({ nome, preco, qtd: 1 });
  }

  atualizarCarrinho();
}

/* AUMENTAR */
function aumentar(index) {
  carrinho[index].qtd++;
  atualizarCarrinho();
}

/* DIMINUIR */
function diminuir(index) {
  carrinho[index].qtd--;

  if (carrinho[index].qtd <= 0) {
    carrinho.splice(index, 1);
  }

  atualizarCarrinho();
}

/* ATUALIZAR */
function atualizarCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  lista.innerHTML = "";

  let total = 0;
  let totalItens = 0;

  carrinho.forEach((item, index) => {
    total += item.preco * item.qtd;
    totalItens += item.qtd;

    let li = document.createElement("li");

    li.innerHTML = `
      <span>${item.nome} (${item.qtd}x) - R$ ${item.preco * item.qtd}</span>

      <div>
        <button onclick="diminuir(${index})">-</button>
        <button onclick="aumentar(${index})">+</button>
      </div>
    `;

    lista.appendChild(li);
  });

  document.getElementById("total").textContent = "Total: R$ " + total;

  document.getElementById("botaoCarrinho").textContent =
    "🛒 Ver Carrinho (" + totalItens + ") - R$ " + total;

  /* 🔥 SALVAR NO NAVEGADOR */
  localStorage.setItem("carrinhoBNK", JSON.stringify(carrinho));
}

/* ABRIR / FECHAR */
function toggleCarrinho() {
  document.getElementById("carrinho").classList.toggle("ativo");
}

/* MENU ATIVO AO ROLAR */
const links = document.querySelectorAll("#menu a");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let atual = "";

  sections.forEach(section => {
    const topo = section.offsetTop - 120;
    if (scrollY >= topo) {
      atual = section.getAttribute("id");
    }
  });

  links.forEach(link => {
    link.classList.remove("ativo");
    if (link.getAttribute("href") === "#" + atual) {
      link.classList.add("ativo");
    }
  });
});

/* FINALIZAR */
document.getElementById("finalizarPedido").addEventListener("click", () => {

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = "Pedido:\n\n";
  let total = 0;

  carrinho.forEach(item => {
    mensagem += `• ${item.nome} (${item.qtd}x) - R$ ${item.preco * item.qtd}\n`;
    total += item.preco * item.qtd;
  });

  mensagem += `\nTotal: R$ ${total}`;

  alert(mensagem);
});

/* 🔥 ATUALIZA AO CARREGAR A PÁGINA */
atualizarCarrinho();
