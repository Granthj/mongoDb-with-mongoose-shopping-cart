import { Navbar } from './components/navbar.js';
import { Home } from './components/home.js';
import { ProductForm } from './Component/AddProduct.js';

const app = document.getElementById('app');

function renderApp() {

    app.innerHTML = '';

    app.appendChild(Navbar());

    app.appendChild(Home());

    app.appendChild(ProductForm());

}

renderApp();