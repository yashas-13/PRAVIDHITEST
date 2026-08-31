export function isWebGLSupported(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = 
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext('experimental-webgl');
    
    if (!gl) return false;

    if (typeof (gl as WebGLRenderingContext).isContextLost === 'function' && (gl as WebGLRenderingContext).isContextLost()) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
