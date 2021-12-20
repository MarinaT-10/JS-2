const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                 this.goods = data;
                 this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts(){
      
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
       
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
//            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();
console.log(list.allProducts);

// Создаем класс Корзина 
class Cart {
    constructor(container = '.cartbox'){
        this.container = container;
        this.goods = [];//массив товаров из JSON документа в корзине
        this._cartOpen ();
        this._calcSumCart
        this._getProductCart()
            .then(data => { //data - объект js
                 this.goods = [...data.contents];
                 this.render()
            });
    }


    _cartOpen (){
          let cartBtnEl = document.querySelector('.btn-cart'); // находим кнопку корзины в header
        // console.log(cartBtnEl);
        let cartEl = document.querySelector(this.container); // находим скрытый элементы корзины с классом .hidden
        // console.log(cartEl);
        cartBtnEl.addEventListener ('click', () => { // обработчик события клик по кнопке Корзина в header
            cartEl.classList.toggle ('hidden'); // удаляем или добавляем класс .hidden у скрытого элемента div
        });
    }


    _getProductCart(){
      
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });       
    }

    render(){
        const cartBlock = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new CartItem ();
            cartBlock.insertAdjacentHTML('beforeend', productObj.render(product));
        }
    }
}

// создаем класс товара в корзине 

class CartItem {
    constructor(product, img = 'https://via.placeholder.com/50x100'){
        this.img = img;
    }   
    
    render(product){
        return `
        <div class="cart-item" data-id="${product.id_product}">
                <div class="product-bio">
                    <img src="${this.img}" alt="Some img">
                    <div class="product-desc">
                        <p class="product-title">${product.product_name}</p>
                        <p class="product-quantity">Количество: ${product.quantity} шт.</p>
                        <p class="product-single-price">Цена: $${product.price}</p>
                    </div>
                    <div class="cart-right">
                        <p>$${product.price*product.quantity}</p>
                        <button class="cart-btn">х</button>
                    </div>
                </div>
            </div>`
    }
}

let cart = new Cart ();

