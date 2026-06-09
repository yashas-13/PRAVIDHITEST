import { motion } from 'motion/react';
import { useStore } from '../store';
import { useScrollSpy } from '../hooks/useScrollSpy';

const navLinks = [
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'services', label: 'Services' },
  { id: 'ai-services', label: 'AI Native' },
  { id: 'tech-niches', label: 'Tech Scale' },
];

export default function Navbar() {
  const setCursorType = useStore((state) => state.setCursorType);
  const activeId = useScrollSpy(navLinks.map(l => l.id));

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-black/50 border-b border-zinc-800"
    >
      <div 
        className="font-bold text-xl tracking-tighter"
        onMouseEnter={() => setCursorType('pointer')}
        onMouseLeave={() => setCursorType('default')}
      >
        PRAVIDHI<span className="text-teal-400">.</span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400 relative">
        {navLinks.map(link => (
          <a 
            key={link.id}
            href={`#${link.id}`} 
            className={`transition-colors relative py-1 ${activeId === link.id ? 'text-teal-400 font-bold' : 'hover:text-white'}`}
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
          >
            {link.label}
            {activeId === link.id && (
              <motion.div
                layoutId="nav-underline"
                className="absolute left-0 right-0 -bottom-1 h-px bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.8)]"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </a>
        ))}
      </div>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-5 py-2 bg-white text-black text-sm font-semibold rounded-full hidden md:block hover:bg-neutral-200 transition-colors"
        onMouseEnter={() => setCursorType('pointer')}
        onMouseLeave={() => setCursorType('default')}
      >
        Contact Us
      </motion.button>
    </motion.nav>
  );
}
