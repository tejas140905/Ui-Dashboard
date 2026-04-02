# 💰 Zoorvyn - Premium Finance Dashboard

Zoorvyn is a modern, ultra-clean, and professional finance dashboard designed for individuals and small businesses to track their financial health with elegance and ease. Built with a focus on premium UI/UX, it features glassmorphism, soft gradients, and intuitive data visualizations.

![Dashboard Preview](https://via.placeholder.com/1200x600?text=Zoorvyn+Dashboard+Preview)

## ✨ Features

- **📊 Comprehensive Overview**: Real-time tracking of Total Balance, Income, and Expenses with beautiful summary cards and trend charts.
- **💸 Transaction Management**: Full-featured ledger with search, filtering by category/type, and sorting by date/amount.
- **🧠 Smart Insights**: AI-driven tips, savings rate analysis, and spending breakdowns to help you make better financial decisions.
- **🔐 Role-Based UI**:
  - **Viewer**: Read-only access to all dashboards and transactions.
  - **Admin**: Full control to add, edit, and delete transactions.
- **📱 Fully Responsive**: Seamless experience across mobile, tablet, and desktop devices.
- **🎨 Premium Design**: Light-themed UI with soft shadows, rounded corners (xl/2xl), and smooth Framer Motion animations.
- **💾 Local Persistence**: All data is saved in `localStorage`, ensuring your information stays across sessions without a backend.
- **📥 Data Export**: Export your transaction history to CSV for external analysis.

## 🛠️ Tech Stack

- **Framework**: [React (Vite)](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API
- **Date Handling**: [date-fns](https://date-fns.org/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/zoorvyn.git
   cd zoorvyn
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```text
src/
├── components/       # Reusable UI components
│   ├── dashboard/    # Dashboard-specific components
│   ├── layout/       # Sidebar, Navbar, etc.
│   ├── transactions/ # Table, Modals, etc.
│   └── ui/           # Basic UI primitives
├── context/          # FinanceContext for global state
├── data/             # Mock data and constants
├── pages/            # Main application views
├── hooks/            # Custom React hooks
└── utils/            # Helper functions
```

## 💡 Implementation Details

### Role-Based UI
The application implements a frontend-only role switching mechanism. Admins have access to the "Add Transaction" button and table action buttons (Edit/Delete), while Viewers have a read-only experience. This is managed via the `FinanceContext`.

### State Management
We use the **React Context API** for global state management. It handles transactions, current role, and calculates real-time totals (Balance, Income, Expenses). Data is persisted using `localStorage` to simulate a persistent database.

### Design Decisions
- **Typography**: Uses a clean, modern sans-serif stack for maximum readability.
- **Visual Hierarchy**: Strong use of bold weights for numbers and headers to draw attention to key financial data.
- **Color Palette**: Soft blue (`#3b82f6`) as the brand color, with teal for positive trends and red/slate for expenses.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Crafted with ❤️ for a Frontend Developer Evaluation.*
