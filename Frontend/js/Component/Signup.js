import API_URL from 'services/api.js';
export function Signup(navigate){

    const container = document.createElement('div');
    container.innerHTML = `
        <section class="signup-container">

        <div class="signup-card">

            <h1>Create Account</h1>
            <p class="signup-subtitle">Sign up to get started</p>

            <form id="signupForm">

                <div class="signup-field">
                    <label for="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your full name"
                        required
                    >
                </div>

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
                        placeholder="Create a password"
                        minlength="6"
                        required
                    >
                </div>

                <button type="submit" class="signup-button">
                    Create Account
                </button>

                <p id="signupMessage"></p>

            </form>

            <p class="login-link">
                Already have an account?
                <a href="/login">Login</a>
            </p>
        </div>
        </section>
    `;

    const signupForm = container.querySelector('#signupForm');
    const message = container.querySelector('#signupMessage');
    
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = container.querySelector('#name').value;
        const email = container.querySelector('#email').value;
        const password = container.querySelector('#password').value;

        try{

            const response = await axios.post(`${API_URL}/signup`, {
                name,
                email,
                password
            });
            message.style.color = 'green';
            message.textContent = response.data.message || 'Signup successful!';

            signupForm.reset();

            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (error) {
            console.error("Error signing up:", error);  
        }
    });
    return container;
}