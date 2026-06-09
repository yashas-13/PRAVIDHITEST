/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import ServicesBento from './components/ServicesBento';
import AiServices from './components/AiServices';
import TechnicalNiches from './components/TechnicalNiches';
import Awards from './components/Awards';
import SideNav from './components/SideNav';
import Footer from './components/Footer';

import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import GlobalCanvas from './components/ThreeModels/GlobalCanvas';

export default function App() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <SideNav />
      {/* Background 3D Canvas */}
      <GlobalCanvas />
      
      <SmoothScroll>
        <main className="relative min-h-screen font-sans w-full overflow-hidden z-20 origin-center">
          <Navbar />
          <Hero />
          <Philosophy />
          <ServicesBento />
          <AiServices />
          <TechnicalNiches />
          <Awards />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
