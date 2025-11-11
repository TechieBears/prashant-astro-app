import { PROD_BASE_URL, DEV_BASE_URL } from '@env';

const PRODUCTION = false;

// Export Config
export const BASE_URL = PRODUCTION ? PROD_BASE_URL : DEV_BASE_URL;