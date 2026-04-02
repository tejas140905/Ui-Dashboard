import { useFinance } from '../../context/FinanceContext';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SummaryCards = () => {
  const { totalBalance, totalIncome, totalExpenses } = useFinance();

  const cards = [
    {
      title: 'Total Balance',
      amount: totalBalance,
      icon: Wallet,
      color: 'brand',
      trend: '+12.5%',
      trendUp: true,
      gradient: 'from-blue-500/10 to-transparent'
    },
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: TrendingUp,
      color: 'teal',
      trend: '+8.2%',
      trendUp: true,
      gradient: 'from-teal-500/10 to-transparent'
    },
    {
      title: 'Total Expenses',
      amount: totalExpenses,
      icon: TrendingDown,
      color: 'purple',
      trend: '-5.1%',
      trendUp: false,
      gradient: 'from-purple-500/10 to-transparent'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="premium-card group relative overflow-hidden"
        >
          {/* Subtle Background Gradient */}
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.gradient} rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500`}></div>
          
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">{card.title}</p>
              <h3 className="text-3xl font-bold text-slate-800 tracking-tight">
                {formatCurrency(card.amount)}
              </h3>
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              card.color === 'brand' ? 'bg-brand-light text-brand group-hover:bg-brand group-hover:text-white' :
              card.color === 'teal' ? 'bg-teal-soft text-teal-accent group-hover:bg-teal-accent group-hover:text-white' :
              'bg-purple-soft text-purple-accent group-hover:bg-purple-accent group-hover:text-white'
            }`}>
              <card.icon size={28} />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 relative z-10">
            <span className={`flex items-center gap-1 text-sm font-bold px-2 py-0.5 rounded-lg ${
              card.trendUp ? 'bg-teal-soft text-teal-accent' : 'bg-red-50 text-red-500'
            }`}>
              {card.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {card.trend}
            </span>
            <span className="text-slate-400 text-sm font-medium">than last month</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SummaryCards;
