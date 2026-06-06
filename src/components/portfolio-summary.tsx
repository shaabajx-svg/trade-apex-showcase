import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Asset, TradingState } from '@/types/trading';
import { Wallet, TrendingUp, TrendingDown, Briefcase } from 'lucide-react';

interface PortfolioSummaryProps {
  state: TradingState;
  assets: Asset[];
  portfolioValue: number;
}

export const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ state, assets, portfolioValue }) => {
  const totalProfitLoss = state.holdings.reduce((acc, holding) => {
    const asset = assets.find(a => a.id === holding.assetId);
    if (!asset) return acc;
    const currentValue = asset.price * holding.amount;
    const costBasis = holding.avgPrice * holding.amount;
    return acc + (currentValue - costBasis);
  }, 0);

  const profitPercentage = portfolioValue > 0 ? (totalProfitLoss / (portfolioValue - totalProfitLoss)) * 100 : 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Portfolio Value</CardTitle>
          <Briefcase className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          <p className={`text-xs flex items-center mt-1 ${totalProfitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {totalProfitLoss >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {totalProfitLoss >= 0 ? '+' : ''}${Math.abs(totalProfitLoss).toLocaleString(undefined, { minimumFractionDigits: 2 })} ({profitPercentage.toFixed(2)}%)
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Cash Balance</CardTitle>
          <Wallet className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${state.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          <p className="text-xs text-muted-foreground mt-1">Available for trading</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Positions</CardTitle>
          <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{state.holdings.length} Assets</div>
          <p className="text-xs text-muted-foreground mt-1">Diversified across {state.holdings.length} markets</p>
        </CardContent>
      </Card>
    </div>
  );
};
