// test/mocks/firebaseAuthMock.ts

import { vi } from 'vitest';

vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual<typeof import('firebase/auth')>('firebase/auth');
  return {
    ...actual,
    getAuth: vi.fn(() => ({
      currentUser: null,
    })),
    onAuthStateChanged: vi.fn((auth, callback) => {
      callback(null); // Simulate no authenticated user
      return () => {};
    }),
  };
});
