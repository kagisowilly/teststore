let cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// READ
function readProducts(products) {
    
    document.querySelector("#cart").innerHTML = "";
    products.forEach((product, position) => {
      document.querySelector("#cart").innerHTML += `<div class="card" style="width: 18rem;">
      <img src="${product.img}" class="card-img-top" alt="${product.title}">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">R${product.price*product.qty}</p>
        <a href="#" class="btn btn-danger"  onclick="removeProduct(${position})"><i class="material-icons">delete</i></a>
      </div>
    </div>
      `;
      
    });
  }
  
  readProducts(cart);

// REMOVE PRODUCT
function removeProduct(position) {
      cart.splice(position, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      readProducts(cart);
  }

  // CHECKOUT
function checkout() {
  let total = cart
    .reduce((total, product) => {
      return total + product.price * product.qty;
    }, 0)
    .toFixed(2);
  try {
    if (parseInt(total) == 0) throw new Error("Nothing in cart");
    let confirmation = confirm(`Total payment needed: R${total}`);

    if (confirmation) {
      cart.length = 0;
      localStorage.removeItem("cart");
      readCart(cart);
    }
  } catch (err) {
    alert(err);
  }
}
  
