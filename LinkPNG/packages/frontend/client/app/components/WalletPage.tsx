"use client"

import { useState } from 'react';
import { ArrowLeft, Plus, Download, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '../hooks/useApp';

// Mock transaction data
const mockTransactions = [
  { id: 1, type: 'deposit', amount: 250.00, date: '2024-07-22', status: 'Completed', description: 'Bank Transfer' },
  { id: 2, type: 'purchase', amount: -42.00, date: '2024-07-21', status: 'Completed', description: 'PNG Coffee Beans' },
  { id: 3, type: 'purchase', amount: -85.00, date: '2024-07-20', status: 'Completed', description: 'Traditional Bilum Bag' },
  { id: 4, type: 'withdraw', amount: -100.00, date: '2024-07-19', status: 'Pending', description: 'Mobile Money' },
  { id: 5, type: 'deposit', amount: 50.00, date: '2024-07-18', status: 'Completed', description: 'Cash-in at Agent' },
];

export default function WalletPage() {
  const { setCurrentPage } = useApp();
  const [balance] = useState(573.50); // Mock balance

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Pending': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setCurrentPage('home')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">LinkPNG Wallet</h1>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Card className="mb-6 bg-gradient-to-br from-red-600 to-yellow-400 text-white">
          <CardHeader>
            <CardTitle className="text-sm font-medium opacity-80">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">K{balance.toFixed(2)}</div>
            <p className="text-xs opacity-70 mt-1">Available for purchases and transfers</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button variant="default" size="lg" className="h-16 flex-col">
            <Plus className="h-6 w-6 mb-1" />
            <span>Add Funds</span>
          </Button>
          <Button variant="outline" size="lg" className="h-16 flex-col bg-white">
            <Download className="h-6 w-6 mb-1" />
            <span>Withdraw</span>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{tx.description}</p>
                    <p className="text-sm text-gray-500">{tx.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${tx.type === 'deposit' ? 'text-green-600' : 'text-gray-800'}`}>
                      {tx.type === 'deposit' ? '+' : ''}K{tx.amount.toFixed(2)}
                    </p>
                    <Badge variant={getStatusVariant(tx.status) as any}>{tx.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
