export const budgetForm = `
<!DOCTYPE html>
<html>
<head>
    <title>Budget Planner</title>
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
        .budget-card {
            border: 1px solid #ddd;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 5px;
        }
        .income-section, .expense-section {
            margin-bottom: 20px;
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
        input {
            padding: 8px;
            margin: 5px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="nav-bar">
        <a href="/budget">Budget</a>
        <a href="/investments">Investments</a>
        <a href="#" id="logoutBtn">Logout</a>
    </div>

    <h1>Budget Planner</h1>
    
    <div class="income-section">
        <h2>Income</h2>
        <div class="budget-card">
            <input type="text" id="incomeSource" placeholder="Income Source">
            <input type="number" id="incomeAmount" placeholder="Amount">
            <button onclick="addIncome()">Add Income</button>
        </div>
        <div id="incomeList"></div>
    </div>

    <div class="expense-section">
        <h2>Expenses</h2>
        <div class="budget-card">
            <input type="text" id="expenseItem" placeholder="Expense Item">
            <input type="number" id="expenseAmount" placeholder="Amount">
            <button onclick="addExpense()">Add Expense</button>
        </div>
        <div id="expenseList"></div>
    </div>

    <div class="budget-card">
        <h2>Summary</h2>
        <p>Total Income: ₹<span id="totalIncome">0</span></p>
        <p>Total Expenses: ₹<span id="totalExpenses">0</span></p>
        <p>Balance: ₹<span id="balance">0</span></p>
    </div>

    <script>
        let incomes = [];
        let expenses = [];

        function addIncome() {
            const source = document.getElementById('incomeSource').value;
            const amount = parseFloat(document.getElementById('incomeAmount').value);
            
            if (source && amount) {
                incomes.push({ source, amount });
                updateIncomelist();
                updateSummary();
                clearIncomeForm();
            }
        }

        function addExpense() {
            const item = document.getElementById('expenseItem').value;
            const amount = parseFloat(document.getElementById('expenseAmount').value);
            
            if (item && amount) {
                expenses.push({ item, amount });
                updateExpenseList();
                updateSummary();
                clearExpenseForm();
            }
        }

        function updateIncomelist() {
            const list = document.getElementById('incomeList');
            list.innerHTML = incomes.map(income => 
                \`<div class="budget-card">
                    <p>\${income.source}: ₹\${income.amount}</p>
                </div>\`
            ).join('');
        }

        function updateExpenseList() {
            const list = document.getElementById('expenseList');
            list.innerHTML = expenses.map(expense => 
                \`<div class="budget-card">
                    <p>\${expense.item}: ₹\${expense.amount}</p>
                </div>\`
            ).join('');
        }

        function updateSummary() {
            const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
            const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
            const balance = totalIncome - totalExpenses;

            document.getElementById('totalIncome').textContent = totalIncome;
            document.getElementById('totalExpenses').textContent = totalExpenses;
            document.getElementById('balance').textContent = balance;
        }

        function clearIncomeForm() {
            document.getElementById('incomeSource').value = '';
            document.getElementById('incomeAmount').value = '';
        }

        function clearExpenseForm() {
            document.getElementById('expenseItem').value = '';
            document.getElementById('expenseAmount').value = '';
        }

        document.getElementById('logoutBtn').addEventListener('click', function() {
            localStorage.removeItem('token');
            window.location.href = '/login';
        });
    </script>
</body>
</html>`; 