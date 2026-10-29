export function ProductForm() {
    const container = document.createElement("div");

    container.innerHTML = `
        <form class="product-form">
            <h2>Add Product</h2>

            <label>Product Name</label>
            <input type="text" id="name" required>

            <label>Description</label>
            <textarea id="desc" required></textarea>

            <label>Price</label>
            <input type="number" id="price" min="0.01" step="0.01" required>

            <label>Image URL</label>
            <input type="url" id="image" required>

            <button type="submit">Add Product</button>
            <p id="message"></p>
        </form>
    `;

    const form = div.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const product = {
            name: div.querySelector("#name").value,
            desc: div.querySelector("#desc").value,
            price: Number(div.querySelector("#price").value),
            image: div.querySelector("#image").value
        };

        try {
            const response = await axios.post(`${API_URL}/products`, product,);

            const data = response.data;

            div.querySelector("#message").textContent = data.message;

            if (response.ok) {
                form.reset();
            }
        } catch (error) {
            div.querySelector("#message").textContent = "Server error";
        }
    });

    return container;
}