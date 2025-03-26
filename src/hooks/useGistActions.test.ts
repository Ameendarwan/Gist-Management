import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { toast } from 'sonner';
import { useGistActions } from './useGistActions';

const mockStarGist = vi.fn();
const mockForkGist = vi.fn();
const mockUseStarGistMutation = vi.fn(() => [mockStarGist, { isLoading: false }]);
const mockUseForkGistMutation = vi.fn(() => [mockForkGist, { isLoading: false }]);

vi.mock('@app/store/apis/gist', () => ({
  useStarGistMutation: () => mockUseStarGistMutation(),
  useForkGistMutation: () => mockUseForkGistMutation(),
}));

vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useGistActions', () => {
  it('should handle starring a gist successfully', async () => {
    mockStarGist.mockResolvedValueOnce({ unwrap: vi.fn().mockResolvedValue({}) });
    const { result } = renderHook(() => useGistActions());

    await act(async () => {
      await result.current.handleStarGist('123');
    });

    expect(mockStarGist).toHaveBeenCalledWith({ gistId: '123' });
  });

  it('should handle starring a gist failure', async () => {
    mockStarGist.mockRejectedValueOnce(new Error('Failed to star gist'));
    const { result } = renderHook(() => useGistActions());

    await act(async () => {
      await result.current.handleStarGist('123');
    });

    expect(result.current.error).toBe('Failed to star gist.');
    expect(toast.error).toHaveBeenCalledWith('Failed to star gist');
  });

  it('should handle forking a gist successfully', async () => {
    mockForkGist.mockResolvedValueOnce({ unwrap: vi.fn().mockResolvedValue({}) });
    const { result } = renderHook(() => useGistActions());

    await act(async () => {
      await result.current.handleForkGist('123');
    });

    expect(mockForkGist).toHaveBeenCalledWith({ gistId: '123' });
  });

  it('should handle forking a gist failure', async () => {
    mockForkGist.mockRejectedValueOnce(new Error('Failed to fork gist'));
    const { result } = renderHook(() => useGistActions());

    await act(async () => {
      await result.current.handleForkGist('123');
    });

    expect(result.current.error).toBe('Failed to fork gist.');
    expect(toast.error).toHaveBeenCalledWith('Failed to fork gist');
  });
});
