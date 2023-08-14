import {products} from './productsdata.js';
const productCtn = document.querySelector(".productCtn")
checkStorage();
let elements = "";
getData().forEach(product => {
  elements+=loadProducts(product)
})
  productCtn.innerHTML = elements;


const productViewMainImg = document.getElementById("mainImg")
const productViewImages = document.querySelectorAll(".pImage")
const productCards = document.querySelectorAll(".productCard");
const loadingIcon = document.querySelector(".loadingIcon");
const cart = JSON.parse(localStorage.getItem("cart"));

// 

// 
// console.log(productCtn);
productCards.forEach(card => {
    displayCardIcons(card);
    viewProductActiveImg();
});
function setData(){
  localStorage.setItem("products",JSON.stringify(products))
}
function getData(){
  return JSON.parse(localStorage.getItem("products"))
}
function loadProducts(product){
  return`
  <div class="productCard col-md-4 col-lg-3 col-6" data-id="${product.id}">
  <div class="border overflow-hidden rounded-5 h-100 d-flex flex-column justify-content-between">
    <div class="position-relative">
      <img class="card-img-top rounded-pill mx-auto my-4 d-block p-1" src="${product.images[0]}" alt="Card image cap">
      <div class="cardIcons p-2 d-flex flex-column position-absolute">
        <i class="fa-regular fa-heart p-2 heartIcon"></i>
        <i class="fas fa-magnifying-glass p-2 viewIcon"></i>
      </div>
      <div class="icon-text position-absolute" id="icon-text">
        <span class="bg-danger m-2 p-1 rounded-4 text-center hiddenHeart text-white mx-4">Add to Wishlist</span>
        <span class="bg-danger m-2 p-1 rounded-4 text-center hiddenVeiw text-white mx-4">View</span>
      </div>
    </div>
      <div class="card-body text-center px-2">
        <h4 class="card-title  fs-3">${splitCardTitle(product).cardTitle}</h4>
      </div>
      <div class="text-center">
      <h6 class="price text-danger fs-3">${product.price} <span>EGP</span></h6>
      <button class="btn btn-info d-block m-auto mb-4 addToCart">Add To Cart</button>
      </div>
  </div>
</div>
  `
}
function splitCardTitle(product) {
  let title = product.title.split(" ");
  let cardTitle = title.slice(0, 6).join(" ") + " ...";
  if (title.length < 6 ){
    cardTitle = title;
  }
  return { cardTitle };
}
function displayCardIcons(card){
  const heartIcon = card.querySelector(".heartIcon");
  const viewIcon = card.querySelector(".viewIcon");
  const hiddenHeart = card.querySelector(".hiddenHeart");
  const hiddenVeiw = card.querySelector(".hiddenVeiw");
  loadingLogo(viewIcon);

  heartIcon.addEventListener("mouseover", function () {
    hiddenHeart.style.visibility = "visible";
  });

  heartIcon.addEventListener("mouseout", function () {
    hiddenHeart.style.visibility = "hidden";
  });

  viewIcon.addEventListener("mouseover", function () {
    hiddenVeiw.style.visibility = "visible";
  });

  viewIcon.addEventListener("mouseout", function () {
    hiddenVeiw.style.visibility = "hidden";
  });
  }
function addToCart(){
  const addToCart = document.querySelectorAll(".addToCart")
  addToCart.forEach(btn =>{
    btn.addEventListener("click", () => {
      const parent = btn.closest(".productCard");
      let productId = parent.dataset.id;
      let productObject = getData().find(product => product.id == productId )
      let searchProduct = cart.find(product => product.id == productId)
      if (searchProduct == undefined){
        cart.push({...productObject, quantity : 1})
      }else{
        searchProduct.quantity++;
      }
      localStorage.setItem("cart",JSON.stringify(cart))
    })
  })
  
}
addToCart()
function loadingLogo(viewIcon){
  viewIcon.addEventListener("click", function () {
    console.log("test");
    loadingIcon.style.display="block";
    closeProductOverlay();
    setTimeout(() => {
      loadingIcon.style.display="none"
      productOverlay.style.display = "block";
    }, 2000);
  });
}
function viewProductActiveImg(){
  productViewImages.forEach(item => {
    item.addEventListener("click",function(){
      productViewMainImg.src=item.src;
      removeActive(productViewImages);
      item.classList.add("active")
    })
  });
}
function removeActive(active){
  active.forEach(function(item){
      item.classList.remove("active")
  })
}
function closeProductOverlay(){
  const closeProduct = document.getElementById("closeProduct");
  console.log(closeProduct);
  closeProduct.addEventListener("click", function () {
    const productOverlay = document.getElementById("productOverlay")
    productOverlay.style.display = "none";
    console.log(productOverlay);
});
}
function checkStorage() {
  if (localStorage.getItem("products") === null){
    if (confirm('Products Not Found .. Do you want to backup them without updated or deleted Products?')) {
        setData();
    } else {
      console.log('No Products To display.');
    }
  }
}
