import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Trash2, 
  Edit,
  Download,
  Plus
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionTable = () => {
  const { transactions, role, deleteTransaction } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredTransactions = transactions
    .filter(t => {
      const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || t.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc' 
          ? parseISO(b.date).getTime() - parseISO(a.date).getTime()
          : parseISO(a.date).getTime() - parseISO(b.date).getTime();
      } else {
        return sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount;
      }
    });

  const exportToCSV = () => {
    const headers = ['Date,Description,Category,Type,Amount\n'];
    const rows = filteredTransactions.map(t => 
      `${t.date},${t.description},${t.category},${t.type},${t.amount}`
    );
    const csvContent = headers.concat(rows.join('\n')).join('');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'transactions.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="premium-card">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by description or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-brand/20 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
            <button 
              onClick={() => setFilterType('all')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                filterType === 'all' ? 'bg-white text-brand shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setFilterType('income')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                filterType === 'income' ? 'bg-white text-brand shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Income
            </button>
            <button 
              onClick={() => setFilterType('expense')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                filterType === 'expense' ? 'bg-white text-brand shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Expense
            </button>
          </div>

          <button 
            onClick={exportToCSV}
            className="p-2.5 bg-slate-50 text-slate-500 hover:text-brand hover:bg-brand-light rounded-xl transition-all border border-slate-100"
            title="Export to CSV"
          >
            <Download size={20} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              <th className="px-6 pb-2">Transaction</th>
              <th className="px-6 pb-2">Category</th>
              <th className="px-6 pb-2 cursor-pointer hover:text-slate-600 transition-colors" onClick={() => {
                setSortBy('date');
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              }}>
                Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 pb-2 text-right cursor-pointer hover:text-slate-600 transition-colors" onClick={() => {
                setSortBy('amount');
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              }}>
                Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              {role === 'Admin' && <th className="px-6 pb-2 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredTransactions.map((t) => (
                <motion.tr 
                  key={t.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="group hover:scale-[1.005] transition-transform duration-200"
                >
                  <td className="px-6 py-4 bg-slate-50/50 rounded-l-2xl border-y border-l border-transparent group-hover:bg-white group-hover:border-slate-100 group-hover:shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        t.type === 'income' ? 'bg-teal-soft text-teal-accent' : 'bg-red-50 text-red-500'
                      }`}>
                        {t.type === 'income' ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
                      </div>
                      <span className="font-bold text-slate-700">{t.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 bg-slate-50/50 border-y border-transparent group-hover:bg-white group-hover:border-slate-100 group-hover:shadow-sm">
                    <span className="px-3 py-1 bg-white border border-slate-100 rounded-lg text-xs font-bold text-slate-500">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 bg-slate-50/50 border-y border-transparent group-hover:bg-white group-hover:border-slate-100 group-hover:shadow-sm text-sm font-medium text-slate-400">
                    {format(parseISO(t.date), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 bg-slate-50/50 border-y border-transparent group-hover:bg-white group-hover:border-slate-100 group-hover:shadow-sm text-right">
                    <span className={`font-bold text-lg ${
                      t.type === 'income' ? 'text-teal-accent' : 'text-slate-800'
                    }`}>
                      {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  {role === 'Admin' && (
                    <td className="px-6 py-4 bg-slate-50/50 rounded-r-2xl border-y border-r border-transparent group-hover:bg-white group-hover:border-slate-100 group-hover:shadow-sm text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-brand transition-colors">
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => deleteTransaction(t.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {filteredTransactions.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-4">
              <Search size={32} />
            </div>
            <p className="text-lg font-bold text-slate-800">No transactions found</p>
            <p className="font-medium">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionTable;
