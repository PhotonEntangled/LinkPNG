"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { delay, findAndClickByText, simulateTyping } from '@/lib/demo-utils';

// A more robust helper to find an element and then type into it.
const typeInto = async (selector: string, text: string) => {
    const element = document.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement;
    if (!element) {
        throw new Error(`Could not find element with selector: ${selector}`);
    }
    await simulateTyping(element, text);
};

const findAndClick = async (selector: string) => {
    const element = document.querySelector(selector) as HTMLElement;
    if (!element) {
        throw new Error(`Could not find element to click: ${selector}`);
    }
    element.click();
};

export function useAutomatedSellerDemo({ onComplete }: { onComplete?: () => void } = {}) {
    const { toast } = useToast();
    const router = useRouter();
    const [isRunning, setIsRunning] = useState(false);

    const DEMO_DATA = {
        fullName: "Sarah Johnson",
        email: "sarah.j.handmade@gmail.com",
        phone: "+6757123456",
        emailCode: "123456",
        phoneCode: "654321",
        businessName: "Handmade Creations Co",
        shopLongDescription: "Quality handwoven bags and traditional crafts made with sustainable materials and modern techniques.",
        productName: "Premium Handwoven Bag - Large",
        productPrice: "89",
        productCategory: "traditional-crafts",
        productDescription: "Durable handwoven bag perfect for daily use. Made with sustainable materials using traditional techniques.",
        bankName: "PNG Bank",
        configAccountNumber: "1234567890",
        shippingRate: "15",
        returnPolicy: "30-day returns accepted for unused items in original condition.",
        termsOfService: "Standard marketplace terms apply. Quality guaranteed on all handmade products."
    };

    const runFullSequence = useCallback(async () => {
        try {
            // Step 1: Navigate and start
            router.push('/become-seller');
            await delay(2000);
            await findAndClick('button[data-action="start-registration"]');
            await delay(2000);

            // Step 2: Fill main registration
            await findAndClick('[data-seller-type="individual"]');
            await typeInto("input[id='fullName']", DEMO_DATA.fullName);
            await typeInto("input[id='email']", DEMO_DATA.email);
            await typeInto("input[id='phone']", DEMO_DATA.phone);
            await findAndClickByText('button', 'Continue');
            await delay(2000);

            // Step 3: Fill verification codes
            const codeInputs = document.querySelectorAll("input[placeholder='Enter 6-digit code']");
            if (codeInputs.length < 2) throw new Error("Could not find verification inputs");
            await simulateTyping(codeInputs[0] as HTMLInputElement, DEMO_DATA.emailCode);
            await findAndClickByText('button', 'Verify');
            await delay(1000);
            await simulateTyping(codeInputs[1] as HTMLInputElement, DEMO_DATA.phoneCode);
            await findAndClickByText('button', 'Verify');
            await delay(1000);
            await findAndClickByText('button', 'Continue');
            await delay(2000);
            
            // Step 4: Onboarding - Shop Setup
            await typeInto("input[data-testid='shop-name-input']", DEMO_DATA.businessName);
            await typeInto("textarea[data-testid='shop-description-input']", DEMO_DATA.shopLongDescription);
            await findAndClickByText('button', 'Continue');
            await delay(2000);

            // Step 5: Onboarding - First Product
            await typeInto("input[data-testid='product-name-input']", DEMO_DATA.productName);
            await typeInto("input[data-testid='product-price-input']", DEMO_DATA.productPrice);
            await findAndClick('[data-testid="product-category-select"]');
            await delay(500);
            await findAndClick(`[data-value="${DEMO_DATA.productCategory}"]`);
            await typeInto("textarea[data-testid='product-description-input']", DEMO_DATA.productDescription);
            await findAndClickByText('button', 'Continue');
            await delay(2000);

            // Step 6: Onboarding - Configuration
            await typeInto("input[data-testid='bank-name-input']", DEMO_DATA.bankName);
            await typeInto("input[data-testid='account-number-input']", DEMO_DATA.configAccountNumber);
            await typeInto("input[data-testid='shipping-rate-input']", DEMO_DATA.shippingRate);
            await typeInto("textarea[data-testid='return-policy-input']", DEMO_DATA.returnPolicy);
            await typeInto("textarea[data-testid='terms-service-input']", DEMO_DATA.termsOfService);
            await findAndClickByText('button', 'Complete Setup');
            await delay(3000);

            toast({ title: "✅ Seller Demo Complete!" });
            onComplete?.();

        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred.";
            toast({ title: "❌ Demo Failed", description: message, variant: "destructive" });
        } finally {
            setIsRunning(false);
        }
    }, [router, toast, onComplete, DEMO_DATA]);

  const startDemo = () => {
        if (isRunning) return;
        setIsRunning(true);
        toast({ title: "🎬 Starting Seller Demo..." });
        runFullSequence();
    };
    
    // The hook now returns a promise-based startDemo for the orchestrator
    const startDemoPromise = useCallback(() => {
        return new Promise<void>((resolve) => {
            const onCompleteCallback = () => {
                resolve();
                if(onComplete) onComplete();
            };
            const demoHook = useAutomatedSellerDemo({ onComplete: onCompleteCallback });
            demoHook.startDemo();
        });
    }, [onComplete]);


    return { startDemo: startDemoPromise, isRunning };
}
