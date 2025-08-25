"use client"

import { useState, useRef } from 'react';
import { ArrowLeft, MoreVertical, Car, MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '../hooks/useApp';
import { useToast } from '@/components/ui/use-toast';
import Map, { Marker } from 'react-map-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// A public Mapbox token
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXNyYXIiLCJhIjoiY2x5eXF6ZGpjMGJ3YTJrcGo5b3p4eXB3aSJ9.eB-72hgsJE5q-c651mp-9w';


export default function RideHailingPage() {
  const { setCurrentPage } = useApp();
  const { toast } = useToast();
  const [pickup, setPickup] = useState('Jacksons International Airport');
  const [destination, setDestination] = useState('Ela Beach');
  const [fare, setFare] = useState<number | null>(null);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedFare = Math.floor(Math.random() * (45 - 25 + 1)) + 25;
    setFare(calculatedFare);
    toast({
      title: "Finding your ride...",
      description: `A ride from ${pickup} to ${destination} will be approximately K${calculatedFare.toFixed(2)}.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setCurrentPage('home')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Car className="h-5 w-5" />
            LinkPNG Ride
          </h1>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex-grow relative">
        <Map
          initialViewState={{
            longitude: 147.19,
            latitude: -9.47,
            zoom: 12
          }}
          style={{width: '100%', height: '100%'}}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
            <Marker longitude={147.21} latitude={-9.44} offset={[0, -20]}>
                <MapPin className="h-8 w-8 text-blue-500" />
            </Marker>
            <Marker longitude={147.16} latitude={-9.48} offset={[0, -20]}>
                <MapPin className="h-8 w-8 text-red-500" />
            </Marker>
        </Map>

        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <Card className="max-w-xl mx-auto">
            <CardHeader>
              <CardTitle>Book a Ride</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <Input id="pickup" value={pickup} onChange={(e) => setPickup(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
                </div>
                {fare ? (
                    <div className="text-center text-lg font-bold p-4 bg-gray-100 rounded-md">
                        Estimated Fare: K{fare.toFixed(2)}
                    </div>
                ) : (
                    <Button type="submit" className="w-full">
                        <DollarSign className="h-4 w-4 mr-2" />
                        See Fare Estimate
                    </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
