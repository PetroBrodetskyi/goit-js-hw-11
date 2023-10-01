const scrollToTopButton = document.querySelector(".scroll-to-top");

scrollToTopButton.classList.add("is-hidden");

scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100 && document.documentElement.scrollHeight > 100) {
    scrollToTopButton.classList.remove("is-hidden");
  } else {
    scrollToTopButton.classList.add("is-hidden");
  }
});