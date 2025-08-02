// LinkPNG/packages/frontend/client/lib/demo-utils.ts
// Automation utilities for LinkPNG demos

export const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

export const clickElement = async (selector: string): Promise<void> => {
  const element = document.querySelector(selector) as HTMLElement;
  if (!element) {
    throw new Error(`Could not find element: ${selector}`);
  }
  element.click();
};

export const findAndClickByText = async (selector: string, text: string): Promise<void> => {
  const elements = Array.from(document.querySelectorAll(selector)) as HTMLElement[];
  const element = elements.find(el => el.textContent?.trim().includes(text));
  if (!element) {
    throw new Error(`Could not find element '${selector}' with text '${text}'`);
  }
  element.click();
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