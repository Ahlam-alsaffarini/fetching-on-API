let main = document.querySelector(".main");
if (window.location.pathname === "/fetching-on-API/") {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      let products = data.products;
      for (let i = 0; i < products.length; i++) {
        // col
        let col = document.createElement("div");
        col.classList.add("col-sm-6", "col-md-4", "col-lg-3", "mb-4");
        //box
        let box = document.createElement("a");
        box.href = `product.html?id=${products[i].id}`;
        box.classList.add("box");
        col.appendChild(box);
        //img
        let img = document.createElement("img");
        img.setAttribute("src", products[i].thumbnail);
        img.classList.add("img-fluid");
        box.appendChild(img);
        //name
        let title = document.createElement("div");
        title.textContent = `${products[i].title}`;
        title.classList.add("title", "text-light");
        box.appendChild(title);
        //price
        let price = document.createElement("div");
        price.textContent = `$${products[i].price}`;
        price.classList.add("price");
        box.appendChild(price);
        //
        main.appendChild(col);
      }
    });
} else {
  let params = new URLSearchParams(window.location.search);
  let Id = params.get("id");
  console.log(Id);
  setTimeout(() => {
    document.querySelector("body .load").style.display = "none";
  }, 500);
  fetch(`https://dummyjson.com/products/${Id}`)
    .then((res) => res.json())
    .then((data) => {
      //create elements
      let img = document.querySelector(".product .product-img");
      let title = document.querySelector(".product .card-title");
      let description = document.querySelector(".product .card-description");
      let category = document.querySelector(".product .card-category");
      let brand = document.querySelector(".product .card-brand");
      let price = document.querySelector(".product .card-price");
      let rating = document.querySelector(".product .card-rating");
      // set data on the elements
      img.setAttribute("src", data.images[0]);
      title.textContent = `${data.title}`;
      description.textContent = `${data.description}`;
      category.textContent = `category: ${data.category}`;
      if (data.brand !== undefined) {
        brand.textContent = `brand: ${data.brand}`;
      }
      price.textContent = `price: $${data.price}`;
      rating.textContent = `rating: ${data.rating}`;
      let rev = data.reviews;
      //event
      document.addEventListener("click", (ele) => {
        if (ele.target.classList.contains("reviews")) {
          document.querySelector(".product .card-body").style.display = "none";
          document.querySelector(".product .card-reviews").style.display =
            "block";
          //reviews
          for (let i = 0; i < rev.length; i++) {
            let rate = document.querySelector(`.c${i} .rate`);
            let comment = document.querySelector(`.c${i} .comment`);
            let date = document.querySelector(`.c${i} .date`);
            rate.textContent = `Rate: ${rev[i].rating}`;
            comment.textContent = `comment: ${rev[i].comment}`;
            date.textContent = `Date: ${rev[i].date}`;
          }
        } else if (ele.target.classList.contains("close")) {
          document.querySelector(".product .card-reviews").style.display =
            "none";
          document.querySelector(".product .card-body").style.display = "block";
        }
      });
    });
}
