let input = document.querySelector ('input');
let button = document.querySelector ('button');

let pokemon = document.querySelector('#results')
let pokemonList;

async function printPokemon(name) {
  try{
    const pokemonData = pokemonList.find((pokemon) => pokemon.name === name);

    console.log(pokemonData)

    const res = await fetch(pokemonData.url);
    const data = await res.json();

    console.log(data)
    
    const types = data.types.map (type => `<p>type: ${type.type.name}</p>`).join('');
    const stats = data.stats.map(stat => `<p>${stat.stat.name}: ${stat.base_stat}</p>`).join('');

    let li = document.createElement("li");
        li.innerHTML = `
        <h1>${data.name}</h1>
        <p>height: ${data.height}</p>
        <p>weight: ${data.weight}</p>
        ${types}
        ${stats}
        <img src=${data.sprites.front_default}>
        <img src=${data.sprites.back_default}>
        `;
        pokemon.appendChild(li);
    //<pre>${JSON.stringify(data, null, 4)}</pre> (estaba dentro de inerHTML para mostrar todo en web como objeto)
  }catch(error){
    console.error('Pokemon no encontrado')
  }
}

function submitForm(e) {
  e.preventDefault();

  let namePokemon = input.value;
  console.log(namePokemon);
  
  const filteredPokemons = pokemonList.filter((pokemon) => pokemon.name.substring(0, 3).toLowerCase() === namePokemon.substring(0, 3).toLowerCase());

  console.log(filteredPokemons);
  
  for (let i = 0; i < filteredPokemons.length; i++) {
    printPokemon(filteredPokemons[i].name);
}

  //printPokemon(namePokemon.toLowerCase()); (no hace falta sino se me duplica)
}

button.addEventListener("click", submitForm);

async function getData() {
  
  try{  
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1126`);
    const {results} = await res.json(); 
    pokemonList = results;

    console.log(pokemonList)
  } catch (error) {
    
    console.error (error);
  }
  
}

getData();




