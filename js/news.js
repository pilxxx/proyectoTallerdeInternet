// news - muestra las noticias que estan en localStorage
// y tmb tiene el buscador por titulo
// semilla - si no hay noticias guardadas, cargo las 6 por defecto
// así news.js siempre tiene algo para mostrar

function mostrarnews() {
    const contenedor = document.querySelector(".ubicacion-noticias")
    if (!contenedor) return // por si se llama desde una pag q no tiene noticias

    const noticias = JSON.parse(localStorage.getItem("noticias")) || []
    // el || [] es para q si no hay nada guardado no explote todo

    if (noticias.length === 0) {
        contenedor.innerHTML = "<p>No hay noticias cargadas todavía.</p>"
        return
    }

    contenedor.innerHTML = noticias.map(function(noticia) {
        return `
        <article class="noticia">
            <h3>${noticia.titulo}</h3>
            <img src="${noticia.imagen}" alt="${noticia.titulo}">
            <p>${noticia.descripcion}</p>
        </article>`
    }).join("") // el join es pq map devuelve un array y necesito un string para el innerHTML
}

// buscador - filtra por titulo mientras escribis
const buscador = document.getElementById("buscadorxtitulo")
if (buscador) {
    buscador.addEventListener("input", function() { // "input" se dispara cada vez q escribis una letra
        const termino = buscador.value.toLowerCase()
        const noticias = JSON.parse(localStorage.getItem("noticias")) || []

        const filtradas = noticias.filter(function(n) {
            return n.titulo.toLowerCase().includes(termino)
        })

        const contenedor = document.querySelector(".ubicacion-noticias")
        if (!contenedor) return

        contenedor.innerHTML = filtradas.map(function(n) {
            return `
            <article class="noticia">
                <h3>${n.titulo}</h3>
                <img src="${n.imagen}" alt="${n.titulo}">
                <p>${n.descripcion}</p>
            </article>`
        }).join("")
    })
}

mostrarnews()