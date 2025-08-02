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
import { DemoCaption } from './DemoCaption';
import { delay, clickElement, findAndClickByText } from '@/lib/demo-utils';

const useFullDemoAutomation = ({ setMasterDemoRunning }: { setMasterDemoRunning: (isRunning: boolean) => void }) => {
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [caption, setCaption] = useState<string | null>(null);
  const router = useRouter();
  const { login, logout } = useDemoMode();
  const { setPlaybackActive } = useDemoPlayback();
  
  const { startDemo: startSellerDemo } = useAutomatedSellerDemo({ 
    onComplete: () => setCaption("Seller onboarding finished.")
  });

  useEffect(() => { setMasterDemoRunning(isDemoRunning); }, [isDemoRunning, setMasterDemoRunning]);

  const runActI = useCallback(async () => {
    setCaption("A customer searches for a traditional handwoven bag using voice search.");
    router.push('/search?query=bilum');
    await delay(3000);
    
    setCaption("They find a high-quality product and add it to their cart.");
    await findAndClickByText('h3', 'Traditional Highland Bilum - Large');
    await delay(2000);
    await findAndClickByText('button', 'Add to Cart');
    await delay(2000);

    setCaption("Checkout is seamless with local mobile payment integration.");
    await clickElement('a[href="/cart"]');
    await delay(2000);
    await findAndClickByText('button', 'Proceed to Checkout');
    await delay(2000);
    const miCashRadio = document.querySelector('input[value="mobile"]') as HTMLInputElement;
    if (miCashRadio) miCashRadio.click(); else throw new Error('Mobile payment option not found');
    await delay(1000);
    await findAndClickByText('button', 'Confirm and Pay');
    await delay(3000);
    
    setCaption("Real-time order tracking provides transparency and builds trust.");
    await findAndClickByText('a', 'View Order Details');
    await delay(4000);
  }, [router]);

  const runActII = useCallback(async () => {
    setCaption("Our platform empowers sellers with streamlined onboarding. Watch our automated seller registration.");
    router.push('/become-seller');
    await delay(3000);
    await startSellerDemo();
  }, [router, startSellerDemo]);

  const runActIII = useCallback(async () => {
    setCaption("Quality control: Admin approval ensures marketplace integrity.");
    logout();
    await delay(1500);
    login({ name: 'Admin User', role: 'admin' });
    router.push('/admin');
    await delay(2000);
    
    setCaption("Efficient moderation workflow maintains platform standards.");
    await findAndClickByText('button', 'Moderation');
    await delay(1500);
    await findAndClickByText('button', 'Approve');
    await delay(2000);

    setCaption("Comprehensive analytics dashboard provides real-time business intelligence.");
    await findAndClickByText('button', 'Analytics');
    await delay(4000);
    
    setCaption("Export functionality ensures transparency and investor-ready reporting.");
    await findAndClickByText('button', 'Export to CSV');
    await delay(2000);
  }, [logout, login, router]);


  const startFullDemo = async () => {
    if (isDemoRunning) return;
    setIsDemoRunning(true);
    setPlaybackActive(true);
    setCaption("Starting the full end-to-end demonstration...");

    try {
      logout();
      router.push('/');
      await delay(1500);

      await runActI();
      await runActII();
      await runActIII();

      setCaption("The full demo is complete!");
      await delay(3000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setCaption(`Demo Failed: ${errorMessage}`);
      showToast({ title: "❌ Demo Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsDemoRunning(false);
      setPlaybackActive(false);
      setCaption(null);
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
