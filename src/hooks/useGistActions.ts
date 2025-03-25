import { useCallback, useState } from 'react';
import { useForkGistMutation, useStarGistMutation } from '@app/store/apis/gist';

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
        const response = await starGist({ gistId }).unwrap();
        console.log('Starred gist:', response);
      } catch (err) {
        console.error('Error starring gist:', err);
        setError('Failed to star gist.');
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
        const response = await forkGist({ gistId }).unwrap();
        console.log('Forked gist:', response);
      } catch (err) {
        console.error('Error forking gist:', err);
        setError('Failed to fork gist.');
      } finally {
        setIsLoading(false);
      }
    },
    [forkGist]
  );

  return { handleStarGist, handleForkGist, isLoading, error };
};
