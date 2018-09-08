let counter = 1;
const header = document.querySelector('h1');
const tagline = document.querySelector('p');
const title = document.querySelector('.title');
const loader = document.querySelector('.loader');
const nextButton = document.querySelector('.next-button');
const form = document.querySelector('form');

document.addEventListener('DOMContentLoaded', () => {
  const contentImages = document.querySelectorAll('.content-img img');
  const currentImage = document.querySelector('.active-image');

  title.textContent = "1. " + currentImage.title;
  contentImages.forEach((image, index) => {
  image.classList.add('image' + (index += 1).toString());
  });
  nextButton.addEventListener('click', handleClickNext);
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

const handleClickNext = function(){
  counter += 1;
  const currentImage = document.querySelector('.active-image');
  const nextImage = document.querySelector('.image' + counter.toString());
  nextButton.disabled = true;
  toggleVisibility(currentImage);
  toggleVisibility(loader);
  hideElements([loader, title, header, tagline, form, nextButton]);
  delayRenderingOfElements([header, tagline, form], 1200);
  delayRenderingOfElements(loader, 2500);
  delayRenderingOfElements(nextButton, 7000, function(){
    toggleVisibility(loader);
  });
  delayRenderingOfElements(title, 9500, function(){
    nextButton.disabled = false;
    toggleVisibility(nextImage);
  });
}


// TODO: 
// When the form is submitted, access the data from the form in the form's submit event object
// Add a "Delete All" <button> which clears all of the list items from the list