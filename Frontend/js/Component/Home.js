import API_URL from 'services/api.js';
export function Home(){

    const Container = document.createElement('main');
    Container.classList.add('home');

    Container.innerHTML = `
        <section class="home-container">
            <div class="home-header">
                <h1>Products</h1>
                <p>Discover the best products at unbeatable prices. Shop now and enjoy exclusive deals!</p>
            </div>
            <div id="productContainer" class="product-container"></div>
        </section>
    `;

    const productContainer = Container.querySelector('#productContainer');

    async function loadProducts() {
        try {
            const response = await axios.get(`${API_URL}/products`);
            const product = response.data;

            productContainer.innerHTML = `
                <div class="product-image">
                    <div class="image-placeholder">
                        Product
                    </div>
                </div>
                <div class="product-details">

                <h2>${product.name}</h2>

                <p class="product-description">
                    ${product.description}
                </p>

                <p class="product-price">
                    ₹${product.price}
                </p>

                <div class="product-actions">

                    <input
                        type="number"
                        class="quantity-input"
                        value="1"
                        min="1"
                    >

                    <button
                        class="add-cart-button"
                        data-product-id="${product._id}"
                    >
                        Add to Cart
                    </button>

                    <button
                        class="order-button"
                        data-product-id="${product._id}">
                        Order Now
                    </button>
                </div>

            </div>

            `;
        } catch (error) {
            console.error('Error loading products:', error);
        }

        productContainer.addEventListener('click', async (event) => {

        const productId = event.target.dataset.productId;

        if (!productId) return;

        const quantityInput = event.target.closest('.product-details').querySelector('.quantity-input');

        const quantity = Number(quantityInput.value);

        if (!Number.isInteger(quantity) || quantity < 1) {
            alert('Please enter a valid quantity.');
            return;
        }

        try {
            if (event.target.classList.contains('add-cart-button')) {

                await axios.post(`${API_URL}/cart`, {
                    productId,
                    quantity
                });

                alert('Product added to cart!');

            } else if (event.target.classList.contains('order-button')) {

                await axios.post(`${API_URL}/orders`, {
                    productId,
                    quantity
                });

                alert('Order placed successfully!');
            }

        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please try again.');
        }
    });
    }

    loadProducts();

    return Container;
}