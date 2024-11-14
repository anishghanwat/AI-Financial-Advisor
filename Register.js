const registerForm = `
<!DOCTYPE html>
<html>
<head>
    <title>Register</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 500px;
            margin: 50px auto;
            padding: 20px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
        }
        input {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
        }
        button {
            padding: 10px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
        .login-link {
            margin-top: 15px;
            text-align: center;
        }
        .language-selector {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }
        .language-selector select {
            padding: 5px;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="language-selector">
        <select id="languageSelect">
            <option value="en" selected>English</option>
            <option value="hi">हिंदी</option>
        </select>
    </div>

    <h2>Register</h2>
    <form id="registerForm">
        <div class="form-group">
            <label for="name" id="label-name">Name:</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
            <label for="email" id="label-email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
            <label for="password" id="label-password">Password:</label>
            <input type="password" id="password" name="password" required>
        </div>
        <button type="submit" id="register-btn">Register</button>
    </form>
    <div class="login-link">
        <p id="login-text">Already have an account? <a href="/login">Login here</a></p>
    </div>

    <script>
        let translations = {};
        let currentLang = 'en';  // Set default to English

        async function fetchTranslations() {
            try {
                const response = await fetch('/api/translations');
                translations = await response.json();
                
                // Check localStorage for saved language preference
                const savedLang = localStorage.getItem('language');
                if (savedLang) {
                    currentLang = savedLang;
                    document.getElementById('languageSelect').value = currentLang;
                }
                
                updateContent();
            } catch (error) {
                console.error('Failed to load translations:', error);
            }
        }

        function updateContent() {
            const t = translations[currentLang];
            document.querySelector('h2').textContent = t.auth.register;
            document.getElementById('label-name').textContent = t.auth.name;
            document.getElementById('label-email').textContent = t.auth.email;
            document.getElementById('label-password').textContent = t.auth.password;
            document.getElementById('register-btn').textContent = t.auth.register;
        }

        document.getElementById('languageSelect').addEventListener('change', (e) => {
            currentLang = e.target.value;
            localStorage.setItem('language', currentLang);
            updateContent();
        });

        document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            };

            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                if (data.message) {
                    alert(data.message);
                    window.location.href = '/login';
                } else {
                    alert(data.error || 'Registration failed');
                }
            } catch (error) {
                alert('Registration failed: ' + error.message);
            }
        });

        fetchTranslations();
    </script>
</body>
</html>
`;

module.exports = registerForm;
