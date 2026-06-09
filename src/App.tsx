/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
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
  const { scrollYProgress } = useScroll();
  
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      'rgba(0, 0, 0, 0.0)',
      'rgba(0, 0, 0, 0.2)',
      'rgba(0, 0, 0, 0.0)',
      'rgba(0, 0, 0, 0.3)',
      'rgba(0, 0, 0, 0.1)',
      'rgba(0, 0, 0, 0.5)'
    ]
  );

  return (
    <>
      <Preloader />
      <CustomCursor />
      <SideNav />
      <GlobalCanvas />
      
      <SmoothScroll>
        <motion.main 
          style={{ backgroundColor }}
          className="relative min-h-screen text-white font-sans w-full overflow-hidden z-20 origin-center"
        >
          <Navbar />
          <Hero />
          <Philosophy />
          <ServicesBento />
          <AiServices />
          <TechnicalNiches />
          <Awards />
          <Footer />
        </motion.main>
      </SmoothScroll>
    </>
  );
}
