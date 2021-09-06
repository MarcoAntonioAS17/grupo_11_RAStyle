funcionesBusqueda = {
    buscarNombre: function(palabrasClave, data) {
        const palabrasClaveM = palabrasClave.map(item => {return item.toLowerCase()})
        const prep = ["y","o","de","es","con","e","a"]
        let filtrados = [];
        for (let item of data) {
            const campoBusqueda = item.Nombre.toLowerCase();
            let coincidencias = 0;
            for (let item2 of palabrasClaveM) {
                if (
                    (campoBusqueda.includes(" "+item2+" ")==true && prep.includes(item2)==false)||
                    (campoBusqueda.includes(item2+" ")==true && prep.includes(item2)==false)||
                    (campoBusqueda.includes(" "+item2)==true && prep.includes(item2)==false)
                    ) coincidencias = coincidencias+1;
            }
            if (coincidencias>0) {
                item.coincidencias = coincidencias;
                filtrados.push(item);
            }
        }
        filtrados.sort(function (a, b){
            return (b.coincidencias - a.coincidencias)
        })
        return filtrados;
    },
    buscarId: function(palabrasClave, data) {
        let filtrados = [];
        for (let item of data) {
            if (palabrasClave == item.id) {
                filtrados.push(item);
            }
        }
        return filtrados;
    },
    buscarTalla: function(palabrasClave, data) {
        let filtrados = [];
        const palabrasClaveM = palabrasClave.map(item => {return item.toUpperCase()})
        for (let item of data) {
            let campoBusqueda = item.talla;
            let coincidencias = 0;
            for (let item2 of palabrasClaveM) {
                if (campoBusqueda.includes(item2)) {
                    coincidencias=coincidencias+1;
                }
            }
            if (coincidencias>0) {
                filtrados.push(item);
            }
        }
        return filtrados;
    },
    buscarColor: function(palabrasClave, data) {
        let filtrados = [];
        for (let item of data) {
            let campoBusqueda = item.color;
            let coincidencias = 0;
            for (let item2 of palabrasClave) {
                if (campoBusqueda.includes(item2)) {
                    coincidencias=coincidencias+1;
                }
            }
            if (coincidencias>0) {
                filtrados.push(item);
            }
        }
        return filtrados;
    },
    elegirBusqueda: function(palabrasClave, data, filtro) {
        switch (filtro) {
            case "nombre":
                let filtrados2 = this.buscarNombre(palabrasClave, data);
                filtrados2.sort(function (a, b){
                    return (b.coincidencias - a.coincidencias)
                })
                return filtrados2;
            case "id":
                return this.buscarId(palabrasClave, data);
            case "talla": 
                return this.buscarTalla(palabrasClave, data);
            case "color":
                return this.buscarColor(palabrasClave, data);
        }
    }
}

module.exports = funcionesBusqueda;