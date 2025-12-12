console.log("JS funcionando...");

const form = document.querySelector("form");

if (form) {
    const emailInput = document.querySelector("#email");
    const mensajeInput = document.querySelector("#mensaje");

    form.addEventListener("submit", (e) => {
        const email = emailInput.value.trim();
        const mensaje = mensajeInput.value.trim();
        let hayError = false;

        limpiarErrores(emailInput);
        limpiarErrores(mensajeInput);

        if (email === "") {
            marcarError(emailInput, "El email es obligatorio.");
            hayError = true;
        } else marcarOk(emailInput);

        if (mensaje === "") {
            marcarError(mensajeInput, "El mensaje no puede estar vacío.");
            hayError = true;
        } else marcarOk(mensajeInput);

        if (hayError) {
            e.preventDefault();
            return;
        }

        alert("Mensaje enviado correctamente!");
    });

    emailInput.addEventListener("input", () => validarCampo(emailInput));
    mensajeInput.addEventListener("input", () => validarCampo(mensajeInput));
}

function marcarError(input, mensaje) {
    input.classList.add("input-error");
    const msg = document.createElement("p");
    msg.classList.add("mensaje-error");
    msg.innerText = mensaje;
    input.parentElement.appendChild(msg);
}

function marcarOk(input) {
    input.classList.add("input-ok");
}

function limpiarErrores(input) {
    input.classList.remove("input-error", "input-ok");
    const mensajes = input.parentElement.querySelectorAll(".mensaje-error");
    mensajes.forEach(m => m.remove());
}

function validarCampo(input) {
    if (input.value.trim() === "") {
        input.classList.add("input-error");
        input.classList.remove("input-ok");
    } else {
        input.classList.remove("input-error");
        input.classList.add("input-ok");
    }
    const msg = input.parentElement.querySelector(".mensaje-error");
    if (msg) msg.remove();
}


document.addEventListener("DOMContentLoaded", () => {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function guardarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    /* === BOTONES "AGREGAR AL CARRITO" en index === */
    const botones = document.querySelectorAll(".btn-carrito");

    if (botones.length) {
        botones.forEach(btn => {
            btn.addEventListener("click", () => {
                const card = btn.closest(".tarjeta-producto");

                const nombre = card.dataset.nombre || card.querySelector("h3").textContent;
                const precio = Number(card.dataset.precio) || Number(card.querySelector("p").textContent.replace("$", ""));

                const existe = carrito.find(p => p.nombre === nombre);

                if (existe) {
                    existe.cantidad++;
                } else {
                    carrito.push({
                        nombre,
                        precio,
                        cantidad: 1
                    });
                }

                guardarCarrito();
                alert(`${nombre} agregado al carrito`);
            });
        });
    }

    const contenedor = document.querySelector("#carrito-lista");
    const totalPrecio = document.querySelector("#total-precio");
    const btnVaciar = document.querySelector("#btn-vaciar");

    if (contenedor && totalPrecio && btnVaciar) {

        function renderCarrito() {
            contenedor.innerHTML = "";
            let total = 0;

            carrito.forEach((producto, index) => {
                total += producto.precio * producto.cantidad;

                const item = document.createElement("div");
                item.classList.add("item-carrito");

                item.innerHTML = `
                    <span>${producto.nombre} x${producto.cantidad}</span>
                    <span>$${producto.precio * producto.cantidad}</span>
                    <button class="btn-eliminar" data-index="${index}">Eliminar</button>
                `;

                contenedor.appendChild(item);
            });

            totalPrecio.textContent = total;
        }

        contenedor.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-eliminar")) {
                const index = e.target.dataset.index;
                carrito.splice(index, 1);
                guardarCarrito();
                renderCarrito();
            }
        });

        btnVaciar.addEventListener("click", () => {
            carrito = [];
            guardarCarrito();
            renderCarrito();
        });

        renderCarrito();
    }
});