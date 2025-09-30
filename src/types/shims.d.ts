/* eslint-disable @typescript-eslint/no-explicit-any */
// Lightweight shims to make the editor/tsc happy in the dev container environment.
// These provide broad, permissive types for third-party packages and Deno URLs
// used in this repo; they remove TS errors produced when type packages aren't installed.

declare module 'react-query';
declare module 'react-lottie';
declare module 'react-toastify';
declare module 'canvas-confetti';
declare module '@react-three/fiber';

declare module 'next' {
  export type NextApiRequest = any;
  export type NextApiResponse = any;
}

// Local API helper shims (some components import ../api/* paths that are not present in TS path)
declare module '../api/ai-dashboard';
declare module '../api/feedback';
declare module '../api/science-explanation';

// Deno remote imports used for Supabase Edge Functions — provide minimal types
declare module 'https://deno.land/std@0.190.0/http/server.ts' {
  export function serve(handler: (req: any) => any): void;
}
declare module 'https://esm.sh/stripe@18.5.0' {
  const Stripe: any;
  export default Stripe;
}
declare module 'https://esm.sh/@supabase/supabase-js@2.57.2' {
  export function createClient(...args: any[]): any;
}

// Provide global Deno variable for type checking of supabase/functions files
declare const Deno: any;

// Allow arbitrary JSX intrinsic elements (useful for react-three-fiber usage)
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};

// Lightweight Next types for API route handlers used in this project.
declare module 'next' {
  export interface NextApiRequest {
    body?: any;
    headers: Record<string, string | undefined> & { 'content-type'?: string };
    method?: string | null;
    socket?: { remoteAddress?: string };
  }
  export interface NextApiResponse {
    status: (code: number) => NextApiResponse;
    json: (body: any) => NextApiResponse;
    setHeader: (name: string, value: string) => void;
  }
}
