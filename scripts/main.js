// funcion para seleccionar elementos del DOM
function $(param) {
    return document.querySelector(param);
  }
  
  // Función para atacar a la api
  async function atackApi (url){
    let res = await fetch(url)
    let data = res.json()
    return data
  }
  
  // Funcion con condiciones para busqueda de pokemon 
  async function conexionApi(URI, namePoke){
    try{
  
        return await atackApi(URI+namePoke)
  
    }catch(e){
        
        let {results} = await atackApi("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2100")
        try{
            console.log(namePoke)
            const resultSearch = results.filter(e=> e.name.includes(namePoke))
            if(resultSearch.length == 0) throw new Error("No hay conincidencia")
            console.log(resultSearch)
            return resultSearch
        }catch(e){
            try{
                let palabra = namePoke.substring(0, 2)
                if(palabra.length < 3) throw new Error("Tienes que meter una palabra con al menos 3 letras")
                const newSearch = results.filter(e=> e.name.startsWith(palabra))
                console.log("Quizá querías decir: "+ newSearch[0].name +" "+ newSearch[1].name )
                return newSearch
  
            }catch(e){
                console.log("No hay ningún pokemon con el nombre indicado")
            }
        }
    }
    
  }
  
  
  //Seleccionamos el elemento input/buscador del DOM y lo metemos en la variable
  //  search
  
  const search = $("#name");
  const resulTag = $("#result");
  const resultsSection = $(".results")
  const buttonSearch = $(".searchButton");
  const url = "https://pokeapi.co/api/v2/pokemon/";
  
  //
  buttonSearch.addEventListener("click", async (e) => {
    resulTag.innerHTML=""
    resultsSection.innerHTML = ""
    e.preventDefault();
    let resultSearch = await conexionApi(url, search.value);
    console.log(resultSearch)
    if (resultSearch.length !=undefined) {
      for (let i=0; i < resultSearch.length; i++) {
        let pokemon = await atackApi(resultSearch[i].url);
        console.log(pokemon)
        resultsSection.innerHTML += `<article class="cards">
          <p>Nombre: ${pokemon.name}</p>
          <p>Weight: ${pokemon.weight}</p>
          <p>Height: ${pokemon.height}</p>
          <p>Order: ${pokemon.order}</p>
          <p>Type: ${pokemon.types[0].type.name}</p>
        </article>\n`
      }
    } else {
      resulTag.innerHTML = `<article class="card">
        <p>Nombre: ${resultSearch.name}</p>
        <p>Weight: ${resultSearch.weight}</p>
        <p>Height: ${resultSearch.height}</p>
        <p>Order: ${resultSearch.order}</p>
        <p>Type: ${resultSearch.types[0].type.name}</p>
        <img src=${}>
      </article>`
    }
    resultSearch = []
    search.value = ""
  });
  


  