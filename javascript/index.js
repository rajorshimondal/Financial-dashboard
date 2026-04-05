

// 0. user admin toggle
const adminToggle = document.getElementById('adminToggle');
const adminSection = document.getElementById('adminSection');

function updateAdminVisibility() {
    if (!adminToggle || !adminSection) return;
    const isAdmin = adminToggle.checked;
    if (isAdmin) {
        adminSection.classList.remove('hidden');
    } else {
        adminSection.classList.add('hidden');
    }
};

if (adminToggle) {
    adminToggle.addEventListener('change', updateAdminVisibility);
    updateAdminVisibility();
};


// 1. balance- trends (using real expense data for last 7 days)
const timeBt = document.getElementById('time-chart').getContext('2d');

function toDateKey(dateObj) {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getLast7DaysExpenseData() {
    const labels = [];
    const data = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const key = toDateKey(d);
        labels.push(d.toLocaleDateString(undefined, { weekday: 'short' }));

        const total = transactions
            .filter(trs => trs.type === 'expense' && trs.date === key)
            .reduce((sum, trs) => sum + Math.abs(trs.amount), 0);

        data.push(total);
    }

    return { labels, data };
}

const timeChart = new Chart(timeBt, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Expenses (\u20B9)',
            data: [],
            borderColor: '#ff0000',
            backgroundColor: 'rgba(69, 69, 69, 0.21)',
            fill: true,
            tension: '0.4',
        }]
    },

    options: {   
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true, grid: { display: false } },
            x: { grid: { display: false } }
        }
    }
});

function updateTimeChart() {
    if (!timeChart) return;
    const { labels, data } = getLast7DaysExpenseData();
    timeChart.data.labels = labels;
    timeChart.data.datasets[0].data = data;
    timeChart.update();
}

// 2. Spending breakdown with mock data
const pieCat = document.getElementById('pie-chart').getContext('2d');

const pieLabels = ['Housing', 'Transport', 'Food', 'Grocery', 'Entertainment', 'Travel'];
const pieColors = ['#008080', '#8B0000', '#FF4500', '#9ACD32', '#D2691E', '#ecec09'];

const pieData = {
    labels: pieLabels,
    datasets: [{
        label: 'My Expenses',
        data: new Array(pieLabels.length).fill(0),
        borderWidth: 0,
        backgroundColor: pieColors
    }],
};

const pieChart = new Chart(pieCat, {
    type: 'doughnut',
    data: pieData,
    options: {
        cutout: '50%',
        plugins: {
            legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } }
        }
    }
});

function updatePieChart() {
    if (!pieChart) return;
    const totals = pieLabels.map(label => {
        return transactions
            .filter(trs => trs.type === 'expense' && trs.category === label)
            .reduce((sum, trs) => sum + Math.abs(trs.amount), 0);
    });
    pieChart.data.datasets[0].data = totals;
    pieChart.update();
};



// mock data for the transactions
let transactions = [
    { date: '2026-04-02', description: 'Travel', amount: -799.00, category: 'Travel', type: 'expense' },
    { date: '2026-04-03', description: 'Monthly Salary', amount: 54500.00, category: 'Income', type: 'income' },
    { date: '2026-04-03', description: 'Whole Foods', amount: -1020.50, category: 'Food', type: 'expense' },
    { date: '2026-04-04', description: 'Starbucks', amount: -600.75, category: 'Entertainment', type: 'expense' },
    { date: '2026-04-05', description: 'Rent Payment', amount: -8500.00, category: 'Housing', type: 'expense' },
];

let currentSort ={ key:'date' , asc: false };

// load saved transactions (if any)
const savedTransactions = localStorage.getItem('transactions');
if (savedTransactions) {
    transactions = JSON.parse(savedTransactions);
}

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function formatCurrency(value) {
    const formatted = Math.abs(value).toFixed(2);
    return `\u20B9 ${formatted}`;
}

function updateSummary() {
    const totalIncome = transactions
        .filter(trs => trs.type === 'income' || trs.amount > 0)
        .reduce((sum, trs) => sum + Math.abs(trs.amount), 0);

    const totalExpenses = transactions
        .filter(trs => trs.type === 'expense' || trs.amount < 0)
        .reduce((sum, trs) => sum + Math.abs(trs.amount), 0);

    const totalBalance = totalIncome - totalExpenses;

    const balanceEl = document.getElementById('totalBalance');
    const incomeEl = document.getElementById('totalIncome');
    const expenseEl = document.getElementById('totalExpenses');
    const remainingEl = document.getElementById('remainingBalance');

    if (balanceEl) balanceEl.textContent = formatCurrency(totalBalance);
    if (incomeEl) incomeEl.textContent = formatCurrency(totalIncome);
    if (expenseEl) expenseEl.textContent = formatCurrency(totalExpenses);
    if (remainingEl) remainingEl.textContent = `Remaining: ${formatCurrency(totalBalance)}`;
}

// 2. rendering table
function renderTable(data) {
    const table = document.getElementById('transactionBody');
   table.innerHTML = data.map(trs =>`
        <tr class="hover:bg-slate-50 transition-colors">
            <td class="px-4 py-4 ">${trs.date}</td>
            <td class="px-4 py-4 font-medium">${trs.description}</td>
            <td class="px-4 py-4 ">${trs.category}</td>
            <td class="px-4 py-4 font-bold ${trs.type === 'income' ? 'text-green-600': 'text-red-600'} ">${trs.type === 'income' ? '+' : ''}${trs.amount.toFixed(2)}</td>
        </tr>
    `).join('');
};

