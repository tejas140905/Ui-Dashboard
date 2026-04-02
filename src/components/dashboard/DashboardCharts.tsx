import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { useFinance } from '../../context/FinanceContext';
import { format, parseISO } from 'date-fns';

const DashboardCharts = () => {
  const { transactions } = useFinance();

  // Prepare data for Area Chart (Balance Trend)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return format(d, 'yyyy-MM-dd');
  });

  const areaData = last7Days.map(date => {
    const dayTransactions = transactions.filter(t => t.date === date);
    const income = dayTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = dayTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    return {
      name: format(parseISO(date), 'MMM dd'),
      income,
      expense,
      balance: income - expense
    };
  });

  // Prepare data for Pie Chart (Spending by Category)
  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc: any[], t) => {
      const existing = acc.find(item => item.name === t.category);
      if (existing) {
        existing.value += t.amount;
      } else {
        acc.push({ name: t.category, value: t.amount });
      }
      return acc;
    }, []);

  const COLORS = ['#3b82f6', '#a855f7', '#14b8a6', '#f59e0b', '#ef4444', '#6366f1'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      {/* Area Chart */}
      <div className="premium-card">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Financial Trend</h3>
            <p className="text-sm text-slate-400 font-medium">Daily income vs expenses for last 7 days</p>
          </div>
          <select className="px-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-600 outline-none focus:ring-2 focus:ring-brand/10 transition-all">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        <div className="h-[350px] w-full min-h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  backdropFilter: 'blur(8px)',
                  borderRadius: '16px',
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
                  padding: '12px 16px'
                }}
                itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                labelStyle={{ marginBottom: '8px', color: '#1e293b', fontWeight: 700 }}
              />
              <Area 
                type="monotone" 
                dataKey="income" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorIncome)" 
                animationDuration={1500}
              />
              <Area 
                type="monotone" 
                dataKey="expense" 
                stroke="#ef4444" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorExpense)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="premium-card">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Spending Breakdown</h3>
            <p className="text-sm text-slate-400 font-medium">Distribution by category</p>
          </div>
          <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
          </button>
        </div>
        <div className="h-[350px] w-full min-h-[350px] flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={85}
                outerRadius={120}
                paddingAngle={8}
                dataKey="value"
                animationDuration={1500}
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  backdropFilter: 'blur(8px)',
                  borderRadius: '16px',
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                formatter={(value) => <span className="text-sm font-bold text-slate-600 px-2">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Total Spending in Center */}
          <div className="absolute flex flex-col items-center">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Spent</span>
            <span className="text-2xl font-black text-slate-800">
              ₹{categoryData.reduce((sum, item) => sum + item.value, 0).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
