const first = document.getElementById("first");
const second = document.getElementById("second");

first.addEventListener("click", event => {
  first.classList.add("focused");
  first.classList.remove("collapsed");
  second.classList.add("collapsed");
  second.classList.remove("focused");
});

second.addEventListener("click", event => {
  second.classList.add("focused");
  second.classList.remove("collapsed");
  first.classList.add("collapsed");
  first.classList.remove("focused");
});