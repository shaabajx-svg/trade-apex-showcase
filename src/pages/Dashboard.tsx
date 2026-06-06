import React, { useState } from 'react';
import { Layout } from '@/components/layout';
import { useTrading } from '@/hooks/use-trading';
import { PortfolioSummary } from '@/components/portfolio-summary';
import { TradingChart } from '@/components/trading-chart';
import { MarketList } from '@/components/market-list';
import { TradePanel } from '@/components/trade-panel';
import { TransactionHistory } from '@/components/transaction-history';
import { Asset } from '@/types/trading';

export const Dashboard = () => {
  const { assets, state, portfolioValue, executeTrade } = useTrading();
  const [selectedAsset, setSelectedAsset] = useState<Asset>(assets[0]);

  return (
    <Layout>
      <div className="space-y-8">
        {/* Top Summary Stats */}
        <PortfolioSummary 
          state={state} 
          assets={assets} 
          portfolioValue={portfolioValue} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Trading Area */}
          <div className="lg:col-span-8 space-y-8">
            <TradingChart asset={selectedAsset} />
            <TransactionHistory history={state.history} />
          </div>

          {/* Side Panels */}
          <div className="lg:col-span-4 space-y-8">
            <TradePanel 
              asset={selectedAsset} 
              state={state} 
              onTrade={executeTrade} 
            />
            <MarketList 
              assets={assets} 
              selectedAssetId={selectedAsset.id} 
              onSelectAsset={setSelectedAsset} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
