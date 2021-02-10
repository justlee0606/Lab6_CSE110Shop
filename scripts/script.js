// Script.js

function createProductElements() {
  const productList = document.getElementById('product-list');
  for(let i = 0; i < localStorage.length; i++) {
    const productJSON = JSON.parse(localStorage.getItem(String(i+1)));
    const product = productList.appendChild(new ProductItem(productJSON));
    if(product.inCart)
      document.getElementById('cart-count').innerText = String(Number(document.getElementById('cart-count').innerText) + 1);
  }  
}
  
window.addEventListener('DOMContentLoaded', () => {
  if(localStorage.length === 0) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        for(let i = 0; i < data.length; i++) {
          let item = data[i];
          item['inCart'] = false;
          localStorage.setItem(String(i+1), JSON.stringify(item));
        }
        createProductElements();
      });
  }
  else 
    createProductElements();
});