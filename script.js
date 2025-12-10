console.log("JS funcionando...");

const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", (e) => {
        const email = document.querySelector("#email").value;
        const mensaje = document.querySelector("#mensaje").value;

        if (email === "" || mensaje === "") {
            e.preventDefault();
            alert("Por favor completá todos los campos.");
            return;
        }

        alert("Mensaje enviado correctamente!");
    });
}