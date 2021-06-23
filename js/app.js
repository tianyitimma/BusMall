'use strict';

// Global varables
const mainElem = document.getElementById('main');
const roundElem = document.getElementById('round');
const divElem = document.getElementById('div');
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

Product.allProducts = [];

// object constructor function

function Product(name, imgPath){
  this.name = name;
  this.imgPath = imgPath;
  this.shows = 0;
  this.clicked = 0;
  Product.allProducts.push(this);
}

// render single product

Product.prototype.renderProduct = function(namePosition, imgPosition) {
  namePosition.textContent = this.name;
  imgPosition.src = this.imgPath;
  this.shows++;
}

// random index generator

function randomIndex () {
  return Math.floor(Math.random() * Product.allProducts.length);
}
// creating a function randomly generates products and making sure not repeat twice in a row

function productToShow(){
  let currentProducts = [leftProduct, midProduct, rightProduct];

  while (currentProducts.includes(leftProduct)) {
    let index = randomIndex();
    leftProduct = Product.allProducts[index];
  }
  currentProducts.push(leftProduct);

  while (currentProducts.includes(midProduct)) {
    let index = randomIndex();
    midProduct = Product.allProducts[index];
  }
  currentProducts.push(midProduct);

  while (currentProducts.includes(rightProduct)) {
    let index = randomIndex();
    rightProduct = Product.allProducts[index];
  }
  currentProducts.push(rightProduct);

  leftProduct.renderProduct(leftNameElem, leftImgElem);
  midProduct.renderProduct(midNameElem, midImgElem);
  rightProduct.renderProduct(rightNameElem, rightImgElem);
  roundCounter++;
  roundElem.innerHTML = '';
  roundElem.textContent = `Round Number ${roundCounter}`;
}

// showing result button

function resultButton() {
  const buttonElem = document.createElement('button');
  buttonElem.textContent = 'View Results';
  mainElem.appendChild(buttonElem);
}

// handle click function

function handleClick(event){
  let id = event.target.id;

  if(id === 'left' || id === 'leftImg' || id === 'leftName'){
    leftProduct.clicked++;
    // alert('left product is selected');
  } else if(id === 'mid' || id === 'midImg' || id === 'midName'){
    midProduct.clicked++;
    // alert('middle product is selected');
  } else if (id === 'right' || id === 'rightImg' || id === 'rightName'){
    rightProduct.clicked++;
    // alert('right product is selected');
  }
  if (roundCounter < round){
    productToShow();
  } else {
    resultButton();
    mainElem.removeEventListener('click', handleClick);
    mainElem.addEventListener('click', showResults);
  }
}

function showResults(event) {
  let text = event.target.textContent;
  if(text === 'View Results'){
    for(let product of Product.allProducts){
      if (product.clicked > 0){
        const pElem = document.createElement('p');
        pElem.textContent = `${product.name} had ${product.clicked} votes, and was seen ${product.shows} times.`;
        mainElem.appendChild(pElem);
      }
    }
  }
  mainElem.removeEventListener('click', showResults);
  // const canvasElem = document.createElement('canvas');
  // canvasElem.setAttribute
  addResultChart();
}

// function to add a chart

function addResultChart() {
  const productNames = [];
  const productClicked = [];
  const productShown = [];

  for (let product of Product.allProducts){
    productNames.push(product.name);
    productClicked.push(product.clicked);
    productShown.push(product.shows);
  }

  const ctx = document.getElementById('productChart').getContext('2d');

  const productChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: productClicked,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }, {
        label: '# of Shown',
        data: productShown,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}

// add event listener for clicking product

mainElem.addEventListener('click', handleClick);

// input all the products
function createProducts() {
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
}
createProducts();
productToShow();
