const personaje = document.querySelector("#personajes");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const imputNombre = document.querySelector("#nombre");
const form = document.querySelector("#form");

let paginaActual = 1;

const buscarInformacion = () => {
	fetch(`https://rickandmortyapi.com/api/character?page=${paginaActual}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			crearTarjetasPersonaje(data.results);
		});
};
buscarInformacion();

const buscarPersonaje = (buscar) => {
	fetch(`https://rickandmortyapi.com/api/characters?q=${buscar}`)
		.then((res) => res.json())
		.then((data) => {
			crearTarjetasPersonaje(data.results);
			console.log(buscar);
		});
};

next.onclick = () => {
	paginaActual = paginaActual + 1;
	buscarInformacion();
};

prev.onclick = () => {
	if (paginaActual === 1) {
		prev.disabled = true;
	}
	paginaActual = paginaActual - 1;
	buscarInformacion();
};

const crearTarjetasPersonaje = (data) => {
	const html = data.reduce((acc, curr) => {
		return (
			acc +
			`
    <article class="personaje">
      <h2>${curr.name}</h2>
      <img src="${curr.image}">
    </article>
    `
		);
	}, "");
	personajes.innerHTML = html;
};

form.onsubmit = (e) => {
	console.log(imputNombre.value);
	e.preventDefault();
	buscarPersonaje(imputNombre.value);
};
