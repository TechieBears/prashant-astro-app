const PRODUCTION = false;

// EndPoints
const PRODUCTION_API_BASE_URL = 'https://prashant-astro-backend.vercel.app/api';
const DEVELOPMENT_API_BASE_URL = 'https://prashant-astro-backend.vercel.app/api';


// Export Config
export const BASE_URL = PRODUCTION ? PRODUCTION_API_BASE_URL : DEVELOPMENT_API_BASE_URL;