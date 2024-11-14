export const Investment = {
    getPage: function () {
        return `
<!DOCTYPE html>
<html>
<head>
    <title>Investment Options</title>
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
        .investment-card {
            border: 1px solid #ddd;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 5px;
        }
        .investment-card h3 {
            margin-top: 0;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
        .back-button {
            margin-bottom: 20px;
            background-color: #666;
        }
    </style>
</head>
<body>
    <div class="nav-bar">
        <a href="/budget">Budget</a>
        <a href="/investments">Investments</a>
        <a href="#" id="logoutBtn">Logout</a>
    </div>

    <button class="back-button" onclick="window.location.href='/budget'">← Back to Budget</button>

    <h1>Investment Options</h1>
    
    <div id="investmentsList">
        <div class="investment-card">
            <h3>Fixed Deposit</h3>
            <p>Safe investment with guaranteed returns</p>
            <p>Minimum Investment: ₹1,000</p>
            <p>Expected Return: 6% per year</p>
            <button onclick="showDetails('fd')">Learn More</button>
        </div>

        <div class="investment-card">
            <h3>Small Business Loan</h3>
            <p>Invest in local businesses</p>
            <p>Minimum Investment: ₹5,000</p>
            <p>Expected Return: 12% per year</p>
            <button onclick="showDetails('business')">Learn More</button>
        </div>
    </div>

    <script>
        document.getElementById('logoutBtn').addEventListener('click', function() {
            localStorage.removeItem('token');
            window.location.href = '/login';
        });

        function showDetails(type) {
            alert('More details coming soon!');
        }
    </script>
</body>
</html>`;
    }
}; 