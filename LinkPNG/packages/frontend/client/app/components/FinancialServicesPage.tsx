"use client"

import { useState } from 'react';
import { ArrowLeft, MoreVertical, Landmark, PiggyBank, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '../hooks/useApp';
import { useToast } from '@/components/ui/use-toast';

export default function FinancialServicesPage() {
  const { setCurrentPage } = useApp();
  const { toast } = useToast();
  const [loanAmount, setLoanAmount] = useState('1000');
  const [loanPurpose, setLoanPurpose] = useState('Business inventory');

  const handleLoanApplication = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Loan Application Submitted!",
      description: `Your application for K${loanAmount} for ${loanPurpose} is under review.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setCurrentPage('home')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Financial Services</h1>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Savings Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="h-6 w-6 text-green-600" />
              My Savings
            </CardTitle>
            <Button variant="outline" size="sm">View History</Button>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">K1,250.75</p>
            <p className="text-sm text-gray-500">Annual interest rate: 4.5%</p>
          </CardContent>
        </Card>

        {/* Micro-Loans Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Landmark className="h-6 w-6 text-blue-600" />
              Apply for a Micro-Loan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLoanApplication} className="space-y-4">
              <div>
                <Label htmlFor="loanAmount">Loan Amount (PGK)</Label>
                <Input 
                  id="loanAmount" 
                  type="number" 
                  value={loanAmount} 
                  onChange={(e) => setLoanAmount(e.target.value)} 
                  placeholder="e.g., 1000" 
                />
              </div>
              <div>
                <Label htmlFor="loanPurpose">Purpose of Loan</Label>
                <Input 
                  id="loanPurpose" 
                  value={loanPurpose} 
                  onChange={(e) => setLoanPurpose(e.target.value)} 
                  placeholder="e.g., To buy more stock" 
                />
              </div>
              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
