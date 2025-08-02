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
import { delay, clickElement, findAndClickByText, scrollToSection, scrollDown, showCursorOnElement, hideCursor } from '@/lib/demo-utils';

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
    
    setCaption("In emerging markets worldwide, connecting local producers with customers has always been a challenge.");
    console.log('🎬 [DEMO] Starting on home page, scrolling to show product variety');
    setCurrentPage('home');
    setSearchTerm(''); // Clear any search terms first
    await delay(3000);

    setCaption("Digital infrastructure is rapidly evolving, creating unprecedented opportunities for e-commerce growth.");
    await delay(3000);

    setCaption("This is LinkPNG. We are building the next generation of digital marketplace solutions.");
    
    // Show the homepage sections - scroll more to show all content
    await scrollDown(600); // Show categories and quick actions
    await delay(2000);
    await scrollDown(600); // Show products section
    await delay(2000);
    await scrollDown(600); // Show more products and flash sales
    await delay(2000);
    
    // Scroll to Flash Sale section where bilum bag is located 
    console.log('🎬 [DEMO] Scrolling to Flash Sale section where bilum bag is');
    window.scrollTo({ top: 400, behavior: 'smooth' }); // Scroll to Flash Sale section position
    await delay(2000);
    
    setCaption("We started by tackling accessibility. Our platform is built for everyone.");
    await delay(2000);
    
    setCaption("Watch.");
    await delay(1000);
    
    setCaption("With a simple voice command, our platform understands user intent, instantly connecting them to quality products from local artisans.");
    console.log('🎬 [DEMO] Setting search term to: bilum');
    await showCursorOnElement(document.querySelector('input[type="text"]') as HTMLElement);
    setSearchTerm('bilum');
    await delay(4000);
    
    setCaption("This isn't just a transaction. It's a connection to quality craftsmanship.");
    await delay(2000);
    
    setCaption("Here, customers can explore high-quality products, learn about the makers behind them, and purchase with confidence. We build trust through transparency.");
    console.log('🎬 [DEMO] Looking for product: Traditional Bilum Bag - Highlands Style');
    await findAndClickByText('h3', 'Traditional Bilum Bag - Highlands Style');
    await delay(3000);
    
    setCaption("We've obsessed over creating a frictionless experience. From adding to the cart...");
    console.log('🎬 [DEMO] Clicking Add to Cart button');
    await findAndClickByText('button', 'Add to Cart');
    await delay(3000);

    setCaption("...to a checkout process that embraces how people actually pay in emerging markets.");
    console.log('🎬 [DEMO] Navigating to cart');
    setCurrentPage('cart');
    await delay(3000);
    
    // Show cart contents
    await scrollDown(300);
    await delay(1500);
    
    console.log('🎬 [DEMO] Proceeding to checkout');
    setCurrentPage('checkout');
    await delay(2000);
    
    // Scroll to show payment options
    await scrollDown(400);
    setCaption("By integrating local mobile money services, we eliminate barriers, making e-commerce accessible to broader populations.");
    await delay(3000);
    
    // Mobile payment is already selected by default, no need to click
    console.log('🎬 [DEMO] Mobile payment already selected by default');
    
    setCaption("Confirming the order...");
    console.log('🎬 [DEMO] Placing order');
    await findAndClickByText('button', 'Place Order');
    await delay(3000);
    
    setCaption("And that trust is maintained even after the sale. Our detailed tracking system gives customers peace of mind, showing them every step of their product's journey.");
    console.log('🎬 [DEMO] Navigating to tracking page');
    setCurrentPage('tracking');
    await delay(3000);
    
    // Show the tracking timeline
    await scrollDown(400);
    await delay(2000);
    await scrollDown(400);
    await delay(3000);
    
    setCaption("We've solved the buyer's side of the equation. But to truly build the digital bridge, we had to empower the other side.");
    console.log('🎬 [DEMO] Act I completed successfully');
  }, [setCurrentPage, setSearchTerm]);

  const runActII = useCallback(async () => {
    console.log('🎬 [DEMO] Starting Act II - Seller Empowerment');
    
    setCaption("For many artisans and small business owners, technology adoption can be challenging. We believe getting your business online shouldn't be.");
    console.log('🎬 [DEMO] Navigating to become-seller page');
    setCurrentPage('become-seller');
    await delay(3000);
    
    // Show the seller benefits section
    await scrollDown(500);
    await delay(2000);
    await scrollDown(500);
    await delay(2000);
    
    setCaption("So, we streamlined it. You are about to see our entire seller onboarding... automated for efficiency.");
    console.log('🎬 [DEMO] Starting automated seller demo');
    await delay(2000);
    
    setCaption("Our system guides new sellers through every step. From basic registration... to shop setup... to listing their very first product... and configuring payments.");
    await startSellerDemo();
    await delay(3000);
    
    setCaption("We've turned a process that could take hours of confusion into a simple, guided journey.");
    await delay(2000);
    
    setCaption("And just like that, we've created a digital entrepreneur.");
    await delay(2000);
    
    setCaption("This is their command center. From here, they have complete control. We haven't just provided a listing; we've delivered a complete business solution. This is the engine of our platform. And this is how we scale.");
    console.log('🎬 [DEMO] Act II completed successfully');
  }, [setCurrentPage, startSellerDemo]);

  const runActIII = useCallback(async () => {
    console.log('🎬 [DEMO] Starting Act III - Platform Intelligence');
    
    setCaption("But a marketplace is only as strong as its quality. Now, let's look from an investor's perspective.");
    console.log('🎬 [DEMO] Logging out current user');
    logout();
    await delay(2000);
    console.log('🎬 [DEMO] Logging in as admin');
    login({ name: 'Admin User', role: 'admin' });
    await delay(1500);
    
    setCaption("This is the LinkPNG Admin Dashboard. Our mission control. Here, we ensure every seller meets our standards, maintaining the integrity of our platform.");
    console.log('🎬 [DEMO] Navigating to admin dashboard - using Next.js routing');
    router.push('/admin');
    await delay(3000);
    
    console.log('🎬 [DEMO] Clicking Moderation tab');
    await showCursorOnElement(document.querySelector('button') as HTMLElement);
    await findAndClickByText('button', 'Moderation');
    await delay(1500);
    console.log('🎬 [DEMO] Approving seller application');
    await showCursorOnElement(document.querySelector('button') as HTMLElement);
    await findAndClickByText('button', 'Approve');
    await delay(2000);

    setCaption("More importantly, this is where we turn data into intelligence. We have a real-time, bird's-eye view of our entire operation.");
    console.log('🎬 [DEMO] Switching to Analytics tab');
    await showCursorOnElement(document.querySelector('button') as HTMLElement);
    await findAndClickByText('button', 'Analytics');
    await delay(2000);
    
    setCaption("We track sales trends, identify popular categories, and visualize our market penetration across every province. This isn't just a platform; it's a data-driven enterprise.");
    // Show analytics charts and data
    await scrollDown(400);
    await delay(2000);
    await scrollDown(400);
    await delay(3000);
    
    setCaption("We are built for growth and accountability, with key data always ready for investor review.");
    console.log('🎬 [DEMO] Exporting data to CSV');
    await showCursorOnElement(document.querySelector('button') as HTMLElement);
    await findAndClickByText('button', 'Export to CSV');
    await delay(3000);
    
    setCaption("We have successfully built the core ecosystem: a product customers love, a platform sellers need, and an operation that is intelligent and scalable.");
    await delay(4000);
    
    setCaption("With your investment, we will expand this bridge... launching a dedicated driver network... and integrating AI-powered features to create the definitive Super-App for the region.");
    await delay(4000);
    
    setCaption("Join us, in building the future of commerce for Papua New Guinea.");
    await delay(3000);
    
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
      hideCursor(); // Clean up cursor indicators
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
