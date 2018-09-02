//let button = document.getElementById("options");

button.on("click", function change(source) {
  alert("This button works");
  button.classList.toggle(source);
});
