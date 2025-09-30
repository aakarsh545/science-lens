// Additional module declarations for packages used by the app but not installed
declare module 'react-query' {
  export const useQuery: any;
  export const useMutation: any;
  export default any;
}

declare module 'react-lottie' {
  const Lottie: any;
  export default Lottie;
}

declare module 'react-toastify' {
  export const toast: any;
  export function useToast(...args: any[]): any;
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

// Local API modules referenced by components but not present as TS modules
declare module '../api/ai-dashboard' { const _default: any; export = _default }
declare module '../api/feedback' { const _default: any; export = _default }
declare module '../api/science-explanation' { const _default: any; export = _default }

// Next.js shim
declare module 'next' {
  export type NextApiRequest = any;
  export type NextApiResponse = any;
}
