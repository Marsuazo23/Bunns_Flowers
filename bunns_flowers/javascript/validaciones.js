document.addEventListener("DOMContentLoaded", function () {
    console.log("Iniciando Validación de Formulario");

    const form = document.querySelector("form");

    // Validación de Correo
    function validarCorreo(correo) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|icloud\.com|gmail\.es|yahoo\.es|hotmail\.es|icloud\.es)$/;
        return emailRegex.test(correo);
    }

    // Validación de Teléfono
    function validarTelefono(telefono) {
        const phoneRegex = /^\+504\s?[2389]\d{7}$/; 
        return phoneRegex.test(telefono);
    }    

    // Validación de Nombre Vacío
    function validarNombre(nombre) {
        return nombre.trim() !== "";  // No puede estar vacío
    }

    // Validación de Nombre Letras
    function validarNombreL(nombre) {
        return nombre.trim().length >= 3;  // Debe tener al menos 3 caracteres
    }

    // Validación de Apellido Vacío
    function validarApellido(apellido) {
        return apellido.trim() !== "";  // No puede estar vacío
    }

    // Validación de Apellido Letras
    function validarApellidoL(apellido) {
        return apellido.trim().length >= 3;  // Debe tener al menos 3 caracteres
    }

    // Validación de Comentarios
    function validarComentarios(comentarios) {
        return comentarios.trim().length >= 10;  // Debe tener al menos 10 caracteres
    }

    function mostrarError(input, mensaje) {
        input.style.outline = "2px solid red";

        let errorMensaje = input.nextElementSibling;
        if (!errorMensaje || errorMensaje.tagName !== "SPAN") {
            errorMensaje = document.createElement("span");
            errorMensaje.style.color = "red";
            errorMensaje.style.fontSize = "12px";
            errorMensaje.style.display = "block";  
            input.parentNode.insertBefore(errorMensaje, input.nextSibling);  
        }
        errorMensaje.textContent = mensaje;
    }

    function limpiarError(input) {
        input.style.outline = "";
        const errorMensaje = input.nextElementSibling;
        if (errorMensaje && errorMensaje.tagName === "SPAN") {
            errorMensaje.remove();
        }
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("Validando formulario...");

        let bolFormularioValido = true;

        const campos = [
            { 
                id: "txtEmail", 
                validacion: validarCorreo, 
                mensaje: "El correo debe tener un formato válido y pertenecer a los dominios permitidos (gmail, yahoo, hotmail, icloud) con extensión .com o .es." 
            },
            { 
                id: "txtTeléfono", 
                validacion: validarTelefono, 
                mensaje: "El teléfono principal debe iniciar con +504 y tener 8 dígitos, comenzando con 2, 3, 8 o 9." 
            },
            { 
                id: "txtNombre", 
                validacion: validarNombre, 
                mensaje: "El campo Nombre no puede estar vacío." 
            },
            { 
                id: "txtNombre", 
                validacion: validarNombreL, 
                mensaje: "El campo Nombre debe tener al menos 3 caracteres." 
            },
            { 
                id: "txtApellido", 
                validacion: validarApellido, 
                mensaje: "El campo Apellido no puede estar vacío." 
            },
            { 
                id: "txtApellido", 
                validacion: validarApellidoL, 
                mensaje: "El campo Apellido debe tener al menos 3 caracteres." 
            },
            { 
                id: "txtComentarios", 
                validacion: validarComentarios, 
                mensaje: "El campo Comentarios debe tener al menos 10 caracteres." 
            }
        ];

        campos.forEach(function (campo) {
            const input = document.getElementById(campo.id);
            const esValido = campo.validacion(input.value);
            if (!esValido) {
                mostrarError(input, campo.mensaje);
                bolFormularioValido = false;
            } else {
                limpiarError(input);
            }
        });

        if (bolFormularioValido) {
            console.log("Formulario válido. Enviando...");
            form.submit();
        } else {
            console.log("Errores encontrados. Corrige antes de enviar.");
        }
    });

    // Limpiar el error cuando el usuario corrige el campo
    const camposInput = [
        { id: "txtEmail", validacion: validarCorreo },
        { id: "txtTeléfono", validacion: validarTelefono },
        { id: "txtNombre", validacion: validarNombre },
        { id: "txtApellido", validacion: validarApellido },
        { id: "txtComentarios", validacion: validarComentarios }
    ];

    camposInput.forEach(function (campo) {
        const input = document.getElementById(campo.id);
        input.addEventListener("input", function () {
            limpiarError(input);  // Limpiar el error al cambiar el valor del campo
        });
    });
});
