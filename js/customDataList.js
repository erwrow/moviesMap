let offset = 0;	

function populateList(movies)
{
	//https://www.cssscript.com/infinite-list-scrolling-effect-in-javascript-and-css/
	//http://dev.socrata.com/docs/queries/having.html -> traer los items que tengan ubicacion
	//http://dev.socrata.com/docs/queries/where.html 
	//console.log(movies);
	
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