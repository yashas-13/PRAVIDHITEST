import { useStore } from '../store';
import { useScrollSpy } from '../hooks/useScrollSpy';

const sections = [
  { id: 'hero', label: 'Intro' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'services', label: 'Services' },
  { id: 'ai-services', label: 'AI Native' },
  { id: 'ai-employees', label: 'AI Employees' },
  { id: 'tech-niches', label: 'Tech Scale' },
  { id: 'awards', label: 'Awards' },
];

export default function SideNav() {
  const activeId = useScrollSpy(sections.map(s => s.id));
  const setCursorType = useStore((state) => state.setCursorType);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-5 items-end pointer-events-none">
      {sections.map((section) => {
        const isActive = activeId === section.id;
        
        return (
          <div 
            key={section.id}
            className="flex items-center justify-end gap-4 group pointer-events-auto cursor-none outline-none relative py-2 pl-12"
            onClick={() => scrollTo(section.id)}
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
            role="button"
            tabIndex={0}
          >
            {/* Label Tooltip */}
            <div className={`flex items-center overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] absolute right-6 pointer-events-none ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0'}`}>
              <span className={`text-[10px] font-mono uppercase tracking-widest whitespace-nowrap px-3 py-1.5 rounded-md backdrop-blur-md border flex items-center shadow-xl ${isActive ? 'bg-teal-500/10 text-teal-400 border-teal-500/30' : 'bg-black/60 text-zinc-300 border-white/10'}`}>
                {section.label}
              </span>
            </div>
            
            {/* Indicator Line */}
            <div className="w-1.5 relative flex justify-center items-center h-8">
              <div 
                className={`w-0.5 rounded-full transition-all duration-500 ease-in-out ${
                  isActive 
                    ? 'h-8 bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.8)]' 
                    : 'h-2 bg-zinc-700/50 group-hover:h-4 group-hover:bg-zinc-400'
                }`} 
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
