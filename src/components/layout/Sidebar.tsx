import React from 'react';
import { 
  LayoutDashboard, 
  Receipt, 
  PieChart, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Wallet
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Sidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Receipt, label: 'Transactions', path: '/transactions' },
    { icon: PieChart, label: 'Insights', path: '/insights' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside 
      className={cn(
        "h-screen sticky top-0 bg-white border-r border-slate-100 transition-all duration-300 flex flex-col z-50",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-6 flex items-center justify-between">
        <div className={cn("flex items-center gap-3 transition-opacity duration-300", collapsed ? "opacity-0 invisible" : "opacity-100 visible")}>
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/20">
            <Wallet size={24} />
          </div>
          <span className="font-bold text-xl text-slate-800">Zoorvyn</span>
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-brand transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                isActive ? "sidebar-link-active" : "sidebar-link",
                collapsed && "justify-center px-0"
              )}
            >
              <item.icon size={22} className={cn(isActive ? "text-white" : "text-slate-400")} />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-50">
        <button className={cn("sidebar-link w-full text-red-500 hover:bg-red-50 hover:text-red-600", collapsed && "justify-center px-0")}>
          <LogOut size={22} />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
