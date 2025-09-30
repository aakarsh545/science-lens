// Additional module declarations for packages used by the app but not installed
/* eslint-disable @typescript-eslint/no-explicit-any */
// Declarations for some runtime-only third-party libs used in the project.
// Prefer installing proper @types packages and removing these shims in CI.

declare module 'react-lottie' {
  const Lottie: any;
  export default Lottie;
}

declare module 'react-toastify' {
  // The library exports a `toast` function; `useToast` is not part of react-toastify's public API.
  export const toast: any;
  export default any;
}

declare module 'canvas-confetti' {
  const confetti: any;
  export default confetti;
}

declare module '@react-three/fiber' {
  export const Canvas: any;
  export default any;
}

// Local placeholder modules used in the app during development
declare module 'src/api/ai-dashboard' { const _default: any; export = _default }
declare module 'src/api/feedback' { const _default: any; export = _default }
declare module 'src/api/science-explanation' { const _default: any; export = _default }

// Next.js shim for API route types — keep these temporary and restore real types later
declare module 'next' {
  export type NextApiRequest = any;
  export type NextApiResponse = any;
}
