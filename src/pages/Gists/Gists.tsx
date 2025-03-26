import React, { useState } from 'react';

import GistList from './components/GistList';
import LayoutToggle from './components/LayoutToggle';

const Gists = () => {
  const [isGrid, setIsGrid] = useState(false);

  return (
    <div className="flex flex-col gap-3 pb-6">
      {/* Container for the header and layout toggle */}
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-[25px] text-text" aria-label="Public Gists Heading">
          Public Gists
        </h2>
        <LayoutToggle isGrid={isGrid} setIsGrid={setIsGrid} />
      </div>
      {/* Gist list component displaying gists in the selected layout */}
      <GistList isGrid={isGrid} />
    </div>
  );
};

export default Gists;
