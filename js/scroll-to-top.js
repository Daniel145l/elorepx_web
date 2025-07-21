document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopBtn = document.querySelector('footer button');

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});