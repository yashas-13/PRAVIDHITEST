/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import ServicesBento from './components/ServicesBento';
import AiServices from './components/AiServices';
import AiEmployees from './components/AiEmployees';
import TechnicalNiches from './components/TechnicalNiches';
import Awards from './components/Awards';
import SideNav from './components/SideNav';
import Footer from './components/Footer';

import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import GlobalCanvas from './components/ThreeModels/GlobalCanvas';

import ScrollHint from './components/ScrollHint';
import SectionDivider from './components/SectionDivider';

import CommandCenter from './components/CommandCenter';
import AssistantAgent from './components/AssistantAgent';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [agentTriggerText, setAgentTriggerText] = useState("");

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
          <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
          <Hero />
          <SectionDivider />
          <Philosophy />
          <SectionDivider />
          <ServicesBento />
          <SectionDivider />
          <AiServices />
          <SectionDivider />
          <AiEmployees />
          <SectionDivider />
          <TechnicalNiches />
          <SectionDivider />
          <Awards />
          <SectionDivider />
          <Footer />
        </main>
      </SmoothScroll>

      {/* Low-Latency Real-Time Autocomplete Search Command Hub */}
      <CommandCenter 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onSelectSuggestion={(topic) => setAgentTriggerText(topic)}
      />

      {/* Cybernetic High Performance Conversational Agent */}
      <AssistantAgent 
        inputTrigger={agentTriggerText} 
        onClearTrigger={() => setAgentTriggerText("")} 
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </>
  );
}
