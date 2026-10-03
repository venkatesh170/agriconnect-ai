import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { AuthModal } from './components/layout/AuthModal';
import { HeroSection } from './components/landing/HeroSection';
import { CategoryGrid } from './components/landing/CategoryGrid';
import { FeaturedProducts } from './components/landing/FeaturedProducts';
import { WhyChooseUs } from './components/landing/WhyChooseUs';
import { AiShowcaseSection } from './components/landing/AiShowcaseSection';
import { FarmerSuccessStories } from './components/landing/FarmerSuccessStories';
import { ImpactStats } from './components/landing/ImpactStats';
import { WeatherAndCropCalendar } from './components/landing/WeatherAndCropCalendar';
import { TestimonialSection } from './components/landing/TestimonialSection';
import { FaqSection } from './components/landing/FaqSection';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { ProductDetailModal } from './components/marketplace/ProductDetailModal';
import { ProductCompareModal } from './components/marketplace/ProductCompareModal';
import { FarmMapView } from './components/maps/FarmMapView';
import { SubscriptionBoxes } from './components/subscriptions/SubscriptionBoxes';
import { CommunityForum } from './components/community/CommunityForum';
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderTrackingModal } from './components/checkout/OrderTrackingModal';
import { AgriBotAssistant } from './components/ai/AgriBotAssistant';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* LANDING VIEW */}
        {currentView === 'home' && (
          <>
            <HeroSection />
            <CategoryGrid />
            <FeaturedProducts />
            <WhyChooseUs />
            <AiShowcaseSection />
            <WeatherAndCropCalendar />
            <FarmerSuccessStories />
            <ImpactStats />
            <TestimonialSection />
            <FaqSection />
          </>
        )}

        {/* MARKETPLACE VIEW */}
        {currentView === 'marketplace' && <MarketplaceView />}

        {/* NEARBY FARMS MAP VIEW */}
        {currentView === 'maps' && <FarmMapView />}

        {/* SUBSCRIPTIONS VIEW */}
        {currentView === 'subscriptions' && <SubscriptionBoxes />}

        {/* COMMUNITY FORUM VIEW */}
        {currentView === 'community' && <CommunityForum />}

        {/* ROLE DASHBOARDS */}
        {currentView === 'farmer-studio' && <FarmerDashboard />}
        {currentView === 'customer-portal' && <CustomerDashboard />}
        {currentView === 'admin-control' && <AdminDashboard />}
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <ProductDetailModal />
      <ProductCompareModal />
      <CheckoutModal />
      <OrderTrackingModal />
      <AuthModal />

      {/* Floating AI Shopping Assistant */}
      <AgriBotAssistant />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
