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

let getData = async function getData(e) {
  let url = "";
  if (e.target == personPic) {
    url = memory.urlPeople;
  } else if (e.target == spacehipPic) {
    url = memory.urlSpaceships;
  } else if (e.target == nextBtn) {
    url = memory.next;
  } else if (e.target == previousBtn) {
    url = memory.previous;
  }
  const fetching = await fetch(url);
  const jsonFunct = await fetching.json();
  console.log(jsonFunct);
  const refreshMem = await refreshMemory(jsonFunct);
  const populate = await populateTable(memory.data);
};

function refreshMemory(data) {
  memory.previous = data.previous;
  memory.next = data.next;
  (function (data) {
    // Check if Person is clicked and populate memory.data
    if (
      (memory.next && memory.next.includes("people")) ||
      (memory.previous && memory.previous.includes("people"))
    ) {
      memory.data = [];
      data.results.forEach((obj) => memory.data.push(new Person(obj)));
      // Check if Ship is clicked and populate memory.data
    } else if (
      (memory.next && memory.next.includes("starships")) ||
      (memory.previous && memory.previous.includes("starships"))
    ) {
      memory.data = [];
      data.results.forEach((obj) => memory.data.push(new Ship(obj)));
    }
  })(data);
  console.log(memory.data);
}

function populateTable(arrayOfObjects) {
  // generate titles
  arrayOfObjects[0].titleGenerator;
  if (arrayOfObjects[0] instanceof Person) {
    //adding cm to height
    arrayOfObjects.forEach((object) => object.height);
    //adding kg to mass
    arrayOfObjects.forEach((object) => object.mass);
  } else if (arrayOfObjects[0] instanceof Ship) {
    arrayOfObjects.forEach((object) => object.cost);
    arrayOfObjects.forEach((object) => object.cargo_capacity);
  }

  // generate rows
  arrayOfObjects.forEach((object) => object.rowGenerator);

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

// callbacks for classes
// Person title generator

// Person class

class Person {
  constructor({ name, height, mass, gender, birth_year, homeworld, films }) {
    this.name = name;
    this._height = height;
    this._mass = mass;
    this.gender = gender;
    this.birthYear = birth_year;
    this.homeworld = homeworld;
    this.appearances = (Array.isArray(films) && films.length) || null;
  }
  get height() {
    return (this._height = this._height + " cm");
  }
  get mass() {
    return (this._mass = this._mass + " kg");
  }
  get titleGenerator() {
    // clearing table after clicking again

    thead.innerHTML = "";
    tBody.innerHTML = "";

    // taking keys from the class
    // making titles

    let arrOfKeys = Object.keys(this);
    for (let title of arrOfKeys) {
      const td = document.createElement("td");
      td.innerHTML = title;
      thead.appendChild(td);
    }
    table.style.visibility = "visible";
  }
  get rowGenerator() {
    let arrOfValues = Object.values(this);
    let table_tr = document.createElement("tr");
    for (const valueOfObject of arrOfValues) {
      let table_td = document.createElement("td");
      table_td.innerHTML = `${valueOfObject}`;
      table_tr.appendChild(table_td);
      tBody.appendChild(table_tr);
    }
  }
}
//  Ship Class

class ShipDetails {
  constructor({ cost_in_credits, cargo_capacity, passengers, starship_class }) {
    this._cost = cost_in_credits;
    this._cargoCapacity = cargo_capacity;
    this.peopleCapacity = passengers;
    this.class = starship_class;
  }
  //dot separator for cost
  get cost() {
    return (this._cost = this._cost
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."));
  }
  //dot separator for cargo_Capacity
  get cargo_capacity() {
    return (this._cargoCapacity = this._cargoCapacity
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."));
  }

  get titleGenerator() {
    // clearing table after clicking again

    thead.innerHTML = "";
    tBody.innerHTML = "";

    // taking keys from the class
    // making titles

    let arrOfKeys = Object.keys(this);
    for (let title of arrOfKeys) {
      const td = document.createElement("td");
      td.innerHTML = title;
      thead.appendChild(td);
    }
    table.style.visibility = "visible";
  }
  get rowGenerator() {
    let arrOfValues = Object.values(this);
    let table_tr = document.createElement("tr");
    for (const valueOfObject of arrOfValues) {
      let table_td = document.createElement("td");
      table_td.innerHTML = `${valueOfObject}`;
      table_tr.appendChild(table_td);
      tBody.appendChild(table_tr);
    }
  }
}
class Ship extends ShipDetails {
  constructor({
    name,
    model,
    manufacturer,
    cost_in_credits,
    cargo_capacity,
    passengers,
    starship_class,
  }) {
    super({ cost_in_credits, cargo_capacity, passengers, starship_class });
    this.name = name;
    this.model = model;
    this.manufacturer = manufacturer;
  }
}

personPic.addEventListener("click", getData);
spacehipPic.addEventListener("click", getData);
previousBtn.addEventListener("click", getData);
nextBtn.addEventListener("click", getData);
