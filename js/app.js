'use strict';

// Global varables
const roundElem = document.getElementById('round');
const mainElem = document.getElementById('main');
const buttonElem = document.getElementById('button');
const leftImgElem = document.getElementById('leftImg');
const leftNameElem = document.getElementById('leftName');
const midImgElem = document.getElementById('midImg');
const midNameElem = document.getElementById('midName');
const rightImgElem = document.getElementById('rightImg');
const rightNameElem = document.getElementById('rightName');
let leftProduct = null;
let midProduct = null;
let rightProduct = null;
// set the number of rounds and counting rounds
let round = 5;
let roundCounter = 0;

// number of products to show each time
let numOfProducts = 3;

// const leftElem = document.getElementById('left');
// const midElem = document.getElementById('mid');
// const rightElem = document.getElementById('right');
Product.allProducts = [];

// object constructor function

function Product(name, imgPath){
  this.name = name;
  this.imgPath = imgPath;
  this.shows = 0;
  this.clicked = 0;
  Product.allProducts.push(this);
}

// render a single product to html
// Product.prototype.renderProduct = function(position) {
//   const productImg = document.createElement('img');
//   productImg.src = this.imgPath;
//   position.appendChild(productImg);
//   const productName = document.createElement('h3');
//   productName.textContent = this.name;
//   position.appendChild(productName);
// }

// render single product

Product.prototype.renderProduct = function(namePosition, imgPosition) {
  namePosition.textContent = this.name;
  imgPosition.src = this.imgPath;
  this.shows++;
}


// creating a function randomly generates n products

function productToShow(){
  let randomArray = Product.allProducts.sort(() => 0.5 - Math.random());
  let randomProducts = randomArray.slice(0,numOfProducts);
  // in this case we know n is 3
  console.log(randomProducts);
  leftProduct = randomProducts[0];
  midProduct = randomProducts[1];
  rightProduct = randomProducts[2];

  leftProduct.renderProduct(leftNameElem, leftImgElem);
  midProduct.renderProduct(midNameElem, midImgElem);
  rightProduct.renderProduct(rightNameElem, rightImgElem);
  roundCounter++;
  roundElem.innerHTML = '';
  roundElem.textContent = `Round Number ${roundCounter}`;
}



// function productToShow(){
//   let randomArray = Product.allProducts.sort(() => 0.5 - Math.random());
//   let randomProducts = randomArray.slice(0,numOfProducts);
//   // in this case we know n is 3

//   for(let i = 0; i < numOfProducts; i++){
//     // const divElem = document.createElement('div');
//     // divElem.setAttribute('id', `${randomProducts[i].name}`);
//     // mainElem.appendChild(divElem);
//     // const imgElem = document.createElement('img');
//     // imgElem.src = randomProducts[i].imgPath;
//     // divElem.appendChild(imgElem);
//     // const h3Elem = document.createElement('h3');
//     // h3Elem.textContent = randomProducts[i].name;
//     // divElem.appendChild(h3Elem);
//     randomProducts[i].renderProduct();
//     randomProducts[i].shows++;
//   }
//   roundCounter++;
//   roundElem.innerHTML = '';
//   roundElem.textContent = `Round Number ${roundCounter}`;
// }

// showing result button

function resultButton() {
  const buttonElem = document.createElement('button');
  buttonElem.textContent = 'View Results';
  mainElem.appendChild(buttonElem);
}

// handle click function

function handleClick(event){
  let id = event.target.id;

  if (id.includes('left','right','mid')){
    if(id.includes('left')){
      leftProduct.clicked++;
    } else if(id.includes('mid')){
      midProduct.clicked++;
    } else {
      rightProduct.clicked++;
    }
    productToShow();
  }
  if (roundCounter > round) {
    mainElem.removeEventListener('click', handleClick);
    showResults();
  }
}

function showResults() {
  for(let product of Product.allProducts){
    if (product.clicked > 0){
      const pElem = document.createElement('p');
      pElem.textContent = `${product.name} had ${product.clicked} votes, and was seen ${product.shows} times.`;
      mainElem.appendChild(pElem);
    }
  }
  mainElem.removeEventListener('submit', showResults);
}

// add event listener for clicking product

mainElem.addEventListener('click', handleClick);





// input all the products
new Product('bag', './img/bag.jpg');
new Product('banana', './img/banana.jpg');
new Product('bathroom', './img/bathroom.jpg');
new Product('boots', './img/boots.jpg');
new Product('breakfast', './img/breakfast.jpg');
new Product('bubblegum', './img/bubblegum.jpg');
new Product('chair', './img/chair.jpg');
new Product('cthulhu', './img/cthulhu.jpg');
new Product('dog-duck', './img/dog-duck.jpg');
new Product('dragon', './img/dragon.jpg');
new Product('pen', './img/pen.jpg');
new Product('pet-sweep', './img/pet-sweep.jpg');
new Product('scissors', './img/scissors.jpg');
new Product('shark', './img/shark.jpg');
new Product('sweep', './img/sweep.png');
new Product('tauntaun', './img/tauntaun.jpg');
new Product('unicorn', './img/unicorn.jpg');
new Product('water-can', './img/water-can.jpg');
new Product('wine-glass', './img/wine-glass.jpg');

productToShow();

resultButton();

// add event listener for submit button
mainElem.addEventListener('submit', showResults);