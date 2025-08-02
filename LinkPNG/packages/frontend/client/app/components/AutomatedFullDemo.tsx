// LinkPNG/packages/frontend/client/app/components/AutomatedFullDemo.tsx
"use client";

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAutomatedSellerDemo } from './AutomatedSellerDemo';
import { toast as showToast } from "@/components/ui/use-toast";
import { useDemoMode } from '../context/DemoModeContext';
import { useDemoPlayback } from '../context/DemoPlaybackContext';
import { useApp } from '../hooks/useApp';
import { DemoCaption } from './DemoCaption';
import { delay, clickElement, findAndClickByText } from '@/lib/demo-utils';

const useFullDemoAutomation = ({ setMasterDemoRunning }: { setMasterDemoRunning: (isRunning: boolean) => void }) => {
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [caption, setCaption] = useState<string | null>(null);
  const router = useRouter();
  const { login, logout } = useDemoMode();
  const { setPlaybackActive } = useDemoPlayback();
  const { setCurrentPage, setSearchTerm } = useApp();
  
  const { startDemo: startSellerDemo } = useAutomatedSellerDemo({ 
    onComplete: () => setCaption("Seller onboarding finished.")
  });

  useEffect(() => { setMasterDemoRunning(isDemoRunning); }, [isDemoRunning, setMasterDemoRunning]);

  const runActI = useCallback(async () => {
    console.log('🎬 [DEMO] Starting Act I - Customer Journey');
    
    setCaption("A customer searches for a traditional handwoven bag using voice search.");
    console.log('🎬 [DEMO] Setting search term to: bilum');
    setSearchTerm('bilum');
    console.log('🎬 [DEMO] Ensuring we are on home page to show search results');
    setCurrentPage('home');
    await delay(3000);
    
    setCaption("They find a high-quality product and add it to their cart.");
    console.log('🎬 [DEMO] Looking for product: Traditional Highland Bilum - Large');
    await findAndClickByText('h3', 'Traditional Highland Bilum - Large');
    await delay(2000);
    console.log('🎬 [DEMO] Clicking Add to Cart button');
    await findAndClickByText('button', 'Add to Cart');
    await delay(2000);

    setCaption("Checkout is seamless with local mobile payment integration.");
    console.log('🎬 [DEMO] Navigating to cart');
    setCurrentPage('cart');
    await delay(2000);
    console.log('🎬 [DEMO] Proceeding to checkout');
    setCurrentPage('checkout');
    await delay(2000);
    console.log('🎬 [DEMO] Selecting mobile payment option');
    const miCashRadio = document.querySelector('input[value="mobile"]') as HTMLInputElement;
    if (miCashRadio) miCashRadio.click(); else throw new Error('Mobile payment option not found');
    await delay(1000);
    console.log('🎬 [DEMO] Confirming payment');
    await findAndClickByText('button', 'Confirm and Pay');
    await delay(3000);
    
    setCaption("Real-time order tracking provides transparency and builds trust.");
    console.log('🎬 [DEMO] Navigating to tracking page');
    setCurrentPage('tracking');
    await delay(4000);
    console.log('🎬 [DEMO] Act I completed successfully');
  }, [setCurrentPage, setSearchTerm]);

  const runActII = useCallback(async () => {
    console.log('🎬 [DEMO] Starting Act II - Seller Empowerment');
    
    setCaption("Our platform empowers sellers with streamlined onboarding. Watch our automated seller registration.");
    console.log('🎬 [DEMO] Navigating to become-seller page');
    setCurrentPage('become-seller');
    await delay(3000);
    console.log('🎬 [DEMO] Starting automated seller demo');
    await startSellerDemo();
    console.log('🎬 [DEMO] Act II completed successfully');
  }, [setCurrentPage, startSellerDemo]);

  const runActIII = useCallback(async () => {
    console.log('🎬 [DEMO] Starting Act III - Platform Intelligence');
    
    setCaption("Quality control: Admin approval ensures marketplace integrity.");
    console.log('🎬 [DEMO] Logging out current user');
    logout();
    await delay(1500);
    console.log('🎬 [DEMO] Logging in as admin');
    login({ name: 'Admin User', role: 'admin' });
    console.log('🎬 [DEMO] Navigating to admin dashboard - using Next.js routing');
    router.push('/admin');
    await delay(2000);
    
    setCaption("Efficient moderation workflow maintains platform standards.");
    console.log('🎬 [DEMO] Clicking Moderation tab');
    await findAndClickByText('button', 'Moderation');
    await delay(1500);
    console.log('🎬 [DEMO] Approving seller application');
    await findAndClickByText('button', 'Approve');
    await delay(2000);

    setCaption("Comprehensive analytics dashboard provides real-time business intelligence.");
    console.log('🎬 [DEMO] Switching to Analytics tab');
    await findAndClickByText('button', 'Analytics');
    await delay(4000);
    
    setCaption("Export functionality ensures transparency and investor-ready reporting.");
    console.log('🎬 [DEMO] Exporting data to CSV');
    await findAndClickByText('button', 'Export to CSV');
    await delay(2000);
    console.log('🎬 [DEMO] Act III completed successfully');
  }, [logout, login, router]);


  const startFullDemo = async () => {
    if (isDemoRunning) {
      console.log('🎬 [DEMO] Demo already running, skipping');
      return;
    }
    
    console.log('🎬 [DEMO] =========================');
    console.log('🎬 [DEMO] STARTING FULL E2E DEMO');
    console.log('🎬 [DEMO] =========================');
    
    setIsDemoRunning(true);
    setPlaybackActive(true);
    setCaption("Starting the full end-to-end demonstration...");

    try {
      console.log('🎬 [DEMO] Logging out and returning to homepage');
      logout();
      console.log('🎬 [DEMO] Setting page to home and clearing search term');
      setCurrentPage('home');
      setSearchTerm('');
      await delay(1500);

      console.log('🎬 [DEMO] Starting Act I...');
      await runActI();
      
      console.log('🎬 [DEMO] Starting Act II...');
      await runActII();
      
      console.log('🎬 [DEMO] Starting Act III...');
      await runActIII();

      setCaption("The full demo is complete!");
      console.log('🎬 [DEMO] =========================');
      console.log('🎬 [DEMO] DEMO COMPLETED SUCCESS!');
      console.log('🎬 [DEMO] =========================');
      await delay(3000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('🎬 [DEMO] ERROR:', errorMessage);
      console.error('🎬 [DEMO] Full error object:', error);
      setCaption(`Demo Failed: ${errorMessage}`);
      showToast({ title: "❌ Demo Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsDemoRunning(false);
      setPlaybackActive(false);
      setCaption(null);
      console.log('🎬 [DEMO] Demo session ended');
    }
  };

  return { startFullDemo, isDemoRunning, caption };
};

export const AutomatedFullDemo = ({ setMasterDemoRunning }: { setMasterDemoRunning: (isRunning: boolean) => void; }) => {
    const { startFullDemo, isDemoRunning, caption } = useFullDemoAutomation({ setMasterDemoRunning });

    return (
        <>
            <Button onClick={startFullDemo} disabled={isDemoRunning} variant="destructive" size="sm" className="gap-2">
                <Wand2 size={16} />
                {isDemoRunning ? 'Demo in Progress...' : 'Start Full E2E Demo'}
            </Button>
            <DemoCaption text={caption} />
        </>
    );
};
