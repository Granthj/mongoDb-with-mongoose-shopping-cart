import API_URL from '../services/api.js';

export function Login(navigate) {

    const container = document.createElement('div');

    container.innerHTML = `
        <section class="signup-container">

            <div class="signup-card">

                <h1>Welcome Back</h1>
                <p class="signup-subtitle">Login to your account</p>

                <form id="loginForm">

                    <div class="signup-field">
                        <label for="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                        >
                    </div>

                    <div class="signup-field">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            required
                        >
                    </div>

                    <button type="submit" class="signup-button">
                        Login
                    </button>

                    <p id="loginMessage"></p>

                </form>

                <p class="login-link">
                    Don't have an account?
                    <a href="/signup" id="signupLink">Create Account</a>
                </p>

            </div>

        </section>
    `;

    const loginForm = container.querySelector('#loginForm');
    const message = container.querySelector('#loginMessage');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = container.querySelector('#email').value;
        const password = container.querySelector('#password').value;

        try {
            const response = await axios.post(`${API_URL}/login`, {
                email,
                password
            });

            message.style.color = 'green';
            message.textContent = response.data.message || 'Login successful!';

            if (response.data.user) {
                localStorage.setItem('userId', response.data.user._id);
            }

            setTimeout(() => {
                navigate('/');
            }, 1000);

        } catch (error) {
            console.error('Error logging in:', error);

            message.style.color = 'red';
            message.textContent =
                error.response?.data?.message || 'Login failed. Check your email and password.';
        }
    });

    container.querySelector('#signupLink').addEventListener('click', (e) => {
        e.preventDefault();
        navigate('/signup');
    });

    return container;
}