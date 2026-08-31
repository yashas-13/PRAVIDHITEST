import { useCallback, useRef } from 'react';

// Global cache for prefetched API responses and module chunks to prevent duplicate network calls
export const prefetchCache = new Map<string, { data?: any; timestamp: number; loaded: boolean }>();

export type PrefetchTarget = 
  | 'insights-faq' 
  | 'TechnicalKnowledgeBase' 
  | 'deep-search' 
  | 'DeepSearchHub'
  | 'productised-services' 
  | 'threat-radar'
  | 'ai-services' 
  | 'ai-employees'
  | 'services'
  | string;

/**
 * Prefetches dynamic component code-split chunks & backend API data on hover/focus.
 */
export async function prefetchDataAndComponent(target: PrefetchTarget): Promise<void> {
  const normalized = target.toLowerCase().trim();

  // Return early if already in flight or successfully prefetched within the last 5 minutes
  const existing = prefetchCache.get(normalized);
  if (existing && Date.now() - existing.timestamp < 300000) {
    return;
  }

  // Mark in-flight
  prefetchCache.set(normalized, { timestamp: Date.now(), loaded: false });

  try {
    const tasks: Promise<any>[] = [];

    // 1. Prefetching for Technical Knowledge Base / Architectural FAQs
    if (normalized === 'insights-faq' || normalized === 'technicalknowledgebase') {
      // Chunk prefetch
      tasks.push(import('../components/TechnicalKnowledgeBase').catch(() => null));
      
      // API prefetch & cache warming
      tasks.push(
        fetch('/api/threat-radar/feed', { priority: 'low' } as any)
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data) {
              prefetchCache.set('api_threat_radar_feed', { data, timestamp: Date.now(), loaded: true });
            }
          })
          .catch(() => null)
      );
    }

    // 2. Prefetching for Deep Semantic Search & AdSense Keyword Hub
    if (normalized === 'deep-search' || normalized === 'deepsearchhub') {
      // Chunk prefetch
      tasks.push(import('../components/DeepSearchHub').catch(() => null));
      
      // API prefetch & cache warming for deep semantic search indexing
      tasks.push(
        fetch('/api/seo/deep-search', { priority: 'low' } as any)
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data) {
              prefetchCache.set('api_seo_deep_search', { data, timestamp: Date.now(), loaded: true });
            }
          })
          .catch(() => null)
      );
    }

    // 3. Prefetching for Threat Radar & Productised Services
    if (normalized === 'productised-services' || normalized === 'threat-radar') {
      tasks.push(
        fetch('/api/threat-radar/feed', { priority: 'low' } as any)
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data) {
              prefetchCache.set('api_threat_radar_feed', { data, timestamp: Date.now(), loaded: true });
            }
          })
          .catch(() => null)
      );
    }

    // 4. Prefetching for AI Services & AI Workforce
    if (normalized === 'ai-services') {
      tasks.push(import('../components/AiServices').catch(() => null));
    }
    if (normalized === 'ai-employees') {
      tasks.push(import('../components/AiEmployees').catch(() => null));
    }

    await Promise.allSettled(tasks);
    prefetchCache.set(normalized, { timestamp: Date.now(), loaded: true });
  } catch (err) {
    // Fail silently without blocking UI thread
    console.debug(`[Prefetch] Non-blocking prefetch failed for target: ${target}`, err);
  }
}

/**
 * Custom React hook that supplies prefetching capabilities for navigation links, buttons, and list items.
 */
export function usePrefetch() {
  const timeoutMap = useRef<Map<string, number>>(new Map());

  const handlePrefetch = useCallback((target: PrefetchTarget, delayMs: number = 20) => {
    if (!target) return;

    // Small debounce (20ms) to ensure cursor intent before triggering network/chunk load
    if (timeoutMap.current.has(target)) {
      window.clearTimeout(timeoutMap.current.get(target));
    }

    const timer = window.setTimeout(() => {
      prefetchDataAndComponent(target);
      timeoutMap.current.delete(target);
    }, delayMs);

    timeoutMap.current.set(target, timer);
  }, []);

  const cancelPrefetch = useCallback((target: PrefetchTarget) => {
    if (timeoutMap.current.has(target)) {
      window.clearTimeout(timeoutMap.current.get(target));
      timeoutMap.current.delete(target);
    }
  }, []);

  /**
   * Helper that generates hover & focus props for easy spreading into navigation JSX elements
   */
  const getPrefetchProps = useCallback((target: PrefetchTarget, delayMs: number = 20) => {
    return {
      onMouseEnter: () => handlePrefetch(target, delayMs),
      onFocus: () => handlePrefetch(target, delayMs),
      onMouseLeave: () => cancelPrefetch(target),
    };
  }, [handlePrefetch, cancelPrefetch]);

  return {
    prefetch: handlePrefetch,
    cancelPrefetch,
    getPrefetchProps,
    isPrefetched: (target: string) => {
      const entry = prefetchCache.get(target.toLowerCase().trim());
      return Boolean(entry?.loaded);
    }
  };
}

export default usePrefetch;
