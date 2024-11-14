export const loginForm = `
<!DOCTYPE html>
<html>
<head>
    <title>Financial Advisor Login</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .login-container {
            background-color: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
        }
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            color: #555;
        }
        input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        button {
            width: 100%;
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #45a049;
        }
        .language-selector {
            text-align: center;
            margin-top: 20px;
        }
        select {
            padding: 5px;
            border-radius: 4px;
            border: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h1>Welcome Back</h1>
        <form id="loginForm">
            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" required pattern="[0-9]{10}">
            </div>
            <div class="form-group">
                <label for="pin">PIN</label>
                <input type="password" id="pin" required pattern="[0-9]{4}">
            </div>
            <button type="submit">Login</button>
        </form>
        <div class="language-selector">
            <select id="languageSelect">
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="or">ଓଡ଼ିଆ</option>
            </select>
        </div>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                phone: document.getElementById('phone').value,
                pin: document.getElementById('pin').value
            };

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.token);
                    window.location.href = '/investments';
                } else {
                    alert('Invalid phone number or PIN');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('Login failed. Please try again.');
            }
        });

        // Language selection
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            localStorage.setItem('language', e.target.value);
            updateContent();
        });

        // Set initial language
        const currentLang = localStorage.getItem('language') || 'en';
        document.getElementById('languageSelect').value = currentLang;
    </script>
</body>
</html>`;
