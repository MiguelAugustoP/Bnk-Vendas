let carrinho = [];
let total = 0;

/* ADICIONAR */
function addCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  total += preco;
  atualizarCarrinho();
}

/* REMOVER */
function removerItem(index) {
  total -= carrinho[index].preco;
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

/* ATUALIZAR */
function atualizarCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  lista.innerHTML = "";

  carrinho.forEach((item, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <span>${item.nome} - R$ ${item.preco}</span>
      <button onclick="removerItem(${index})">Remover</button>
    `;

    lista.appendChild(li);
  });

  document.getElementById("total").textContent = "Total: R$ " + total;

  document.getElementById("botaoCarrinho").textContent =
    "🛒 Ver Carrinho (R$ " + total + ")";
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

document.getElementById("finalizarPedido").addEventListener("click", () => {

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = "Pedido:\n\n";

  carrinho.forEach(item => {
    mensagem += `• ${item.nome} - R$ ${item.preco}\n`;
  });

  mensagem += `\nTotal: R$ ${total}`;

  alert(mensagem); // por enquanto só mostra

});