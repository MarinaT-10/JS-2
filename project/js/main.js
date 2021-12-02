const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},    
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение

const renderProduct = (item) => {
    return `<div class="product-item">
                <h3>${item.title}</h3>
                <img src="img/Notebook.jpg" alt="Product">
                <p>${item.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};

// Откуда запятые? Запятые выводятся на страницу, поскольку метод map перебирает 
// все элементы массива list и формирует новый массив productList. А элементы массива 
//разделяются всегда запятыми. Поэтому на страницу также выводятся запятые. 
//Чтобы убрать запятые, используем метод join, который как раз убирает разделители, 
//в данном случае запятые. 
 
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item)).join('');
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);