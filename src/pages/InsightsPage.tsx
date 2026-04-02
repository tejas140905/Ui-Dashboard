import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  Target,
  Zap,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line
} from 'recharts';

const InsightsPage = () => {
  const { transactions, totalIncome, totalExpenses, totalBalance } = useFinance();

  // Prepare data for Bar Chart (Income vs Expense)
  const barData = [
    { name: 'Income', value: totalIncome, color: '#14b8a6' },
    { name: 'Expenses', value: totalExpenses, color: '#ef4444' },
    { name: 'Savings', value: totalBalance, color: '#3b82f6' }
  ];

  // Highest spending category
  const expenses = transactions.filter(t => t.type === 'expense');
  const categorySpending = expenses.reduce((acc: any, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
  
  const sortedCategories = Object.entries(categorySpending)
    .sort(([, a]: any, [, b]: any) => b - a);
  
  const topCategory = sortedCategories[0] || ['None', 0];

  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-7xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-purple-accent font-bold text-sm uppercase tracking-widest mb-2">
            <PieChart size={16} />
            <span>Analytics</span>
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Smart Insights</h1>
          <p className="text-slate-400 font-medium">Detailed breakdown and intelligence for your financial health.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Savings Rate Card */}
        <div className="premium-card lg:col-span-1 flex flex-col items-center justify-center text-center py-10">
          <div className="w-20 h-20 bg-teal-soft text-teal-accent rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-teal-500/10">
            <ShieldCheck size={40} />
          </div>
          <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-2">Savings Rate</h3>
          <p className="text-5xl font-black text-slate-800 mb-2">{savingsRate}%</p>
          <div className="flex items-center gap-2 text-teal-accent font-bold">
            <TrendingUp size={18} />
            <span>+2.4% from last month</span>
          </div>
        </div>

        {/* Bar Chart Summary */}
        <div className="premium-card lg:col-span-2">
          <h3 className="text-xl font-bold text-slate-800 mb-8">Financial Comparison</h3>
          <div className="h-[250px] w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontWeight: 700, fontSize: 14 }}
                  width={100}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '12px', 
                    border: '1px solid #f1f5f9',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[0, 10, 10, 0]} 
                  barSize={40}
                  animationDuration={1500}
                >
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Highest Spending Category */}
        <div className="premium-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
              <Zap size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Top Spending</h3>
          </div>
          <div className="space-y-4">
            {sortedCategories.slice(0, 3).map(([name, value]: any, index) => (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-black text-slate-400">{index + 1}</span>
                  <span className="font-bold text-slate-600">{name}</span>
                </div>
                <span className="font-black text-slate-800">₹{value.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Goal Placeholder */}
        <div className="premium-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-brand-light text-brand rounded-xl flex items-center justify-center">
              <Target size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Financial Goals</h3>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-500">Emergency Fund</span>
                <span className="text-slate-800">75%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand w-3/4 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-500">Vacation Savings</span>
                <span className="text-slate-800">40%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-accent w-2/5 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Tips */}
        <div className="premium-card bg-gradient-to-br from-brand to-brand-dark text-white border-none">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
              <Sparkles size={20} />
            </div>
            <h3 className="text-lg font-bold">Zoorvyn AI Tips</h3>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-medium text-blue-100 leading-relaxed">
              "Your spending in <span className="text-white font-bold">{topCategory[0]}</span> is 15% higher than last month. Consider setting a budget for this category."
            </p>
            <div className="h-[1px] bg-white/10"></div>
            <p className="text-sm font-medium text-blue-100 leading-relaxed">
              "You've saved enough this month to invest an extra ₹50,000 in your portfolio."
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InsightsPage;
