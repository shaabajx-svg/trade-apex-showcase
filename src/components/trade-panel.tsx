import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Asset, TradingState } from '@/types/trading';

interface TradePanelProps {
  asset: Asset;
  state: TradingState;
  onTrade: (assetId: string, type: 'BUY' | 'SELL', amount: number) => void;
}

export const TradePanel: React.FC<TradePanelProps> = ({ asset, state, onTrade }) => {
  const [amount, setAmount] = useState<string>('');
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');

  const parsedAmount = parseFloat(amount) || 0;
  const total = parsedAmount * asset.price;

  const currentHolding = state.holdings.find(h => h.assetId === asset.id);
  
  const canTrade = tradeType === 'BUY' 
    ? state.balance >= total && parsedAmount > 0
    : (currentHolding?.amount || 0) >= parsedAmount && parsedAmount > 0;

  const handleMax = () => {
    if (tradeType === 'BUY') {
      const maxAmount = Math.floor((state.balance / asset.price) * 10000) / 10000;
      setAmount(maxAmount.toString());
    } else {
      setAmount((currentHolding?.amount || 0).toString());
    }
  };

  return (
    <Card>
      <CardHeader>
        <Tabs value={tradeType} onValueChange={(v) => setTradeType(v as 'BUY' | 'SELL')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="BUY" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Buy</TabsTrigger>
            <TabsTrigger value="SELL" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Sell</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Available</span>
          <span className="font-medium">
            {tradeType === 'BUY' 
              ? `$${state.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}` 
              : `${currentHolding?.amount || 0} ${asset.symbol}`}
          </span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount ({asset.symbol})</Label>
          <div className="relative">
            <Input 
              id="amount" 
              type="number" 
              placeholder="0.00" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pr-16"
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-1 top-1 h-8 px-2 text-xs"
              onClick={handleMax}
            >
              MAX
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Price</span>
            <span>${asset.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm font-bold">
            <span>Total</span>
            <span>${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        <Button 
          className={`w-full ${tradeType === 'BUY' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
          disabled={!canTrade}
          onClick={() => {
            onTrade(asset.id, tradeType, parsedAmount);
            setAmount('');
          }}
        >
          {tradeType === 'BUY' ? 'Buy' : 'Sell'} {asset.symbol}
        </Button>
      </CardContent>
    </Card>
  );
};
