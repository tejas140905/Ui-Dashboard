import { useState } from 'react';
import SummaryCards from '../components/dashboard/SummaryCards';
import DashboardCharts from '../components/dashboard/DashboardCharts';
import TransactionTable from '../components/transactions/TransactionTable';
import AddTransactionModal from '../components/transactions/AddTransactionModal';
import { useFinance } from '../context/FinanceContext';
import { Plus, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { role, transactions } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simple Insights calculation
  const highestSpendingCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc: any, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
  
  const topCategory = Object.entries(highestSpendingCategory)
    .sort(([, a]: any, [, b]: any) => b - a)[0] || ['None', 0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-7xl mx-auto space-y-8"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-brand font-bold text-sm uppercase tracking-widest mb-2">
            <Sparkles size={16} />
            <span>Overview</span>
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Financial Dashboard</h1>
          <p className="text-slate-400 font-medium">Welcome back! Here's what's happening with your money today.</p>
        </div>

        {role === 'Admin' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2 h-fit py-3"
          >
            <Plus size={20} />
            Add Transaction
          </button>
        )}
      </div>

      {/* Quick Insights Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-brand-light/50 border border-brand/10 p-4 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 bg-brand text-white rounded-xl flex items-center justify-center">
            <Filter size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Category</p>
            <p className="text-sm font-black text-slate-700">{topCategory[0]}</p>
          </div>
        </div>
        
        {/* Add more insight cards as needed */}
      </div>

      <SummaryCards />
      
      <DashboardCharts />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Recent Transactions</h2>
          <button className="text-brand font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
            View All <ChevronRight size={16} />
          </button>
        </div>
        <TransactionTable />
      </div>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </motion.div>
  );
};

export default Dashboard;
