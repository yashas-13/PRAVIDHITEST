// Safe guard WebGL getContextAttributes against null return values in sandboxed/restricted iframe environments
if (typeof window !== 'undefined') {
  if (typeof WebGLRenderingContext !== 'undefined' && WebGLRenderingContext.prototype) {
    const origGetAttrs1 = WebGLRenderingContext.prototype.getContextAttributes;
    WebGLRenderingContext.prototype.getContextAttributes = function () {
      try {
        const attrs = origGetAttrs1 ? origGetAttrs1.call(this) : null;
        if (attrs) return attrs;
      } catch (e) {
        // ignore
      }
      return {
        alpha: true,
        depth: true,
        stencil: false,
        antialias: false,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
        desynchronized: false
      };
    };
  }

  if (typeof WebGL2RenderingContext !== 'undefined' && WebGL2RenderingContext.prototype) {
    const origGetAttrs2 = WebGL2RenderingContext.prototype.getContextAttributes;
    WebGL2RenderingContext.prototype.getContextAttributes = function () {
      try {
        const attrs = origGetAttrs2 ? origGetAttrs2.call(this) : null;
        if (attrs) return attrs;
      } catch (e) {
        // ignore
      }
      return {
        alpha: true,
        depth: true,
        stencil: false,
        antialias: false,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
        desynchronized: false
      };
    };
  }
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