// 3. filtering and render trnsaction
function updateDisplay(){
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filterCategory =document.getElementById('filterCategory').value;

    let filtered = transactions.filter ( trs => {
    const searchMatch = trs.description.toLowerCase().includes(searchInput);
    const matchCategory = filterCategory==='All' || trs.category === filterCategory;
    return matchCategory && searchMatch;
    });
    renderTable(filtered);

}

// 4. event listeners
document.getElementById('searchInput').addEventListener('input' , updateDisplay);
document.getElementById('filterCategory').addEventListener('change', updateDisplay);


renderTable(transactions);
updateSummary();
updatePieChart();
updateTimeChart();


// adding new expense
document.getElementById('expenseForm').addEventListener('submit' , function(event) { 
    event.preventDefault();

    // 1.capturing values
    const descriptionInput = document.getElementById('expenseDescription');
    const dateInput = document.getElementById('expenseDate').value;
    if(!dateInput){alert('Please Provide the Date..'); return;}
    const amountInput = document.getElementById('expenseAmount');
    const categoryInput = document.getElementById('expenseCategory');

    // 2. creating new transactions
    const rawAmount = parseFloat(amountInput.value);
    const normalizedAmount = -Math.abs(rawAmount);

    const newTransaction = {
        date : dateInput,
        description : descriptionInput.value,
        amount : normalizedAmount,
        category : categoryInput.value,
        type : 'expense'
    };
    transactions.unshift(newTransaction);
    saveTransactions();
    updateDisplay();
    updateSummary();
    updatePieChart();
    updateTimeChart();
    
    descriptionInput.value ='';
    amountInput.value = '';
});

// adding new income
document.getElementById('incomeForm').addEventListener('submit' , function(event) { 
    event.preventDefault();

    const descriptionInput = document.getElementById('incomeDescription');
    const dateInput = document.getElementById('incomeDate').value;
        if(!dateInput) {alert("Please Provide the Date.."); return;}
    const amountInput = document.getElementById('incomeAmount');
    const categoryInput = document.getElementById('incomeCategory');

    const rawAmount = parseFloat(amountInput.value);
    const normalizedAmount = Math.abs(rawAmount);

    const newTransaction = {
        date : dateInput,
        description : descriptionInput.value,
        amount : normalizedAmount,
        category : categoryInput.value,
        type : 'income'
    };

    transactions.unshift(newTransaction);
    saveTransactions();
    updateDisplay();
    updateSummary();
    updatePieChart();
    updateTimeChart();

    descriptionInput.value ='';
    amountInput.value = '';
});




// calling api for smart observation
const apiKey = 'sk-proj-jlEmhFXxGaLUbtdVTQTL.....';

// getting the data from the charts to send to the api
function getChartData() {
    const lineLabels = timeChart.data.labels;
    const lineData = timeChart.data.datasets[0].data;
    const pieLabelsOut = pieChart.data.labels;
    const pieDataOut = pieChart.data.datasets[0].data;
    return { lineLabels, lineData, pieLabelsOut, pieDataOut };
}

async function smartObservation() {
    const chartData = getChartData();
    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful financial assistant that provides insights based on user spending data.' },
                { role: 'user', content: `Based on the following spending data, provide one smart observation that can help the user manage their finances better. Line Chart Data (Last 7 days expenses): ${JSON.stringify(chartData.lineLabels.map((label, i) => ({ date: label, amount: chartData.lineData[i] })))}, Pie Chart Data (Spending breakdown): ${JSON.stringify(chartData.pieLabelsOut.map((label, i) => ({ category: label, amount: chartData.pieDataOut[i] })))}` }
            ]
        })
    })
    const data = await res.json();
    return data.choices[0].message.content;
    
};

// insights page: render API data into #insightsContent
const insightsContainer = document.getElementById('insightsContent');

function renderInsights(payload) {
    if (!insightsContainer) return;

    const insightsArray = Array.isArray(payload?.insights) ? payload.insights : [];
    const fallbackText = payload?.observation || payload?.output_text || payload?.text;

    if (insightsArray.length === 0 && !fallbackText) {
        insightsContainer.innerHTML = '<p class="text-gray-600">No insights available.</p>';
        return;
    }

    const cards = insightsArray.map(item => `
        <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
            <h3 class="font-semibold text-gray-800">${item.title || 'Insight'}</h3>
            <p class="text-gray-600 mt-2">${item.text || ''}</p>
            ${item.tag ? `<span class="inline-block mt-3 text-xs text-teal-700 bg-teal-50 px-2 py-1 rounded">${item.tag}</span>` : ''}
        </div>
    `).join('');

    insightsContainer.innerHTML = cards || `
        <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
            <h3 class="font-semibold text-gray-800">Insight</h3>
            <p class="text-gray-600 mt-2">${fallbackText}</p>
        </div>
    `;
}

async function loadInsights() {
    if (!insightsContainer) return;
    try {
        // replace this URL with your API endpoint
        const response = await fetch('/api/insights');
        const data = await response.json();
        renderInsights(data);
    } catch (error) {
        insightsContainer.innerHTML = '<p class="text-gray-600">Could not load insights.</p>';
        console.error('Error loading insights:', error);
    }
}

loadInsights();



