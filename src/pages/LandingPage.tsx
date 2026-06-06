import React from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Globe, 
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Smartphone
} from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
              TR
            </div>
            <span className="text-xl font-bold tracking-tight">TradeReal</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#markets" className="hover:text-primary transition-colors">Markets</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm">Start Trading</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden border-b">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                LIVE MARKETS OPEN
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                Trade Real Assets <span className="text-primary italic">Instantly.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                The most advanced trading platform for stocks, crypto, and commodities. Real-time data, lightning-fast execution, and institutional-grade security for everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/dashboard">
                  <Button size="lg" className="h-14 px-8 text-lg font-semibold gap-2">
                    Open Free Account <ArrowRight size={20} />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold">
                  View Demo
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4 grayscale opacity-60">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5a/NASDAQ_Logo.svg" alt="Nasdaq" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/NYSE_logo.svg" alt="NYSE" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/f3/S%26P_Global_logo.svg" alt="S&P Global" className="h-5" />
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full"></div>
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/690ac512-004f-41bb-a86b-50e58d1de745/hero-banner-49150480-1780703184007.webp" 
                alt="TradeReal Dashboard" 
                className="relative rounded-2xl shadow-2xl border border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="text-3xl font-bold">$42B+</p>
              <p className="text-sm text-muted-foreground">Trading Volume</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold">12M+</p>
              <p className="text-sm text-muted-foreground">Active Traders</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold">0.01s</p>
              <p className="text-sm text-muted-foreground">Execution Speed</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-sm text-muted-foreground">Expert Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Everything you need to trade like a pro</h2>
            <p className="text-lg text-muted-foreground">Stop guessing and start trading with data-driven insights and professional tools designed for clarity and speed.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="text-primary" size={24} />}
              title="Instant Execution"
              description="Our proprietary matching engine handles millions of trades per second with zero latency."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-primary" size={24} />}
              title="Bank-Grade Security"
              description="All assets are stored in multi-signature cold storage with end-to-end encryption."
            />
            <FeatureCard 
              icon={<BarChart3 className="text-primary" size={24} />}
              title="Advanced Analytics"
              description="Get deep insights with real-time order books, technical indicators, and sentiment analysis."
            />
            <FeatureCard 
              icon={<Globe className="text-primary" size={24} />}
              title="Global Markets"
              description="Access 100+ markets worldwide from a single unified interface."
            />
            <FeatureCard 
              icon={<Smartphone className="text-primary" size={24} />}
              title="Mobile First"
              description="Trade on the go with our award-winning mobile app for iOS and Android."
            />
            <FeatureCard 
              icon={<CheckCircle2 className="text-primary" size={24} />}
              title="Zero Commission"
              description="Experience true commission-free trading on major stocks and crypto pairs."
            />
          </div>
        </div>
      </section>

      {/* Mockup Section */}
      <section className="py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold">Trade anywhere, anytime.</h2>
              <p className="text-xl text-primary-foreground/80 leading-relaxed">
                Download the TradeReal mobile app and keep your finger on the pulse of the markets. Get real-time alerts, execute trades, and manage your portfolio with ease.
              </p>
              <div className="flex gap-4 pt-4">
                <Button variant="secondary" size="lg" className="h-14 px-8">App Store</Button>
                <Button variant="secondary" size="lg" className="h-14 px-8">Play Store</Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/690ac512-004f-41bb-a86b-50e58d1de745/app-mockup-150ddff8-1780703183484.webp" 
                alt="Mobile App" 
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                  TR
                </div>
                <span className="text-xl font-bold tracking-tight">TradeReal</span>
              </div>
              <p className="text-muted-foreground max-w-xs leading-relaxed">
                Empowering individuals to take control of their financial future through accessible and professional trading tools.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Markets</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Trading View</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Portfolio</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Docs</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Risk Disclosure</a></li>
              </ul>
            </div>
          </div>
          <Separator className="mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 TradeReal Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors text-xs">Risk Warning: Trading derivatives involves significant risk of loss.</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <Card className="border-none bg-muted/20 hover:bg-muted/40 transition-colors">
    <CardContent className="p-8 space-y-4">
      <div className="h-12 w-12 rounded-xl bg-background flex items-center justify-center shadow-sm border">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </CardContent>
  </Card>
);

const Separator = ({ className }: { className?: string }) => (
  <div className={`h-px bg-border w-full ${className}`} />
);
