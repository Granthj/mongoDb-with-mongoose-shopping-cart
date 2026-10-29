import API_URL from 'services/api.js';
export function Cart() {

    const container = document.createElement('div');
    container.className = 'container';

    container.innerHTML = `
        <section class="cart-container">

            <div class="cart-header">
                <h1>My Cart</h1>
                <p>Review your items before placing your order.</p>
            </div>

            <div class="cart-content" id="cartContent"></div>

            <div class="cart-summary">
                <h2>Order Summary</h2>
                <p>Total: <span id="cartTotal">0</span></p>
            </div>

        </section>

    `;


    const cartContent = container.querySelector('#cartContent');
    const cartTotal = container.querySelector('#cartTotal');
    const cartSummary = container.querySelector('#cartSummary');
    const orderBtn = container.querySelector('#orderBtn');

    async function loadCart() {
        try {
            const response = await axios.get(`${API_URL}/cart`);
            const cartItems = response.data;

            if(cartItems.length === 0) {
                cartContent.innerHTML = "<p>Your cart is empty.</p>";
                cartSummary.style.display = 'none';
                return;
            }  
            cartSummary.style.display = 'block';
            let total = 0;

            cartContent.innerHTML = cartItems.map(item => {
                total += item.price * item.quantity;
                return`
                    <div class="cart-item">

                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <h3>${item.name}</h3>
                            <p class="cart-item-description">
                                ${item.description}
                            </p>
                            <p class="cart-item-price">
                                ₹${item.price}
                            </p>
                            <p class="cart-item-quantity">
                                Quantity: ${item.quantity}
                            </p>
                            <button class="remove-cart-btn"
                                data-id="${item._id}">
                                Remove
                            </button>
                        </div>
                `}).join('');
                cartTotal.textContent = total;
        } catch (error) {
            console.error('Error loading cart:', error);
        }

        cartContent.addEventListener('click', async (event) => {
            if (event.target.classList.contains('remove-cart-btn')) {
                const cartId = event.target.dataset.id;

                try {
                    await axios.delete(`${API_URL}/cart/${cartId}`);
                    await loadCart();
                } catch (error) {
                    console.error('Error removing item:', error);
                    alert('Failed to remove item.');
                }
            }
        });
        orderBtn.addEventListener('click', async () => {
            try {
                await axios.post(`${API_URL}/orders`);

                alert('Order placed successfully!');
                await loadCart();

            } catch (error) {
                console.error('Error placing order:', error);
                alert('Failed to place order.');
            }
        });
    }

    loadCart();

    return container;
}