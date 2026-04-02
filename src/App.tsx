import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import TransactionsPage from './pages/TransactionsPage';
import InsightsPage from './pages/InsightsPage';
import SettingsPage from './pages/SettingsPage';

const App = () => {
  return (
    <FinanceProvider>
      <Router>
        <div className="flex min-h-screen bg-slate-50 font-sans">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col relative overflow-x-hidden">
            <Navbar />
            
            <main className="flex-1 overflow-y-auto scroll-smooth">
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/transactions" element={<TransactionsPage />} />
                  <Route path="/insights" element={<InsightsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </main>

            {/* Background Decorations */}
            <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none"></div>
            <div className="fixed bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-purple-accent/5 blur-[100px] rounded-full -ml-48 -mb-48 pointer-events-none"></div>
          </div>
        </div>
      </Router>
    </FinanceProvider>
  );
};

export default App;
