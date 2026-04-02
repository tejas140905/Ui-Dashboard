import { useState } from 'react';
import TransactionTable from '../components/transactions/TransactionTable';
import AddTransactionModal from '../components/transactions/AddTransactionModal';
import { useFinance } from '../context/FinanceContext';
import { Plus, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const TransactionsPage = () => {
  const { role } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-7xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-brand font-bold text-sm uppercase tracking-widest mb-2">
            <FileText size={16} />
            <span>Ledger</span>
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Transactions</h1>
          <p className="text-slate-400 font-medium">Manage and monitor all your financial activities in one place.</p>
        </div>

        <div className="flex items-center gap-3">
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
      </div>

      <TransactionTable />

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </motion.div>
  );
};

export default TransactionsPage;
