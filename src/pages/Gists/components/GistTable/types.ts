import { Gist } from '@app/store/apis/gist/types';

export interface GistTableProps {
  gists: Gist[];
  starredGists?: { [key: string]: boolean };
}
