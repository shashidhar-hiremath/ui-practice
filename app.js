
const productList = [];
let selectedProduct = {};
let formHide = '-300px';
const formControl = {
    name: {},
    type: {},
    cost: {},
    offerCost: {},
    image: {},
    moreDetails: {},
};

const prevControl = {
    name: {},
    type: {},
    cost: {},
    offerCost: {},
    image: {},
    moreDetails: {},
};
const controlValues = {};
let cardContainer;
let id = 0;
let formPanel;

document.addEventListener('DOMContentLoaded', () => {
    formControl.name = document.querySelector('#ProductName');
    formControl.type = document.querySelector('#ProductType');
    formControl.cost = document.querySelector('#ProductCost');
    formControl.offerCost = document.querySelector('#ProductOfferPrice');
    formControl.image = document.querySelector('#ProductImage');
    formControl.moreDetails = document.querySelector('#ProductMoreDetails');

    prevControl.name = document.querySelector('#PrevName');
    prevControl.type = document.querySelector('#PrevType');
    prevControl.cost = document.querySelector('#PrevCost');
    prevControl.offerCost = document.querySelector('#PrevOfferPrice');
    prevControl.image = document.querySelector('#PrevImage');
    prevControl.moreDetails = document.querySelector('#PrevMoreDetails');

    const submitBtn = document.querySelector('#ProductSubmit');
    submitBtn.addEventListener('click', addProductToList);
    cardContainer = document.querySelector('.list-items-conatiner');
    addControlEventListener();

    formPanel = document.querySelector('.slider-left');
});

function addControlEventListener() {
    formControl.name.addEventListener('input', (event) => {
        controlValues.name = event.target.value;
    });
    formControl.type.addEventListener('input', (event) => {
        controlValues.type = event.target.value;
    });
    formControl.cost.addEventListener('input', (event) => {
        controlValues.cost = event.target.value;
    });
    formControl.offerCost.addEventListener('input', (event) => {
        controlValues.offerCost = event.target.value;
    });
    formControl.image.addEventListener('input', (event) => {
        controlValues.image = event.target.value;
    });
    formControl.moreDetails.addEventListener('input', (event) => {
        controlValues.moreDetails = event.target.value;
    });
}

function addProductToList() {
    id++;
    productList.push({...controlValues, id});
    cardContainer.innerHTML = '';
    cardContainer.innerHTML = productList.map(addProductCard);
    console.log(productList);

    formControl.name.value = '';
    formControl.type.value = '';
    formControl.cost.value = '';
    formControl.offerCost.value = '';
    formControl.image.value = '';
    formControl.moreDetails.value = '';
}

function addProductCard(formValues) {
    return `
    <div class="product-card">
                        <div class="product-tumb">
                            <img src="${formValues.image}" alt="">
                        </div>
                        <div class="product-details">
                            <span class="product-catagory">${formValues.type}</span>
                            <h4><a href="">${formValues.name}</a></h4>
                            <div class="product-bottom-details">
                                <div class="product-price"><small>${formValues.cost}</small>$${formValues.offerCost}</div>
                                <button class="view-product" onclick="previewProduct(${formValues.id})">Preview</button>
                            </div>
                        </div>
                    </div>
    `;;
}

function previewProduct(id) {
    selectedProduct = {...productList.find(p => p.id === id)};
    prevControl.name.innerHTML = selectedProduct.name;
    prevControl.type.innerHTML = selectedProduct.type.toUpperCase();
    prevControl.cost.innerHTML = selectedProduct.cost;
    prevControl.offerCost.innerHTML = selectedProduct.offerCost;
    prevControl.image.src = selectedProduct.image;
    prevControl.moreDetails.innerHTML = selectedProduct.moreDetails;
}

function deleteProduct() {
    const index = productList.findIndex(p => p.id === selectedProduct.id);
    productList.splice(index, 1);
    selectedProduct = productList.length > 0 ? productList[productList.length - 1] : {};
    previewProduct(id);
}

function openClosePanel(event) {
    if (!formPanel.classList.contains('open-form')) {
        formPanel.classList.add('open-form');
        event.target.innerHTML = 'Close Form';
    } else {
        formPanel.classList.remove('open-form');
        event.target.innerHTML = 'Open Form';
    }
}


