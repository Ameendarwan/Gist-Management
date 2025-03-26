import { Button } from '@app/components/Button/Button';
import CodeEditor from '@app/components/CodeEditor';
import { GistFile } from '@app/store/apis/gist/types';
import { Input } from '@app/components/Input/Input';
import SVGIcon from '@app/components/SVGIcon';
import { paths } from '@app/routes/Routes.utils';
import { useCreateGistMutation } from '@app/store/apis/gist';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@app/hooks/useToast';

const CreateGist = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<GistFile[]>([{ filename: '', content: '' }]);

  const [createGist, { isLoading }] = useCreateGistMutation();

  const addFile = () => {
    setFiles([...files, { filename: '', content: '' }]);
  };

  const updateFile = (index: number, key: keyof GistFile, value: string) => {
    const updatedFiles = [...files];
    updatedFiles[index][key] = value;
    setFiles(updatedFiles);
  };

  const removeFile = (index: number) => {
    if (files.length > 1) {
      setFiles(files.filter((_, i) => i !== index));
    }
  };

  const handleCreateGist = async () => {
    try {
      // Convert array of files to object format required by GitHub API
      const formattedFiles = files.reduce(
        (acc, file) => {
          if (file?.filename?.trim()) {
            // Ensure filename is not empty
            acc[file?.filename] = { content: file.content };
          }
          return acc;
        },
        {} as Record<string, GistFile>
      );

      if (Object.keys(formattedFiles).length === 0) {
        console.warn('No valid files to create a Gist.');
        return;
      }

      await createGist({
        description: description,
        public: true,
        files: formattedFiles,
      }).unwrap();

      toast({
        variant: 'success',
        title: 'Gist has been created successfully!',
      });

      navigate(paths.home);
    } catch (err) {
      toast({
        variant: 'success',
        title: 'Failed to create gist!',
      });
      console.error('Error creating gist:', err);
    }
  };

  return (
    <div className="mb-6 flex w-full flex-col gap-6 md:flex-row md:gap-36">
      <h2 className="text-[25px] text-text">Create Gist</h2>
      <div className="flex w-full flex-col md:w-[61%]">
        {/* Description Input */}
        <Input
          className="mb-4 h-10 w-full rounded-md border-darkBorder !placeholder-lightText focus:border-primary"
          placeholder="Gist Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          aria-label="Gist Description Input"
        />

        {/* File Inputs */}
        {files.map((file, index) => (
          <div key={index} className="mb-4 rounded-lg border" aria-label={`File ${index + 1}`}>
            <div className="mb-2 flex h-[60px] items-center gap-4 bg-backgroundGray px-2">
              <Input
                className="flex h-10 w-full rounded-md border-darkBorder !placeholder-lightText focus:border-primary md:min-w-[250px]"
                placeholder="Filename including extension..."
                value={file.filename}
                onChange={e => updateFile(index, 'filename', e.target.value)}
                aria-label={`Filename input for file ${index + 1}`}
              />
              <SVGIcon
                title="Remove"
                icon="trash"
                className="cursor-pointer"
                onClick={() => removeFile(index)}
                aria-label={`Remove file ${index + 1}`}
              />
            </div>
            <div className="h-[250px]">
              <CodeEditor
                value={file.content}
                onChange={val => updateFile(index, 'content', val)}
                language="javascript"
                aria-label={`Code editor for file ${index + 1}`}
              />
            </div>
          </div>
        ))}

        {/* Add File & Create Gist Buttons */}
        <div className="flex flex-row items-center justify-between">
          <Button variant="muted" onClick={addFile} aria-label="Add another file">
            Add File
          </Button>
          <Button
            onClick={handleCreateGist}
            loading={isLoading}
            className={isLoading ? 'border-primary bg-white' : ''}
            aria-label="Create gist button">
            Create Gist
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateGist;
