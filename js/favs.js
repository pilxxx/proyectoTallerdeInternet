// favs.js
// guarda y muestra las noticias que el usuario marcó como favoritas
// funciona para cualquier visitante, esté logueado o no
// (no hace falta estar loggeado como admin para esto, es para cualq que entre a la pagina)

function obtenerFavs() {
    return JSON.parse(localStorage.getItem("newsFavs")) || []
    // el || [] es para q si no hay nada guardado no explote todo (same q news)
}

function guardarFavs(idNoticia) {
    let favs = obtenerFavs()
    if (favs.includes(idNoticia)) {
        favs = favs.filter(function(id) {
            return id !== idNoticia
        })
    } else {
        favs.push(idNoticia)
    }
    localStorage.setItem("newsFavs", JSON.stringify(favs))
}

// conecta el click de c/boton q ya existe en pantalla
// esta funcion se llama desde news.js cada vez q se pintan new news
function activarBotonesFavs() {
    let botones = document.querySelectorAll(".guardarfav")
    botones.forEach(function(boton) {
        // pinto el corazon segun el estado guardado al cargar
        let idDeEsteBoton = Number(boton.getAttribute("id"))
        if (obtenerFavs().includes(idDeEsteBoton)) {
            boton.textContent = "♥"
        }
        // conecto el click
        boton.addEventListener("click", function() {
            let id = Number(boton.getAttribute("id"))
            guardarFavs(id) // esto guarda O saca del localStorage segun corresponda
            if (boton.textContent === "♥") {
                boton.textContent = "♡" //cute
            } else {
                boton.textContent = "♥"
            }
        })
    })
}

function mostrarFavs() {
    let idsGuardados = obtenerFavs()
    let todasLasNoticias = JSON.parse(localStorage.getItem("noticias")) || [] //de nuevo para q no se rompa el code si no hay news guardadas
    let favoritas = todasLasNoticias.filter(function(noticia) {
        return idsGuardados.includes(noticia.id)
    })
    const contenedorFavs = document.getElementById("contenedor-favoritos")
    if (!contenedorFavs) return
    if (favoritas.length === 0) {
        contenedorFavs.innerHTML = "<p>no guardaste ninguna noticia aún</p>"
        return
    }
    contenedorFavs.innerHTML = favoritas.map(function(noticia) {
        return `
        <article class="noticia">
            <h3>${noticia.titulo}</h3>
            <img src="${noticia.imagen}" alt="${noticia.titulo}">
            <p>${noticia.descripcion}</p>
        </article>`
    }).join("")
}

// conecta el boton p abrir o cerrar el dropdown de favoritos
const btnFavs = document.getElementById("btn-favoritos")
const menuFavs = document.getElementById("menu-favoritos")
if (btnFavs && menuFavs) {
    btnFavs.addEventListener("click", function(e) {
        e.stopPropagation()
        mostrarFavs() // cada vez q abro el dropdown lo actualizo, asi se ve la ultima guardada
        menuFavs.classList.toggle("dropdown-abierto")
    })
    document.addEventListener("click", function() {
        menuFavs.classList.remove("dropdown-abierto")
    })
}

