window.addEventListener("load", function() {
    let form = document.querySelector("form.create-form-login");
    let correo = document.querySelector("#correo");
    let errCorreo = document.querySelector("#erroresCorreo ul");
    let password = document.querySelector("#password");
    let errPassword = document.querySelector("#erroresPassword ul");

    correo.addEventListener("change", function() {
        let erroresCorreo = [];
        errCorreo.innerHTML = "";
        let validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (correo.value == "") {
            erroresCorreo.push("Por favor complete el campo de Email")
        } else if (!correo.value.match(validate)) {
            erroresCorreo.push("Ingrese un formato de correo válido")
        }

        if (erroresCorreo.length > 0) {
            for (let i=0; i<erroresCorreo.length; i++) {
                errCorreo.innerHTML += "<li>" + erroresCorreo[i] + "</li>"
            }
        }
    })
    password.addEventListener("change", function() {
        let erroresPassword = [];
        errPassword.innerHTML = "";
        if (password.value == "") {
            erroresPassword.push("Por favor complete el campo de Contraseña")
        }

        if (erroresPassword.length > 0) {
            for (let i=0; i<erroresPassword.length; i++) {
                errPassword.innerHTML += "<li>" + erroresPassword[i] + "</li>"
            }
        }
    })

    form.addEventListener("submit", function(e) {
        if (correo.value == "") {
            errCorreo.innerHTML = ""
            errCorreo.innerHTML += "<li>Por favor complete el campo de Email</li>"
            e.preventDefault()
        }
        if (password.value == "") {
            errPassword.innerHTML = ""
            errPassword.innerHTML += "<li>Por favor complete el campo de Contraseña</li>"
            e.preventDefault()
        }
    })
    
    
})