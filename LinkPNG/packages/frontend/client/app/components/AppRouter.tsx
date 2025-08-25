"use client"

import { useApp } from "../hooks/useApp";
import dynamic from 'next/dynamic';

// Dynamically import all page components for code splitting and to avoid bundling issues
const HomePage = dynamic(() => import('./HomePage'));
const SearchPage = dynamic(() => import('./SearchPage'));
const ProductDetailPage = dynamic(() => import('./ProductDetailPage'));
const CartPage = dynamic(() => import('./CartPage'));
const CheckoutPage = dynamic(() => import('./CheckoutPage'));
const ConfirmationPage = dynamic(() => import('./ConfirmationPage'));
const TrackingPage = dynamic(() => import('./TrackingPage'));
const SellerDashboard = dynamic(() => import('../seller/page'));
const WalletPage = dynamic(() => import('./WalletPage'));
const FinancialServicesPage = dynamic(() => import('./FinancialServicesPage'));
const BillPaymentsPage = dynamic(() => import('./BillPaymentsPage'));
const RideHailingPage = dynamic(() => import('./RideHailingPage'));
const HyperlocalDeliveryPage = dynamic(() => import('./HyperlocalDeliveryPage'));


const pageComponents: { [key: string]: React.ComponentType } = {
  home: HomePage,
  search: SearchPage,
  product: ProductDetailPage,
  cart: CartPage,
  checkout: CheckoutPage,
  confirmation: ConfirmationPage,
  "seller-dashboard": SellerDashboard,
  "become-seller": SellerDashboard, // Re-route to dashboard for demo
  tracking: TrackingPage,
  wallet: WalletPage,
  "financial-services": FinancialServicesPage,
  "bill-payments": BillPaymentsPage,
  "ride-hailing": RideHailingPage,
  "hyperlocal-delivery": HyperlocalDeliveryPage,
};

export default function AppRouter() {
  const { currentPage } = useApp();
  const CurrentPageComponent = pageComponents[currentPage] || HomePage;

  return (
    <>
      <CurrentPageComponent />
    </>
  );
}
