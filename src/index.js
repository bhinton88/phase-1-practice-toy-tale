let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// function that builds the toy, appends it to the DOM, and sends the fetch 
// request to pull in the data

// steps to adding a new toy.. 
// 1: build out a function that used to make a new toy and appends it to the DOM
// 2: Send a GET request that pulls in the data and creates the toys


function buildToy(toy) {
  const div = document.createElement('div')
  const toyDiv = document.getElementById('toy-collection')
  div.innerHTML = `
  <h2>${toy.name}</h2>
  <img src = ${toy.image} class="toy-avatar" />
  <p>${toy.likes}</p>
  <button class="like-btn" id="${toy.id}"> Like ❤️</button>
  `
  div.className = "card"
  toyDiv.appendChild(div)

  // grab the button via the div using the class attribute 
  // see below explanation for what below event listener is doing 
  console.log(div.querySelector('.like-btn'))
  div.querySelector('.like-btn').addEventListener('click', () => {
    toy.likes += 1
    div.querySelector('p').textContent = toy.likes
    updateTheDatabase(toy)
  })
}

fetch("http://localhost:3000/toys")
.then(response => response.json())
.then(json => json.map(object => buildToy(object)))


////// creating a new toy and adding it to the DOM 

// 3: set an event listener on the FORM (dont forget the event.preventDefault())
// 4: create a function that takes the inputs from the FORM and inputs them into
// a new object 
// 5: pass new toy OBJ to function created in step 1
// 6: pass new toy OBJ to function that will post it to the JSON file
// 7: create a function that sends a post request to the server to update the file


let form = document.querySelector("form.add-toy-form")

// Add a new toy to the DOM, update the JSON file 

form.addEventListener('submit', createToy)

// below function creates the new toy and puts it into an object

function createToy(event) {
  event.preventDefault()
  let toyObj = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  }
 buildToy(toyObj) // call function to append to DOM and pass it our new toyObj
 postToDatabase(toyObj) // POST function to add new toy to JSON file 
}

// below function sends the new toy data to the JSON file via a post request

function postToDatabase (toy) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }, 
    body: JSON.stringify(toy)
  })
  .then(response => response.json())
  .then(json => buildToy(json))
}


//////// update the likes of a toy and post it to the DOM/JSON file 


// 8: to log the likes of a toy, we first hook up a event listener to the button
// created in the buildToy function 
// 9: update the likes in the textcontent of the p tag 
// 10: then send a patch request to UPDATE the data in the JSON file so that when the page is
// refreshed the data does not change 
// ** When making a patch request we MUST include the ID in the URL request 

function updateTheDatabase (toy) {
fetch(`http://localhost:3000/toys/${toy.id}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify(toy)
})
.then(response => response.json())
.then(json => console.log(json))
} 





