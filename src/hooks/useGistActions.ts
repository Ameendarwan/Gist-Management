import { useCallback, useState } from 'react';
import { useForkGistMutation, useStarGistMutation } from '@app/store/apis/gist';

import { toast } from 'sonner';

export const useGistActions = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [starGist] = useStarGistMutation();
  const [forkGist] = useForkGistMutation();

  const handleStarGist = useCallback(
    async (gistId: string) => {
      if (!gistId) return;
      setIsLoading(true);
      setError(null);
      try {
        await starGist({ gistId }).unwrap();
        toast.success('Gist starred successfully!');
      } catch {
        setError('Failed to star gist.');
        toast.error('Failed to star gist');
      } finally {
        setIsLoading(false);
      }
    },
    [starGist]
  );

  const handleForkGist = useCallback(
    async (gistId: string) => {
      if (!gistId) return;
      setIsLoading(true);
      setError(null);
      try {
        await forkGist({ gistId }).unwrap();
        toast.success('Gist forked successfully!');
      } catch (err) {
        console.error('Error forking gist:', err);
        toast.error('Failed to fork gist');
        setError('Failed to fork gist.');
      } finally {
        setIsLoading(false);
      }
    },
    [forkGist]
  );

  return { handleStarGist, handleForkGist, isLoading, error };
};
