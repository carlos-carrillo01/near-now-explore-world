
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import EventsSection from '../components/EventsSection';
import ArtScanSection from '../components/ArtScanSection';
import AchievementsSection from '../components/AchievementsSection';
import CommunitySection from '../components/CommunitySection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ScanModal from '../components/ScanModal';

const Index = () => {
  const [showScanModal, setShowScanModal] = useState(false);

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <EventsSection />
        <ArtScanSection onOpenScan={() => setShowScanModal(true)} />
        <AchievementsSection />
        <CommunitySection />
        <ContactSection />
      </main>
      <Footer />
      <ScanModal 
        isOpen={showScanModal} 
        onClose={() => setShowScanModal(false)} 
      />
    </div>
  );
};

export default Index;
