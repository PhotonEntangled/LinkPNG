// LinkPNG/packages/frontend/client/lib/demo-utils.ts
// Automation utilities for LinkPNG demos

export const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

export const scrollToSection = async (sectionId: string, behavior: 'smooth' | 'auto' = 'smooth'): Promise<void> => {
  console.log(`🎬 [DEMO-UTILS] Scrolling to section: ${sectionId}`);
  const element = document.getElementById(sectionId) || document.querySelector(sectionId);
  if (element) {
    element.scrollIntoView({ behavior, block: 'center' });
    console.log(`🎬 [DEMO-UTILS] Successfully scrolled to: ${sectionId}`);
  } else {
    console.warn(`🎬 [DEMO-UTILS] Section not found, scrolling down: ${sectionId}`);
    window.scrollBy({ top: 600, behavior });
  }
  await delay(1000); // Wait for scroll to complete
};

export const scrollDown = async (pixels: number = 600): Promise<void> => {
  console.log(`🎬 [DEMO-UTILS] Scrolling down ${pixels}px`);
  window.scrollBy({ top: pixels, behavior: 'smooth' });
  await delay(1000);
};

export const clickElement = async (selector: string): Promise<void> => {
  console.log(`🎬 [DEMO-UTILS] Attempting to click element: ${selector}`);
  const element = document.querySelector(selector) as HTMLElement;
  if (!element) {
    console.error(`🎬 [DEMO-UTILS] Element not found: ${selector}`);
    throw new Error(`Could not find element: ${selector}`);
  }
  console.log(`🎬 [DEMO-UTILS] Found element, clicking: ${selector}`);
  element.click();
  console.log(`🎬 [DEMO-UTILS] Successfully clicked: ${selector}`);
};

export const findAndClickByText = async (selector: string, text: string): Promise<void> => {
  console.log(`🎬 [DEMO-UTILS] Looking for element: ${selector} with text: "${text}"`);
  const elements = Array.from(document.querySelectorAll(selector)) as HTMLElement[];
  console.log(`🎬 [DEMO-UTILS] Found ${elements.length} elements matching selector: ${selector}`);
  
  if (elements.length > 0) {
    console.log(`🎬 [DEMO-UTILS] Available texts:`, elements.map(el => `"${el.textContent?.trim()}"`));
  }
  
  const element = elements.find(el => el.textContent?.trim().includes(text));
  if (!element) {
    console.error(`🎬 [DEMO-UTILS] Element not found: ${selector} with text "${text}"`);
    throw new Error(`Could not find element '${selector}' with text '${text}'`);
  }
  console.log(`🎬 [DEMO-UTILS] Found matching element, clicking: ${selector} with text "${text}"`);
  element.click();
  console.log(`🎬 [DEMO-UTILS] Successfully clicked: ${selector} with text "${text}"`);
};

export const typeText = async (selector: string, text: string): Promise<void> => {
  const element = document.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement;
  if (!element) {
    throw new Error(`Could not find input element: ${selector}`);
  }
  
  element.focus();
  let currentText = "";
  
  return new Promise((resolve) => {
    const typeInterval = setInterval(() => {
      if (currentText.length < text.length) {
        currentText = text.slice(0, currentText.length + 1);
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype, "value"
        )?.set;
        nativeInputValueSetter?.call(element, currentText);
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
      } else {
        clearInterval(typeInterval);
        element.blur();
        resolve();
      }
    }, 50 + Math.random() * 50);
  });
};

export const simulateTyping = (element: HTMLInputElement | HTMLTextAreaElement, text: string): Promise<void> => {
  return new Promise((resolve) => {
    element.focus();
    let currentText = "";
    const typeInterval = setInterval(() => {
      if (currentText.length < text.length) {
        currentText = text.slice(0, currentText.length + 1);
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
        nativeInputValueSetter?.call(element, currentText);
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
      } else {
        clearInterval(typeInterval);
        element.blur();
        resolve();
      }
    }, 50 + Math.random() * 50);
  });
};