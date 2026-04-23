function abrirLogin() {
  document.getElementById("loginModal").style.display = "block";
}

function fecharLogin() {
  document.getElementById("loginModal").style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById("loginModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
function mostrarLogin() {
  document.getElementById("cadastroBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

function mostrarCadastro() {
  document.getElementById("cadastroBox").style.display = "block";
  document.getElementById("loginBox").style.display = "none";
}