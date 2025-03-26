import Editor, { useMonaco } from '@monaco-editor/react';
import { FC, useEffect } from 'react';

import { CodeEditorProps } from './types';

const CodeEditor: FC<CodeEditorProps> = ({ value, onChange, readOnly, bgColor, language = 'javascript' }) => {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('custom-theme', {
        base: 'hc-light',
        inherit: true,
        rules: [],
        colors: {
          'editorLineNumber.foreground': '#B7B7B7', // Line number color
          'editor.background': bgColor ?? '#FFFFFF', // Set background color dynamically
        },
      });
      monaco.editor.setTheme('custom-theme');
    }
  }, [monaco]);
  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      theme="custom-theme"
      options={{
        readOnly,
        stickyScroll: { enabled: false },
        scrollbar: {
          vertical: 'hidden',
          horizontal: 'hidden',
        },
        overviewRulerLanes: 0,
        lineDecorationsWidth: 0, // Removes the right corner decoration
        selectionHighlight: false, // Disables highlight on selection
        occurrencesHighlight: 'off',
        renderLineHighlight: 'none', // Disables the border around the selected line
        fontSize: 12,
        minimap: { enabled: false },
        wordWrap: 'on',
        guides: {
          indentation: false, // Disables indentation guides
          bracketPairs: false, // Disables bracket pair guides
          bracketPairsHorizontal: false, // Ensures no horizontal guides
        },
      }}
      onChange={val => onChange(val || '')}
    />
  );
};

export default CodeEditor;
