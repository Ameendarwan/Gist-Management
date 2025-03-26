import { useCallback, useState } from 'react';
import { useForkGistMutation, useStarGistMutation } from '@app/store/apis/gist';

import { useToast } from './useToast';

export const useGistActions = () => {
  const { toast } = useToast();

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
        toast({
          variant: 'success',
          title: 'Gist starred successfully!',
        });
        console.log('Starred gist:', response);
      } catch (err) {
        console.error('Error starring gist:', err);
        setError('Failed to star gist.');
        toast({
          variant: 'destructive',
          title: 'Failed to star gist',
        });
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
        toast({
          variant: 'success',
          title: 'Gist forked successfully!',
        });
      } catch (err) {
        console.error('Error forking gist:', err);
        toast({
          variant: 'destructive',
          title: 'Failed to fork gist',
        });
        setError('Failed to fork gist.');
      } finally {
        setIsLoading(false);
      }
    },
    [forkGist]
  );

  return { handleStarGist, handleForkGist, isLoading, error };
};
