import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Asset } from '@/types/trading';

interface MarketListProps {
  assets: Asset[];
  selectedAssetId: string;
  onSelectAsset: (asset: Asset) => void;
}

export const MarketList: React.FC<MarketListProps> = ({ assets, selectedAssetId, onSelectAsset }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Markets</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Asset</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right pr-6">24h Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => (
              <TableRow 
                key={asset.id} 
                className={`cursor-pointer hover:bg-muted/50 transition-colors ${selectedAssetId === asset.id ? 'bg-muted' : ''}`}
                onClick={() => onSelectAsset(asset)}
              >
                <TableCell className="pl-6">
                  <div className="flex flex-col">
                    <span className="font-bold">{asset.symbol}</span>
                    <span className="text-xs text-muted-foreground">{asset.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono">
                  ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
                <TableCell className={`text-right pr-6 font-medium ${asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
