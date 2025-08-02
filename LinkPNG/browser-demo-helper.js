// LinkPNG Demo Helper Script
// Copy and paste this into your browser console while recording the demo

window.DemoHelper = {
  // Quick navigation functions
  goToHome: () => window.location.href = '/',
  goToCart: () => window.location.href = '/cart',
  goToCheckout: () => window.location.href = '/checkout',
  goToBecomeSeller: () => window.location.href = '/become-seller',
  goToSeller: () => window.location.href = '/seller',
  goToAdmin: () => window.location.href = '/admin',
  
  // Check current cart count
  checkCartCount: () => {
    const cartBadge = document.querySelector('span.bg-png-red');
    if (cartBadge) {
      console.log('✅ Cart count:', cartBadge.textContent);
      return cartBadge.textContent;
    } else {
      console.log('❌ No cart badge found');
      return 0;
    }
  },
  
  // Verify key elements are present
  checkElements: () => {
    const checks = [
      { name: 'Cart Icon', selector: '[data-testid="cart"], .shopping-cart, svg' },
      { name: 'Search Bar', selector: 'input[type="text"], input[placeholder*="Search"]' },
      { name: 'Add to Cart Button', selector: 'button:contains("Add to Cart"), button[class*="cart"]' },
      { name: 'Navigation Menu', selector: 'nav, [role="navigation"]' }
    ];
    
    checks.forEach(check => {
      const element = document.querySelector(check.selector);
      console.log(element ? '✅' : '❌', check.name, element ? 'found' : 'NOT FOUND');
    });
  },
  
  // Highlight cart for visual confirmation
  highlightCart: () => {
    const cartElements = document.querySelectorAll('*[class*="cart"], *[data-testid*="cart"]');
    cartElements.forEach(el => {
      el.style.border = '3px solid red';
      el.style.boxShadow = '0 0 10px red';
    });
    console.log('🔴 Cart elements highlighted in red');
    
    // Remove highlight after 3 seconds
    setTimeout(() => {
      cartElements.forEach(el => {
        el.style.border = '';
        el.style.boxShadow = '';
      });
      console.log('✅ Highlights removed');
    }, 3000);
  },
  
  // Test add to cart functionality
  testAddToCart: () => {
    const addToCartBtn = Array.from(document.querySelectorAll('button')).find(btn => 
      btn.textContent?.includes('Add to Cart')
    );
    
    if (addToCartBtn) {
      console.log('✅ Found Add to Cart button:', addToCartBtn);
      
      // Get current cart count
      const beforeCount = DemoHelper.checkCartCount();
      
      // Click the button
      addToCartBtn.click();
      
      // Check cart count after a delay
      setTimeout(() => {
        const afterCount = DemoHelper.checkCartCount();
        console.log(`📊 Cart count changed: ${beforeCount} → ${afterCount}`);
        
        if (afterCount > beforeCount) {
          console.log('✅ Add to cart working!');
          DemoHelper.highlightCart();
        } else {
          console.log('❌ Cart count did not increase');
        }
      }, 1000);
      
    } else {
      console.log('❌ Add to Cart button not found');
    }
  },
  
  // Search for products
  searchProduct: (term = 'bilum') => {
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
      searchInput.value = term;
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      console.log(`🔍 Searched for: ${term}`);
    } else {
      console.log('❌ Search input not found');
    }
  },
  
  // Get all available buttons on page
  listButtons: () => {
    const buttons = Array.from(document.querySelectorAll('button'));
    console.log('🔘 Available buttons:');
    buttons.forEach((btn, index) => {
      const text = btn.textContent?.trim();
      if (text) {
        console.log(`${index + 1}. "${text}"`);
      }
    });
  },
  
  // Check for any console errors
  checkForErrors: () => {
    const errors = window.console._commandLineAPI?.getEventListeners?.(window) || [];
    console.log('🔍 Checking for JavaScript errors...');
    
    // Override console.error to catch future errors
    const originalError = console.error;
    window._demoErrors = [];
    
    console.error = function(...args) {
      window._demoErrors.push(args);
      originalError.apply(console, args);
    };
    
    console.log('✅ Error monitoring active. Check window._demoErrors for any issues.');
  },
  
  // Show help
  help: () => {
    console.log(`
🚀 LinkPNG Demo Helper Commands:

Navigation:
  DemoHelper.goToHome()          - Go to homepage
  DemoHelper.goToCart()          - Go to cart page
  DemoHelper.goToCheckout()      - Go to checkout
  DemoHelper.goToBecomeSeller()  - Go to seller registration
  DemoHelper.goToSeller()        - Go to seller dashboard
  DemoHelper.goToAdmin()         - Go to admin dashboard

Testing:
  DemoHelper.checkCartCount()    - Check current cart count
  DemoHelper.testAddToCart()     - Test add to cart functionality
  DemoHelper.checkElements()     - Verify key elements exist
  DemoHelper.highlightCart()     - Highlight cart elements
  DemoHelper.searchProduct('bilum') - Search for products
  DemoHelper.listButtons()       - List all buttons on page
  DemoHelper.checkForErrors()    - Monitor for JavaScript errors

Utilities:
  DemoHelper.help()              - Show this help message
    `);
  }
};

// Auto-run initial checks
console.log('🚀 LinkPNG Demo Helper Loaded!');
console.log('Type DemoHelper.help() for available commands');
DemoHelper.checkElements();
DemoHelper.checkCartCount();