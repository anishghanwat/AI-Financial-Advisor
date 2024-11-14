import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Investment } from './Investment.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Root route - Login page
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
        }
        .login-container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        input {
            display: block;
            margin: 10px 0;
            padding: 8px;
            width: 200px;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
        }
        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>Login</h2>
        <form id="loginForm">
            <input type="text" id="username" placeholder="Username" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });
                
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.token);
                    window.location.href = '/budget';
                } else {
                    alert('Login failed. Please check your credentials.');
                }
            } catch (error) {
                alert('An error occurred. Please try again.');
            }
        });
    </script>
</body>
</html>
    `);
});

// Login API endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // Simple authentication for demo purposes
    if (username === 'demo' && password === 'password') {
        res.json({ token: 'demo-token' });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Budget page route
app.get('/budget', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Budget Overview</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
        .nav-bar {
            background-color: #f8f8f8;
            padding: 10px;
            margin-bottom: 20px;
        }
        .nav-bar a {
            margin-right: 15px;
            text-decoration: none;
            color: #333;
        }
        .budget-container {
            max-width: 800px;
            margin: 0 auto;
        }
        .next-button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="nav-bar">
        <a href="/budget">Budget</a>
        <a href="/investments">Investments</a>
        <a href="#" id="logoutBtn">Logout</a>
    </div>

    <div class="budget-container">
        <h1>Budget Overview</h1>
        <p>Your budget information will be displayed here.</p>
        <button class="next-button" onclick="window.location.href='/investments'">
            Next: View Investments →
        </button>
    </div>

    <script>
        document.getElementById('logoutBtn').addEventListener('click', function() {
            localStorage.removeItem('token');
            window.location.href = '/';
        });
    </script>
</body>
</html>
    `);
});

// Investment page route
app.get('/investments', (req, res) => {
    res.send(Investment.getPage());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
