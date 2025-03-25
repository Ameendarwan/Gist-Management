import { useForkGistMutation, useGetGistDetailsQuery, useStarGistMutation } from '@app/store/apis/gist';

import ActionButton from './components/ActionButton';
import CodeEditor from '@app/components/CodeEditor';
import GistInfo from '@app/components/GistInfo';
import Loader from '@app/components/Loader/Loader';
import useAuthListener from '@app/hooks/useAuthListener';
import { useParams } from 'react-router-dom';

const GistDetails = () => {
  const { id } = useParams();

  const { data: gist, isLoading, isError } = useGetGistDetailsQuery(id!);

  const [starGist] = useStarGistMutation();
  const [forkGist] = useForkGistMutation();

  const { user } = useAuthListener();

  const handleStarGist = async () => {
    try {
      const response = await starGist({
        gistId: gist?.id ?? '',
      }).unwrap();

      console.log('starred gist:', response);
    } catch (err) {
      console.error('Error staring gist:', err);
    }
  };

  const handleForkGist = async () => {
    try {
      const response = await forkGist({
        gistId: gist?.id ?? '',
      }).unwrap();

      console.log('fork gist:', response);
    } catch (err) {
      console.error('Error forking gist:', err);
    }
  };

  if (isLoading) return <Loader isFullPageLoader />;
  if (isError) return <p>Error loading gist details.</p>;

  return (
    <div className="flex flex-col">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <GistInfo gist={gist} />
        <div className="flex flex-row items-center gap-6">
          <ActionButton title="Fork" isDisabled={!user} count={gist?.forks?.length ?? 1} handleClick={handleForkGist} />
          <ActionButton title="Star" isDisabled={!user} count={1} handleClick={handleStarGist} />
        </div>
      </div>
      <div className="flex h-full flex-col gap-16">
        {Object.entries(gist?.files ?? {}).map(([filename, fileData]: any) => (
          <div key={filename} className="bg-backgroundGray h-[400px] rounded-md border">
            <div className="bg-backgroundGray border-b-1 flex items-center self-center border border-x-0 border-t-0 px-3 py-1">
              <span className="text-[11px] text-primary">{filename}</span>
            </div>
            <CodeEditor
              bgColor="#FAFAFA"
              value={fileData?.content ?? ''}
              readOnly
              onChange={() => {}}
              language="javascript"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GistDetails;
