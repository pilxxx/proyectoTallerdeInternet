// news - muestra las noticias que estan en localStorage
// y tmb tiene el buscador por titulo
// semilla - si no hay noticias guardadas, cargo las 6 por defecto
// así news.js siempre tiene algo para mostrar

function mostrarnews() {
    const contenedor = document.querySelector(".ubicacion-noticias")
    if (!contenedor) return // por si se llama desde una pag q no tiene noticias

    let noticias = JSON.parse(localStorage.getItem("noticias")) || []
    // el || [] es para q si no hay nada guardado no explote todo

    if (noticias.length === 0) {
        contenedor.innerHTML = "<p>No hay noticias cargadas todavía.</p>"
        return
    }

    //manejo de FAaVS:
    let estaEnAdmin = document.getElementById("createnoticia")
    contenedor.innerHTML = noticias.map(function(noticia) {
        let botonFav = ""
        if (!estaEnAdmin) {
            botonFav = `<button class="guardarfav" id="${noticia.id}">♡</button>`
        }
        return `
        <article class="noticia">
        <h3>${noticia.titulo}</h3>
        <img src="${noticia.imagen}" alt="${noticia.titulo}">
        <p>${noticia.descripcion}</p>
        ${botonFav}
        </article>`
    }).join("")
    if (typeof activarBotonesFavs === "function") {
        activarBotonesFavs()
    }
}

// buscador (filtra x title mientras escribo)
const buscador = document.getElementById("buscadorxtitulo")
if (buscador) {
    buscador.addEventListener("input", function() { // el input se dispara cada vez q escribo una letra
        const termino = buscador.value.toLowerCase()
        let noticias = JSON.parse(localStorage.getItem("noticias")) || []

        const filtradas = noticias.filter(function(n) {
            return n.titulo.toLowerCase().includes(termino)
        })

        let contenedor = document.querySelector(".ubicacion-noticias")
        if (!contenedor) return

        // esto lo hice para q el boton de fav no aparezca en admin pq los favs son para el visitante, NO para el que carga noticias!!
        const estaEnAdmin = document.getElementById("createnoticia")
        contenedor.innerHTML = filtradas.map(function(noticia) {
            let botonFav = ""
            if (!estaEnAdmin) {
                botonFav = `<button class="guardarfav" id="${noticia.id}">♡</button>`
            }
        return `
            <article class="noticia">
            <h3>${noticia.titulo}</h3>
                <img src="${noticia.imagen}" alt="${noticia.titulo}">
            <p>${noticia.descripcion}</p>
            ${botonFav}
            </article>`
    }).join("")
        if (typeof activarBotonesFavs === "function") {
            activarBotonesFavs()
        }
    })
}

mostrarnews()