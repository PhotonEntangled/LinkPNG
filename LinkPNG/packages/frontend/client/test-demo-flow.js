// Test script to verify demo flow
// Run this in the browser console while on the LinkPNG site

async function testDemoFlow() {
  console.log('🧪 Testing Demo Flow...');
  
  // Test 1: Check if captions are visible
  console.log('Test 1: Checking caption visibility...');
  const captionElement = document.querySelector('[class*="fixed bottom-4"]');
  if (captionElement) {
    console.log('✅ Caption element found:', captionElement);
    console.log('Caption visible:', window.getComputedStyle(captionElement).display !== 'none');
  } else {
    console.log('❌ No caption element found');
  }
  
  // Test 2: Check for bilum product
  console.log('\nTest 2: Searching for bilum product...');
  const bilumProduct = Array.from(document.querySelectorAll('h3')).find(el => 
    el.textContent?.includes('Traditional Bilum Bag - Highlands Style')
  );
  if (bilumProduct) {
    console.log('✅ Bilum product found:', bilumProduct.textContent);
  } else {
    console.log('❌ Bilum product not found');
    console.log('Available products:');
    document.querySelectorAll('h3').forEach(h3 => console.log('-', h3.textContent));
  }
  
  // Test 3: Check buttons on product page
  console.log('\nTest 3: Checking product page buttons...');
  const buttons = Array.from(document.querySelectorAll('button'));
  console.log('Found buttons:');
  buttons.forEach(btn => {
    if (btn.textContent?.trim()) {
      console.log('-', btn.textContent.trim());
    }
  });
  
  // Test 4: Check for checkout button text
  console.log('\nTest 4: Looking for checkout button...');
  const checkoutButtons = buttons.filter(btn => 
    btn.textContent?.toLowerCase().includes('order') || 
    btn.textContent?.toLowerCase().includes('checkout')
  );
  if (checkoutButtons.length > 0) {
    console.log('✅ Checkout-related buttons found:');
    checkoutButtons.forEach(btn => console.log('-', btn.textContent));
  } else {
    console.log('❌ No checkout/order buttons found');
  }
}

// Run the test
testDemoFlow();