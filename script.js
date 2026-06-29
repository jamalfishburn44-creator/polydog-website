document.addEventListener("DOMContentLoaded", () => {
    console.log("Welcome to PolyDog!");

    const button = document.querySelector(".button");

    button.addEventListener("click", (e) => {
        e.preventDefault();
        alert("🐕 Welcome to the PolyDog Pack! Buy links coming soon.");
    });
});
