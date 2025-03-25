import { Card, CardContent } from '@app/components/Card/Card';
import { FC, useEffect, useState } from 'react';

import CodeEditor from '@app/components/CodeEditor';
import GistInfo from '@app/components/GistInfo';
import { GistItemProps } from './types';
import SVGIcon from '@app/components/SVGIcon';
import { paths } from '@app/routes/Routes.utils';
import { useNavigate } from 'react-router-dom';

const GistItem: FC<GistItemProps> = ({ gist }) => {
  const navigate = useNavigate();

  const [content, setContent] = useState<string | null>(null);

  const firstFileName = Object.keys(gist?.files)?.[0] ?? '';

  const firstFileContentURL = Object.values(gist?.files)?.[0]?.raw_url ?? '';

  useEffect(() => {
    fetch(firstFileContentURL)
      .then(response => response.text()) // Convert response to text
      .then(data => setContent(data))
      .catch(error => console.error('Error fetching Gist content:', error));
  }, [firstFileContentURL]);

  console.log('CC', firstFileContentURL);
  return (
    <Card>
      <CardContent className="group relative m-0 flex cursor-pointer flex-col rounded-md p-0">
        <div className="bg-backgroundGray h-[190px] w-full cursor-pointer rounded-md rounded-b-none border pt-4 group-hover:border-primary">
          <CodeEditor bgColor="#FAFAFA" value={content ?? ''} readOnly onChange={() => {}} language="javascript" />
        </div>

        <div
          className="jus flex w-full items-center justify-between gap-3 rounded-md rounded-t-none border p-2"
          onClick={() => navigate(paths.gistDetails(gist.id))}>
          <GistInfo gist={gist} />
          <div className="hidden flex-row justify-end gap-5 group-hover:flex md:pr-4">
            <SVGIcon icon="fork" className="cursor-pointer" title="Fork" />
            <SVGIcon icon="star" title="Star" />
          </div>
        </div>

        <span className="absolute right-0 top-0 hidden rounded-tr-md bg-primary px-2 py-1.5 text-[11px] text-sm text-white group-hover:block">
          View <span className="font-bold">{firstFileName}</span>
        </span>
      </CardContent>
    </Card>
  );
};

export default GistItem;
