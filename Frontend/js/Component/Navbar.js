export function Navbar() {

    const nav = document.createElement('nav');

    nav.className = 'navbar';

    nav.innerHTML = `

        <div class="navbar-container">

            <div class="navbar-logo">
                <a href="/" data-route="/">Expense Tracker</a>
            </div>

            <div class="navbar-links">

                <a href="/" data-route="/">Home</a>

                <a href="/login" data-route="/login">
                    Login
                </a>

                <a href="/signup" data-route="/signup">
                    Signup
                </a>

            </div>

        </div>

    `;

    return nav;
}