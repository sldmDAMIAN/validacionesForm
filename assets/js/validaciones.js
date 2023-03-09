export function valida(input) {
    const tipoDeInput = input.dataset.tipo;

    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = '';
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoDeInput, input);
    }
}

const tipoDeErrores = ["valueMissing", "typeMismatch", "patternMismatch", "customError"];

const mensajesDeError = {
    nombre: {
        valueMissing: "El nombre no puede ir vacio",
    },
    email: {
        valueMissing: "El correo no puede ir vacio",
        typeMismatch: "El correo no es valido",
    },
    password: {
        valueMissing: "La contraseña no puede ir vacia",
        patternMismatch: "De 6 a 12 caracteres, debe contener al menos una letra mayuscula, un numero y no debe contener caracteres especiales",
    },
    nacimiento: {
        valueMissing: "Debes especificar una fecha de nacimiento",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        patternMismatch: "El formato debe ser XXXXXXXXXX 10 números",
        valueMissing: "El número no puede ir vacio",
    },
    direccion: {
        valueMissing: "La direccion no puede ir vacia",
        patternMismatch: "Debe contener de 10 a 40 caracteres"
    },
    ciudad: {
        valueMissing: "La ciudad no puede ir vacia",
        patternMismatch: "Debe contener de 4 a 30 caracteres"
    },
    estado: {
        valueMissing: "Debes especificar el estado o provincia",
        patternMismatch: "Debe contener de 4 a 30 caracteres"
    }
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};


const inputNacimiento = document.querySelector('#birth');
inputNacimiento.addEventListener("blur", (e) => {
    validarNacimiento(e.target);
});

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = '';

    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return fechaActual >= diferenciaFechas;
}

function mostrarMensajeError(tipoDeInput, input) {
    let mensajes = "";

    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            mensajes = mensajesDeError[tipoDeInput][error];
            console.log(mensajes);
        }
    });

    return mensajes;
}