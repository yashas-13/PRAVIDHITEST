import { useStore } from '../store';
import { useScrollSpy } from '../hooks/useScrollSpy';

const sections = [
  { id: 'hero', label: 'Intro' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'services', label: 'Services' },
  { id: 'ai-services', label: 'AI Native' },
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
            className="flex items-center gap-4 group pointer-events-auto cursor-none outline-none"
            onClick={() => scrollTo(section.id)}
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
            role="button"
            tabIndex={0}
          >
            {/* Label */}
            <span className={`text-[10px] font-mono uppercase tracking-widest transition-all duration-500 ease-out ${isActive ? 'text-teal-400 opacity-100 translate-x-0' : 'text-zinc-500 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`}>
              {section.label}
            </span>
            
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
