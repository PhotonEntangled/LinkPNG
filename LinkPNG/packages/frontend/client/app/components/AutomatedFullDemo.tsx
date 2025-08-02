// LinkPNG/packages/frontend/client/app/components/AutomatedFullDemo.tsx
"use client";

import { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
    
    // Scene 1.1: The Digital Marketplace (0:00 - 0:10)
    console.log('🎬 [DEMO] Scene 1.1: The Digital Marketplace');
    setCurrentPage('home');
    setSearchTerm(''); // Clear any search terms first
    await delay(500); // Let page load
    
    setCaption("In emerging markets worldwide, connecting local producers with customers has always been a challenge.");
    
    // Show the full homepage by scrolling
    await scrollDown(400); // Show categories
    await delay(3500);
    
    // Pause for 1s as per script
    setCaption(null);
    await delay(1000);
    
    setCaption("Digital infrastructure is rapidly evolving, creating unprecedented opportunities for e-commerce growth.");
    await scrollDown(400); // Show products
    await delay(3500);
    
    setCaption("This is LinkPNG. We are building the next generation of digital marketplace solutions.");
    await scrollDown(400); // Show more products
    await delay(3000);
    
    // Scene 1.2: Voice-Powered Discovery (0:11 - 0:18)
    console.log('🎬 [DEMO] Scene 1.2: Voice-Powered Discovery');
    
    // Scroll back to top for search
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await delay(1000);
    
    setCaption("We started by tackling accessibility. Our platform is built for everyone.");
    await delay(3000);
    
    // Slight pause as per script
    setCaption(null);
    await delay(500);
    
    setCaption("Watch.");
    await delay(1500);
    
    // Show voice search in action
    console.log('🎬 [DEMO] Demonstrating voice search with "bilum"');
    const searchInput = document.querySelector('input[type="text"]') as HTMLElement;
    if (searchInput) {
      await showCursorOnElement(searchInput);
      await delay(500);
    }
    setCaption("With a simple voice command, our platform understands user intent, instantly connecting them to quality products from local artisans.");
    setSearchTerm('bilum');
    await delay(4000);
    hideCursor(); // Hide cursor after search
    
    // Scene 1.3: Exploring the Marketplace (0:19 - 0:28)
    console.log('🎬 [DEMO] Scene 1.3: Exploring the Marketplace');
    setCaption("This isn't just a transaction. It's a connection to quality craftsmanship.");
    await delay(3000);
    
    setCaption("Here, customers can explore high-quality products, learn about the makers behind them, and purchase with confidence. We build trust through transparency.");
    console.log('🎬 [DEMO] Looking for product: Traditional Bilum Bag - Highlands Style');
    
    // Find and show cursor on the product before clicking
    const productElement = Array.from(document.querySelectorAll('h3')).find(el => 
      el.textContent?.includes('Traditional Bilum Bag - Highlands Style')
    ) as HTMLElement;
    
    if (productElement) {
      await showCursorOnElement(productElement);
      await delay(500);
      productElement.click();
      hideCursor();
    } else {
      console.error('🎬 [DEMO] Could not find bilum bag product');
    }
    await delay(6000);
    
    // Scene 1.4 & 1.5: Frictionless Checkout (0:29 - 0:41)
    console.log('🎬 [DEMO] Scene 1.4 & 1.5: Frictionless Checkout');
    setCaption("We've obsessed over creating a frictionless experience. From adding to the cart... to a checkout process that embraces how people actually pay in emerging markets.");
    console.log('🎬 [DEMO] Clicking Add to Cart button');
    
    const addToCartBtn = Array.from(document.querySelectorAll('button')).find(btn => 
      btn.textContent?.includes('Add to Cart')
    ) as HTMLElement;
    
    if (addToCartBtn) {
      await showCursorOnElement(addToCartBtn);
      await delay(500);
      addToCartBtn.click();
      hideCursor();
    }
    await delay(2000);
    
    console.log('🎬 [DEMO] Navigating to cart');
    setCurrentPage('cart');
    await delay(2000);
    
    console.log('🎬 [DEMO] Proceeding to checkout');
    setCurrentPage('checkout');
    await delay(2000);
    
    // Pause as mobile payment is selected - as per script
    setCaption(null);
    await delay(1000);
    
    setCaption("By integrating local mobile money services, we eliminate barriers, making e-commerce accessible to broader populations.");
    await delay(4000);
    
    console.log('🎬 [DEMO] Placing order');
    const placeOrderBtn = Array.from(document.querySelectorAll('button')).find(btn => 
      btn.textContent?.includes('Place Order')
    ) as HTMLElement;
    
    if (placeOrderBtn) {
      await showCursorOnElement(placeOrderBtn);
      await delay(500);
      placeOrderBtn.click();
      hideCursor();
    } else {
      console.error('🎬 [DEMO] Could not find Place Order button');
    }
    await delay(2000);
    
    // Scene 1.6: Transparency and Trust (0:42 - 0:52)
    console.log('🎬 [DEMO] Scene 1.6: Transparency and Trust');
    setCaption("And that trust is maintained even after the sale. Our detailed tracking system gives customers peace of mind, showing them every step of their product's journey.");
    console.log('🎬 [DEMO] Navigating to tracking page');
    setCurrentPage('tracking');
    await delay(2000);
    
    // Show the tracking timeline by scrolling down
    await scrollDown(600); // Show full tracking visualization
    await delay(3000);
    await scrollDown(400); // Show delivery details
    await delay(2000);
    
    setCaption("We've solved the buyer's side of the equation. But to truly build the digital bridge, we had to empower the other side.");
    await delay(4000);
    
    console.log('🎬 [DEMO] Act I completed successfully');
  }, [setCurrentPage, setSearchTerm]);

  const runActII = useCallback(async () => {
    console.log('🎬 [DEMO] Starting Act II - Seller Empowerment');
    
    // Scene 2.1: The Empowerment Engine (0:53 - 1:01)
    console.log('🎬 [DEMO] Scene 2.1: The Empowerment Engine');
    setCaption("For many artisans and small business owners, technology adoption can be challenging. We believe getting your business online shouldn't be.");
    console.log('🎬 [DEMO] Navigating to become-seller page');
    setCurrentPage('become-seller');
    await delay(4000);
    
    setCaption("So, we streamlined it. You are about to see our entire seller onboarding... automated for efficiency.");
    await delay(4000);
    
    // Scene 2.2 & 2.3: Guided, Automated Onboarding (1:02 - 1:20)
    console.log('🎬 [DEMO] Scene 2.2 & 2.3: Guided, Automated Onboarding');
    console.log('🎬 [DEMO] Starting automated seller demo');
    
    // Start the seller demo and show rapid onboarding narration
    const sellerDemoPromise = startSellerDemo();
    
    // Narration during the automated process
    setCaption("Our system guides new sellers through every step. From basic registration... to shop setup... to listing their very first product... and configuring payments.");
    await delay(6000);
    
    setCaption("We've turned a process that could take hours of confusion into a simple, guided journey.");
    
    // Wait for seller demo to complete
    await sellerDemoPromise;
    await delay(3000);
    
    // Scene 2.4 & 2.5: The Seller's New Reality (1:21 - 1:30)
    console.log('🎬 [DEMO] Scene 2.4 & 2.5: The Seller\'s New Reality');
    setCaption("And just like that, we've created a digital entrepreneur.");
    await delay(3000);
    
    setCaption("This is their command center. From here, they have complete control. We haven't just provided a listing; we've delivered a complete business solution. This is the engine of our platform. And this is how we scale.");
    await delay(6000);
    
    console.log('🎬 [DEMO] Act II completed successfully');
  }, [setCurrentPage, startSellerDemo]);

  const runActIII = useCallback(async () => {
    console.log('🎬 [DEMO] Starting Act III - Platform Intelligence');
    
    // Scene 3.1 & 3.2: Quality Control and Oversight (1:31 - 1:40)
    console.log('🎬 [DEMO] Scene 3.1 & 3.2: Quality Control and Oversight');
    setCaption("But a marketplace is only as strong as its quality. Now, let's look from an investor's perspective.");
    console.log('🎬 [DEMO] Logging out current user');
    logout();
    await delay(2000);
    console.log('🎬 [DEMO] Logging in as admin');
    login({ name: 'Admin User', role: 'admin' });
    await delay(2000);
    
    setCaption("This is the LinkPNG Admin Dashboard. Our mission control. Here, we ensure every seller meets our standards, maintaining the integrity of our platform.");
    console.log('🎬 [DEMO] Navigating to admin dashboard');
    router.push('/admin');
    await delay(3000);
    
    console.log('🎬 [DEMO] Clicking Moderation tab');
    const moderationBtn = Array.from(document.querySelectorAll('button')).find(btn => 
      btn.textContent?.includes('Moderation')
    ) as HTMLElement;
    
    if (moderationBtn) {
      await showCursorOnElement(moderationBtn);
      await delay(500);
      moderationBtn.click();
      hideCursor();
    }
    await delay(1500);
    
    console.log('🎬 [DEMO] Approving seller application');
    const approveBtn = Array.from(document.querySelectorAll('button')).find(btn => 
      btn.textContent?.includes('Approve')
    ) as HTMLElement;
    
    if (approveBtn) {
      await showCursorOnElement(approveBtn);
      await delay(500);
      approveBtn.click();
      hideCursor();
    }
    await delay(2500);

    // Scene 3.3: Data-Driven Insights (1:41 - 1:55)
    console.log('🎬 [DEMO] Scene 3.3: Data-Driven Insights');
    setCaption("More importantly, this is where we turn data into intelligence. We have a real-time, bird's-eye view of our entire operation. We track sales trends, identify popular categories, and visualize our market penetration across every province. This isn't just a platform; it's a data-driven enterprise.");
    console.log('🎬 [DEMO] Switching to Analytics tab');
    const analyticsBtn = Array.from(document.querySelectorAll('button')).find(btn => 
      btn.textContent?.includes('Analytics')
    ) as HTMLElement;
    
    if (analyticsBtn) {
      await showCursorOnElement(analyticsBtn);
      await delay(500);
      analyticsBtn.click();
      hideCursor();
    }
    await delay(2000);
    
    // Show analytics charts and data
    await scrollDown(400);
    await delay(3000);
    await scrollDown(400);
    await delay(3000);
    
    // Wait for the full narration to complete
    await delay(6000);
    
    // Scene 3.4 & 3.5: Investment-Ready Vision (1:56 - 2:15)
    console.log('🎬 [DEMO] Scene 3.4 & 3.5: Investment-Ready Vision');
    setCaption("We are built for growth and accountability, with key data always ready for investor review.");
    console.log('🎬 [DEMO] Exporting data to CSV');
    const exportBtn = Array.from(document.querySelectorAll('button')).find(btn => 
      btn.textContent?.includes('Export to CSV')
    ) as HTMLElement;
    
    if (exportBtn) {
      await showCursorOnElement(exportBtn);
      await delay(500);
      exportBtn.click();
      hideCursor();
    }
    await delay(3000);
    
    setCaption("We have successfully built the core ecosystem: a product customers love, a platform sellers need, and an operation that is intelligent and scalable.");
    await delay(5000);
    
    setCaption("With your investment, we will expand this bridge... launching a dedicated driver network... and integrating AI-powered features to create the definitive Super-App for the region.");
    await delay(6000);
    
    setCaption("Join us, in building the future of commerce for Papua New Guinea.");
    await delay(4000);
    
    // Music swells to finish - final pause
    setCaption(null);
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

      setCaption(null); // Clear caption at end
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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    return (
        <>
            <Button onClick={startFullDemo} disabled={isDemoRunning} variant="destructive" size="sm" className="gap-2">
                <Wand2 size={16} />
                {isDemoRunning ? 'Demo in Progress...' : 'Start Full E2E Demo'}
            </Button>
            {/* Render caption as a portal to ensure it appears at the bottom of the viewport */}
            {mounted && createPortal(
                <DemoCaption text={caption} />,
                document.body
            )}
        </>
    );
};
