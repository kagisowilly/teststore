let products = JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))
  : [
      {
        title: "GEL-NIMBUS LITE 2",
        category: "Shoes",
        price: 3000.00,
        img: "https://images.asics.com/is/image/asics/1011B009_401_SR_RT_GLB?$product$",
      },
      {
        title: "GEL-NIMBUS 23",
        category: "Shoes",
        price: 3500.00,
        img: "https://images.asics.com/is/image/asics/1011B004_404_SR_RT_GLB?$product$",
      },
      {
        title: "Edge II Duffle MD",
        category: "Accessories",
        price: 770.79,
        img: "https://images.asics.com/is/image/asics/ZR3435_9490_AC_FT_AAC?$sfcc-product$",
      },
      {
        title: "FUJI LITE 2",
        category: "Shoes",
        price: 2000.00,
        img: "https://images.asics.com/is/image/asics/1011B209_400_SR_RT_GLB?$product$",
      },
      {
        title: "JaGEL-KAYANO 28pan",
        category: "Shoes",
        price: 2500,
        img: "https://images.asics.com/is/image/asics/1011B189_402_SR_RT_GLB?$zoom$",
      },
      {
        title: "SB TIC POLO",
        category: "Clothing",
        price: 700,
        img: "https://images.asics.com/is/image/asics/2113A060_401_GM_FT_GLB?$zoom$",
      },
    ];

let cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// READ
function readProducts(products) {
  document.querySelector("#products").innerHTML = "";
  products.forEach((product, position) => {
    document.querySelector("#products").innerHTML += `
    
      <div class="card">
        <img src="${product.img}" class="card-img-top h-50" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">R${product.price}</p>
          <input type="number"  min=1 value=1 id="addToCartt${position}"style="width:35px; height:30px;">
          <button type="button" class="btn card-btn btn-success" onclick="addtocart(${position})"><i class="material-icons">shopping_cart</i></button>
          <button type="button" class="btn card-btn btn-primary" data-bs-toggle="modal" data-bs-target="#editProduct${position}" >
          <i class="material-icons">mode_edit</i>
          </button>
          <button type="button" class="btn card-btn btn-danger" onclick="deleteProduct(${position})" >
          <i class="material-icons">delete</i>
          </button>

           
              <div
                class="modal fade"
                id="editProduct${position}"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Edit ${product.title}
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        <label for="editTitle${position}" class="form-label">Title</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editTitle${position}"
                          id="editTitle${position}"
                          value="${product.title}"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="editCategory${position}" class="form-label">Category</label>
                        <select
                          class="form-select"
                          name="editCategory${position}"
                          id="editCategory${position}"
                        >
                          <option value="Fruit">Fruit</option>
                          <option value="Vegetables">Vegetables</option>
                          <option value="Meat">Meat</option>
                        </select>
                      </div>
                      <div class="mb-3" >
                        <label for="editPrice${position}" class="form-label">Price</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editPrice${position}"
                          id="editPrice${position}"
                          value="${product.price}"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="editImg${position}" class="form-label">Image URL</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editImg${position}"
                          id="editImg${position}"
                          value="${product.img}"
                        />
                      </div>
                    </div>
                    <div class="modal-footer" style="width:10px;">
                      <button 
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                        onclick="updateProduct(${position})"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>
    `;
  });
}

readProducts(products);

// CREATE
function createProduct() {
  let title = document.querySelector("#addTitle").value;
  let category = document.querySelector("#addCategory").value;
  let price = document.querySelector("#addPrice").value;
  let img = document.querySelector("#addImg").value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    products.push({
      title,
      category,
      price,
      img,
    });
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}

// UPDATE
function updateProduct(position) {
  let title = document.querySelector(`#editTitle${position}`).value;
  let category = document.querySelector(`#editCategory${position}`).value;
  let price = document.querySelector(`#editPrice${position}`).value;
  let img = document.querySelector(`#editImg${position}`).value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    products[position] = {
      title,
      category,
      price,
      img,
    };
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}

// DELETE
function deleteProduct(position) {
  let confirmation = confirm(
    "Are you sure you want to delete the selected product?"
  );

  if (confirmation) {
    products.splice(position, 1);
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  }
}

//ADD TO CART
function addtocart(position) {
  let qty= document.querySelector(`#addToCartt${position}`).value;


  cart.push({ ...products[position],qty });

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Search Products
searchbar = () => {
  var searchedProduct = document.getElementById("search").value.trim();
  products

};

// Sort By Price

function sortPrice() {
  let direction = document.querySelector("#sortPrice").value;

  let sortedProducts = products.sort((a, b) => a.price - b.price);

  console.log(sortedProducts);

  if (direction == "descending") sortedProducts.reverse();
  readProducts(sortedProducts);
}

// Sort By Title

function sortTitle() {
  let direction = document.querySelector("#sortTitle").value;

  let sortedProducts = products.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  if (direction == "descending") sortedProducts.reverse();
  console.log(sortedProducts);
  readProducts(products);}

  // SORT BY CATEGORY
function sortCategory() {
  let category = document.querySelector("#sortCategory").value;

  if (category == "All") {
    return readProducts(products);
  }

  let foundProducts = products.filter((product) => {
    return product.category == category;
  });

  readProducts(foundProducts);
  console.log(foundProducts);
}