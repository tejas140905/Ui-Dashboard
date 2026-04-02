import { Settings, User, Bell, Lock, Globe, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsPage = () => {
  const sections = [
    {
      title: 'Account Settings',
      items: [
        { icon: User, label: 'Profile Information', description: 'Update your name, email, and personal details' },
        { icon: Lock, label: 'Security', description: 'Change password and manage two-factor authentication' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', description: 'Choose what alerts you want to receive' },
        { icon: Globe, label: 'Language & Region', description: 'Set your preferred language and currency' },
        { icon: Moon, label: 'Appearance', description: 'Switch between light and dark mode (Coming Soon)', toggle: true },
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-4xl mx-auto space-y-8"
    >
      <div>
        <div className="flex items-center gap-2 text-slate-400 font-bold text-sm uppercase tracking-widest mb-2">
          <Settings size={16} />
          <span>Configuration</span>
        </div>
        <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Settings</h1>
        <p className="text-slate-400 font-medium">Manage your account preferences and application settings.</p>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h3 className="text-lg font-black text-slate-700 ml-2">{section.title}</h3>
            <div className="grid gap-4">
              {section.items.map((item) => (
                <div 
                  key={item.label}
                  className="premium-card flex items-center justify-between group cursor-pointer hover:border-brand/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-brand-light group-hover:text-brand transition-colors">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{item.label}</h4>
                      <p className="text-sm text-slate-400 font-medium">{item.description}</p>
                    </div>
                  </div>
                  {item.toggle ? (
                    <div className="w-12 h-6 bg-slate-200 rounded-full relative">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  ) : (
                    <div className="text-slate-300 group-hover:text-brand transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SettingsPage;
