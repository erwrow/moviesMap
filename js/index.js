let max;
let maxQ;
let nShow;	//specify how many movies will be shown in the custom datalist, if necessary.
let pelis;
let pNumbers = new Promise(function(resolve, reject) {
					
	let filters = "$select=count(DISTINCT%20title),count(title)";
	
	getData(filters, resolve, reject);
});

pNumbers.then(
	function(n){
		max = parseInt(n[0].count_distinct_title);
		maxQ = parseInt(n[0].count_title);
		nShow = (regular)?maxQ:4; 
	},
	function(error){
		console.log("Error: " + error);
	}
);

function getData(filtros, resolve, reject) {
	const xhttp = new XMLHttpRequest();
	const url = "https://data.sfgov.org/resource/yitu-d5am.json?";
	
	xhttp.onload = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			resolve(JSON.parse(this.responseText));
		}
		else
		{
			reject("no se pudo cargar los datos");
		}
	};
	xhttp.open("GET", url + "" + filtros, true);
	xhttp.send();
}

function generateMarkers(locations){
	//Reset the map to clean the old markers
	initMap();
	for(let pos of locations){
		/*
			Faltan mostrar algunos datos, como la ubicación y la productora
		*/
		const contentString =
			`<div id="content">
			  <div><small>${(pos.locations === undefined)?'This title doesn\'t have any location':pos.locations}</small></div>
			  <h1>${pos.title} <small>(${pos.release_year})</small></h1>
			  <div>
				<p>
				<b>${pos.title}</b>, was directed by
				<b>${pos.director}</b> and it was released in ${pos.release_year}.<br>The cast was: ${(pos.actor_1 === undefined)?'':pos.actor_1}${(pos.actor_2 === undefined)?'':((pos.actor_3 === undefined)?' and ':', ') + pos.actor_2}${(pos.actor_3 === undefined)?'':' and ' + pos.actor_3}</p>
				<p>
					${(pos.fun_facts === undefined)?('This place doesn\'t have any fun fact'):('Fun facts: ' + pos.fun_facts)}
				</p>
			  </div>
			</div>`;
		
		geocode({address:pos.locations + ', San Francisco'}, contentString); //to have an accurate positioning from the geocoding, i especify the city
	}
	if(regular){
		updateData();
	}
}

function showAll(){
	let pAll = new Promise(function(resolve, reject) {
		
		let filters = "$select=*&$limit=" + maxQ;
		
		getData(filters, resolve, reject);
	});

	pAll.then(
		function(locations){
			console.log(locations);
			generateMarkers(locations);
		},
		function(error){
			console.log("Error: " + error);
		}
	);
	/*
	pAll.catch(e){
		console.log("The following error was thrown while trying to show all the movies locations: " + e);
	}
	*/
}

function searchMovies(wheel){
	let promise = new Promise(function(resolve, reject) {
		
		offset += (wheel !== undefined)?(wheel > 0)?(offset < (max - nShow))?1:0:(offset > 0)?-1:0:0;	//Compute the offset so it doesnt escape the list limits
		let inputLista = document.getElementById("inputLista");
		let filtros = "$select=distinct%20title&$where=lower(title)%20like%20lower(%27%25" + inputLista.value + "%25%27)&$order=title&$limit=" + nShow + "&$offset=" + offset;
		
		console.log(offset);
		
		getData(filtros, resolve, reject);
	});

	promise.then(
	function(movies){
		console.log(movies);
		pelis = movies;
		populateList(movies)
	},
	function(error) {
		console.log("Error: " + error);
	});
}

function selectedMovieEvent(e){
	console.log(e);
	selectedMovie(e.target.innerText);
}

function selectedMovie(e){
	let promiseLocations = new Promise(function(resolve, reject) {
		
		let filters = "$select=*&$where=title%20like%27" + e + "%27&$order=title&$limit=" + maxQ;
		
		console.log(e);
		
		getData(filters, resolve, reject);
	});
	
	promiseLocations.then(
		function(locations){
			console.log(locations);
			generateMarkers(locations);
		},
		function(error){
			console.log("Error: " + error);
		}
	);
}