window.addEventListener("load", function() {
    let form = document.querySelector("#registroUser");
    let image = document.querySelector("#image")
    let errImage = document.querySelector("#erroresImage ul");
    let nombre = document.querySelector("#nombre")
    let errNombre = document.querySelector("#erroresNombre ul");
    let apellidos = document.querySelector("#apellidos")
    let errApellidos = document.querySelector("#erroresApellidos ul");
    let correo = document.querySelector("#email");
    let errCorreo = document.querySelector("#erroresEmail ul");
    let password = document.querySelector("#password");
    let errPassword = document.querySelector("#erroresPassword ul");

    image.addEventListener("change", function() {
        let erroresImage = []
        let extension = (image.value).split(".").pop();
        errImage.innerHTML = ""
        if (!["jpg","jpeg","png","gif"].includes(extension)) {
            erroresImage.push("La exensión del archivo debe ser JPG, JPEG, PNG o GIF")
        }
        if (erroresImage.length > 0) {
            for (let i=0; i<erroresImage.length; i++) {
                errImage.innerHTML += "<li>" + erroresImage[i] + "</li>"
            }
        }
    })
    
    nombre.addEventListener("change", function(){
        let erroresNombre = [];
        errNombre.innerHTML = ""
        if (nombre.value == "") {
            erroresNombre.push("Complete el campo NOMBRE")
        } else if (nombre.value.length < 2) {
            erroresNombre.push("El nombre debe tener al menos 2 caracters")
        }
        if (erroresNombre.length > 0) {
            for (let i=0; i<erroresNombre.length; i++) {
                errNombre.innerHTML += "<li>" + erroresNombre[i] + "</li>"
            }
        }
    })
    apellidos.addEventListener("change", function(){
        let erroresApellido = [];
        errApellidos.innerHTML = ""
        if (apellidos.value == "") {
            erroresApellido.push("Complete el campo APELLIDO")
        } else if (apellidos.value.length < 2) {
            erroresApellido.push("El apellido debe tener al menos 2 caracters")
        }
        if (erroresApellido.length > 0) {
            for (let i=0; i<erroresApellido.length; i++) {
                errApellidos.innerHTML += "<li>" + erroresApellido[i] + "</li>"
            }
        }
    })

    correo.addEventListener("change", function() {
        let erroresCorreo = [];
        errCorreo.innerHTML = "";
        let validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (correo.value == "") {
            erroresCorreo.push("Por favor complete el campo de Email")
        } else if (!correo.value.match(validate)) {
            erroresCorreo.push("Ingrese un formato de email válido")
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
        } else if (password.value.length < 8) {
            erroresPassword.push("La contraseña debe tener al menos 8 caracteres")
        }

        if (erroresPassword.length > 0) {
            for (let i=0; i<erroresPassword.length; i++) {
                errPassword.innerHTML += "<li>" + erroresPassword[i] + "</li>"
            }
        }
    })

    form.addEventListener("submit", function(e) {
            let erroresImage = []
            let extension = (image.value).split(".").pop();
            errImage.innerHTML = ""
            if (!["jpg","jpeg","png","gif"].includes(extension)) {
                erroresImage.push("La exensión del archivo debe ser JPG, JPEG, PNG o GIF")
            }
            if (erroresImage.length > 0) {
                e.preventDefault();
                for (let i=0; i<erroresImage.length; i++) {
                    errImage.innerHTML += "<li>" + erroresImage[i] + "</li>"
                }
            }
        
            let erroresNombre = [];
            errNombre.innerHTML = ""
            if (nombre.value == "") {
                erroresNombre.push("Complete el campo NOMBRE")
            } else if (nombre.value.length < 2) {
                erroresNombre.push("El nombre debe tener al menos 2 caracters")
            }
            if (erroresNombre.length > 0) {
                e.preventDefault();
                for (let i=0; i<erroresNombre.length; i++) {
                    errNombre.innerHTML += "<li>" + erroresNombre[i] + "</li>"
                }
            }
            
            let erroresApellido = [];
            errApellidos.innerHTML = ""
            if (apellidos.value == "") {
                erroresApellido.push("Complete el campo APELLIDO")
            } else if (apellidos.value.length < 2) {
                erroresApellido.push("El apellido debe tener al menos 2 caracters")
            }
            if (erroresApellido.length > 0) {
                e.preventDefault();
                for (let i=0; i<erroresApellido.length; i++) {
                    errApellidos.innerHTML += "<li>" + erroresApellido[i] + "</li>"
                }
            }
    
            let erroresCorreo = [];
            errCorreo.innerHTML = "";
            let validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (correo.value == "") {
                erroresCorreo.push("Por favor complete el campo de Email")
            } else if (!correo.value.match(validate)) {
                erroresCorreo.push("Ingrese un formato de email válido")
            }
    
            if (erroresCorreo.length > 0) {
                e.preventDefault();
                for (let i=0; i<erroresCorreo.length; i++) {
                    errCorreo.innerHTML += "<li>" + erroresCorreo[i] + "</li>"
                }
            }
        
            let erroresPassword = [];
            errPassword.innerHTML = "";
            if (password.value == "") {
                erroresPassword.push("Por favor complete el campo de Contraseña")
            } else if (password.value.length < 8) {
                erroresPassword.push("La contraseña debe tener al menos 8 caracteres")
            }
    
            if (erroresPassword.length > 0) {
                e.preventDefault();
                for (let i=0; i<erroresPassword.length; i++) {
                    errPassword.innerHTML += "<li>" + erroresPassword[i] + "</li>"
                }
            }

        /*console.log(erroresImage.length)
        if (erroresImage.length > 0 || erroresNombre.length > 0 || erroresApellido.length > 0 || erroresCorreo.length > 0 || erroresPassword.length > 0) {
            e.preventDefault();
        }*/
    })
    
    
})