declare global {
  interface Window {
    __SUPABASE_URL?: string;
    __SUPABASE_SERVICE_ROLE_KEY?: string;
  }
}

export {};
