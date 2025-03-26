import '../../tests/mocks';

import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { User, onAuthStateChanged } from 'firebase/auth';
import { act, renderHook } from '@testing-library/react';
import useAuthListener, { ExtendedUser } from './useAuthListener';

describe('useAuthListener', () => {
  let mockUser: ExtendedUser;

  beforeEach(() => {
    mockUser = {
      uid: 'test-uid',
      email: 'test@example.com',
      reloadUserInfo: {
        screenName: 'testUser',
      },
    } as ExtendedUser;
  });

  it('should return loading initially', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let callbackFn: (user: User | null) => void;

    (onAuthStateChanged as Mock).mockImplementation((_auth, callback) => {
      callbackFn = callback;
      return vi.fn();
    });

    const { result } = renderHook(() => useAuthListener());

    expect(result.current.loading).toBe(true);
  });

  it('should update user and set loading to false when auth state changes', async () => {
    let callbackFn: (user: User | null) => void;
    (onAuthStateChanged as Mock).mockImplementation((_auth, callback) => {
      callbackFn = callback;
      return vi.fn();
    });

    const { result } = renderHook(() => useAuthListener());

    expect(result.current.loading).toBe(true);

    act(() => {
      callbackFn(mockUser);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loading).toBe(false);
  });

  it('should handle user sign out correctly', async () => {
    let callbackFn: (user: User | null) => void;
    (onAuthStateChanged as Mock).mockImplementation((_auth, callback) => {
      callbackFn = callback;
      return vi.fn();
    });

    const { result } = renderHook(() => useAuthListener());

    act(() => {
      callbackFn(null);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});
