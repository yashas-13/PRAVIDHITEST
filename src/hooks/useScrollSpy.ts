import { useEffect, useState } from 'react';

export function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      // trigger when the element crosses the middle 20% of the screen.
      { rootMargin: '-40% 0px -40% 0px' } 
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [ids.join(',')]);

  return activeId;
}
