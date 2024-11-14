const budgetForm = `
<!DOCTYPE html>
<html>
<head>
    <title>Budget Calculator</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
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
            border-radius: 3px;
        }
        button:hover {
            background-color: #45a049;
        }
        #analysis {
            margin-top: 20px;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            display: none;
        }
        .nav-links {
            margin-bottom: 20px;
            padding: 10px;
            background-color: #f8f8f8;
            border-radius: 5px;
        }
        .nav-links a {
            margin-right: 15px;
            color: #4CAF50;
            text-decoration: none;
            padding: 5px 10px;
        }
        .nav-links a:hover {
            background-color: #4CAF50;
            color: white;
            border-radius: 3px;
        }
        .chart-container {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        
        .chart-box {
            width: 48%;
            margin-bottom: 20px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: white;
        }
        
        canvas {
            max-width: 100%;
        }
        
        @media (max-width: 768px) {
            .chart-box {
                width: 100%;
            }
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
        }
    </style>
</head>
<body>
    <div class="language-selector">
        <select id="languageSelect">
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
        </select>
    </div>

    <div class="nav-links">
        <a href="/budget" id="nav-budget">Budget Calculator</a>
        <a href="/investments" id="nav-investments">Investment Options</a>
        <a href="#" id="nav-logout">Logout</a>
    </div>

    <h2 id="page-title">Budget Calculator</h2>
    <form id="budgetForm">
        <div class="form-group">
            <label for="income" id="label-income">Monthly Income (₹):</label>
            <input type="number" id="income" name="income" required>
        </div>
        
        <h3 id="expenses-title">Monthly Expenses</h3>
        <div class="form-group">
            <label for="housing" id="label-housing">Housing (Rent/EMI) (₹):</label>
            <input type="number" id="housing" name="housing" required>
        </div>
        <div class="form-group">
            <label for="utilities" id="label-utilities">Utilities (₹):</label>
            <input type="number" id="utilities" name="utilities" required>
        </div>
        <div class="form-group">
            <label for="food" id="label-food">Food & Groceries (₹):</label>
            <input type="number" id="food" name="food" required>
        </div>
        <div class="form-group">
            <label for="transportation" id="label-transportation">Transportation (₹):</label>
            <input type="number" id="transportation" name="transportation" required>
        </div>
        <div class="form-group">
            <label for="other" id="label-other">Other Expenses (₹):</label>
            <input type="number" id="other" name="other" required>
        </div>
        
        <button type="submit" id="calculate-btn">Calculate Budget</button>
    </form>

    <div id="analysis">
        <h3>Budget Analysis</h3>
        <p id="totalIncome"></p>
        <p id="totalExpenses"></p>
        <p id="savings"></p>
        <p id="recommendation"></p>
        
        <div class="chart-container">
            <div class="chart-box">
                <canvas id="expensesPieChart"></canvas>
            </div>
            <div class="chart-box">
                <canvas id="savingsBarChart"></canvas>
            </div>
        </div>
        
        <button onclick="window.location.href='/investments'" style="margin-top: 15px;">
            View Investment Options
        </button>
    </div>

    <script>
        let translations = {};
        let currentLang = localStorage.getItem('language') || 'en';

        // Fetch translations
        async function fetchTranslations() {
            try {
                const response = await fetch('/api/translations');
                translations = await response.json();
                updateContent();
            } catch (error) {
                console.error('Failed to load translations:', error);
            }
        }

        // Update page content based on selected language
        function updateContent() {
            const t = translations[currentLang];
            
            // Update navigation
            document.getElementById('nav-budget').textContent = t.budget.title;
            document.getElementById('nav-investments').textContent = t.nav.investments;
            document.getElementById('nav-logout').textContent = t.nav.logout;
            
            // Update form labels
            document.getElementById('label-income').textContent = t.budget.income + ' (₹):';
            document.getElementById('expenses-title').textContent = t.budget.expenses;
            document.getElementById('label-housing').textContent = t.budget.housing + ' (₹):';
            document.getElementById('label-utilities').textContent = t.budget.utilities + ' (₹):';
            document.getElementById('label-food').textContent = t.budget.food + ' (₹):';
            document.getElementById('label-transportation').textContent = t.budget.transportation + ' (₹):';
            document.getElementById('label-other').textContent = t.budget.other + ' (₹):';
            
            // Update button
            document.getElementById('calculate-btn').textContent = t.budget.calculate;
            
            // Update analysis section if visible
            if (document.getElementById('analysis').style.display !== 'none') {
                document.getElementById('analysis-title').textContent = t.budget.analysis;
                const data = {
                    totalIncome: document.getElementById('totalIncome').dataset.value,
                    totalExpenses: document.getElementById('totalExpenses').dataset.value,
                    savings: document.getElementById('savings').dataset.value
                };
                
                document.getElementById('totalIncome').textContent = t.budget.totalIncome + ': ' + formatIndianCurrency(data.totalIncome);
                document.getElementById('totalExpenses').textContent = t.budget.totalExpenses + ': ' + formatIndianCurrency(data.totalExpenses);
                document.getElementById('savings').textContent = t.budget.savings + ': ' + formatIndianCurrency(data.savings);
            }
        }

        // Language change handler
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            currentLang = e.target.value;
            localStorage.setItem('language', currentLang);
            updateContent();
        });

        // Initialize translations
        fetchTranslations();

        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        }

        // Format number to Indian currency format
        function formatIndianCurrency(number) {
            const formatter = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            return formatter.format(number);
        }

        let expensesPieChart;
        let savingsBarChart;

        function createCharts(budgetData) {
            const expensesCtx = document.getElementById('expensesPieChart').getContext('2d');
            const savingsCtx = document.getElementById('savingsBarChart').getContext('2d');
            
            if (expensesPieChart) expensesPieChart.destroy();
            if (savingsBarChart) savingsBarChart.destroy();

            expensesPieChart = new Chart(expensesCtx, {
                type: 'pie',
                data: {
                    labels: ['Housing', 'Utilities', 'Food', 'Transportation', 'Other'],
                    datasets: [{
                        data: [
                            parseFloat(document.getElementById('housing').value),
                            parseFloat(document.getElementById('utilities').value),
                            parseFloat(document.getElementById('food').value),
                            parseFloat(document.getElementById('transportation').value),
                            parseFloat(document.getElementById('other').value)
                        ],
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BC0C0',
                            '#9966FF'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Expense Breakdown'
                        },
                        legend: {
                            position: 'bottom'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const value = context.raw;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((value / total) * 100).toFixed(1);
                                    return context.label + ': ' + formatIndianCurrency(value) + ' (' + percentage + '%)';
                                }
                            }
                        }
                    }
                }
            });

            savingsBarChart = new Chart(savingsCtx, {
                type: 'bar',
                data: {
                    labels: ['Income', 'Expenses', 'Savings'],
                    datasets: [{
                        label: 'Monthly Budget',
                        data: [
                            budgetData.income,
                            budgetData.expenses,
                            budgetData.income - budgetData.expenses
                        ],
                        backgroundColor: [
                            '#4CAF50',
                            '#FF6384',
                            '#36A2EB'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Income vs Expenses'
                        },
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return formatIndianCurrency(context.raw);
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Amount (₹)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return formatIndianCurrency(value);
                                }
                            }
                        }
                    }
                }
            });
        }

        document.getElementById('budgetForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const expenses = parseFloat(document.getElementById('housing').value) +
                           parseFloat(document.getElementById('utilities').value) +
                           parseFloat(document.getElementById('food').value) +
                           parseFloat(document.getElementById('transportation').value) +
                           parseFloat(document.getElementById('other').value);

            const budgetData = {
                income: parseFloat(document.getElementById('income').value),
                expenses: expenses
            };

            try {
                const response = await fetch('/api/budget', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(budgetData)
                });

                const data = await response.json();
                
                // Display analysis with Indian currency format
                document.getElementById('analysis').style.display = 'block';
                document.getElementById('totalIncome').textContent = 'Total Income: ' + formatIndianCurrency(data.totalIncome);
                document.getElementById('totalExpenses').textContent = 'Total Expenses: ' + formatIndianCurrency(data.totalExpenses);
                document.getElementById('savings').textContent = 'Monthly Savings: ' + formatIndianCurrency(data.savings);
                document.getElementById('recommendation').textContent = 'Savings Rate: ' + data.savingsPercentage + '% - ' + data.savingsRecommendation;

                createCharts(budgetData);
            } catch (error) {
                alert('Failed to analyze budget: ' + error.message);
            }
        });

        document.getElementById('nav-logout').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            window.location.href = '/login';
        });
    </script>
</body>
</html>
`;

module.exports = budgetForm;
