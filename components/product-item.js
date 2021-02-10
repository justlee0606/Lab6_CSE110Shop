// product-item.js

class ProductItem extends HTMLElement {
  constructor(product) {
    super();
    this.attachShadow({mode: 'open'});
    this.inCart = product.inCart;
    this.id = String(product.id);

    const wrapper = document.createElement('li');
    wrapper.setAttribute('class', 'product');

    const image = wrapper.appendChild(document.createElement('img'));
    image.src = product.image;
    image.alt = product.title;
    image.width = 200;

    const title = wrapper.appendChild(document.createElement('p'));
    title.classList.add('title');
    title.textContent = product.title;

    const price = wrapper.appendChild(document.createElement('p'));
    price.classList.add('price');
    price.textContent = '$' + product.price;

    const button = wrapper.appendChild(document.createElement('button'));
    if(!product.inCart)
      button.textContent = 'Add to Cart';
    else
      button.textContent = 'Remove from Cart';
    button.onclick = function() {
      let cartCount = document.getElementById('cart-count');
      if(!this.getRootNode().host.inCart) {
        alert('Added to Cart!')
        button.textContent = 'Remove from Cart';
        cartCount.innerText = String(Number(cartCount.innerText) + 1);
      }
      else {
        button.textContent = 'Add to Cart';
        cartCount.innerText = String(Number(cartCount.innerText) - 1);
      }
      this.getRootNode().host.inCart = !this.getRootNode().host.inCart;
      const productJSON = JSON.parse(localStorage.getItem(this.getRootNode().host.id));
      productJSON['inCart'] = this.getRootNode().host.inCart;
      localStorage.setItem(this.getRootNode().host.id, JSON.stringify(productJSON));
    };

    const style = document.createElement('style');
    style.textContent = 
    '.price{color:green;font-size:1.8em;font-weight:700;margin:0}' +
    '.product{align-items:center;background-color:#fff;border-radius:5px;display:grid;grid-template-areas:image title price add;grid-template-rows:67% 11% 11% 11%;height:450px;filter:drop-shadow(0px 0px 6px #000);margin:0 30px 30px 0;padding:10px 20px;width:200px}' +
    '.product > button{background-color:#ffd000;border:none;border-radius:5px;color:#000;justify-self:center;max-height:35px;padding:8px 20px;transition:.1s ease all}' +
    '.product > button:hover{background-color:#ffa600;cursor:pointer;transition:.1s ease all}' +
    '.product > img{align-self:center;justify-self:center;width:100%}' +
    '.title{font-size:1.1em;margin:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.title:hover{font-size:1.1em;margin:0;white-space:wrap;overflow:auto;text-overflow:unset}';
    this.shadowRoot.append(style, wrapper);
  }

}

customElements.define('product-item', ProductItem);