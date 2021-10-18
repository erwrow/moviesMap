/*
populateList	->	Carga los títulos de las películas en el datalist con options.
updateData		->	Solicita los datos a cargar en el datalist a la api externa.
*/

function populateList(movies)
{
	//https://jsfiddle.net/trixta/tb7Cs/
	//console.log(movies);
	
	let datalist = document.getElementById('lista');
	lista.innerHTML = "";

	for(let movie of movies)
	{
		let op = document.createElement("option");
		op.value = movie.title;
		datalist.appendChild(op);
	}
}

function updateData(){
	
	let pr = new Promise(function(resolve, reject) {
		setTimeout(() => {resolve()}, 1000);
	});
	pr.then(
	function(){
		searchMovies();
	},
	function(error) {
		console.log("Error: " + error);
	});
}