function includeComponent(id, file, callback) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback();
    })
    .catch(err => console.error(`Erro ao carregar ${file}:`, err));
}

window.addEventListener('DOMContentLoaded', () => {
  includeComponent('header', '../components/header.html', initMenu);
  includeComponent('footer', '../components/footer.html');
});

function initMenu() {
  const btnMenu = document.getElementById("menu-button");
  const menu = document.getElementById("menu-mobile");

  if (!btnMenu || !menu) return;

  let menuAberto = false;

  btnMenu.addEventListener("click", (e) => {
    e.stopPropagation();

    if (menuAberto) {
      // Fecha com animação
      menu.classList.remove("translate-x-0");
      menu.classList.add("-translate-x-[100%]");
      setTimeout(() => {
        menu.classList.add("hidden");
      }, 300);
    } else {
      // Abre com animação
      menu.classList.remove("hidden");
      // Garante reflow para aplicar transição (força o browser a reprocessar)
      void menu.offsetWidth;
      menu.classList.remove("-translate-x-[100%]");
      menu.classList.add("translate-x-0");
    }

    menuAberto = !menuAberto;
  });

  document.addEventListener("click", (e) => {
    const clicouFora = !menu.contains(e.target) && !btnMenu.contains(e.target);

    if (menuAberto && clicouFora) {
      menu.classList.remove("translate-x-0");
      menu.classList.add("-translate-x-[100%]");
      setTimeout(() => {
        menu.classList.add("hidden");
        menuAberto = false;
      }, 300);
    }
  });
}
