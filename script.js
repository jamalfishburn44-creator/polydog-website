document.addEventListener("DOMContentLoaded", () => {

  console.log("Welcome to PolyDog!");

  const button = document.querySelector(".button");

  if (button) {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      document.getElementById("mission").scrollIntoView({
        behavior: "smooth"
      });
    });
  }

});
