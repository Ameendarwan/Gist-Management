// Add support for the Fetch API
import 'whatwg-fetch';
import '@testing-library/jest-dom';

import { vi } from 'vitest';

// Silence the "Could not parse CSS stylesheet" error message which is a known issue when using
// the container query syntax
const originalConsoleError = console.error;

console.error = (message, ...optionalParams) => {
  if (message.includes('Could not parse CSS stylesheet')) {
    return;
  }
  originalConsoleError(message, ...optionalParams);
};

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('import.meta.env', {
  VITE_FIREBASE_API_KEY: 'test-api-key',
  VITE_FIREBASE_AUTH_DOMAIN: 'test-auth-domain',
  VITE_FIREBASE_PROJECT_ID: 'test-project-id',
  VITE_FIREBASE_STORAGE_BUCKET: 'test-storage-bucket',
  VITE_FIREBASE_MESSAGING_SENDER_ID: 'test-messaging-sender-id',
  VITE_FIREBASE_APP_ID: 'test-app-id',
});
