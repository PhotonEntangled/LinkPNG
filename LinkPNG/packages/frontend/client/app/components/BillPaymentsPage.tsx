"use client"

import { useState } from 'react';
import { ArrowLeft, MoreVertical, Wifi, Zap, Droplet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '../hooks/useApp';
import { useToast } from '@/components/ui/use-toast';

const billers = [
  { id: 'png_power', name: 'PNG Power', icon: Zap, color: 'text-yellow-500' },
  { id: 'water_png', name: 'Water PNG', icon: Droplet, color: 'text-blue-500' },
  { id: 'digicel', name: 'Digicel Top-Up', icon: Wifi, color: 'text-red-500' },
  { id: 'bmobile', name: 'Bmobile Top-Up', icon: Wifi, color: 'text-purple-500' },
];

export default function BillPaymentsPage() {
  const { setCurrentPage } = useApp();
  const { toast } = useToast();
  const [selectedBiller, setSelectedBiller] = useState<(typeof billers)[0] | null>(billers[0]);
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBiller) return;
    
    toast({
      title: "Payment Successful!",
      description: `Your payment of K${amount} to ${selectedBiller.name} for account ${accountNumber} was successful.`,
    });
    setAccountNumber('');
    setAmount('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setCurrentPage('home')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Bill Payments</h1>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle>Select a Biller</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {billers.map(biller => (
              <Card 
                key={biller.id}
                className={`p-4 flex flex-col items-center justify-center cursor-pointer ${selectedBiller?.id === biller.id ? 'border-red-600 ring-2 ring-red-600' : 'hover:border-gray-400'}`}
                onClick={() => setSelectedBiller(biller)}
              >
                <biller.icon className={`h-10 w-10 mb-2 ${biller.color}`} />
                <p className="text-sm font-medium text-center">{biller.name}</p>
              </Card>
            ))}
          </CardContent>
        </Card>

        {selectedBiller && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Pay {selectedBiller.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <Label htmlFor="accountNumber">Account / Phone Number</Label>
                  <Input 
                    id="accountNumber" 
                    value={accountNumber} 
                    onChange={(e) => setAccountNumber(e.target.value)} 
                    placeholder="Enter number" 
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount (PGK)</Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    placeholder="e.g., 50" 
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Pay Now
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
