import API_URL from 'services/api.js';
export function Order(){

    const container = document.createElement('div');
    
    container.innerHTML = `
    <section class="order-container">
            <div class="order-header">
                <h1>My Orders</h1>
                <p>View your order details and track your purchases.</p>
            </div>

        <div class="order-content" id="orderContent"></div>
        </section>
    `;

    const orderContent = container.querySelector('#orderContent');

    async function loadOrders(){

        try{
            const response = await axios.get(`${API_URL}/orders`);
            const orders = response.data;

            if (orders.length === 0) {
                orderContent.innerHTML = "<p>No orders found.</p>";
                return;
            }
            orderContent.innerHTML = orders.map(order => `
                <div class="order-card">

                    <div class="order-top">
                        <div>
                            <h3>Order #${order._id}</h3>
                            <p>Placed on ${new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>

                        <span class="order-status">
                            ${order.orderStatus || "Pending"}
                        </span>
                    </div>

                    <div class="order-product">
                        <div class="product-details">
                            <h3>${order.product}</h3>
                            <p>Quantity: ${order.quantity}</p>
                            <p class="product-price">
                                ₹${order.price}
                            </p>
                        </div>
                    </div>

                    <div class="order-bottom">
                        <div>
                            <p>Total Amount</p>
                            <h3>₹${order.price * order.quantity}</h3>
                        </div>
                    </div>
                    <button class="cancel-order-btn" data-id="${order._id}">
                        Cancel Order
                    </button>
                </div>
            `).join('');

            orderContent.querySelectorAll(".cancel-order-btn").forEach(button => {
                button.addEventListener("click", async () => {
                    const orderId = button.dataset.id;

                    if(!confirm("Are you sure you want to cancel this order?")) {
                        return;
                    }

                    try{
                        await axios.put(`${API_URL}/orders/${orderId}/cancel`);
                        alert("Order cancelled successfully.");
                        loadOrders();
                    }
                    catch(error){
                        alert("Error cancelling order.");
                    }
                });

            })
        }
        catch(error){

        }
    }
    return container;
}