// LinkPNG/packages/frontend/client/app/components/AutomatedFullDemo.tsx
"use client";

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAutomatedSellerDemo } from './AutomatedSellerDemo';
import { toast as showToast } from "@/components/ui/use-toast";
import { useDemoMode } from '../context/DemoModeContext';
import { DemoCaption } from './DemoCaption'; // Import the new caption component

// ... Helper utilities remain unchanged ...

const useFullDemoAutomation = ({ setMasterDemoRunning }: { setMasterDemoRunning: (isRunning: boolean) => void }) => {
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [caption, setCaption] = useState<string | null>(null);
  const router = useRouter();
  const { login, logout } = useDemoMode();
  
  const { startDemo: startSellerDemo } = useAutomatedSellerDemo({ 
    onComplete: () => setCaption("Seller onboarding finished.")
  });

  useEffect(() => { setMasterDemoRunning(isDemoRunning); }, [isDemoRunning, setMasterDemoRunning]);

  const runActI = useCallback(async () => {
    setCaption("A customer wants to buy a local product. She uses voice search to find a 'bilum'.");
    router.push('/search?query=bilum');
    await delay(3000);
    
    setCaption("She finds a beautiful bilum and adds it to her cart.");
    await findAndClickByText('h3', 'Traditional Highland Bilum - Large');
    await delay(2000);
    await findAndClickByText('button', 'Add to Cart');
    await delay(2000);

    setCaption("She proceeds to checkout, using a familiar PNG payment method: MiCash.");
    await clickElement('a[href="/cart"]');
    await delay(2000);
    await findAndClickByText('button', 'Proceed to Checkout');
    await delay(2000);
    const miCashRadio = document.querySelector('input[value="mobile"]') as HTMLInputElement;
    if (miCashRadio) miCashRadio.click(); else throw new Error('MiCash option not found');
    await delay(1000);
    await findAndClickByText('button', 'Confirm and Pay');
    await delay(3000);
    
    setCaption("After a successful purchase, she can track her order's journey from the village to the city.");
    await findAndClickByText('a', 'View Order Details');
    await delay(4000);
  }, [router]);

  const runActII = useCallback(async () => {
    setCaption("Now, let's see the seller's side. We'll automate the entire onboarding for a new seller.");
    router.push('/become-seller');
    await delay(3000);
    await startSellerDemo();
  }, [router, startSellerDemo]);

  const runActIII = useCallback(async () => {
    setCaption("To ensure quality, an admin must approve the new seller.");
    logout();
    await delay(1500);
    login({ name: 'Admin User', role: 'admin' });
    router.push('/admin');
    await delay(2000);
    
    setCaption("The admin reviews the application and approves Maria's shop.");
    await findAndClickByText('button', 'Moderation');
    await delay(1500);
    await findAndClickByText('button', 'Approve');
    await delay(2000);

    setCaption("The admin dashboard provides powerful, real-time analytics on the platform's performance.");
    await findAndClickByText('button', 'Analytics');
    await delay(4000);
    
    setCaption("Key data can be exported for investor review, ensuring transparency.");
    await findAndClickByText('button', 'Export to CSV');
    await delay(2000);
  }, [logout, login, router]);


  const startFullDemo = async () => {
    if (isDemoRunning) return;
    setIsDemoRunning(true);
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
