# Financial Dashboard

A comprehensive financial overview dashboard built with HTML, CSS, and JavaScript. This web application provides users with a complete view of their financial data, including balance tracking, income/expense management, transaction history, and AI-powered financial insights.

## 🚀 Related Projects

**React Version**: A modern React implementation of this financial dashboard with enhanced features and better scalability. [Repository Link](https://github.com/your-username/financial-dashboard-react) *(Coming Soon)*

## Features

### 📊 Dashboard Overview
- **Total Balance**: Dynamic calculation based on all transactions
- **Income Summary**: Total income from various sources (Salary, Freelance, Bonus, etc.)
- **Expenses Summary**: Total expenses with remaining balance calculation
- **Real-time Updates**: All summaries update automatically when transactions are added

### 📈 Analytics & Charts
- **Balance Trends Chart**: Line chart showing expense patterns over the last 7 days using real transaction data
- **Spending Breakdown**: Interactive doughnut chart displaying expenses broken down by category
  - Categories: Housing, Transport, Food, Grocery, Entertainment, Travel
- **Dynamic Chart Updates**: Charts automatically refresh when new transactions are added

### 💳 Transaction Management
- **Complete Transaction History**: Display of all transactions with date, description, category, and amount
- **Advanced Search**: Filter transactions by description text
- **Category Filtering**: Filter by specific categories (All, Housing, Food, Travel, Entertainment, Transport, Salary, Freelance, Bonus, Other, Income)
- **Persistent Storage**: Transactions saved to browser's local storage
- **Color-coded Amounts**: Income (green) and expenses (red) for easy identification

### 👤 Admin Mode Features
- **Toggle Switch**: Switch between User and Admin modes in the header
- **Add Expenses Form**: Complete form to add new expense transactions with validation
  - Fields: Description, Date (required), Amount (required), Category
- **Add Income Form**: Complete form to add new income transactions with validation
  - Fields: Description, Date (required), Amount (required), Category (Salary, Freelance, Bonus, Other)
- **Form Validation**: Date validation with user-friendly error messages
- **Auto-clear Forms**: Forms reset after successful submission

### 🧠 Smart Financial Insights
- **AI-Powered Observations**: Integration with OpenAI API for personalized financial advice
- **Top Expense Category**: Highlights the biggest spending category
- **Budget Status Tracking**: Shows if you're under or over budget
- **Smart Observations**: AI-generated insights based on spending patterns and trends

### 📄 Multi-Page Application
- **Main Dashboard**: Complete financial overview at `index.html`
- **Insights Page**: Dedicated page for detailed financial insights at `pages/insights.html`
- **Navigation**: Easy navigation between dashboard and insights pages

## Project Structure

```
finance html/
├── index.html                    # Main dashboard page
├── pages/
│   └── insights.html            # Financial insights page
├── css/
│   └── index.css               # Custom styles and animations
├── javascript/
│   └── index.js                # Interactive functionality and API integration
└── README.md                   # This file
```

## Technologies Used

- **HTML5**: Semantic markup and multi-page structure
- **CSS3**: Custom styling with responsive design and animations
- **JavaScript (Vanilla)**: DOM manipulation, local storage, and API integration
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Chart.js**: JavaScript library for interactive data visualization
- **OpenAI API**: AI-powered financial insights and recommendations
- **Google Fonts**: Inter font family for modern typography
- **Local Storage API**: Browser-based data persistence

## Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- Internet connection (for Chart.js CDN, Tailwind CSS CDN, and OpenAI API)
- OpenAI API key (for AI insights feature)

### How to Run
1. Open `index.html` in your web browser
2. The dashboard will load with sample transaction data
3. Toggle between User and Admin modes using the switch in the header
4. In Admin mode, use the forms to add new income or expenses
5. Use search and filter options to explore transactions
6. Click "Smart Observation" card to navigate to insights page
7. View AI-generated financial insights

### API Configuration
To enable AI-powered insights, add your OpenAI API key to the `apiKey` variable in `javascript/index.js`:

```javascript
const apiKey = 'your-openai-api-key-here';
```

## Features in Detail

### Admin Toggle & Forms
- **Visual Toggle**: Smooth animated switch between User/Admin modes
- **Conditional Display**: Admin section only visible in Admin mode
- **Form Validation**: Required fields with user alerts for missing dates
- **Real-time Updates**: All charts and summaries update immediately after adding transactions

### Charts & Data Visualization
- **Dynamic Balance Trends**: Shows actual daily expenses for the last 7 days
- **Interactive Pie Chart**: Hover effects and legend for spending categories
- **Responsive Design**: Charts adapt to different screen sizes
- **Real-time Data**: Charts update automatically with new transaction data

### Transaction Management
- **Persistent Data**: Transactions saved to browser local storage
- **Advanced Filtering**: Combine search text with category filters
- **Table Sorting**: Transactions displayed in reverse chronological order
- **Visual Feedback**: Hover effects and color coding for better UX

### Smart Insights
- **AI Integration**: Uses GPT-3.5-turbo for financial analysis
- **Pattern Recognition**: Analyzes spending trends and provides actionable advice
- **Budget Monitoring**: Tracks spending against income levels
- **Top Category Analysis**: Identifies highest expense categories

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Breakpoint System**: Responsive at 600px and 768px (md)
- **Grid Layout**: Adapts from 1 column (mobile) to 3 columns (desktop)
- **Touch-Friendly**: Appropriate button sizes and spacing for mobile

## Mock Data

The dashboard comes with sample transaction data including:
- Monthly salary income
- Various expense categories (Housing, Food, Travel, Entertainment)
- Recent transactions for chart visualization

All amounts are in Indian Rupees (₹).

## Customization

### Adding Transactions Programmatically
Edit the `transactions` array in `javascript/index.js`:

```javascript
let transactions = [
    {
        date: 'YYYY-MM-DD',
        description: 'Transaction description',
        amount: 1000.00, // Positive for income, negative for expenses
        category: 'CategoryName',
        type: 'income' // or 'expense'
    },
    // ... more transactions
];
```

### Modifying Categories
Update category options in the HTML forms and JavaScript arrays:

**Expense Categories** (in HTML and pieLabels array):
- Food, Housing, Grocery, Transport, Entertainment, Travel

**Income Categories** (in HTML):
- Salary, Freelance, Bonus, Other

### Chart Customization
Modify Chart.js configurations for different chart types, colors, or data representations.

### API Integration
The AI insights feature uses OpenAI's API. You can modify the prompt or model in the `smartObservation()` function.

## Browser Compatibility

Works on all modern browsers that support:
- ES6 JavaScript features (arrow functions, template literals, async/await)
- CSS Grid and Flexbox
- Local Storage API
- Fetch API for HTTP requests
- Canvas API (for Chart.js)

## Future Enhancements

- **User Authentication**: Secure login system
- **Data Export**: CSV/PDF export functionality
- **Budget Goals**: Set and track spending limits
- **Recurring Transactions**: Automated recurring income/expenses
- **Multi-currency Support**: Support for different currencies
- **Advanced Analytics**: More detailed financial reports
- **Mobile App**: Native mobile application
- **Cloud Sync**: Cross-device data synchronization
- **Financial Goals**: Savings goals and progress tracking

## Security Notes

- API keys are stored in client-side JavaScript (not recommended for production)
- Local storage is not encrypted
- No server-side validation of financial data
- Consider implementing proper security measures for production use

## Contributing

This is an educational project. Feel free to fork and enhance with additional features.

## Author

Created as a comprehensive financial dashboard assignment project.

## License

This project is open source and available for personal and educational use.


echo # Financial-dashboard
