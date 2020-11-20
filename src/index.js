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

  function likeToy(event){
    let updatedData = new Object()
    updatedData.likes = (parseInt(event.target.parentNode.children[2].innerText)) + 1;
    
    let requestObject = new Object();
    requestObject.method = 'PATCH';
    requestObject.headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };
    requestObject.body = JSON.stringify(updatedData);

    fetch('http://localhost:3000/toys/' + event.target.classList[1], requestObject)
    .then(res => res.json())
    .then(toy => {
      pTag = document.getElementById(toy.id)
      pTag.innerText = toy.likes;
    })
  }

  function renderToy(toy){
    let toyContainer = document.getElementById('toy-collection');

    let toyDiv = document.createElement('div');
    toyDiv.classList.add('card');
    toyDiv.classList.add(toy.id)

    let toyName = document.createElement('h2');
    toyName.append(toy.name);
    toyDiv.appendChild(toyName);

    let toyImage = new Image();
    toyImage.src = toy.image;
    toyImage.classList.add('toy-avatar');
    toyDiv.appendChild(toyImage);

    let toyLikes = document.createElement('p');
    toyLikes.append(toy.likes);
    toyLikes.id = toy.id;
    toyDiv.appendChild(toyLikes);

    let likeButton = document.createElement('button');
    likeButton.append('Like');
    likeButton.classList.add('like-btn');
    likeButton.addEventListener('click', event => likeToy(event));
    likeButton.classList.add(toy.id)
    toyDiv.appendChild(likeButton);
    toyContainer.appendChild(toyDiv);
    
  }

  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => toys.forEach( toy => renderToy(toy)));

  function newToy(event){
    event.preventDefault();
    

    let newToy = new Object();
    newToy.name = event.target.name.value;
    newToy.image = event.target.image.value;
    newToy.likes = 0;

    let requestObject = new Object();
    requestObject.method = 'Post';
    requestObject.headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };
    requestObject.body = JSON.stringify(newToy);

    fetch('http://localhost:3000/toys', requestObject)
    .then(res => res.json())
    .then(data => renderToy(data));

    addBtn.click();
  }

  let toyForm = document.querySelector('.add-toy-form');
  toyForm.addEventListener('submit', event => newToy(event));
});
