var productName = document.getElementById("productName");
var productCategroy = document.getElementById("productCategory");
var productPrice = document.getElementById("productPrice");
var productDescription = document.getElementById("productDesc");
var currentIndex = 0;
var productContainer;
if(localStorage.getItem("list") == null){
    productContainer = [];
} else{
    productContainer = JSON.parse( localStorage.getItem("list"))
    displayProduct()
}

function addProduct(){
 if(validateInput()){    
    product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategroy.value,
        description: productDescription.value,
    }
    productContainer.push(product);
    localStorage.setItem("list", JSON.stringify(productContainer))
    // console.log(productContainer);
    displayProduct()
    removeInputs()
}
else{
    alert("all inputs required")
}
}
function removeInputs(){
    productName.value = "";
    productPrice.value = "";
    productCategroy.value = "";
    productDescription.value = "";
}
function displayProduct(){
    var container ="";
    for(var i=0; i<productContainer.length; i++){
        container+= `<tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].description}</td>
        <td><button class = "btn btn-warning" onclick = "updateProduct(${i})">update</button></td>
        <td><button class = "btn btn-danger" onclick = "deleteProduct(${i})">delete</button></td>
        </tr>
        `
    }
    document.getElementById("tableBody").innerHTML=container;
}
function validateInput(){
    if(productName.value !="" && productPrice.value !="" && productDescription.value !="" && productCategroy.value !=""){
        return true
    }
    else{
        return false
    }
}
function deleteProduct(index){
    productContainer.splice(index,1);
    displayProduct()
    localStorage.setItem("list", JSON.stringify(productContainer))
}
function search(term){
    var container ="";
    for(var i=0; i<productContainer.length;i++){
        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase()) ||
           productContainer[i].category.toLowerCase().includes(term.toLowerCase())){
            container+= `<tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].description}</td>
        <td><button class = "btn btn-warning">update</button></td>
        <td><button class = "btn btn-danger" onclick = "deleteProduct(${i})">delete</button></td>
        </tr>
        `
        }
    }
    document.getElementById("tableBody").innerHTML = container
}

function updateProduct(index){
    currentIndex = index;
    productName.value = productContainer[index].name;
    productPrice.value = productContainer[index].price;
    productCategroy.value = productContainer[index].category;
    productDescription.value = productContainer[index].description;
    document.getElementById("add").style.display = "none"
    document.getElementById("update").style.display = "block"
}

function addUpdate(){
    productContainer[currentIndex].name = productName.value;
    productContainer[currentIndex].price = productPrice.value;
    productContainer[currentIndex].category = productCategroy.value;
    productContainer[currentIndex].description = productDescription.value;
    displayProduct()
    localStorage.setItem("list", JSON.stringify(productContainer))
    document.getElementById("add").style.display = "block"
    document.getElementById("update").style.display = "none"
    removeInputs()
}
