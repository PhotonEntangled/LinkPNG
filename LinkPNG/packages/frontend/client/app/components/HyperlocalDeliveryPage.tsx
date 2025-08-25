"use client"

import { useState } from 'react';
import { ArrowLeft, MoreVertical, Package, Send, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '../hooks/useApp';
import { useToast } from '@/components/ui/use-toast';

export default function HyperlocalDeliveryPage() {
  const { setCurrentPage } = useApp();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [pickup, setPickup] = useState('Gordons Market');
  const [dropoff, setDropoff] = useState('University of PNG');
  const [details, setDetails] = useState('Document package');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Delivery Request Submitted!",
      description: "We are finding a driver for your delivery.",
    });
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => step === 1 ? setCurrentPage('home') : setStep(1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Local Delivery</h1>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-6 w-6 text-orange-600" />
                Request a Delivery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="pickup">Pickup Address</Label>
                  <Input id="pickup" value={pickup} onChange={e => setPickup(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="dropoff">Dropoff Address</Label>
                  <Input id="dropoff" value={dropoff} onChange={e => setDropoff(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="details">Package Details</Label>
                  <Textarea id="details" value={details} onChange={e => setDetails(e.target.value)} />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Find Driver
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Tracking Your Delivery</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <Map className="h-32 w-32 mx-auto text-green-500" />
              <p className="font-bold text-lg mt-4">Driver on the way!</p>
              <p className="text-gray-600">Estimated arrival: 15 minutes</p>
              <div className="mt-4 text-left space-y-2">
                <p><strong>From:</strong> {pickup}</p>
                <p><strong>To:</strong> {dropoff}</p>
                <p><strong>Package:</strong> {details}</p>
              </div>
              <Button className="mt-6 w-full" onClick={() => setStep(1)}>
                  Book Another Delivery
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
