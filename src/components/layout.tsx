import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Wallet, 
  History, 
  Settings, 
  Bell, 
  Menu,
  Search,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Toaster } from '@/components/ui/sonner';
import { Link, useLocation } from 'react-router';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-card/50 backdrop-blur-xl">
        <Link to="/" className="p-6 flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
            TR
          </div>
          <span className="text-xl font-bold tracking-tight">TradeReal</span>
        </Link>
        
        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={location.pathname === '/dashboard'} />
          <NavItem icon={<TrendingUp size={20} />} label="Markets" />
          <NavItem icon={<Wallet size={20} />} label="Portfolio" />
          <NavItem icon={<History size={20} />} label="History" />
          <Separator className="my-4" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-primary/5 rounded-xl p-4 space-y-3">
            <p className="text-xs font-medium text-muted-foreground">GO PRO</p>
            <p className="text-sm">Get real-time insights and advanced tools.</p>
            <Button size="sm" className="w-full">Upgrade Now</Button>
          </div>
          <div className="mt-4 flex items-center gap-3 p-2">
            <Avatar className="h-10 w-10 border">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@tradereal.com</p>
            </div>
            <Link to="/">
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <LogOut size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-4 md:px-8 bg-card/50 backdrop-blur-xl z-10">
          <div className="flex items-center gap-4 flex-1">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu size={24} />
            </Button>
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search assets, news..." 
                className="pl-10 bg-muted/50 border-none focus-visible:ring-1" 
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-background"></span>
            </Button>
            <Separator orientation="vertical" className="h-8 mx-2 hidden sm:block" />
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs text-muted-foreground">Market Status</span>
              <span className="text-xs font-medium text-green-500 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                OPEN
              </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scrollbar-hide">
          {children}
        </div>
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active }) => (
  <button className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
    {icon}
    {label}
  </button>
);
