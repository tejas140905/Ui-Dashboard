import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { X, Plus, DollarSign, Calendar, Tag, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../../data/mockData';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose }) => {
  const { addTransaction } = useFinance();
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: 'Other',
    type: 'expense' as 'income' | 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) return;

    addTransaction({
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
      type: formData.type,
      date: formData.date
    });
    
    setFormData({
      amount: '',
      description: '',
      category: 'Other',
      type: 'expense',
      date: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-0 top-1/2 -translate-y-1/2 mx-auto max-w-lg w-full bg-white rounded-3xl shadow-2xl z-[60] overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">Add Transaction</h2>
                  <p className="text-slate-400 font-medium">Create a new income or expense record</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Type Toggle */}
                <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'income' })}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 ${
                      formData.type === 'income' 
                        ? 'bg-white text-teal-accent shadow-premium border border-teal-50' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Income
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'expense' })}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 ${
                      formData.type === 'expense' 
                        ? 'bg-white text-brand shadow-premium border border-blue-50' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Expense
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Amount */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 flex items-center gap-2">
                      <DollarSign size={16} /> Amount
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0.00"
                      className="input-field"
                    />
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 flex items-center gap-2">
                      <Calendar size={16} /> Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 flex items-center gap-2">
                    <Tag size={16} /> Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-field"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 flex items-center gap-2">
                    <FileText size={16} /> Description
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="What was this for?"
                    className="input-field h-24 resize-none"
                  />
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-secondary flex-1 py-3.5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1 py-3.5 flex items-center justify-center gap-2"
                  >
                    <Plus size={20} /> Add Transaction
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddTransactionModal;
