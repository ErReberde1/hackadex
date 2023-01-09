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

    pokemon.innerHTML = `
    <h1>${data.name}</h1>
    <p>${data.height}</p>
    <p>${data.weight}</p>
    <p>${data.types}</p>
    <img src=${data.sprites.front_default}>
    `;
    //<pre>${JSON.stringify(data, null, 4)}</pre> (estaba dentro de inerHTML para mostrar todo en web como objeto)
  }catch(error){
    console.error('Pokemon no encontrado')
  }
}

function submitForm(e) {
  e.preventDefault();

  let namePokemon = input.value;
  console.log(namePokemon)
  /* let pokemonFilter = namePokemon.filter((pokemon)=>pokemon.name.includes(namePokemon)); */
  printPokemon(namePokemon.toLowerCase());
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




