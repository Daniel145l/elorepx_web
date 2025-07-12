function includeComponent(id, file) {
  fetch(file)
  .then((res) => res.text())
  .then((data) => {
    document.getElementById(id).innerHTML = data;
  })
  .cath((err) => console.log("Erro ao carregar no arquivo " + file, err));
}

window.addEventListener('DOMContentLoaded', () => {
  includeComponent('header', '../components/header.html');
  includeComponent('footer', '../components/footer.html');
})