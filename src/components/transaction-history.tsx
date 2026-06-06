import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Transaction } from '@/types/trading';
import { formatDistanceToNow } from 'date-fns';

interface TransactionHistoryProps {
  history: Transaction[];
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ history }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Type</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right pr-6">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No transactions yet. Start trading!
                </TableCell>
              </TableRow>
            ) : (
              history.slice(0, 10).map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="pl-6">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${tx.type === 'BUY' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                      {tx.type}
                    </span>
                  </TableCell>
                  <TableCell className="font-bold">{tx.symbol}</TableCell>
                  <TableCell className="text-right">{tx.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${tx.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell className="text-right pr-6 text-xs text-muted-foreground">
                    {formatDistanceToNow(tx.timestamp, { addSuffix: true })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
