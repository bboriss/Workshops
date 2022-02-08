const memoryPerson = {
  url: "https://swapi.dev/api/people",
  data: [],
  previous: null,
  next: null,
};

function getData(url) {
  return fetch(url)
    .then((r) => r.json())
    .then((r) => r);
}

function refreshMemory(r) {
  memoryPerson.previous = r.previous;
  memoryPerson.next = r.next;
  memoryPerson.data = r.results;
}

function showData(data) {
  let titles = $("#titles").append(
    "<td>Name</td>",
    "<td>Height</td>",
    "<td>Mass</td>",
    "<td>Gender</td>",
    "<td>Birth Year</td>",
    "<td>Appearances</td>"
  );

  let body = $("#data").append(`<tr>
  <td>${data.name}</td>
  </tr>`);
  console.log(data);
}

(($) => {
  const personPic = $("#personPic");
  const previous = $("#previous");
  const next = $("#next");

  personPic.click(
    (e) =>
      memoryPerson.url &&
      getData(memoryPerson.url)
        .then(refreshMemory)
        .then((r) => showData(memoryPerson.data))
        .then((r) => console.log(memoryPerson.data))
  );
  previous.click(
    (e) =>
      memoryPerson.previous &&
      getData(memoryPerson.previous)
        .then(refreshMemory)
        .then((r) => showData(memoryPerson.data))
  );
  next.click(
    (e) =>
      memoryPerson.next &&
      getData(memoryPerson.next)
        .then(refreshMemory)
        .then((r) => showData(memoryPerson.data))
  );
})($);
