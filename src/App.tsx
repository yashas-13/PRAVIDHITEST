/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import ServicesBento from './components/ServicesBento';
import SideNav from './components/SideNav';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import GlobalCanvas from './components/ThreeModels/GlobalCanvas';
import ScrollHint from './components/ScrollHint';
import SectionDivider from './components/SectionDivider';
import { LegalTab } from './components/LegalCenterModal';

// Code-split / Lazy-loaded below-the-fold modules for lightning-fast First Contentful Paint
const AiServices = lazy(() => import('./components/AiServices'));
const AiEmployees = lazy(() => import('./components/AiEmployees'));
const TechnicalNiches = lazy(() => import('./components/TechnicalNiches'));
const TechnicalKnowledgeBase = lazy(() => import('./components/TechnicalKnowledgeBase'));
const DeepSearchHub = lazy(() => import('./components/DeepSearchHub'));
const Awards = lazy(() => import('./components/Awards'));
const QualificationContact = lazy(() => import('./components/QualificationContact'));
const Footer = lazy(() => import('./components/Footer'));
const CookieConsent = lazy(() => import('./components/CookieConsent'));
const LegalCenterModal = lazy(() => import('./components/LegalCenterModal'));
const CommandCenter = lazy(() => import('./components/CommandCenter'));
const AssistantAgent = lazy(() => import('./components/AssistantAgent'));
const ExitIntentModal = lazy(() => import('./components/ExitIntentModal'));
const AdminPortalModal = lazy(() => import('./components/AdminPortalModal'));

// Lightweight placeholder for smooth streaming hydration
function SectionSkeleton() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto flex items-center justify-center opacity-40">
      <div className="w-8 h-8 rounded-full border-2 border-teal-400 border-t-transparent animate-spin" />
    </div>
  );
}

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [agentTriggerText, setAgentTriggerText] = useState("");
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('privacy');

  const handleOpenLegal = (tab: LegalTab = 'privacy') => {
    setLegalTab(tab);
    setIsLegalOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle search with '/' hotkey if no input element is active
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Preloader />
      <CustomCursor />
      <SideNav />
      <ScrollHint />
      {/* Background 3D Canvas */}
      <GlobalCanvas />
      
      <SmoothScroll>
        <main className="relative min-h-screen font-sans w-full overflow-hidden z-20 origin-center">
          <Navbar 
            onOpenSearch={() => setIsSearchOpen(true)} 
            onOpenLegal={handleOpenLegal}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
          <Hero />
          <SectionDivider />
          <Philosophy />
          <SectionDivider />
          <ServicesBento />
          <SectionDivider />

          <Suspense fallback={<SectionSkeleton />}>
            <AiServices />
            <SectionDivider />
            <AiEmployees />
            <SectionDivider />
            <TechnicalNiches />
            <SectionDivider />
            <TechnicalKnowledgeBase onOpenAdmin={() => setIsAdminOpen(true)} />
            <SectionDivider />
            <DeepSearchHub />
            <SectionDivider />
            <Awards />
            <SectionDivider />
            <QualificationContact />
            <SectionDivider />
            <Footer onOpenLegal={handleOpenLegal} onOpenAdmin={() => setIsAdminOpen(true)} />
          </Suspense>
        </main>
      </SmoothScroll>

      {/* Code-split Modals and Overlay Tools */}
      <Suspense fallback={null}>
        {/* Cookie Consent Banner */}
        <CookieConsent onOpenLegal={handleOpenLegal} />

        {/* AdSense Compliant Legal & Policy Center Modal */}
        <LegalCenterModal 
          isOpen={isLegalOpen} 
          onClose={() => setIsLegalOpen(false)} 
          initialTab={legalTab} 
        />

        {/* Low-Latency Real-Time Autocomplete Search Command Hub */}
        <CommandCenter 
          isOpen={isSearchOpen} 
          onClose={() => setIsSearchOpen(false)} 
          onSelectSuggestion={(topic) => setAgentTriggerText(topic)}
        />

        {/* Sovereign Knowledge Base & Zero-Day Threat Studio Admin Portal */}
        <AdminPortalModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />

        {/* Cybernetic High Performance Conversational Agent */}
        <AssistantAgent 
          inputTrigger={agentTriggerText} 
          onClearTrigger={() => setAgentTriggerText("")} 
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Exit-Intent High-Ticket Offer & Direct Principal Consultation Modal */}
        <ExitIntentModal />
      </Suspense>
    </>
  );
}
