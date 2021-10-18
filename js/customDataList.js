/*
populateList	->	Carga los títulos de las películas en el datalist custom.
*/

function populateList(movies)
{	
	let lista = document.getElementById("lista");
	lista.innerHTML = "";
	for(let movie of movies)
	{
		let p = document.createElement("p");
		let span = document.createElement("span");
		
		span.innerHTML = movie.title;
		
		p.appendChild(span);
		
		p.onclick = selectedMovieEvent;
		
		lista.appendChild(p);
	}
}