import Navbar from "./Component/Navbar.js";
import Home from "./Component/Home.js";
import Order from "./Component/Order.js";
import Cart from "./Component/Cart.js";


const app = document.getElementById("app");
const publicRoutes = ["/login", "/sign-up"];
function render(route) {
  app.innerHTML = "";

  // Separate the path from any query string
  const path = route.split("?")[0] || "/";

  if (!token && path !== "/login" && path !== "/sign-up") {
    navigate("/login");
    return;
  }
  if (!publicRoutes.includes(path)) {
    app.appendChild(Navbar(navigate));
  }

  if (path === "/") {
    app.appendChild(Home(navigate));
    return;
  }
  switch (path) {
    case "/login":
      app.appendChild(Login(navigate));
      break;
    case "/sign-up":
      app.appendChild(SignUp(navigate));
      break;
    case "/order":
      app.appendChild(Order(navigate));
      break;
    case "/cart":
      app.appendChild(Cart(navigate));
      break;
    default:
      app.innerHTML = "<h2>404 Page Not Found</h2>";
  }
}

export function navigate(route) {
  window.history.pushState({}, "", route);
  render(route);
}

window.addEventListener("popstate", () => {
  render(window.location.pathname + window.location.search);
});

function init() {
  const currentRoute = window.location.pathname + window.location.search;
  const path = window.location.pathname;

  if (!publicRoutes.includes(path)) {
    render("/login");
  } else {
    render(currentRoute || "/");
  }
}

init();