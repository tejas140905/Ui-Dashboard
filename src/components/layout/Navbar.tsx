import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Bell, Search, User, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { role, setRole } = useFinance();

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 px-8 flex items-center justify-between">
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search transactions, insights..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-transparent border-2 rounded-xl focus:bg-white focus:border-brand/20 outline-none transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Role Switcher */}
        <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
          <button 
            onClick={() => setRole('Viewer')}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              role === 'Viewer' 
                ? 'bg-white text-brand shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Viewer
          </button>
          <button 
            onClick={() => setRole('Admin')}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              role === 'Admin' 
                ? 'bg-white text-brand shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Admin
          </button>
        </div>

        <button className="relative p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
          <Bell size={22} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-[1px] bg-slate-100"></div>

        <button className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-xl transition-all group">
          <div className="w-10 h-10 bg-purple-soft rounded-xl flex items-center justify-center text-purple-accent border border-purple-200/50">
            <User size={22} />
          </div>
          <div className="text-left hidden md:block">
            <p className="text-sm font-bold text-slate-800">Tejas G</p>
            <p className="text-xs text-slate-400 font-medium capitalize">{role}</p>
          </div>
          <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
