const typeColors = {
  fire: "hsla(0, 97%, 65%, 1.00)",
  water: "hsla(199, 99%, 68%, 1.00)",
  grass: "hsla(124, 100%, 73%, 1.00)",
  electric: "hsla(50, 85%, 75%, 1.00)",
  ice: "hsla(199, 100%, 79%, 1.00)",
  fighting: "hsla(40, 31%, 71%, 1.00)",
  poison: "hsla(290, 94%, 87%, 1.00)",
  ground: "hsla(30, 89%, 82%, 1.00)",
  flying: "hsla(0, 0%, 84%, 1.00)",
  psychic: "hsla(62, 47%, 53%, 1.00)",
  bug: "#f8d5a3",
  rock: "hsla(60, 1%, 59%, 1.00)",
  ghost: "hsla(240, 90%, 77%, 1.00)",
  dragon: "hsla(219, 51%, 65%, 1.00)",
  dark: "hsla(0, 0%, 0%, 1.00)",
  steel: "hsla(0, 4%, 33%, 1.00)",
  fairy: "#fceaff",
  normal: "#F5F5F5"
};
//for border


async function fetchData(){
    try{
        const pokemonName = document.getElementById("name").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        if (!response.ok){
            throw new Error("Pokēmon Not Found");
        }

        
        const data = await response.json();
        console.log(data);

        const dataImg = data.sprites.front_default;
        const dataAudio = data.cries.latest;
        const pokeImg = document.getElementById("pokeImg");
        const details = document.getElementById("details");
        


        pokeImg.style.visibility = "visible"; //make it visible
        details.style.visibility="visible";

        pokeImg.src=`${dataImg}`;


        const pokeCry=document.getElementById("pokeCry");
        pokeCry.src = `${dataAudio}`;
        pokeCry.play();



        // adding sprite grid
        const grid= document.getElementById("sprites");
        grid.innerHTML=""  // this removes any previous sprites
        const sprites = [
            data.sprites.front_default,
            data.sprites.back_default,
            data.sprites.front_shiny,
            data.sprites.back_shiny
        ];
        if (!sprites[0]){
            throw new Error ("sprites not found :(");
        }

        const orientation = ["Front","Back","Front Shiny","Back Shiny"];
        const type = data.types[0].type.name;
        sprites.forEach((src,i) => {
            const card = document.createElement("div");
            
            const img = document.createElement("img");
            const text = document.createElement("h6");
            text.textContent= orientation[i];
            img.src = src;
            img.style.border=`3px solid ${typeColors[type]}`;
            grid.appendChild(card);
            
            card.appendChild(img);
            card.appendChild(text);
           
        })



        //type
        const types=[...data.types];
        typeDiv = document.getElementById("type");
        typeDiv.innerHTML="<h3 id='pokeType'>Type</h3>";
        types.forEach((dtype) => {
            const type = dtype.type.name;
            
            const typePill = document.createElement("div");
            typePill.classList.add("ininfo");
            typePill.textContent=`${type}`;
            typePill.style.backgroundColor=`${typeColors[type]}`;
            typeDiv.appendChild(typePill);
            typeDiv.appendChild(document.createElement("br"));

        })

        //height and weight
        physicalDiv = document.getElementById("pokeDim")
        physicalDiv.innerHTML="<h3 id='pokeDim'>Physical</h3>"
        dim=["height","weight"];
        dim.forEach((d) => {


            const h=document.createElement("div");
            h.classList.add("ininfo");
            h.textContent=`${d}: ${data[d]}`;
            h.style.backgroundColor=`${typeColors[type]}`;
            physicalDiv.appendChild(h);
            physicalDiv.appendChild(document.createElement("br"));
        })







        //adding text color same as type[0] for name
        const name = document.getElementById("pokeNameH");
        name.style.color=`${typeColors[type]}`;
        name.textContent=pokemonName.toUpperCase();

        //statss
        const statsContainer= document.getElementById("pokeStats");
        statsContainer.innerHTML="<h3>Stats</h3>";
        // data.stats[i].base_stat and data.stats[i].stat.name
        statsData = data.stats;
        statsData.forEach((s) => {
            const statName = s.stat.name;
            const baseStat = s.base_stat;
            // wrapper for bars and name
            statDiv = document.createElement("div");
            //statName
            const name= document.createElement("span");
            name.textContent=`${statName.toUpperCase()}`;
            name.classList.add(`statName`);
            

            //bar container
            const barDiv = document.createElement("div");
            barDiv.classList.add("barDiv");
            barDiv.classList.add("ininfo");
            
            //fill div
            const fillDiv = document.createElement("div");
            fillDiv.classList.add("fillDiv");
            fillDiv.classList.add("ininfo");
            fillDiv.textContent=`${baseStat}`;
            fillDiv.style.width = `${baseStat}%`
            fillDiv.style.backgroundColor=`${typeColors[type]}`

            barDiv.appendChild(fillDiv);
            statDiv.appendChild(name);
            statDiv.appendChild(barDiv);
            statsContainer.append(statDiv);
            statDiv.appendChild(document.createElement("br"));
            





        })



        
    }
    catch(error){
        console.error(error);
    }
}
const fetchBtn = document.getElementById("fetch"); 
fetchBtn.addEventListener("click",fetchData);
