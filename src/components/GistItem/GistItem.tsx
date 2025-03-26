import { Card, CardContent } from '@app/components/Card/Card';
import { FC, useEffect, useState } from 'react';

import CodeEditor from '@app/components/CodeEditor';
import GistActionIcons from '../GistActionIcons';
import GistInfo from '@app/components/GistInfo';
import { GistItemProps } from './types';
import { paths } from '@app/routes/Routes.utils';
import { useNavigate } from 'react-router-dom';

const GistItem: FC<GistItemProps> = ({ gist, isStarred }) => {
  const navigate = useNavigate();

  const [content, setContent] = useState<string | null>(null);

  const firstFileName = Object.keys(gist?.files ?? {})?.[0] ?? '';
  const firstFileContentURL = Object.values(gist?.files ?? {})?.[0]?.raw_url ?? '';

  // Fetch the content of the first file from the provided URL
  useEffect(() => {
    fetch(firstFileContentURL)
      .then(response => response.text()) // Convert response to text
      .then(data => setContent(data))
      .catch(error => console.error('Error fetching Gist content:', error));
  }, [firstFileContentURL]);

  return (
    <Card>
      <CardContent className="group relative m-0 flex cursor-pointer flex-col rounded-md p-0">
        {/* Code Editor displaying the first file's content */}
        <div
          className={
            'h-[190px] w-full cursor-pointer rounded-md rounded-b-none border bg-backgroundGray pt-4 group-hover:border-primary'
          }
          aria-label="Gist code preview">
          <CodeEditor bgColor="#FAFAFA" value={content ?? ''} readOnly onChange={() => {}} language="javascript" />
        </div>

        {/* Gist information and action icons */}
        <div
          className="jus flex w-full items-center justify-between gap-3 rounded-md rounded-t-none border border-t-0 p-2"
          onClick={() => navigate(paths.gistDetails(gist.id))}
          aria-label={`View details for gist ${gist.id}`}>
          <GistInfo gist={gist} />
          <div className="hidden flex-row justify-end gap-5 group-hover:flex md:pr-4">
            <GistActionIcons gistId={gist.id ?? ''} isStarred={isStarred} />
          </div>
        </div>

        {/* View file label */}
        <span
          className="absolute right-0 top-0 hidden rounded-tr-md bg-primary px-2 py-1.5 text-[11px] text-sm text-white group-hover:block"
          aria-label={`View file ${firstFileName}`}>
          View <span className="font-bold">{firstFileName}</span>
        </span>
      </CardContent>
    </Card>
  );
};

export default GistItem;
