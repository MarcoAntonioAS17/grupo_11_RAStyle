window.addEventListener("load", function() {
    const contenedorImagenes = document.getElementById("contenedorFotos");
    const inputImage = document.getElementById("photos");

    inputImage.addEventListener("change", function(event) {
        console.log("Change on input image");
        console.log(event.target.files);
        for (file of event.target.files) {
            const div = document.createElement("div");
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.style.height = "100%";
            div.appendChild(img);
            contenedorImagenes.appendChild(div);
        }
        
    })
});