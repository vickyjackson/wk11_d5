let counter = 1;
const header = document.querySelector('h1');
const tagline = document.querySelector('p');
const title = document.querySelector('.title');
const loader = document.querySelector('.loader');
const nextButton = document.querySelector('.next-button');
const form = document.querySelector('form');
const contentImages = document.querySelectorAll('.content-img img');
const inputLabel = document.querySelector('#input-label');
const listContainer = document.createElement('div');
const newList = document.createElement('ul');
const popup = document.querySelector('.popup');
const overlay = document.querySelector('.overlay');
const submitButton = document.querySelector('#submit');
const emailForm = document.querySelector('.email-form');
const close = document.querySelector('.close');
const advert = document.querySelector('.advert');

document.addEventListener('DOMContentLoaded', () => {
  const currentImage = document.querySelector('.active-image');
  title.textContent = "1. " + currentImage.title;
  contentImages.forEach((image, index) => {
  image.classList.add('image' + (index += 1).toString());
  });
  nextButton.addEventListener('click', handleClickNext);
  close.addEventListener('click', handleClickClose);
  emailForm.addEventListener('submit', handleFormSubmit);
});

const delayRenderingOfElements = function(elements, milliseconds, optionalFunction){
  setTimeout(function(){ 
    if(Array.isArray(elements)){
      elements.forEach(element => {
        element.style.visibility = "visible";
      });
    } else {
      elements.style.visibility = "visible";
    }
    if (optionalFunction){
      optionalFunction();
    }
  }, milliseconds);
};

const toggleVisibility = function(element){
  if (element.classList.contains('active-image')){
    element.classList.remove('active-image');
    element.classList.add('inactive-image'); 
    console.log("true", element.classList);
  } else {
    element.classList.remove('inactive-image');
    element.classList.add('active-image'); 
    console.log("false", element.classList);
  }
}

const hideElements = function(elements){
  elements.forEach(element => {
    element.style.visibility = "hidden";
  });
};

const handleClickClose = function(){
  toggleVisibility(popup); //off
  toggleVisibility(overlay);
  popup.classList.remove('stretch-popup')
  emailForm.removeChild(listContainer);
  inputLabel.textContent = `Why not recommend some more friends?`
  while (newList.firstChild) {
    newList.removeChild(newList.firstChild);
  }
}

const handleClickNext = function(){
  counter += 1;
  const currentImage = document.querySelector('.active-image');
  const nextImage = document.querySelector('.image' + counter.toString());

  if (counter >= (contentImages.length += 1)){
    toggleVisibility(popup); //on
    toggleVisibility(overlay);
    console.log("if is true")
  } else {
    console.log("else is true")
    nextButton.disabled = true;
    toggleVisibility(currentImage);
    toggleVisibility(loader);
    hideElements([loader, title, header, tagline, form, nextButton, advert]);
    delayRenderingOfElements([header, tagline, form], 600);
    delayRenderingOfElements(advert, 1000);
    delayRenderingOfElements(loader, 1200);
    delayRenderingOfElements(nextButton, 4000, function(){
      toggleVisibility(loader);
    });
    delayRenderingOfElements(title, 4500, function(){
      title.textContent = `${counter}. ` + nextImage.title;
      nextButton.disabled = false;
      toggleVisibility(nextImage);
      console.log("else is still true")
    });
  }
};

const handleFormSubmit = function(event) {
  event.preventDefault();
  const newListItem = document.createElement('li');
  const inputedEmail = event.target.email.value;
  listContainer.classList.add('list-container')

  // if user is subscribed
  // switch out form elements so they can now invite friends

  if (inputLabel.textContent.includes("You're now subscribed")){
    if((document.querySelectorAll('.list-container').length === 0)){
      popup.classList.add('stretch-popup')
      emailForm.appendChild(listContainer);
      listContainer.appendChild(newList);
    };
    newList.appendChild(newListItem);
    newListItem.textContent = `${event.target.email.value}`;

  // if user has already recommended friends
  // update form elements to reflect that

  } else if(inputLabel.textContent.includes("Why not recommend some more friends")) {
    if((document.querySelectorAll('.list-container').length === 0)){
      popup.classList.add('stretch-popup')
      emailForm.appendChild(listContainer);
      listContainer.appendChild(newList);
    };
    newList.appendChild(newListItem);
    newListItem.textContent = `${event.target.email.value}`;

  // if user has just subscribed, and has not recommended any friends
  // let them know they subscribed and change text on button to "Invite friend"
  } else {
    inputLabel.innerHTML = `You're now subscribed to our list with <strong class="red">${inputedEmail}</strong>! Why not recommend some friends, too?`;
    submitButton.value = "Invite friend!";
  }

  // clear the form values
  form.reset();
};

//TODO 
// make adverts


