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
      'rgba(0, 0, 0, 0.2)',
      'rgba(18, 30, 15, 0.4)',
      'rgba(30, 20, 5, 0.5)',
      'rgba(10, 5, 20, 0.5)',
      'rgba(30, 30, 30, 0.5)',
      'rgba(0, 0, 0, 0.4)'
    ]
  );

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      'inset(0% 0% 0% 0%)',
      'inset(2% 2% 2% 2% round 40px)',
      'inset(5% 0% 5% 0%)',
      'inset(0% 4% 0% 4% round 60px)',
      'inset(2% 1% 2% 1% round 20px)',
      'inset(0% 0% 0% 0%)'
    ]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [1, 0.98, 1.02, 0.95, 0.98, 1]
  );

  return (
    <>
      <Preloader />
      <CustomCursor />
      <GlobalCanvas />
      
      <SmoothScroll>
        <motion.main 
          style={{ backgroundColor, clipPath, scale }}
          className="relative min-h-screen text-white font-sans selection:bg-teal-500/30 w-full overflow-hidden z-20 transition-colors duration-1000 origin-center"
        >
          <Navbar />
          <Hero />
          <Philosophy />
          <ServicesBento />
          <AiServices />
          <TechnicalNiches />
          <Footer />
        </motion.main>
      </SmoothScroll>
    </>
  );
}
