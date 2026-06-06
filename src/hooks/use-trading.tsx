import { useState, useEffect, useCallback, useMemo } from 'react';
import { Asset, TradingState, Transaction, Holding } from '@/types/trading';
import { toast } from 'sonner';

const INITIAL_BALANCE = 10000;
const STORAGE_KEY = 'trading_app_state';

const INITIAL_ASSETS: Asset[] = [
  { id: '1', symbol: 'BTC', name: 'Bitcoin', price: 65000, change24h: 2.5, history: [] },
  { id: '2', symbol: 'ETH', name: 'Ethereum', price: 3500, change24h: -1.2, history: [] },
  { id: '3', symbol: 'SOL', name: 'Solana', price: 145, change24h: 5.8, history: [] },
  { id: '4', symbol: 'AAPL', name: 'Apple Inc.', price: 185, change24h: 0.5, history: [] },
  { id: '5', symbol: 'TSLA', name: 'Tesla, Inc.', price: 175, change24h: -3.4, history: [] },
  { id: '6', symbol: 'NVDA', name: 'NVIDIA Corp.', price: 850, change24h: 4.2, history: [] },
];

export function useTrading() {
  const [assets, setAssets] = useState<Asset[]>(() => {
    return INITIAL_ASSETS.map(asset => ({
      ...asset,
      history: Array.from({ length: 20 }, (_, i) => ({
        time: new Date(Date.now() - (20 - i) * 1000 * 60 * 60).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        price: asset.price * (1 + (Math.random() - 0.5) * 0.05)
      }))
    }));
  });

  const [state, setState] = useState<TradingState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return {
      balance: INITIAL_BALANCE,
      holdings: [],
      history: []
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prev => prev.map(asset => {
        const change = (Math.random() - 0.5) * 0.002;
        const newPrice = asset.price * (1 + change);
        const newHistory = [...asset.history.slice(1), {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          price: newPrice
        }];
        return {
          ...asset,
          price: newPrice,
          change24h: asset.change24h + (change * 100),
          history: newHistory
        };
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const executeTrade = useCallback((assetId: string, type: 'BUY' | 'SELL', amount: number) => {
    const asset = assets.find(a => a.id === assetId);
    if (!asset) return;

    const totalCost = asset.price * amount;

    if (type === 'BUY') {
      if (state.balance < totalCost) {
        toast.error('Insufficient balance');
        return;
      }

      setState(prev => {
        const existingHolding = prev.holdings.find(h => h.assetId === assetId);
        let newHoldings: Holding[];

        if (existingHolding) {
          newHoldings = prev.holdings.map(h => 
            h.assetId === assetId 
              ? { 
                  ...h, 
                  amount: h.amount + amount,
                  avgPrice: (h.avgPrice * h.amount + totalCost) / (h.amount + amount)
                } 
              : h
          );
        } else {
          newHoldings = [...prev.holdings, { assetId, symbol: asset.symbol, amount, avgPrice: asset.price }];
        }

        const newTransaction: Transaction = {
          id: Math.random().toString(36).substr(2, 9),
          assetId,
          symbol: asset.symbol,
          type: 'BUY',
          amount,
          price: asset.price,
          timestamp: Date.now()
        };

        toast.success(`Bought ${amount} ${asset.symbol}`);
        return {
          ...prev,
          balance: prev.balance - totalCost,
          holdings: newHoldings,
          history: [newTransaction, ...prev.history]
        };
      });
    } else {
      const existingHolding = state.holdings.find(h => h.assetId === assetId);
      if (!existingHolding || existingHolding.amount < amount) {
        toast.error(`Insufficient ${asset.symbol} holdings`);
        return;
      }

      setState(prev => {
        const newHoldings = prev.holdings.map(h => 
          h.assetId === assetId 
            ? { ...h, amount: h.amount - amount } 
            : h
        ).filter(h => h.amount > 0);

        const newTransaction: Transaction = {
          id: Math.random().toString(36).substr(2, 9),
          assetId,
          symbol: asset.symbol,
          type: 'SELL',
          amount,
          price: asset.price,
          timestamp: Date.now()
        };

        toast.success(`Sold ${amount} ${asset.symbol}`);
        return {
          ...prev,
          balance: prev.balance + totalCost,
          holdings: newHoldings,
          history: [newTransaction, ...prev.history]
        };
      });
    }
  }, [assets, state]);

  const portfolioValue = useMemo(() => {
    const holdingsValue = state.holdings.reduce((acc, holding) => {
      const asset = assets.find(a => a.id === holding.assetId);
      return acc + (asset ? asset.price * holding.amount : 0);
    }, 0);
    return state.balance + holdingsValue;
  }, [assets, state]);

  return {
    assets,
    state,
    portfolioValue,
    executeTrade
  };
}
