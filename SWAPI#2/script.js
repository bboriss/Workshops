// Defining Buttons
const personPic = document.getElementById("person");
let spacehipPic = document.getElementById("spaceship");
let previousBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
let thead = document.getElementById("thead");
let table = document.getElementById("table");
let tBody = document.getElementById("tbody");
let buttons = document.getElementById("buttons");

// Memory
const memory = {
  urlPeople: "https://swapi.dev/api/people",
  urlSpaceships: "https://swapi.dev/api/starships/",
  data: [],
  previous: null,
  next: null,
};

// Getting People Data from SWAPI
// Putting them into memory.data

function getData(e) {
  if (e.target == personPic) {
    var url = memory.urlPeople;
    console.log(e.target);
  } else if (e.target == spacehipPic) {
    var url = memory.urlSpaceships;
    console.log(e.target);
  } else if (e.target == nextBtn) {
    var url = memory.next;
    console.log(e.target);
  } else if (e.target == previousBtn) {
    var url = memory.previous;
    console.log(e.target);
  }
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(refreshMemory)
    .then(function () {
      return showData(memory.data);
    });
  console.log(memory);
}

function refreshMemory(data) {
  memory.previous = data.previous;
  memory.next = data.next;
  memory.data = data.results;
}

// Showing Data from Memory.data
function showData(result) {
  //clear table if clicked again
  thead.innerHTML = "";
  tBody.innerHTML = "";

  //taking first character
  let firstEl = result[0];
  console.log(firstEl);

  //making an array of its keys
  let allKeys = Object.keys(firstEl);
  console.log(allKeys);

  //taking required keys
  //defining people or ship
  if (allKeys.includes("hair_color")) {
    let keys = allKeys.filter(function (key) {
      if (
        key === "name" ||
        key === "height" ||
        key === "mass" ||
        key === "gender" ||
        key === "birth_year"
      ) {
        return true;
      }
    });
    keys.push("appearance");
    console.log(keys);

    // create Title Row
    for (let title of keys) {
      const td = document.createElement("td");
      td.innerHTML = title;
      thead.appendChild(td);
    }

    // create Table Row
    for (const character of memory.data) {
      let table_tr = document.createElement("tr");
      table_tr.innerHTML = `
    <td>${character.name}</td>
    <td>${character.height}</td>
    <td>${character.mass}</td>
    <td>${character.birth_year}</td>
    <td>${character.gender}</td>
    <td>${character.films.length}</td>`;

      tBody.appendChild(table_tr);
    }
    table.style.visibility = "visible";
  } else if (allKeys.includes("cost_in_credits")) {
    console.log(allKeys[1]);
    let keys = allKeys.filter(function (key) {
      if (
        key === "name" ||
        key === "model" ||
        key === "manufacturer" ||
        key === "cost_in_credits" ||
        key === "passengers" ||
        key === "starship_class"
      ) {
        return true;
      }
    });
    console.log(keys);

    // create Title Row
    for (let title of keys) {
      const td = document.createElement("td");
      td.innerHTML = title;
      thead.appendChild(td);
    }

    // create Table Row
    for (const character of memory.data) {
      let table_tr = document.createElement("tr");
      table_tr.innerHTML = `
    <td>${character.name}</td>
    <td>${character.model}</td>
    <td>${character.manufacturer}</td>
    <td>${character.cost_in_credits}</td>
    <td>${character.passengers}</td>
    <td>${character.starship_class}</td>`;

      tBody.appendChild(table_tr);
    }
    table.style.visibility = "visible";
  }
  // button appereance
  if (memory.previous) {
    previousBtn.style.visibility = "visible";
  }
  if (memory.next) {
    nextBtn.style.visibility = "visible";
  }
  if (memory.previous == null) {
    previousBtn.style.visibility = "hidden";
  }
  if (memory.next == null) {
    nextBtn.style.visibility = "hidden";
  }
}

personPic.addEventListener("click", getData);
spacehipPic.addEventListener("click", getData);
previousBtn.addEventListener("click", getData);
nextBtn.addEventListener("click", getData);
