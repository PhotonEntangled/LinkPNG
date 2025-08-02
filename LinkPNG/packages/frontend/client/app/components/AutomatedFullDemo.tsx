// LinkPNG/packages/frontend/client/app/components/AutomatedFullDemo.tsx
"use client";

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAutomatedSellerDemo } from './AutomatedSellerDemo';
import { toast as showToast } from "@/components/ui/use-toast";
import { useDemoMode } from '../context/DemoModeContext';

// --- Helper Utilities for Automation ---
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const clickElement = async (selector: string, index = 0) => {
  await delay(1000);
  const elements = document.querySelectorAll(selector);
  const element = elements[index] as HTMLElement;
  if (element) {
    element.click();
  } else {
    throw new Error(`Element not found: ${selector}`);
  }
};

const findAndClickByText = async (selector: string, text: string) => {
    await delay(1000);
    const elements = Array.from(document.querySelectorAll(selector)) as HTMLElement[];
    const element = elements.find(el => el.textContent?.trim() === text);
    if (element) {
      element.click();
    } else {
      throw new Error(`Element with text not found: ${text}`);
    }
  };

const typeText = async (selector: string, text: string, index = 0) => {
    await delay(500);
    const elements = document.querySelectorAll(selector);
    const element = elements[index] as HTMLInputElement;
    if (!element) throw new Error(`Input element not found: ${selector}`);
    
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
    if (!nativeInputValueSetter) throw new Error("Cannot find native value setter");

    for (let i = 0; i < text.length; i++) {
      nativeInputValueSetter.call(element, text.substring(0, i + 1));
      element.dispatchEvent(new Event('input', { bubbles: true }));
      await delay(50 + Math.random() * 50);
    }
};

// --- Automation Hook ---
const useFullDemoAutomation = () => {
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const router = useRouter();
  const { login, logout } = useDemoMode();
  
  const sellerDemo = useAutomatedSellerDemo({ onComplete: () => {} });

  const runActI = useCallback(async () => {
    showToast({ title: "Act I: The Buyer's Journey", description: "Simulating user discovery and purchase." });
    
    router.push('/search?query=bilum');
    await delay(2000);
    await findAndClickByText('h3', 'Traditional Highland Bilum - Large');
    await delay(2000);
    await findAndClickByText('button', 'Add to Cart');
    await delay(1500);
    await clickElement('a[href="/cart"]');
    await delay(2000);
    await findAndClickByText('button', 'Proceed to Checkout');
    await delay(2000);
    const miCashRadio = document.querySelector('input[value="mobile"]') as HTMLInputElement;
    if(miCashRadio) miCashRadio.click();
    else throw new Error('MiCash payment option not found');
    await delay(1000);
    await findAndClickByText('button', 'Confirm and Pay');
    await delay(3000);
    await findAndClickByText('a', 'View Order Details');
    await delay(3000);
  }, [router]);

  const runActII = useCallback(async () => {
    showToast({ title: "Act II: The Seller's Journey", description: "Automating the seller onboarding process." });
    router.push('/become-seller');
    await delay(2000);
    return sellerDemo.startDemo();
  }, [router, sellerDemo]);

  const runActIII = useCallback(async () => {
    showToast({ title: "Act III: The Admin's Journey", description: "Demonstrating platform oversight and intelligence." });
    
    logout();
    await delay(1500);
    
    // Simulate admin login
    login({ name: 'Admin User', role: 'admin' });
    await delay(1000);

    router.push('/admin');
    await delay(2000);
    await findAndClickByText('button', 'Moderation');
    await delay(1500);
    await findAndClickByText('button', 'Approve');
    await delay(2000);

    await findAndClickByText('button', 'Analytics');
    await delay(3000);
    await findAndClickByText('button', 'Export to CSV');
    await delay(2000);
  }, [logout, login, router]);


  const startFullDemo = async () => {
    if (isDemoRunning) return;
    setIsDemoRunning(true);
    showToast({ title: "Starting Full End-to-End Demo", description: "Please do not interact with the page." });

    try {
      logout();
      await delay(1000);
      router.push('/');
      await delay(1000);

      await runActI();
      await runActII();
      await runActIII();

      showToast({ title: "Full Demo Complete!", variant: "default" }); // Corrected variant

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      showToast({ title: "Demo Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsDemoRunning(false);
    }
  };

  return { startFullDemo, isDemoRunning };
};

export const AutomatedFullDemo = () => {
  const { startFullDemo, isDemoRunning } = useFullDemoAutomation();

  return (
    <Button onClick={startFullDemo} disabled={isDemoRunning} variant="destructive" size="sm" className="gap-2">
      <Wand2 size={16} />
      {isDemoRunning ? 'Demo in Progress...' : 'Start Full E2E Demo'}
    </Button>
  );
};
