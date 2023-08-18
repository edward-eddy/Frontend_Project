var categories = [
    "mens-shirts",
    "womens-dresses",
    "mens-shoes",
    "womens-shoes",
];
// to make a headding for each category
var headingTitle = [
    "Men T-shirts",
    "Women Dresses",
    "Men Shoes",
    "Women Shoes",
];

var extention, pageIndecator = window.location.href.split("?q=")[1];

// highlights the selected category button
// function onNavLoad() {
//     // all categories buttons
//     let arr = document.querySelectorAll("div.main div.catButton button");
//     let index = categories.indexOf(pageIndecator);
//     console.log(arr);
//     arr[index].style.backgroundColor = "black";
//     arr[index].style.color = "whitesmoke";
// }

// reads the url to know what the user requested
function chooseWhatToShow() {
    // gets the data of a specific category
    if (categories.includes(pageIndecator)) {
        extention = "category/" + pageIndecator;
        let i = categories.indexOf(pageIndecator);
        getData(extention, i);
    // gets the data of a single product
    } else if (!isNaN(parseInt(pageIndecator))) {
        extention = pageIndecator;
        getData(extention);
    // gets the data of all products in all available categries one categoty at a time
    } else {
        for (i in categories) {
            extention = "category/" + categories[i];
            getData(extention, i);
        }
    }
}

// talking to the "server" using ajax to get the data requsted
function getData(extention, i) {
    let fileRequested = new XMLHttpRequest();
    fileRequested.open("GET", "https://dummyjson.com/products/" + extention);
    fileRequested.send();

    fileRequested.onreadystatechange = function () {
        if (fileRequested.readyState == 4 && fileRequested.status == 200) {
            var data = fileRequested.response;
            data = JSON.parse(data);
            // show a specific user or show the options to choose
            // if the user requested all products or a specific category
            if (data.products) {
                createSeparetor(i);
                createProductsCards(data.products);
            // if the user requested a single product
            } else {
                addProduct(data);
            }
        }
    };
}

// makes a headding for each category
function createSeparetor(i) {
    var categoryTitle = document.createElement("div");
    categoryTitle.setAttribute("class", "hund");
    var article = document.createElement("article");
    var categoryTitleHeading = document.createElement("h2");
    categoryTitleHeading.innerHTML = headingTitle[i];
    var hr = document.createElement("HR");
    article.append(categoryTitleHeading, hr);
    categoryTitle.appendChild(article);

    document.getElementById("products").appendChild(categoryTitle);
}


function createProductsCards(data) {
    for (let product of data) {
        // -------------------------CARD CONTAINER------------------
        var divCard = document.createElement("div");
        divCard.setAttribute("id", product.id);
        divCard.classList.add("card");
        document.getElementById("products").append(divCard);
        // ---------------------------CARD LINK---------------
        var prodLink = document.createElement("a");
        prodLink.setAttribute("href", "./product.html?q=" + product.id);
        prodLink.classList.add("card", product.id);
        document.getElementById(product.id).appendChild(prodLink);
        // ------------------------ADD TO CART BUTTON---------
        var button = document.createElement("button");
        var buttonNode = document.createTextNode("Add to Cart");
        button.appendChild(buttonNode);
        button.setAttribute("style", "position: absolute; margin-top: 405px;");
        document.getElementById(product.id).append(button);
        //-----------------------------IMAGE------------------------
        var img = document.createElement("img");
        img.setAttribute("src", product.thumbnail);
        //-----------------------------TITLE------------------------
        var title = document.createElement("p");
        title.style.margin = "20px 0px";
        var titleContent = document.createTextNode("Title: " + product.title);
        title.appendChild(titleContent);
        //-----------------------------BRAND------------------------
        var brand = document.createElement("p");
        var brandContent = document.createTextNode("Brand: " + product.brand);
        brand.appendChild(brandContent);
        // ----------------------------PRICE-----------------------
        var heading = document.createElement("h4");
        var headingContent = document.createTextNode("EGP " + product.price + "0");
        heading.appendChild(headingContent);

        document
            .getElementsByClassName(product.id)[0] //the anchor link I just made
            .append(img, brand, title, heading);
    }
}

// in case of requesting a single product
function addProduct(data) {
    // put the first picture at the first position
    document.getElementById("thumbnail").src = data.thumbnail;
    // put the rest of the pictures each at its own place
    var images = document.getElementsByClassName("gallery__img");
    for (var i in images) {
        images[i].src = data.images[i];
    }

    // writing the product info at the info bar on the right of the pictures
    document.getElementById("product__title").innerHTML = data.title;
    document.getElementById("product__brand").innerHTML =
        "Brand: " + data.brand;
    document.getElementById("product__description").innerHTML =
        data.description;
    document.getElementById("product__price").innerHTML =
        "EGP " + data.price + "0";
    document.getElementById("stock").innerHTML =
        "Left in the stock: " + data.stock;
}
