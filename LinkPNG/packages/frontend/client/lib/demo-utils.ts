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

// Cursor indicator for demo
export const showCursor = async (selector: string): Promise<void> => {
  console.log(`🎬 [DEMO-UTILS] Showing cursor at: ${selector}`);
  
  // Remove any existing cursor indicators
  const existingCursors = document.querySelectorAll('.demo-cursor');
  existingCursors.forEach(cursor => cursor.remove());
  
  const element = document.querySelector(selector) as HTMLElement;
  if (!element) {
    console.warn(`🎬 [DEMO-UTILS] Element not found for cursor: ${selector}`);
    return;
  }
  
  // Create cursor indicator
  const cursor = document.createElement('div');
  cursor.className = 'demo-cursor';
  cursor.innerHTML = '👆';
  cursor.style.cssText = `
    position: absolute;
    z-index: 9999;
    font-size: 24px;
    pointer-events: none;
    animation: bounce 0.5s ease-in-out infinite alternate;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
  `;
  
  // Add bounce animation
  if (!document.getElementById('demo-cursor-styles')) {
    const style = document.createElement('style');
    style.id = 'demo-cursor-styles';
    style.textContent = `
      @keyframes bounce {
        0% { transform: translateY(0px); }
        100% { transform: translateY(-10px); }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Position cursor above element
  const rect = element.getBoundingClientRect();
  cursor.style.left = (rect.left + rect.width / 2 - 12) + 'px';
  cursor.style.top = (rect.top - 40 + window.scrollY) + 'px';
  
  document.body.appendChild(cursor);
  
  // Auto-remove after 2 seconds
  setTimeout(() => {
    if (cursor.parentNode) {
      cursor.remove();
    }
  }, 2000);
};

export const hideCursor = (): void => {
  const cursors = document.querySelectorAll('.demo-cursor');
  cursors.forEach(cursor => cursor.remove());
};

export const clickElement = async (selector: string): Promise<void> => {
  console.log(`🎬 [DEMO-UTILS] Attempting to click element: ${selector}`);
  await showCursor(selector);
  await delay(1500); // Show cursor before clicking
  
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
  
  // Show cursor before clicking
  await showCursorOnElement(element);
  await delay(1500);
  
  console.log(`🎬 [DEMO-UTILS] Found matching element, clicking: ${selector} with text "${text}"`);
  element.click();
  console.log(`🎬 [DEMO-UTILS] Successfully clicked: ${selector} with text "${text}"`);
};

// Helper function to show cursor on a specific element
export const showCursorOnElement = async (element: HTMLElement): Promise<void> => {
  // Remove any existing cursor indicators
  const existingCursors = document.querySelectorAll('.demo-cursor');
  existingCursors.forEach(cursor => cursor.remove());
  
  // Create cursor indicator
  const cursor = document.createElement('div');
  cursor.className = 'demo-cursor';
  cursor.innerHTML = '👆';
  cursor.style.cssText = `
    position: absolute;
    z-index: 9999;
    font-size: 24px;
    pointer-events: none;
    animation: bounce 0.5s ease-in-out infinite alternate;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
  `;
  
  // Add bounce animation
  if (!document.getElementById('demo-cursor-styles')) {
    const style = document.createElement('style');
    style.id = 'demo-cursor-styles';
    style.textContent = `
      @keyframes bounce {
        0% { transform: translateY(0px); }
        100% { transform: translateY(-10px); }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Position cursor above element
  const rect = element.getBoundingClientRect();
  cursor.style.left = (rect.left + rect.width / 2 - 12) + 'px';
  cursor.style.top = (rect.top - 40 + window.scrollY) + 'px';
  
  document.body.appendChild(cursor);
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    if (cursor.parentNode) {
      cursor.remove();
    }
  }, 3000);
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